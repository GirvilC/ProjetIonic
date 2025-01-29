const express = require('express');
const cors = require('cors');

const app = express();
const port = 3500;

app.use(express.json());
app.use(cors());

//Données de base
let tasks = [
    { id: 1, label: "Développer", description: "Il faut développer", status: "OnGoing", limitDate: "2025-01-31" },
    { id: 2, label: "Tester", description: "Il faut tester", status: "OnGoing", limitDate: "2025-02-01" }
];

//Get All
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

//Get by Id
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    task ? res.json(task) : res.status(404).json({ message: "Tâche non trouvé ou inexistante" });
});

//Set
app.post('/tasks', (req, res) => {
    const newTask = { id: tasks.length + 1, ...req.body };
    tasks.push(newTask);
    console.log(tasks);
    res.status(201).json(newTask);
});

//Update
app.put('/tasks/:id', (req, res) => {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    console.log(req.params.id);
    if(index !== -1) {
        tasks[index] = { ...tasks[index], ...req.body };
        res.json(tasks[index]);
    } else {
        res.status(404).json({ message: "Tâche non trouvée ou inexistante"});
    }
});

//Delete
app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    res.json({ message: "Tâche supprimée avec succès" });
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});