// Importamos los módulos necesarios
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json()); // Permite leer el cuerpo (body) de peticiones POST en formato JSON

// Cargamos los datos desde el archivo
let usuarios = require('./24-taller-04-datos.json');


// PUNTO 1: Obtener usuarios por hobby
// Ejemplo: GET http://localhost:3000/users/hobby?hobby=leer
app.get('/users/hobby', (req, res) => {
  const { hobby } = req.query;
  const resultado = usuarios.filter(user => user.hobbies.includes(hobby));
  res.json(resultado);
});


// PUNTO 2: Verificar si existe un usuario con cierto código
// Ejemplo: GET http://localhost:3000/users/exists?codigo=123
app.get('/users/exists', (req, res) => {
  const { codigo } = req.query;
  const existe = usuarios.some(user => user.codigo === codigo);
  res.json({ existe });
});


// PUNTO 3: Contar cuántos usuarios tienen cierto hobby
// Ejemplo: GET http://localhost:3000/users/hobby/count?hobby=correr
app.get('/users/hobby/count', (req, res) => {
  const { hobby } = req.query;
  const cantidad = usuarios.filter(user => user.hobbies.includes(hobby)).length;
  res.json({ cantidad });
});


// PUNTO 4: Obtener usuarios con menos de 3 hobbies
// Ejemplo: GET http://localhost:3000/users/is-free
app.get('/users/is-free', (req, res) => {
  const libres = usuarios.filter(user => user.hobbies.length < 3);
  res.json(libres);
});


// PUNTO 5: Sugerir un nuevo hobby a un usuario y guardar el cambio
// Ejemplo: POST http://localhost:3000/users/suggest
// Body (JSON):
// {
//   "codigo": "123",
//   "hobby": "bailar"
// }
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


// PUNTO 6: Agregar un nuevo usuario y guardar en archivo
// Ejemplo: POST http://localhost:3000/users
// Body (JSON):
// {
//   "codigo": "999",
//   "nombre": "Juan",
//   "apellido": "Pérez",
//   "hobbies": ["fútbol", "leer"]
// }
app.post('/users', (req, res) => {
  const nuevo = req.body;

  // Validar que tenga los campos necesarios
  if (!nuevo.codigo || !nuevo.nombre || !nuevo.apellido || !Array.isArray(nuevo.hobbies) || nuevo.hobbies.length < 2) {
    return res.status(400).json({ error: "Datos incompletos o inválidos" });
  }

  // Validar que no se repita el código
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


// Arrancamos el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
