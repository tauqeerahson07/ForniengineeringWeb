import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getSignedUrl(bucket, path) {
    try {
        const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, 60 * 60); // URL valid for 1 hour
        if (error) {
            console.error('Error generating signed URL:', error);
            return null;
        }
        return data.signedUrl;
    } catch (err) {
        console.error('Unexpected error in getSignedUrl:', err);
        return null;
    }
}