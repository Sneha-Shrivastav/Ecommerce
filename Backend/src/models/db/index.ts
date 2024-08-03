import sequelize from '../db';
import User from './users';


import './associations'; 

const initializeDatabase = async () => {
    try {
        await sequelize.sync({ force: false }); 
        console.log('Database & tables created!');
    } catch (error) {
        console.error('Unable to create the database:', error);
    }
};

initializeDatabase();

export { sequelize, User };
