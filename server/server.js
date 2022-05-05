const {
  F1TelemetryClient,
  constants,
} = require("@racehub-io/f1-telemetry-client");
const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);
const socketio = require("socket.io");

var io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A USER CONNECTED");
});

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

server.listen(4000, () => {
  console.log("listening on *:4000");
});

const { PACKETS } = constants;

/*
 *   'port' is optional, defaults to 20777
 *   'bigintEnabled' is optional, setting it to false makes the parser skip bigint values,
 *                   defaults to true
 *   'forwardAddresses' is optional, it's an array of Address objects to forward unparsed telemetry to. each address object is comprised of a port and an optional ip address
 *                   defaults to undefined
 *   'skipParsing' is optional, setting it to true will make the client not parse and emit content. You can consume telemetry data using forwardAddresses instead.
 *                   defaults to false
 */
const client = new F1TelemetryClient({ port: 20777 });
// client.on(PACKETS.event, console.log);
// client.on(PACKETS.motion, console.log);
// client.on(PACKETS.carSetups, console.log);
client.on(PACKETS.lapData, (data) => sendLapData(data));
// client.on(PACKETS.session, console.log);
// client.on(PACKETS.participants, console.log);
client.on(PACKETS.carTelemetry, (data) => sendCarTel(data));
client.on(PACKETS.carStatus, (data) => sendCarData(data));
// client.on(PACKETS.finalClassification, console.log);
// client.on(PACKETS.lobbyInfo, console.log);
// client.on(PACKETS.carDamage, console.log);
// client.on(PACKETS.sessionHistory, console.log);

// to start listening:
client.start();

// and when you want to stop:
// client.stop();

const sendCarTel = (data) => {
  const car_index = data?.m_header?.m_playerCarIndex;
  const my_data = data?.m_carTelemetryData[car_index];

  io.local.emit("car_tel", my_data);
};

const sendLapData = (data) => {
  const car_index = data?.m_header?.m_playerCarIndex;
  const my_data = data?.m_lapData[car_index];

  io.local.emit("lap_data", my_data);
};

const sendCarData = (data) => {
  const car_index = data?.m_header?.m_playerCarIndex;
  const my_data = data?.m_carStatusData[car_index];

  io.local.emit("car_data", my_data);
};
