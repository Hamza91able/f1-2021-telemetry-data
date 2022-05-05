import React from "react";

import "./speed.css";

export default function Speed({ speed, rpm }) {
  return (
    <div className="gauge-wrapper">
      <div className="gauge four rischio3">
        <div className="slice-colors">
          <div className="st slice-item" />
          <div className="st slice-item" />
          <div className="st slice-item" />
          <div className="st slice-item" />
        </div>
        <div
          className="needle"
          style={{
            transform: `rotate(${(speed || 0) * 0.5}deg)`,
          }}
        />
        <div className="gauge-center">
          <div className="label">{rpm}</div>
          <div className="number">{speed || 0}</div>
        </div>
      </div>
    </div>
  );
}
