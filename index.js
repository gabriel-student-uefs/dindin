import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static('frontend/dist'));

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/api/dindin/:id', (req, res) => {
    const id = req.params.id;
    const dindin = getDindinById(id);
    if (!dindin) {
        res.status(404).send({error: `Dindin ${id} not found`});
    } else {
        res.send({data: dindin});
    }
});

function getDindinById(id) {
    const dindins = [
        {id: 1, name: 'Dindin 1'},
        {id: 2, name: 'Dindin 2'},
        {id: 3, name: 'Dindin 3'},
    ];

    return dindins.find(dindin => dindin.id === parseInt(id));
}

// Catch-all route to serve index.html for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend/dist', 'index.html'));
});