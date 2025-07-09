import { createClient } from '@supabase/supabase-js'

// 注意：在生产环境中应从环境变量中获取这些值
// 这里为了演示方便直接写入，实际项目中请不要这样做
const supabaseUrl = 'https://mrgljgsxvdxhpltpdqwb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yZ2xqZ3N4dmR4aHBsdHBkcXdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwMzM3MTIsImV4cCI6MjA2NzYwOTcxMn0.6qAvyvqp_xNKctGkpSvH4Tx_uTjyNpO8QbissU_nmP4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)    