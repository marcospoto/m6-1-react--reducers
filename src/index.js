import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import { SeatProvider } from "../src/components/SeatContext";
import { BookingProvider } from "../src/components/BookingContext";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <BookingProvider>
    <SeatProvider>
      <App />
    </SeatProvider>
  </BookingProvider>,
  rootElement
);
