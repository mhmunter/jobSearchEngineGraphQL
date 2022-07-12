import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";

import Auth from "../utils/auth";
import { removeJobId } from "../utils/localStorage";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_JOB } from "../utils/mutations";
import { Link } from 'react-router-dom';

const SavedJobs = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeJob] = useMutation(REMOVE_JOB);
  const userData = data?.me || [];

  // create function that accepts the job's mongo _id value as param and deletes the job from the database
  const handleDeleteJob = async (jobId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeJob({
        variables: { jobId },
      });
      removeJobId(jobId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved jobs!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedJobs.length
            ? `Viewing ${userData.savedJobs.length} saved ${
                userData.savedJobs.length === 1 ? "job" : "jobs"
              }:`
            : "You have no saved jobs!"}
        </h2>
        <CardColumns>
          {userData.savedJobs.map((job) => {
            return (
              <Card key={job.jobId} border="dark">
                {/* {job.image ? (
                  <Card.Img
                    src={job.image}
                    alt={`The cover for ${job.title}`}
                    variant="top"
                  />
                ) : null} */}
                  <Card.Body>
                  <Card.Title>{job.company}</Card.Title>
                  <p className="small">Title: {job.name}</p>
                  <Card.Text>{job.level}</Card.Text>
                  <Card.Text>{job.location}</Card.Text>
                 <Card.Text><Link to={{ pathname: `${job.link}` }} target="_blank" >job link</Link></Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteJob(job.jobId)}
                  >
                    Delete this Job!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedJobs;
