const { createClient } = require('@supabase/supabase-js')

// Server-side client: uses the service-role key, so it bypasses storage RLS entirely.
// Never ship SUPABASE_SERVICE_ROLE_KEY to the frontend — only SUPABASE_ANON_KEY belongs there.
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
)

function sanitizeName(name) {
    return String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

// Uploads a buffer to the given public bucket and returns its public URL.
async function uploadImage(bucket, fileName, buffer, contentType = 'image/jpeg') {
    const path = sanitizeName(fileName)
    const { error } = await supabase.storage.from(bucket).upload(path, buffer, {
        contentType,
        upsert: true,
    })
    if (error) throw error
    const { data } = supabase.storage.from(bucket).getPublicUrl(path)
    return data.publicUrl
}

module.exports = { supabase, uploadImage }
