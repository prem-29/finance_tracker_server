import client from "../database.js";

const getTransaction = async (userId) => {
    const query = `
    SELECT 
      t.id,
      t.amount,
      t.date,
      t.notes,
      t.type,
      t.created_at,
      a.account_name AS account_name,
      c.category_name AS category_name
    FROM (
      SELECT 
        id, amount, date, account_id, category_id, user_id, notes, type, created_at
      FROM expenses
      WHERE user_id = $1

      UNION ALL

      SELECT 
        id, amount, date, account_id, category_id, user_id, notes, type, created_at
      FROM income
      WHERE user_id = $1
    ) t
    JOIN account a ON t.account_id = a.id
    JOIN category c ON t.category_id = c.id
    ORDER BY t.date DESC;
  `;

    try {
        const res = await client.query(query, [userId]);
        return res.rows;
    } catch (err) {
        console.error('Error fetching transactions', err);
        throw err;
    }
}

export default getTransaction;