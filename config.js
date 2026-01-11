import  {createClient} from 'https://esm.sh/@supabase/supabase-js'

// Create a single supabase client for interacting with your database

const supaUrl = "https://uyqhsfpimnnixtdolyxh.supabase.co";
const supaKey = "sb_publishable_WUwNgVq1UHUDDXZ-i5_K5g_AFR6_pud";

const supabase = createClient(supaUrl,supaKey)

export default supabase;