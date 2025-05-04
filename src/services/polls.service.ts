import { ApiError } from '../utils/ApiError'

import { getSupabaseClient } from '../utils/supabaseClient'

const supabase = getSupabaseClient()

/**
 * Get all polls by user id
 * @param userId
 */
export const getAllPollsByUserId = async (userId: string) => {
  if (!supabase)
    throw new ApiError(
      401,
      'Supabase client initialization failed.',
      'SUPABASE_INIT_FAILED'
    )

  // Fetch all polls
  const { data: pollsRaw, error } = await supabase
    .from('polls')
    .select(
      `
    id, question, user_id, created_at,
    options ( id, text, poll_id ),
    votes ( id, poll_id, user_id, option_id )
  `
    )
    .order('created_at', { ascending: false })

  if (error) throw new ApiError(401, 'Failed to fetch polls.', 'FETCH_FAILED')

  const polls = pollsRaw.map((poll) => {
    const voteCounts = poll.options.map((opt) => {
      const count = poll.votes.filter((v) => v.option_id === opt.id).length
      return {
        ...opt,
        vote_count: count,
      }
    })

    const total_votes = voteCounts.reduce((sum, opt) => sum + opt.vote_count, 0)

    const enrichedOptions = voteCounts.map((opt) => ({
      ...opt,
      percentage:
        total_votes > 0 ? Math.round((opt.vote_count / total_votes) * 100) : 0,
    }))

    return {
      ...poll,
      total_votes,
      options: enrichedOptions,
      user_has_voted: poll.votes.some((v) => v.user_id === userId),
      user_option_id:
        poll.votes.find((v) => v.user_id === userId)?.option_id || null,
    }
  })

  return polls
}

/**
 * Create poll service method
 * @param userId
 * @param question
 * @param options
 */
export async function createPollWithOptions(
  userId: string,
  question: string,
  options: string[]
) {
  if (!supabase)
    throw new ApiError(
      401,
      'Supabase client initialization failed.',
      'SUPABASE_INIT_FAILED'
    )

  // 1. Insert poll
  const { data: poll, error: pollError } = await supabase
    .from('polls')
    .insert({ question, user_id: userId })
    .select()
    .single()

  if (pollError)
    throw new ApiError(
      401,
      `Poll creation failed: ${pollError.message}`,
      'POLL_CREATE_FAILED'
    )

  // 2. Insert options
  const optionsData = options
    .filter((text) => text.trim() !== '')
    .map((text) => ({
      text,
      poll_id: poll.id,
    }))

  const { error: optionsError } = await supabase
    .from('options')
    .insert(optionsData)

  if (optionsError) {
    // Rollback poll if options fail
    await supabase.from('polls').delete().eq('id', poll.id)
    throw new ApiError(
      401,
      `Options creation failed: ${optionsError.message}`,
      'OPTIONS_CREATE_FAILED'
    )
  }

  return poll.id
}

export const updatePollWithOptions = async (
  pollId: string,
  question: string,
  options: string[],
  originalOptions: { id: number; text: string }[],
  hasVotes: boolean
) => {
  if (!supabase)
    throw new ApiError(
      401,
      'Supabase client initialization failed.',
      'SUPABASE_INIT_FAILED'
    )

  // 1. Update poll question
  const { error: updatePollError } = await supabase
    .from('polls')
    .update({ question })
    .eq('id', pollId);

  if (updatePollError) throw new ApiError(
    401,
    `Failed to update poll title: ${updatePollError.message}`,
    'POLL_TITLE_UPDATE_FAILED'
  )

  // 2. Update options
  for (let i = 0; i < originalOptions.length; i++) {
    const original = originalOptions[i];
    const updatedText = options[i];

    if (original.text !== updatedText) {
      await supabase
        .from('options')
        .update({ text: updatedText })
        .eq('id', original.id);
    }
  }

  // 3. Remove extra options if no votes
  if (!hasVotes) {
    const removed = originalOptions.slice(options.length);
    for (const ro of removed) {
      await supabase.from('options').delete().eq('id', ro.id);
    }

    // 4. Add new options
    const newOptions = options.slice(originalOptions.length).filter((o: string) => o.trim() !== '');
    if (newOptions.length > 0) {
      await supabase.from('options').insert(
        newOptions.map((text: string) => ({ text, poll_id: pollId }))
      );
    }
  }
};
