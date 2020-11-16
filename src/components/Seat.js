import React from "react";
import styled from "styled-components";
import seatAvailable from "../assets/seat-available.svg";
import Tippy from "@tippyjs/react";
import { BookingContext } from "./BookingContext";

export const Seat = ({
  seatId,
  rowIndex,
  seatIndex,
  width,
  height,
  price,
  status,
}) => {
  const {
    // state: { numOfRows, seatsPerRow, hasLoaded, seats },
    actions: { beginBookingProcess },
  } = React.useContext(BookingContext);
  return (
    <button
      onClick={() => {
        beginBookingProcess({ selectedSeatId: seatId, price: price });
      }}
    >
      <Tippy
        content={
          <span>
            Row {rowIndex}, Seat {seatIndex + 1} - ${price}
          </span>
        }
      >
        <StyledSeat alt="seats" src={seatAvailable} status={status} />
      </Tippy>
    </button>
  );
};

const SeatWrapper = styled.div`
  padding: 5px;
`;

const StyledSeat = styled.img`
  filter: ${(props) => (props.status ? `grayscale(100%)` : ``)};
`;
