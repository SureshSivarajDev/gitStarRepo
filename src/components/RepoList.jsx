import React, { useEffect, useState, useRef, useCallback } from 'react';
import RepoItem from './RepoItem';

const BASE_URL = 'https://api.github.com/search/repositories';
const CREATED_AFTER = '2024-07-15';

export default function RepoList() {
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchRepos = async (pageNum) => {
    const url = `${BASE_URL}?q=created:>${CREATED_AFTER}&sort=stars&order=desc&page=${pageNum}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      setRepos((prev) => [...prev, ...data.items]);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchRepos(page);
  }, [page]);

  const observer = useRef();
  const lastItemRef = useCallback((node) => {
    if (!hasMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [hasMore]);

  return (
    <div>
      {repos.map((repo, index) => {
        if (index === repos.length - 1) {
          return <RepoItem key={repo.id} repo={repo} ref={lastItemRef} />;
        }
        return <RepoItem key={repo.id} repo={repo} />;
      })}
      {!hasMore && <p style={{ textAlign: 'center' }}>No more repositories</p>}
    </div>
  );
}