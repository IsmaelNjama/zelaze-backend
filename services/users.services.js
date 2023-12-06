
const query = require('../utils/postgres').query;

const services = {

    clearUser: (user) => {
        delete user.password;
    },

    addUser: async ({ firstname, lasname, pseudo, phone, email, address, description, password, admin }) => {
        try {
            const resp = await query(`
                INSERT INTO users
                (firstname, lasname, pseudo, phone, email, address, description, password, admin)
                VALUES
                ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING id;
            `,
            [
                firstname, lasname, pseudo, phone, email, address, description, password, admin
            ]);
    
            return resp.rows[0].id;
        } catch (error) {
            console.log(error);
            return {};
        }
    },
    

    getAllUsers: async () => {
        const data = await query(`
            SELECT * 
            FROM users 
            ORDER BY id
        `);
        return data.rows;
    },

    getUserById: async (userId) => {
        const user = await query(`
            SELECT * FROM users
            WHERE id = $1
        `, [userId])
        return user.rows[0];
    },

    getUserByEmail: async (email) => {
        const user = await query(`
            SELECT * FROM users
            WHERE email = $1
        `, [email])
        return user.rows[0];
    },

    getUsersByQuery: async (q = "", sort = "_id", direction = "1", limit = "10", skip = "0") => {
        const query = new RegExp(q, 'i');

        const data = await users().find({
            $or: [
                { "email": query },
                { "name": query }
            ]
        }).sort({ [sort]: +direction }).limit(+limit).skip(+skip).toArray() //2

        return data;
    },


    getUsersByQuery: async (q = "", sort = "_id", direction = "asc", limit = "10", skip = "0") => {
        

        const data = await query(`
        SELECT *
        FROM users
        WHERE email ILIKE '% ${q} %' OR name ILIKE '% ${q} %'
        ORDER BY ${sort}
        LIMIT ${limit}
        OFFSET ${skip};
        `)
        
       
        return data.rows;
    },

    updateUser: async (userId, body) => {
        await query(`
            UPDATE users 
            SET 
                ${Object.keys(body).map(key => `${key} = '${body[key]}'`).join(', ')}
            WHERE id = $1
        `, [
            userId
        ]);
    },

    deleteUser: async (userId) => {
        await query(`
            DELETE FROM users 
            WHERE id = $1
        `, [userId]);
    }
}


module.exports = services;