const Prometheus = require('prom-client');
    
var exampleGetsCounter = new Prometheus.Counter({
    name: 'example_endpoint_get_requests',
    help: 'number of example GET requests'
});

var examplePostsCounter = new Prometheus.Counter({
  name: 'example_endpoint_post_requests',
  help: 'number of example POSTrequests'
});


module.exports = function(app) {
    app.get('/example', function(req, res) {

      exampleGetsCounter.inc()

      res.status(200)
         .set({"Content-Type": "text/plain"})
         .send('hey!\n')
    })

    app.post('/example', (req, res) => {

      let output = {
        'query': req.query,
        'payload': req.body
      }

      examplePostsCounter.inc()

      res.status(200)
         .set({"Content-Type": "application/json; charset=utf-8"})
         .send(output)
    })

  }
