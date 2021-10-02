import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

function Job({ job }) {

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Card.Title>
              {job.title} -{" "}
              <span className="text-muted font-weight-light">
                {job.company}
              </span>
            </Card.Title>
            <Card.Subtitle className="text-muted mb-2">
              {new Date(job.created_at).toLocaleDateString()}
            </Card.Subtitle>
            <Badge variant="secondary" className="mr-2">
              {job.type}
            </Badge>
            <Badge variant="secondary">{job.location}</Badge>
            <div style={{ wordBreak: "break-all" }}>
              <ReactMarkdown source={job.how_to_apply} />
            </div>
          </div>
          <img
            className="d-none d-md-block"
            height="50"
            alt={job.company}
            src={job.company_logo}
          />
        </div>
        <Card.Text>
          <Link to={`/viewDetails/${job.id}`}>
            <Button variant="primary">View Details</Button>
          </Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

Job.propTypes = {
  job: propTypes.shape({
    title: propTypes.string.isRequired,
    company: propTypes.string.isRequired,
    created_at: propTypes.any.isRequired,
    location: propTypes.string,
    how_to_apply: propTypes.any,
    company_logo: propTypes.string,
    id:propTypes.number,
  }),
};


export default Job

