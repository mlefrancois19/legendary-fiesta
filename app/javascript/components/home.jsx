import React from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

export default () => (
  <Container>
    <Typography variant='h1' align='center'>Movies app</Typography>
    <Typography variant='h3' align='center'>Manage your next outing</Typography>
    <hr className="my-4" />
    <Link to="/movies" className="btn btn-lg custom-button" role="button">View Movies</Link>
    <hr className="my-4" />
    <Link to="/seats" className="btn btn-lg custom-button" role="button">Find a seat</Link>
  </Container>
);