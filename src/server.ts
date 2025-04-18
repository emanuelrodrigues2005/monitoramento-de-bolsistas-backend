import express from 'express';
import router from './routes';

const app = express();

app.use(express.json());
app.use(router);

app.listen(8080, () => {
    console.log('Server running on port 8080');
});
