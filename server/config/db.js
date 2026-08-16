import pg from 'pg';
import bcrypt from 'bcryptjs';
import { config } from './env.js';

const { Pool } = pg;

// Seed data for initial projects migration from site-data.js
const SEED_PROJECTS = [
  {
    slug: 'fintech-app-redesign',
    title: 'Rebuilding a fintech app around one-tap payments',
    client: 'Paylane',
    category: 'UI/UX',
    excerpt: 'A full product redesign for a payments app serving 400k users, anchored on a new design system and simplified transaction flow.',
    result: '+52% checkout completion',
    image: '/assets/fintech_app.png',
    images: ['/assets/fintech_app.png', '/assets/brand_identity.png', '/assets/hero_banner.png'],
    display_order: 1,
    status: 'published'
  },
  {
    slug: 'saas-identity-system',
    title: 'An identity system for a fast-scaling SaaS',
    client: 'Northloop',
    category: 'Branding',
    excerpt: 'Positioning, logo craft and a modular identity toolkit rolled out across product, web, sales and event collateral in three weeks.',
    result: '40+ touchpoints unified',
    image: '/assets/brand_identity.png',
    images: ['/assets/brand_identity.png', '/assets/hero_banner.png', '/assets/fintech_app.png'],
    display_order: 2,
    status: 'published'
  },
  {
    slug: 'd2c-campaign-creatives',
    title: 'Always-on social system for a D2C skincare brand',
    client: 'Aurelle',
    category: 'Graphic',
    excerpt: 'A templated creative system delivering 60+ monthly assets while keeping every post recognisably on-brand.',
    result: '3.1x engagement lift',
    image: '/assets/hero_banner.png',
    images: ['/assets/hero_banner.png', '/assets/motion_reels.png', '/assets/brand_identity.png'],
    display_order: 3,
    status: 'published'
  },
  {
    slug: 'product-launch-film',
    title: 'Launch film and reel series for a hardware startup',
    client: 'Kite Labs',
    category: 'Video',
    excerpt: 'A hero product film plus twelve platform-native reels, shot in one studio block and cut for every channel.',
    result: '72% avg. watch-through',
    image: '/assets/motion_reels.png',
    images: ['/assets/motion_reels.png', '/assets/hero_banner.png', '/assets/fintech_app.png'],
    display_order: 4,
    status: 'published'
  },
  {
    slug: 'marketplace-web-app',
    title: 'Marketplace dashboard for enterprise sellers',
    client: 'Cartway',
    category: 'UI/UX',
    excerpt: 'Complex inventory data made legible through a considered hierarchy, dense tables and a calm, accessible palette.',
    result: '-38% support tickets',
    image: '/assets/fintech_app.png',
    images: ['/assets/fintech_app.png', '/assets/hero_banner.png', '/assets/brand_identity.png'],
    display_order: 5,
    status: 'published'
  },
  {
    slug: 'restaurant-rebrand',
    title: 'Rebranding a restaurant group across 14 outlets',
    client: 'Copper & Clay',
    category: 'Branding',
    excerpt: 'A warm, tactile identity applied to menus, signage, packaging and uniforms without a single inconsistent asset.',
    result: '14 outlets rolled out',
    image: '/assets/brand_identity.png',
    images: ['/assets/brand_identity.png', '/assets/hero_banner.png', '/assets/motion_reels.png'],
    display_order: 6,
    status: 'published'
  }
];

let pool = null;
let memoryDb = null; // Fallback in-memory database if DATABASE_URL is not set yet

if (config.databaseUrl) {
  const isCloud = config.databaseUrl.includes('neon.tech') || config.databaseUrl.includes('supabase') || config.databaseUrl.includes('sslmode=require') || config.databaseUrl.includes('amazonaws.com');
  pool = new Pool({
    connectionString: config.databaseUrl,
    ssl: isCloud ? { rejectUnauthorized: false } : false
  });
} else {
  console.log('💡 Note: DATABASE_URL not set in server/.env. Using resilient memory database store for dev testing.');
  memoryDb = {
    users: [],
    projects: SEED_PROJECTS.map((p, idx) => ({
      id: idx + 1,
      ...p,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }))
  };
}

export async function query(text, params) {
  if (pool) {
    return pool.query(text, params);
  }
  throw new Error('Database pool not initialized. Please set DATABASE_URL in server/.env');
}

export async function initDb() {
  if (!pool) {
    // Seed admin user in memory store if needed
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(config.adminPassword, salt);
    if (!memoryDb.users.some(u => u.email === config.adminEmail)) {
      memoryDb.users.push({
        id: 1,
        email: config.adminEmail,
        password_hash: passwordHash,
        created_at: new Date().toISOString()
      });
    }
    console.log(`✅ In-memory database initialized. Default Admin: ${config.adminEmail}`);
    return;
  }

  try {
    // 1. Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Create projects table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        client VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        result VARCHAR(255),
        image TEXT NOT NULL,
        images JSONB DEFAULT '[]'::jsonb,
        excerpt TEXT NOT NULL,
        display_order INT NOT NULL DEFAULT 0,
        status VARCHAR(50) NOT NULL DEFAULT 'published',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Migration: ensure images column exists on existing installations
    await pool.query(`
      ALTER TABLE projects ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;
    `);

    // 3. Seed admin user if not exists
    const userCheck = await pool.query('SELECT id FROM users WHERE email = $1', [config.adminEmail]);
    if (userCheck.rowCount === 0) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(config.adminPassword, salt);
      await pool.query(
        'INSERT INTO users (email, password_hash) VALUES ($1, $2)',
        [config.adminEmail, passwordHash]
      );
      console.log(`🔑 Seeded admin user: ${config.adminEmail}`);
    }

    // 4. Seed initial projects if table is empty
    const projectCheck = await pool.query('SELECT COUNT(*) as count FROM projects');
    if (parseInt(projectCheck.rows[0].count, 10) === 0) {
      for (const p of SEED_PROJECTS) {
        const imagesJson = JSON.stringify(p.images || [p.image]);
        await pool.query(
          `INSERT INTO projects (slug, title, client, category, result, image, images, excerpt, display_order, status)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [p.slug, p.title, p.client, p.category, p.result, p.image, imagesJson, p.excerpt, p.display_order, p.status]
        );
      }
      console.log('📁 Seeded 6 initial case study projects into PostgreSQL database.');
    }

    console.log('🚀 PostgreSQL database schema initialized successfully.');
  } catch (err) {
    console.error('❌ Failed to initialize PostgreSQL database:', err.message);
  }
}

export { pool, memoryDb };
