import { Button } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Repo } from '../../interfaces/Repo';

const Repo = () => {
  const [actualRepo, setActualRepo] = useState<Repo[]>();
  const router = useRouter();
  const currentRepo = router.query.id;
  const queryClient = useQueryClient();

  useEffect(() => {
    const previousRepos = queryClient.getQueryData<Repo[]>('reposGH');

    if (previousRepos) {
      const individualRepo = previousRepos.filter(
        repo => repo.name === currentRepo
      );
      setActualRepo(individualRepo);
    }
  }, []);

  const handleRepoName = () => {
    const previousRepos = queryClient.getQueryData<Repo[]>('reposGH');

    if (previousRepos) {
      const nextRepos = previousRepos.map(repo => {
        if (repo.name === currentRepo) {
          return { ...repo, description: 'testandooooo' };
        } else return repo;
      });
      queryClient.setQueryData('reposGH', nextRepos);
    }
  };

  return (
    <div>
      Repo: <strong>{currentRepo}</strong>
      <br />
      <Button onClick={handleRepoName}>
        Change the description on React Query
      </Button>
      {!!actualRepo && (
        <div>
          <p>Description: {actualRepo[0].description}</p>
          <p>Language: {actualRepo[0].language}</p>
        </div>
      )}
    </div>
  );
};

export default Repo;
