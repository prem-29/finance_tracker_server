module.exports = {
    up: async (pgm) => {
        await pgm.createTable('users', {
            id: { type: 'serial', primaryKey: true },
            name: { type: 'varchar(100)', notNull: true },
            email: { type: 'varchar(100)', unique: true, notNull: true },
            password: { type: 'string', notNull: true },
            created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
            is_verified: {
                type: 'boolean',
                notNull: true,
                default: false,
            },
            is_deleted: {
                type: 'boolean',
                notNull: true,
                default: false,
            },
            deleted_at: { type: 'timestamp' }
        });
    },
    down: async (pgm) => {
        await pgm.dropTable('users');
    }
};