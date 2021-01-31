import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import JobListing from "./JobListing";
import JobDetails from "./JobDetails";

function App() {
  return (
    <BrowserRouter>
      <Container className="my-4">
        <Switch>
          <Route path="/" exact component={JobListing} />
          <Route path="/viewDetails/:id" exact component={JobDetails} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
