import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [summary, setSummary] = useState('');
  const [imdbLink, setImdbLink] = useState('');
  const history = useHistory();
  const urlParams = useParams();

  const resetForm = () => {
    setTitle('');
    setGenre('');
    setSummary('');
    setYear('');
    setImdbLink('');
  }

  useEffect(async () => {
    if (urlParams.id) {
      const movie = await fetchMovie();
      setTitle(movie.title);
      setYear(movie.year);
      setGenre(movie.genre);
      setSummary(movie.summary);
      setImdbLink(movie.imdb_link);
    }
  }, [])

  const fetchMovie = async () => {
    const response = await fetch(`/api/v1/movies/${urlParams.id}`)
    return await response.json();
  }

  const editMovie = async () => {
    try {
      const response = await fetch(`/api/v1/movies/${urlParams.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({movie: {title, year, summary, genre, imdb_link: imdbLink} })
      });

      const json = await response.json();
      history.push('/movies')
    }
    catch(error) {
        console.log(error);
    }
  }

  const createMovie = async () => {
    try {
      const response = await fetch('/api/v1/movies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({movie: {title, year, summary, genre, imdb_link: imdbLink} })
      });

      const json = await response.json();
      history.push('/movies')
    }
    catch(error) {
        console.log(error);
    }
  }

  const showResetButton = () => {
    if (urlParams.id) return null;
    return <Button onClick={resetForm} variant="contained">Reset</Button>;
  }

  const showSaveButton = () => {
    const saveButtonText = urlParams.id ? 'Save' : 'Create';
    const saveButtonFunction = urlParams.id ? editMovie : createMovie;

    return <Button onClick={saveButtonFunction} variant="contained">{saveButtonText}</Button>;
  }

  return (
    <Container>
      <Typography variant='h1' align='center'>Add movie</Typography>

      <Box>
        <TextField value={title} label="Title" fullWidth onChange={e => setTitle(e.target.value)} />
        <br />
        <br />
        <TextField value={year} label="Year" fullWidth onChange={e => setYear(e.target.value)} />
        <br />
        <br />
        <TextField value={genre} label="Genre" fullWidth onChange={e => setGenre(e.target.value)} />
        <br />
        <br />
        <TextField value={summary} label="Summary" fullWidth onChange={e => setSummary(e.target.value)} />
        <br />
        <br />
        <TextField value={imdbLink} label="IMDB link" fullWidth onChange={e => setImdbLink(e.target.value)} />
      </Box>
      <br />
      <br />
      {showSaveButton()}
      <br />
      <br />
      {showResetButton()}
      <br />
      <br />
      <Link to="/movies">Back to Movies</Link>
    </Container>
  );
}