import { pool, memoryDb } from '../config/db.js';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function generateUniqueSlug(baseText, excludeId = null) {
  const baseSlug = slugify(baseText) || 'project';
  let candidate = baseSlug;
  let count = 0;

  while (true) {
    let exists = false;
    if (!pool) {
      exists = memoryDb.projects.some(p => p.slug === candidate && (excludeId === null || p.id !== parseInt(excludeId, 10)));
    } else {
      let query = 'SELECT id FROM projects WHERE slug = $1';
      const params = [candidate];
      if (excludeId !== null) {
        query += ' AND id != $2';
        params.push(excludeId);
      }
      const res = await pool.query(query, params);
      exists = res.rows.length > 0;
    }

    if (!exists) {
      return candidate;
    }

    count += 1;
    candidate = `${baseSlug}-${count}`;
  }
}

// Smart order re-indexer: ensures active projects are ordered 1, 2, 3, 4... without gaps or duplicate sequence numbers
export async function normalizeDisplayOrders() {
  if (!pool) {
    const active = memoryDb.projects
      .filter(p => p.status !== 'deleted')
      .sort((a, b) => a.display_order - b.display_order || new Date(a.created_at) - new Date(b.created_at));
    active.forEach((p, idx) => {
      p.display_order = idx + 1;
    });
    return;
  }

  try {
    const res = await pool.query(
      "SELECT id, display_order FROM projects WHERE status != 'deleted' ORDER BY display_order ASC, created_at DESC"
    );
    for (let i = 0; i < res.rows.length; i++) {
      const expectedOrder = i + 1;
      if (res.rows[i].display_order !== expectedOrder) {
        await pool.query("UPDATE projects SET display_order = $1 WHERE id = $2", [expectedOrder, res.rows[i].id]);
      }
    }
  } catch (err) {
    console.error('Error normalizing display orders:', err.message);
  }
}

export async function getAllProjects({ status, category, search } = {}) {
  // Normalize sequence order to fix gaps from past deletes
  await normalizeDisplayOrders();

  if (!pool) {
    let list = [...memoryDb.projects];
    if (status) {
      list = list.filter(p => p.status === status);
    } else {
      // Admin request without status filter: exclude deleted
      list = list.filter(p => p.status !== 'deleted');
    }
    if (category && category !== 'All') {
      list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.client.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
    }
    return list.sort((a, b) => a.display_order - b.display_order);
  }

  let sql = 'SELECT * FROM projects WHERE 1=1';
  const params = [];

  if (status) {
    params.push(status);
    sql += ` AND status = $${params.length}`;
  } else {
    // Hide soft-deleted by default unless specified
    sql += ` AND status != 'deleted'`;
  }

  if (category && category !== 'All') {
    params.push(category);
    sql += ` AND LOWER(category) = LOWER($${params.length})`;
  }

  if (search) {
    params.push(`%${search}%`);
    const idx = params.length;
    sql += ` AND (title ILIKE $${idx} OR client ILIKE $${idx} OR excerpt ILIKE $${idx})`;
  }

  sql += ' ORDER BY display_order ASC, created_at DESC';

  const res = await pool.query(sql, params);
  return res.rows;
}

export async function getProjectById(id) {
  if (!pool) {
    const item = memoryDb.projects.find(p => p.id === parseInt(id, 10));
    return item || null;
  }
  const res = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
  return res.rows[0] || null;
}

export async function getProjectBySlug(slug) {
  if (!pool) {
    const item = memoryDb.projects.find(p => p.slug === slug);
    return item || null;
  }
  const res = await pool.query('SELECT * FROM projects WHERE slug = $1 AND status = $2', [slug, 'published']);
  return res.rows[0] || null;
}

