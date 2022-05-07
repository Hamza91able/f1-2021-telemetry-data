import React from "react";

import { Alert, Container, Grid, Typography } from "@mui/material";
import LinearWithValueLabel from "../Progress/Progress";
import { formatTime } from "../../Helpers";

const fontSize = 50;
const marginTop = 34;

const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function Dash({ tel_data, lapData, carData }) {
  return (
    <>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={4} style={{ marginTop: marginTop, ...center }}>
            <Typography style={{ fontSize: fontSize }}>
              L{lapData?.m_currentLapNum}
              <br />-
            </Typography>
            <Typography style={{ marginLeft: 30, fontSize: fontSize }}>
              P{lapData?.m_gridPosition}
              <br />-
            </Typography>
          </Grid>
          <Grid item xs={4} style={{ ...center }}>
            <div>
              <Typography
                style={{
                  fontSize: 110,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {tel_data?.m_gear === 0
                  ? "N"
                  : tel_data?.m_gear === -1
                  ? "R"
                  : tel_data?.m_gear}
              </Typography>
              <Typography
                style={{ fontSize: 32, marginTop: -47, textAlign: "center" }}
              >
                -:--.---
              </Typography>
            </div>
          </Grid>
          <Grid item xs={4} style={{ marginTop: marginTop, ...center }}>
            <Typography style={{ fontSize: fontSize }}>
              {tel_data?.m_speed || 0} KPH
              <br />
              {lapData?.m_currentLapTimeInMS / 1000 > 60
                ? formatTime(lapData?.m_currentLapTimeInMS)
                : (lapData?.m_currentLapTimeInMS / 1000).toFixed(3)}
            </Typography>
          </Grid>
        </Grid>
        {/* <Grid container>
          <Grid item xs={12} style={{ ...center }}>
            <Alert
              severity={
                carData?.m_drsAllowed === 0 &&
                carData?.m_drsActivationDistance === 0
                  ? "success"
                  : carData?.m_drsAllowed === 0
                  ? "info"
                  : "warning"
              }
              variant="filled"
              icon={false}
              style={{
                ...center,
                fontSize: 16,
                fontWeight: "bold",
                color: "white",
                width: "40%",
              }}
            >
              {carData?.m_drsAllowed === 0 &&
              carData?.m_drsActivationDistance === 0
                ? "ENABLED"
                : carData?.m_drsAllowed === 0
                ? "NO"
                : "AVAILABLE"}
            </Alert>
          </Grid>
        </Grid> */}
        <Grid container style={{ marginTop: 10 }}>
          <Grid item xs={12} style={{ ...center }}>
            <Alert
              severity={carData?.m_ersDeployMode === 1 ? "warning" : "success"}
              variant="filled"
              icon={false}
              style={{
                ...center,
                fontSize: 16,
                fontWeight: "bold",
                color: "white",
                width: "70%",
              }}
            >
              {carData?.m_ersDeployMode === 1 ? "OVERTAKE" : "DISABLE"}
            </Alert>
          </Grid>
        </Grid>
        <Container maxWidth="md">
          <Grid container style={{ marginTop: 30 }}>
            <Grid item xs={12}>
              {/* TOTAL ERS */}
              <LinearWithValueLabel
                value={carData?.m_ersStoreEnergy}
                bar={carData?.m_ersDeployedThisLap}
              />
            </Grid>
            <Grid item xs={6}>
              {/* ERS USED THIS LAP */}
              <LinearWithValueLabel
                value={4000000 - carData?.m_ersDeployedThisLap}
                bar={4000000 - carData?.m_ersDeployedThisLap}
              />
            </Grid>
            <Grid item xs={6}>
              {/* ERS HARVESTED THIS LAP */}
              <LinearWithValueLabel
                value={
                  carData?.m_ersHarvestedThisLapMGUH +
                  carData?.m_ersHarvestedThisLapMGUK
                }
                bar={
                  carData?.m_ersHarvestedThisLapMGUH +
                  carData?.m_ersHarvestedThisLapMGUK
                }
              />
            </Grid>
          </Grid>
        </Container>
      </Container>
    </>
  );
}
