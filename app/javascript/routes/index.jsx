import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/home";
import Movies from "../components/movies";
import Seats from "../components/seats";
import Movie from "../components/movie";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/movies" exact component={Movies} />
      <Route path="/movie" exact component={Movie} />
      <Route path="/movie/:id" exact component={Movie} />
      <Route path="/seats" exact component={Seats} />
    </Switch>
  </Router>
);