var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
  app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('users').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });
  app.post('/user', (req, res) => {
    // Здесь будем создавать заметку.
    const user = { username: req.body.username, email: req.body.email };
    db.collection('users').insert(user, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
  app.delete('/user/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('users').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('user ' + id + ' deleted!');
      } 
    });
  });
  app.put ('/user/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const user = { username: req.body.username, email: req.body.email };
    db.collection('users').update(details, user, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(user);
      } 
    });
  });
};