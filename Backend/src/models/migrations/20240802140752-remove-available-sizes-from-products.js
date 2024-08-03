'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop the `availableSizes` column from the `products` table
    await queryInterface.removeColumn('products', 'availableSizes'); // Adjust table name to match your actual table
  },

  down: async (queryInterface, Sequelize) => {
    // Re-add the `availableSizes` column in case of rollback
    await queryInterface.addColumn('products', 'availableSizes', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
      validate: {
        isIn: [['S', 'M', 'L', 'XL', 'XXL']] // Adjust validation as needed
      }
    });
  }
};
