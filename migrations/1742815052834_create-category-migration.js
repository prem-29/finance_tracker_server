module.exports = {
    up: async (pgm) => {
        await pgm.createTable('category', {
            id: { type: 'serial', primaryKey: true },
            category_name: { type: 'varchar(100)', notNull: true },
            type: { type: 'integer', notNull: true },
            user_id: { type: 'integer', references: 'users(id)', onDelete: 'CASCADE' },
            created_at: { type: 'timestamp', default: pgm.func('current_timestamp') }
        });
    },
    down: async (pgm) => {
        await pgm.dropTable('category');
    }
};