const query = require("../utils/postgres").query;

const services = {
  clearUser: (user) => {
    delete user.password;
  },

  // ok

  addUser: async ({
    firstname,
    lastname,
    pseudo,
    phone,
    email,
    address,
    description,
    password,
    role,
  }) => {
    try {
      const resp = await query(
        `
                INSERT INTO users
                (firstname, lastname, pseudo, phone, email, address, description, password, role)
                VALUES
                ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING id;
            `,
        [
          firstname,
          lastname,
          pseudo,
          phone,
          email,
          address,
          description,
          password,
          role,
        ]
      );

      return resp.rows[0].id;
    } catch (error) {
      console.log(error);
      return {};
    }
  },

  //ok
  getAllUsers: async () => {
    const data = await query(`
            SELECT * 
            FROM users 
            ORDER BY id
        `);
    return data.rows;
  },

  //ok
  getUserById: async (userId) => {
    const user = await query(
      `
            SELECT * FROM users
            WHERE id = $1
        `,
      [userId]
    );
    return user.rows[0];
  },

  getUserByEmail: async (email) => {
    const user = await query(
      `
            SELECT * FROM users
            WHERE email = $1
        `,
      [email]
    );
    return user.rows[0];
  },

  getUsersByQuery: async (
    q = "",
    sort = "_id",
    direction = "asc",
    limit = "10",
    skip = "0"
  ) => {
    const data = await query(`
        SELECT *
        FROM users
        WHERE email ILIKE '% ${q} %' OR name ILIKE '% ${q} %'
        ORDER BY ${sort}
        LIMIT ${limit}
        OFFSET ${skip};
        `);

    return data.rows;
  },

  //ok
  updateUser: async (userId, body) => {
    await query(
      `
            UPDATE users 
            SET 
                ${Object.keys(body)
                  .map((key) => `${key} = '${body[key]}'`)
                  .join(", ")}
            WHERE id = $1
        `,
      [userId]
    );
  },

  //ok
  deleteUser: async (userId) => {
    await query(
      `
            DELETE FROM users 
            WHERE id = $1
        `,
      [userId]
    );
  },
};

module.exports = services;
