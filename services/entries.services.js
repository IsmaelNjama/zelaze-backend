const query = require("../utils/postgres").query;

const services = {
  addEntry: async ({
    title,
    isgivinghelp,
    category,
    availability,
    description,
    country,
    town,
    urgent,
  }) => {
    try {
      const resp = await query(
        `
                INSERT INTO entries
                (title, isgivinghelp, category, availability, description, country, town, urgent)
                VALUES
                ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING id;
            `,
        [
          title,
          isgivinghelp,
          category,
          availability,
          description,
          country,
          town,
          urgent,
        ]
      );

      return resp.rows[0].id;
    } catch (error) {
      console.error(error);
    }
  },

  getAllEntries: async () => {
    const data = await query(`
            SELECT * 
            FROM entries 
            ORDER BY id
        `);
    return data.rows;
  },

  getEntryById: async (entryId) => {
    const entry = await query(
      `
            SELECT * FROM entries
            WHERE id = $1
        `,
      [entryId]
    );
    return entry.rows[0];
  },

  getEntriesByQuery: async (
    q = "",
    sort = "id",
    direction = "asc",
    limit = "10",
    skip = "0"
  ) => {
    const data = await query(`
        SELECT *
        FROM entries
        WHERE title ILIKE '%${q}%' 
        or category ILIKE '%${q}%' 
        or availability ILIKE '%${q}%' or description ILIKE '%${q}%' 
        or country ILIKE '%${q}%' 
        or town ILIKE '%${q}%'  
        ORDER BY ${sort} ${direction}
        LIMIT ${limit}
        OFFSET ${skip};
        `);

    return data.rows;
  },

  updateEntry: async (entryId, body) => {
    await query(
      `
            UPDATE entries 
            SET 
                ${Object.keys(body)
                  .map((key) => `${key} = '${body[key]}'`)
                  .join(", ")}
            WHERE id = $1
        `,
      [entryId]
    );
  },

  deleteEntry: async (entryId) => {
    await query(
      `
            DELETE FROM entries 
            WHERE id = $1
        `,
      [entryId]
    );
  },
};

module.exports = services;
