module.exports = {
    up: async (pgm) => {
        await pgm.addColumn('users', {
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
        await pgm.dropColumn('users', 'is_verified');
    },
};