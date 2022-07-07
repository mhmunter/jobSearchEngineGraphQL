// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// save job data for a logged in user
export const saveJob = (jobData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jobData),
  });
};

// remove saved job data for a logged in user
export const deleteJob = (jobId, token) => {
  return fetch(`/api/users/jobs/${jobId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};


export const searchApiJobs = (query) => {
  return fetch(`https://www.themuse.com/api/public/jobs?company=${query}&category=Software%20Engineering&page=1`);
};


//https://www.themuse.com/api/public/jobs?company=${query}&category=Software%20Engineering&page=1