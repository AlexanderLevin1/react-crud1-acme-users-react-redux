// BACKEND (in server.js)

//1. Require
const express = require('express');
const path = require('path');
const app = express();

app.use(require('body-parser').json());

//2. dist
app.use('/dist', express.static(path.join(__dirname, 'dist')));

//3. sendFile
app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

//4. getUsers, create user, update user, delete user
app.get('/api/users', (req, res, next)=> {
  User.findAll()
    .then( users => res.send(users))
    .catch(next);
});

app.post('/api/users', (req, res, next)=> {
    User.create(req.body)
      .then( user => res.send(user))
      .catch(next);
  });

app.put('/api/users/:id', (req, res, next)=> {
  User.findById(req.params.id)
    .then( user => {
      Object.assign(user, req.body)
      return user.save();
    })
    .then( user => res.send(user))
    .catch(next);
});

app.delete('/api/users/:id', (req, res, next)=> {
  User.findById(req.params.id)
    .then( user => {
      return user.destroy();
    })
    .then( () => res.sendStatus(204))
    .catch(next);
});

//5. Port, sequelize, model & sync and seed
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}`));

const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/crud_db');

const User = conn.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

conn.sync({ force: true })
  .then( ()=> Promise.all([
    User.create({ name: 'moe' }),
    User.create({ name: 'larry' }),
  ]));