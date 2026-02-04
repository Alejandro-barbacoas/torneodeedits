import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mbdczthbqyecpedargls.supabase.co';
const supabaseAnonKey = 'sb_publishable_yiMiGFDFGq6RPPSfnNpq3A_ADaHBYOv';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);