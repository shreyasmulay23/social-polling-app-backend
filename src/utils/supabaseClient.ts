import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://kqnwzhbepgjkyqxonitf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtxbnd6aGJlcGdqa3lxeG9uaXRmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjE3NzY3NiwiZXhwIjoyMDYxNzUzNjc2fQ.yn9dWBjt_B-Ilny0q-Ndup4iwP_iJ8jkOLSkQBw6HPE'
)
