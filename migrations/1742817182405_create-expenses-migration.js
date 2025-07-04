module.exports = {
    up: async (pgm) => {
        await pgm.createTable('expenses', {
            id: { type: 'serial', primaryKey: true },
            amount: { type: 'integer', notNull: true },
            date: { type: 'timestamp', notNull: true },
            account_id: { type: 'integer', notNull: true, references: 'account(id)', onDelete: 'CASCADE' },
            category_id: { type: 'integer', notNull: true, references: 'category(id)', onDelete: 'CASCADE' },
            user_id: { type: 'integer', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
            notes: { type: 'varchar(100)' },
            type: { type: 'varchar(100)', default: "Expense" },
            created_at: { type: 'timestamp', default: pgm.func('current_timestamp') }
        });
    },
    down: async (pgm) => {
        await pgm.dropTable('expenses');
    }
};