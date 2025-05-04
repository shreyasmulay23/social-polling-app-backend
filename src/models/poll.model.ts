export interface User {
  id: string
  email: string
  created_at: string
}

export interface Poll {
  id: string
  question: string
  created_at: string
  user_id: string
  options: Option[]
}

export interface Option {
  id: string
  text: string
  poll_id: string
}

export interface Vote {
  id: string
  poll_id: string
  option_id: string
  user_id: string
  created_at: string
}

export interface OptionWithStats extends Option {
  vote_count: number;
  percentage: number;
}

export interface PollWithVotes extends Poll {
  votes: Vote[];
  user_has_voted: boolean;
  total_votes: number;
  user_option_id: string;
  options: OptionWithStats[]; // Now using OptionWithStats
}