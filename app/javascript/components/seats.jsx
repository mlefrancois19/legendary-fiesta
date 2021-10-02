import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";

export default function Seats() {
  const [bestSeats, setBestSeats] = useState([]);
  const [seatMap, setSeatMap] = useState('');
  const [nbSeat, setNbSeat] = useState('');

  const findBestSeat = async () => {
    try {
        const response = await fetch('/api/v1/seats', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({seat: {seat_map: seatMap, nb: nbSeat} })
        });

        const json = await response.json();
        setBestSeats(json.result)
    }
    catch(error) {
        console.log(error);
    }
  }

  const showResult = () => {
    if (bestSeats.length > 0) {
      return (
        <Box>
          <Typography variant="h3">List of seats</Typography>
          <ul>
            {bestSeats.map((bestSeat) => <li><p>{bestSeat.id}</p></li>)}
          </ul>
        </Box>
      );
    }
    return null;
  }

  const resetForm = () => {
    setBestSeats([]);
    setNbSeat('');
    setSeatMap('');
  } 

  return (
      <Container>
        <Typography variant='h1' align='center'>Find a seat</Typography>
        <Box>
            <TextareaAutosize
              minRows={3}
              placeholder="Seats input"
              style={{ width: '100%', height: 300 }}
              value={seatMap}
              onChange={e => setSeatMap(e.target.value)}
            />
        </Box>
        <Box>
            <TextField 
                value={nbSeat}
                label="Nb Seats"
                fullWidth
                onChange={e => setNbSeat(e.target.value)}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
        </Box>

        { showResult() }
        <Button onClick={findBestSeat} variant="contained" disabled={!nbSeat || !seatMap}>Find a seat</Button>
        <br />
        <br />
        <Button onClick={resetForm} variant="contained" disabled={bestSeats.length === 0}>Reset</Button>
        <br />
        <br />
        <br />
        <Link to="/">Home</Link>
    </Container>
  );
}