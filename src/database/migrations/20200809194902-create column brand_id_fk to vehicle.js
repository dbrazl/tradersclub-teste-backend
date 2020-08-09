'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('vehicles', 'brand_id_fk', {
            type: Sequelize.INTEGER,
            references: { model: 'brands', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        });
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn('vehicles', 'brand_id_fk');
    },
};
