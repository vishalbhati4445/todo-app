// Re-export the Prisma 8 db client so the rest of the app
// imports from a single location: `import { db } from '../lib/prisma.js'`
export { db } from '../prisma/db.js';
