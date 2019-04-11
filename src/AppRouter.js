import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import NotePage from "./views/NotePage";
import HomePage from "./views/HomePage";

export default class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={routeResolver.homePage} />
          <Route path="/note/:id" component={routeResolver.noteDetailPage} />
          <Route component={routeResolver.notFoundPage} />
        </Switch>
      </Router>
    );
  }
}

const routeResolver = {
  homePage: () => (<HomePage/>),
  noteDetailPage: ({ match }) => {
    const noteId = match.params.id;
    return noteId ? (<NotePage noteId={noteId}/>) : (<Link to="/">Back to Home</Link>)
  },
  notFoundPage: () => (<h2>404</h2>)
};
