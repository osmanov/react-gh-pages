import React from "react";
import Signal from "./components/Signal";
import Cursor from "./components/Cursor";
import logo from "./logo.svg";
import "./App.css";
const dataset = {
  signals: [
    {
      name: "Right Rear Turn Signal",
      values: [
        {
          type: "data",
          from_ts: 1561631363959,
          to_ts: 1561631366354,
          value: "Ok"
        },
        {
          type: "data",
          from_ts: 1561631366354,
          to_ts: 1561631370186,
          value: "Warning"
        },
        {
          type: "no_signal",
          from_ts: 1561631370186,
          to_ts: 1561631373539
        },
        {
          type: "data",
          from_ts: 1561631373539,
          to_ts: 1561631374018,
          value: "Fail"
        }
      ]
    },
    {
      name: "Steering & Brakes",
      values: [
        {
          type: "data",
          from_ts: 1561631363959,
          to_ts: 1561631370186,
          value: "Ok"
        },
        {
          type: "data",
          from_ts: 1561631370186,
          to_ts: 1561631373539,
          value: "Warning"
        },
        {
          type: "no_signal",
          from_ts: 1561631373539,
          to_ts: 1561631374018
        }
      ]
    }
  ]
};
function App() {
  return (
    <>
      <Cursor signals={dataset.signals} />
      <div style={{ position: "relative" }}>
        {dataset.signals.map((signal, index) => {
          return (
            <Signal
              key={signal.name}
              className={`signal_${index}`}
              {...signal}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
