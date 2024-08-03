'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // The name of the referenced table
          key: 'id'
        }
      },
      totalPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      totalItems: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      totalQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cancellable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      status: {
        type: Sequelize.ENUM('pending', 'completed', 'canceled'),
        defaultValue: 'pending'
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};
