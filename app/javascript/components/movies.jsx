import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function MovieTable() {
    const [movies, setMovies] = useState([]);
    const history = useHistory();

    useEffect(async () => {
        await fetchMovies();
    }, []);

    const fetchMovies = async () => {
        const url = "/api/v1/movies";

        try {
            const response = await fetch(url);
            const json = await response.json();
            setMovies(json);
        } catch (error) {
            console.log("error", error);
        }
    }

    const deleteMovie = (id) => async () => {
        try {
            const response = await fetch(`/api/v1/movies/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
    
            if (response.status === 200) {
                fetchMovies();
            }
        }
        catch(error) {
            console.log(error);
        }
    }

  return (
      <Container>
        <Typography variant='h1' align='center'>List of movies</Typography>
        <Box>
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="right">Year</TableCell>
                    <TableCell align="right">Genre</TableCell>
                    <TableCell align="right">Summary</TableCell>
                    <TableCell align="right">IMDB link</TableCell>
                    <TableCell align="center">Action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {movies.map((movie) => (
                    <TableRow key={movie.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">{movie.title}</TableCell>
                    <TableCell align="right">{movie.year}</TableCell>
                    <TableCell align="right">{movie.genre}</TableCell>
                    <TableCell align="right">{movie.summary}</TableCell>
                    <TableCell align="right">{movie.imdb_link}</TableCell>
                    <TableCell align="right">
                        <Stack>
                            <IconButton color="secondary" aria-label="edit" onClick={() => history.push(`/movie/${movie.id}`)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete" onClick={deleteMovie(movie.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Stack>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Box>
        <br />
        <br />
        <Button onClick={() => history.push('/movie')} variant="contained">Add movie</Button>
        <br />
        <br />
        <Link to="/">Home</Link>
    </Container>
  );
}