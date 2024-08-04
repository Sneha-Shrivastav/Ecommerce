import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import sequelize from './models/db';
import './models/db/users';
import './models/db/products';
import './models/db/cart';
import './models/db/cartItems';
import './models/db/associations';
import authRoutes from './routes/route';
import cors from 'cors';
import * as dotenv from 'dotenv'

dotenv.config({
    path: ".env"
});

const app: Application = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../../frontend')));



app.use('/api', authRoutes);

app.get('/health', async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({ message: "ok" });
});

const port = process.env.PORT || 3000;

app.get('/api/config', (req: Request, res: Response) => {
    res.json({ apiUrl: `http://localhost:${port}` });
});

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    } catch (error: any) {
        console.error('Unable to connect to the database:', error.message);
    }
};

startServer();
