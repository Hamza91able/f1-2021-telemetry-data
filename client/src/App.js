import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Dash from "./Components/Dash/Dash";
import Speed from "./Components/Speed/Speed";

function App() {
  const [socket, setSocket] = useState(null);
  const [telData, setTelData] = useState({});
  const [lapData, setLapData] = useState({});
  const [carData, setCarData] = useState({});

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:4000`);
    setSocket(newSocket);
    newSocket.on("car_tel", (data) => {
      setTelData(data);
    });
    newSocket.on("lap_data", (data) => {
      setLapData(data);
    });
    newSocket.on("car_data", (data) => {
      console.log("recieve car_data data: ", data);
      setCarData(data);
    });
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div style={{ maxHeight: "100vh", height: "100vh" }}>
      <Dash tel_data={telData} lapData={lapData} carData={carData} />
    </div>
  );
}

export default App;
