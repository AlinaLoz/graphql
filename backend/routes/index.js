module.exports = function (app) {
  app.get('/api/v1.0/login', require('./login').get);
  app.post('/api/v1.0/register', require('./register').post);

  app.use(require('../middleware/tokenChecker'));

  app.get('/api/v1.0/secure', (req,res) => {
    // all secured routes goes here
    res.send('I am secured...')
  });


  app.get('/api/v1.0/team/board', require('./board').get);
  app.get('/api/v1.0/user/check', require('./user').get);
};