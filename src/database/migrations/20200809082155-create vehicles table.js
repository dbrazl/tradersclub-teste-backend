'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('vehicles', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },

            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            model: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },

            brand: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            year: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            color: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            km: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            price: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },

            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },

            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('vehicles');
    },
};
