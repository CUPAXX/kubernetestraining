const { connect, StringCodec } = require("nats");

let nc;
const sc = StringCodec();

async function getNats() {
  if (!nc) {
    nc = await connect({
      servers:
        process.env.NATS_URL || "nats://my-nats.default.svc.cluster.local:4222",
    });
    console.log("Connected to NATS");
  }
  return nc;
}

async function publish(subject, payload) {
  const nats = await getNats();
  nats.publish(subject, sc.encode(JSON.stringify(payload)));
}

module.exports = { publish };
