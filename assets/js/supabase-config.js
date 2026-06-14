/* ============================================================
   ZAWAN Portfolio — supabase-config.js
   Supabase integration (currently using localStorage as fallback)

   HOW TO SET UP SUPABASE:
   1. Create a free account at https://supabase.com
   2. Create a new project
   3. Go to Settings > API to get your URL and anon key
   4. Run the SQL schema below in the Supabase SQL editor
   5. Uncomment the Supabase client initialization below
   6. Replace SUPABASE_URL and SUPABASE_ANON_KEY with your values
   ============================================================ */

/*
SQL SCHEMA — Run in Supabase SQL editor:

-- Products table:
CREATE TABLE products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name_en text NOT NULL,
  name_ar text NOT NULL,
  description_en text NOT NULL,
  description_ar text NOT NULL,
  category text NOT NULL,
  price decimal(10,2),
  tech_stack text[],
  icon text,
  created_at timestamp DEFAULT now()
);

-- Announcements table:
CREATE TABLE announcements (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL,
  type text DEFAULT 'info',
  created_at timestamp DEFAULT now()
);

-- Enable Row Level Security (recommended)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read announcements" ON announcements FOR SELECT USING (true);
*/

/* ============================================================
   SUPABASE CLIENT INITIALIZATION (uncomment when ready)
   ============================================================ */

// import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// const SUPABASE_URL = 'https://your-project-id.supabase.co';     // Replace with your URL
// const SUPABASE_ANON_KEY = 'your-anon-key-here';                  // Replace with your anon key

// const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ============================================================
   AUTH FUNCTIONS
   ============================================================ */

/**
 * Sign up a new user
 * @param {string} email
 * @param {string} password
 */
async function signUp(email, password) {
  // When Supabase is connected:
  // const { data, error } = await supabase.auth.signUp({ email, password });
  // if (error) throw error;
  // return data;
  console.log('[Supabase] signUp called — not yet connected');
  return null;
}

/**
 * Sign in an existing user
 * @param {string} email
 * @param {string} password
 */
async function signIn(email, password) {
  // When Supabase is connected:
  // const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  // if (error) throw error;
  // return data;
  console.log('[Supabase] signIn called — not yet connected');
  return null;
}

/**
 * Sign out current user
 */
async function signOut() {
  // When Supabase is connected:
  // const { error } = await supabase.auth.signOut();
  // if (error) throw error;
  console.log('[Supabase] signOut called — not yet connected');
}

/* ============================================================
   PRODUCT FUNCTIONS
   ============================================================ */

/**
 * Get all products (falls back to localStorage)
 * @param {string} [category] - optional filter
 */
async function getProducts(category = null) {
  // When Supabase is connected:
  // let query = supabase.from('products').select('*').order('created_at', { ascending: false });
  // if (category) query = query.eq('category', category);
  // const { data, error } = await query;
  // if (error) throw error;
  // return data;

  // localStorage fallback:
  const stored = JSON.parse(localStorage.getItem('zawan-products') || '[]');
  if (category) return stored.filter(p => p.category === category);
  return stored;
}

/**
 * Add a new product (falls back to localStorage)
 * @param {Object} product
 */
async function addProduct(product) {
  // When Supabase is connected:
  // const { data, error } = await supabase.from('products').insert([product]).select().single();
  // if (error) throw error;
  // return data;

  // localStorage fallback:
  const stored = JSON.parse(localStorage.getItem('zawan-products') || '[]');
  const newProduct = {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    created_at: new Date().toISOString(),
    ...product,
  };
  stored.unshift(newProduct);
  localStorage.setItem('zawan-products', JSON.stringify(stored));
  return newProduct;
}

/**
 * Delete a product by ID
 * @param {string} id
 */
async function deleteProduct(id) {
  // When Supabase is connected:
  // const { error } = await supabase.from('products').delete().eq('id', id);
  // if (error) throw error;

  // localStorage fallback:
  const stored = JSON.parse(localStorage.getItem('zawan-products') || '[]');
  localStorage.setItem('zawan-products', JSON.stringify(stored.filter(p => p.id !== id)));
}

/* ============================================================
   ANNOUNCEMENT FUNCTIONS
   ============================================================ */

/**
 * Get all announcements (falls back to localStorage)
 */
async function getAnnouncements() {
  // When Supabase is connected:
  // const { data, error } = await supabase.from('announcements').select('*').order('created_at', { ascending: false });
  // if (error) throw error;
  // return data;

  return JSON.parse(localStorage.getItem('zawan-announcements') || '[]');
}

/**
 * Add an announcement (falls back to localStorage)
 * @param {Object} announcement - { title, content, type }
 */
async function addAnnouncement(announcement) {
  // When Supabase is connected:
  // const { data, error } = await supabase.from('announcements').insert([announcement]).select().single();
  // if (error) throw error;
  // return data;

  const stored = JSON.parse(localStorage.getItem('zawan-announcements') || '[]');
  const newAnn = {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    created_at: new Date().toISOString(),
    ...announcement,
  };
  stored.unshift(newAnn);
  localStorage.setItem('zawan-announcements', JSON.stringify(stored));
  return newAnn;
}

// Export for use in admin panel
window.ZawanDB = { signUp, signIn, signOut, getProducts, addProduct, deleteProduct, getAnnouncements, addAnnouncement };
