import React from 'react'

export default function SearchJobCard() {
    return (
        <div>
             <CardColumns>
            {searchedJobs.map((job) => {
              return (
                <Card key={job.jobId} border="primary">
                  {/* {job.company ? (
                  <Card.Img
                    src={job.company}
                    alt={`The cover for ${job.name}`}
                    variant="top"
                  />
                ) : null} */}
                  <Card.Body>
                    <Card.Title>{job.company}</Card.Title>
                    <p className="small">Title: {job.name}</p>
                    <Card.Text>{job.level}</Card.Text>
                    <Card.Text>{job.location}</Card.Text>
                    <Card.Text>
                      <Link to={{ pathname: `${job.link}` }} target="_blank">
                        Job Link
                      </Link>
                    </Card.Text>

                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedJobIds?.some(
                          (savedJobId) => savedJobId === job.jobId
                        )}
                        className="btn-block btn-info"
                        onClick={() => handleSaveJob(job.jobId)}
                      >
                        {savedJobIds?.some(
                          (savedJobId) => savedJobId === job.jobId
                        )
                          ? 'This job has already been saved!'
                          : 'Save this Job!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              );
            })}
          </CardColumns>
        </div>
    )
}