const { Client } = require("pg");
const client = new Client({
  connectionString: "postgresql://localhost/fishes-app"
});

client.connect();

module.exports = client;
