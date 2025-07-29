import React from 'react';
import RepoList from './components/RepoList';

export default function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <h1>🔥 Trending GitHub Repositories</h1>
      <RepoList />
    </div>
  );
}