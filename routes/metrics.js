const Prometheus = require('prom-client');

var metricsGetsCounter = new Prometheus.Counter({
    name: 'metrics_endpoint_get_requests',
    help: 'number of metrics GET requests'
});

module.exports = function(app,q) {

    app.get('/metrics', (req, res) => {
        
        metricsGetsCounter.inc()

        res.set('Content-Type', Prometheus.register.contentType);
        res.end(Prometheus.register.metrics());
    });
}