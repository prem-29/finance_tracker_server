module.exports = {
    up: async (pgm) => {
        await pgm.createTable('account', {
            id: { type: 'serial', primaryKey: true },
            account_name: { type: 'varchar(100)', notNull: true },
            user_id: { type: 'integer', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
            created_at: { type: 'timestamp', default: pgm.func('current_timestamp') }
        });
    },
    down: async (pgm) => {
        await pgm.dropTable('account');
    }
};