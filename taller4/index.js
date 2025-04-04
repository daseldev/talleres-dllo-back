const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

let usuarios = require('./24-taller-04-datos.json');

// Punto 1: /users/hobby
app.get('/users/hobby', (req, res) => {
  const { hobby } = req.query;
  const resultado = usuarios.filter(user => user.hobbies.includes(hobby));
  res.json(resultado);
});

// Punto 2: /users/exists
app.get('/users/exists', (req, res) => {
  const { codigo } = req.query;
  const existe = usuarios.some(user => user.codigo === codigo);
  res.json({ existe });
});

// Punto 3: /users/hobby/count
app.get('/users/hobby/count', (req, res) => {
  const { hobby } = req.query;
  const cantidad = usuarios.filter(user => user.hobbies.includes(hobby)).length;
  res.json({ cantidad });
});

// Punto 4: /users/is-free
app.get('/users/is-free', (req, res) => {
  const libres = usuarios.filter(user => user.hobbies.length < 3);
  res.json(libres);
});

// Punto 5: /users/suggest
// Punto 5: /users/suggest con guardado en el archivo
app.post('/users/suggest', (req, res) => {
  const { codigo, hobby } = req.body;
  const user = usuarios.find(u => u.codigo === codigo);
  
  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  if (user.hobbies.length >= 3) {
    return res.json({ mensaje: "El usuario ya tiene 3 hobbies. No se agregó." });
  }

  user.hobbies.push(hobby);

  // Guardar los datos actualizados en el archivo
  fs.writeFile(
    path.join(__dirname, '24-taller-04-datos.json'),
    JSON.stringify(usuarios, null, 2),
    (err) => {
      if (err) {
        return res.status(500).json({ error: "No se pudo guardar el cambio" });
      }

      res.json({ mensaje: "Hobby agregado", usuario: user });
    }
  );
});

// Punto 6: /users con guardado en archivo
app.post('/users', (req, res) => {
  const nuevo = req.body;

  if (!nuevo.codigo || !nuevo.nombre || !nuevo.apellido || !Array.isArray(nuevo.hobbies) || nuevo.hobbies.length < 2) {
    return res.status(400).json({ error: "Datos incompletos o inválidos" });
  }

  if (usuarios.some(u => u.codigo === nuevo.codigo)) {
    return res.status(400).json({ error: "El código ya existe" });
  }

  usuarios.push(nuevo);

  // Guardar en el archivo
  fs.writeFile(
    path.join(__dirname, '24-taller-04-datos.json'),
    JSON.stringify(usuarios, null, 2),
    (err) => {
      if (err) {
        return res.status(500).json({ error: "No se pudo guardar el nuevo usuario" });
      }

      res.status(201).json({ mensaje: "Usuario agregado y guardado", usuario: nuevo });
    }
  );
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
