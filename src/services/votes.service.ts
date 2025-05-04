import { ApiError } from '../utils/ApiError'

import { getSupabaseClient } from '../utils/supabaseClient'

const supabase = getSupabaseClient()

export const submitVote = async (
  pollId: string,
  selectedOption: string,
  userId: string
) => {
  if (!supabase)
    throw new ApiError(
      500,
      'Supabase client initialization failed.',
      'SUPABASE_INIT_FAILED'
    )
  // Check if the user has already voted on this poll
  const { count, error: checkVoteError } = await supabase
    .from('votes')
    .select('*', { count: 'exact', head: true })
    .eq('poll_id', pollId)
    .eq('user_id', userId)

  if (checkVoteError) {
    throw new ApiError(500, 'Error checking previous votes.', 'FETCH_FAILED')
  }

  if (count && count > 0) {
    throw new ApiError(400, 'You have already voted on this poll.', 'BAD_REQUEST')
  }

  // Insert the vote
  const { error: insertError } = await supabase.from('votes').insert({
    poll_id: pollId,
    option_id: selectedOption,
    user_id: userId,
  })

  if (insertError) {
    throw new ApiError(500, 'Failed to submit vote.', 'UPDATE_FAILED')
  }

  return { success: true }
}
