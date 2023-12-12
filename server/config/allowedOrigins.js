const allowedOrigins = [
    process.env.URL_CLIENT,
    "http://localhost:3000",
    "192.168.100.16:3000"
];

module.exports = allowedOrigins;
