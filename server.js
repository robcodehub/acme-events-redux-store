const faker = require('faker');
faker.locale = 'en_US';
const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_event_store_db');
const Event = conn.define('event', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

Event.createRandom = function(){ return Event.create({ name: `${faker.lorem.sentences(1)} - ${faker.address.state()}`, date: faker.date.future() }); }

conn.sync({ force: true })
  .then(()=> {
    const events = [];
    while(events.length < 10){
      events.push(Event.createRandom());
    }
    return Promise.all(events);
  });

const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.listen(port);

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/events', (req, res, next)=> {
  Event.findAll()
    .then(events => res.send(events))
    .catch(next);
});

app.post('/api/events', (req, res, next)=> {
  Event.createRandom()
    .then(_event => res.status(201).send(_event))
    .catch(next);
});

app.delete('/api/events/:id', (req, res, next)=> {
  Event.findByPk(req.params.id)
    .then(_event => _event.destroy())
    .then(()=> res.sendStatus(204))
    .catch(next);
});
