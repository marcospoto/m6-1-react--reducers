import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import { SeatContext } from "./SeatContext";
import { Seat } from "./Seat";

const TicketWidget = () => {
  // TODO: use values from Context
  const {
    state: { numOfRows, seatsPerRow, hasLoaded, seats },
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  React.useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())
      .then((data) => receiveSeatInfoFromServer(data));
  }, []);

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag

  if (hasLoaded === false) return <CircularProgress />;

  console.log(seats);

  return (
    <Wrapper>
      {range(numOfRows).map((rowIndex) => {
        const rowName = getRowName(rowIndex);
        return (
          <Row key={rowIndex}>
            <RowLabel>Row {rowName}</RowLabel>
            {range(seatsPerRow).map((seatIndex) => {
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
              const seat = seats[seatId];

              return (
                <SeatWrapper key={seatIndex}>
                  <Seat
                    seatId={seatId}
                    rowIndex={rowName}
                    seatIndex={seatIndex}
                    width={36}
                    height={36}
                    price={seat.price}
                    status={seat.isBooked}
                  />
                </SeatWrapper>
              );
            })}
          </Row>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`;
const SeatWrapper = styled.div`
  padding: 5px;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
`;

export default TicketWidget;
