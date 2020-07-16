const keys = require('./keys');
const redis = require("redis");
const { redisHost, redisPort } = keys;
const redisClient = redis.createClient({
    host: redisHost,
    port: redisPort,
    retry_strategy: () => 1000
});
const sub = redisClient.duplicate();

function fib(index) {
    if(index < 2) return 1;
    return fib(index - 1) + fib(index - 2);
}

sub.on('message', (channel, i) => {
    redisClient.hset('values', i, fib(parseInt(i)));
})
sub.subscribe('insert');
