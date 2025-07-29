import React, { forwardRef } from 'react';

const RepoItem = forwardRef(({ repo }, ref) => (
  <div ref={ref} style={styles.container}>
    <img src={repo.owner.avatar_url} alt="avatar" style={styles.avatar} />
    <div>
      <h3>{repo.name}</h3>
      <p>{repo.description || 'No description'}</p>
      <p>⭐ {repo.stargazers_count} by <strong>{repo.owner.login}</strong></p>
    </div>
  </div>
));

const styles = {
  container: {
    display: 'flex',
    gap: '1rem',
    padding: '1rem',
    borderBottom: '1px solid #ddd',
    alignItems: 'center',
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  },
};

export default RepoItem;