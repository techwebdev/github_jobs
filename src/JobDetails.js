import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import ReactMarkdown from "react-markdown";
import { useFetchSingleJobs } from "./useFetchJobs";

function JobDetails({ match }) {
  const { job, loading, error } = useFetchSingleJobs(match.params.id);
  return (
    <>
      <Card className="mb-3">
        {loading && <h1>Loading...</h1>}
        {error && <h1>Error. Try Refreshing.</h1>}
        {job && !loading && (
          <Card.Body>
            <div>
              <Link to="/">
                <Button variant="primary">Back to Home</Button>
              </Link>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <Card.Title>
                  {job.title} -{" "}
                  <span className="text-muted font-weight-light">
                    {job.company}
                  </span>
                </Card.Title>
                <Card.Subtitle className="text-muted mb-2">
                  {job &&
                    job.created_at &&
                    new Date(job.created_at).toLocaleDateString()}
                </Card.Subtitle>
                <Badge variant="secondary" className="mr-2">
                  {job.type}
                </Badge>
                <Badge variant="secondary">{job.location}</Badge>
              </div>
              <img
                className="d-none d-md-block"
                height="50"
                alt={job.company}
                src={job.company_logo}
              />
            </div>
            <Card.Text>
              <div className="mt-4">
                <ReactMarkdown source={job.description} />
              </div>
              <div style={{ wordBreak: "break-all" }}>
                <ReactMarkdown source={job.how_to_apply} />
              </div>
            </Card.Text>
          </Card.Body>
        )}
      </Card>
    </>
  );
}

export default JobDetails;
