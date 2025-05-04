import { ApiError } from '../utils/ApiError'

import { getSupabaseClient } from '../utils/supabaseClient'

const supabase = getSupabaseClient()

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
