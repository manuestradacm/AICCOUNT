const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Configuración de conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/miBaseDePrueba', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conexión a MongoDB exitosa');
}).catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
});

// Ruta de ejemplo
app.get('/', (req, res) => {
    res.send('¡Servidor funcionando y conectado a MongoDB!');
});

// Inicia el servidor
app.get('/crear-usuario', async (req, res) => {
    try {
        const nuevoUsuario = new Usuario({ nombre: 'Ana', edad: 25 });
        await nuevoUsuario.save();
        res.send('Usuario creado: ' + JSON.stringify(nuevoUsuario));
    } catch (error) {
        res.status(500).send('Error al crear usuario: ' + error.message);
    }
});
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.send(usuarios);
    } catch (error) {
        res.status(500).send('Error al obtener usuarios: ' + error.message);
    }
});
app.get('/actualizar-usuario', async (req, res) => {
    try {
        const usuarioActualizado = await Usuario.findOneAndUpdate(
            { nombre: 'Ana' }, // Criterio de búsqueda
            { edad: 30 },      // Nuevos datos
            { new: true }      // Devuelve el documento actualizado
        );
        res.send('Usuario actualizado: ' + JSON.stringify(usuarioActualizado));
    } catch (error) {
        res.status(500).send('Error al actualizar usuario: ' + error.message);
    }
});
app.get('/eliminar-usuario', async (req, res) => {
    try {
        const usuarioEliminado = await Usuario.findOneAndDelete({ nombre: 'Ana' }); // Criterio de búsqueda
        if (!usuarioEliminado) {
            res.send('No se encontró el usuario para eliminar.');
        } else {
            res.send('Usuario eliminado: ' + JSON.stringify(usuarioEliminado));
        }
    } catch (error) {
        res.status(500).send('Error al eliminar usuario: ' + error.message);
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
// Definición del esquema y modelo de datos
const Usuario = mongoose.model('Usuario', {
    nombre: String,
    edad: Number,
});
