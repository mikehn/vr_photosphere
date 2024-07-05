import { createClient } from '@supabase/supabase-js'
import { Link } from '../../utils/general.type'
const TABLE = 'links'

const supabase = createClient(
  import.meta.env.VITE_SUB_URL,
  import.meta.env.VITE_SUB_TOKEN
)

async function getLinks(): Promise<Link[] | null> {
  const { data, error } = await supabase.from(TABLE).select('*')
  if (error) console.log('error', error)
  return data
}

export { supabase, getLinks, TABLE }