export async function createProject(data) {
  const slug = await generateUniqueSlug(data.slug || data.title);
  const status = data.status || 'published';
  const display_order = parseInt(data.display_order || data.order || 999, 10);

  let createdProject = null;

  if (!pool) {
    const newId = memoryDb.projects.length ? Math.max(...memoryDb.projects.map(p => p.id)) + 1 : 1;
    createdProject = {
      id: newId,
      slug,
      title: data.title,
      client: data.client,
      category: data.category,
      result: data.result || '',
      image: data.image,
      excerpt: data.excerpt,
      display_order,
      status,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    memoryDb.projects.push(createdProject);
  } else {
    const sql = `
      INSERT INTO projects (slug, title, client, category, result, image, excerpt, display_order, status, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
      RETURNING *;
    `;
    const params = [
      slug,
      data.title,
      data.client,
      data.category,
      data.result || '',
      data.image,
      data.excerpt,
      display_order,
      status
    ];

    const res = await pool.query(sql, params);
    createdProject = res.rows[0];
  }

  await normalizeDisplayOrders();
  return await getProjectById(createdProject.id);
}

export async function updateProject(id, data) {
  const slug = data.slug || data.title ? await generateUniqueSlug(data.slug || data.title, id) : undefined;
  const status = data.status || 'published';
  const display_order = parseInt(data.display_order || data.order || 0, 10);

  let updated = null;

  if (!pool) {
    const idx = memoryDb.projects.findIndex(p => p.id === parseInt(id, 10));
    if (idx === -1) return null;
    memoryDb.projects[idx] = {
      ...memoryDb.projects[idx],
      slug,
      title: data.title,
      client: data.client,
      category: data.category,
      result: data.result || '',
      image: data.image || memoryDb.projects[idx].image,
      excerpt: data.excerpt,
      display_order,
      status,
      updated_at: new Date().toISOString()
    };
    updated = memoryDb.projects[idx];
  } else {
    const sql = `
      UPDATE projects
      SET slug = $1, title = $2, client = $3, category = $4, result = $5, image = $6, excerpt = $7, display_order = $8, status = $9, updated_at = NOW()
      WHERE id = $10
      RETURNING *;
    `;
    const params = [
      slug,
      data.title,
      data.client,
      data.category,
      data.result || '',
      data.image,
      data.excerpt,
      display_order,
      status,
      id
    ];

    const res = await pool.query(sql, params);
    updated = res.rows[0] || null;
  }

  await normalizeDisplayOrders();
  return updated ? await getProjectById(id) : null;
}

export async function softDeleteProject(id) {
  let result = null;
  if (!pool) {
    const idx = memoryDb.projects.findIndex(p => p.id === parseInt(id, 10));
    if (idx === -1) return null;
    memoryDb.projects[idx].status = 'deleted';
    memoryDb.projects[idx].updated_at = new Date().toISOString();
    result = memoryDb.projects[idx];
  } else {
    const res = await pool.query(
      "UPDATE projects SET status = 'deleted', updated_at = NOW() WHERE id = $1 RETURNING *",
      [id]
    );
    result = res.rows[0] || null;
  }

  // Smart Auto-Reindex remaining projects so 3 becomes 1, 4 becomes 2, etc.
  await normalizeDisplayOrders();
  return result;
}

export async function patchProjectStatusOrOrder(id, { status, display_order }) {
  if (!pool) {
    const item = memoryDb.projects.find(p => p.id === parseInt(id, 10));
    if (!item) return null;
    if (status !== undefined) item.status = status;
    if (display_order !== undefined) item.display_order = parseInt(display_order, 10);
    item.updated_at = new Date().toISOString();
  } else {
    const updates = [];
    const params = [];

    if (status !== undefined) {
      params.push(status);
      updates.push(`status = $${params.length}`);
    }
    if (display_order !== undefined) {
      params.push(parseInt(display_order, 10));
      updates.push(`display_order = $${params.length}`);
    }

    if (updates.length > 0) {
      updates.push('updated_at = NOW()');
      params.push(id);

      const sql = `UPDATE projects SET ${updates.join(', ')} WHERE id = $${params.length} RETURNING *`;
      await pool.query(sql, params);
    }
  }

  // Normalize display orders so order sequence is clean 1, 2, 3...
  await normalizeDisplayOrders();
  return await getProjectById(id);
}
