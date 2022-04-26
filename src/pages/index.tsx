import type { NextPage } from 'next';
import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Repo } from '../interfaces/Repo';
import Link from 'next/link';
import { Skeleton, Typography } from 'antd';
const { Title } = Typography;

const Home: NextPage = () => {
  const { data, isLoading } = useQuery<Repo[]>(
    'reposGH',
    async () => {
      const response = await axios.get(
        'https://api.github.com/users/jooaodias/repos'
      );
      console.log(response.data);

      return response.data;
    },
    { staleTime: 1000 * 60 } //1 minute
  );

  if (isLoading) return <Skeleton />;

  return (
    <>
      <Title level={2}>Welcome to GitHub Repositories</Title>

      <ul>
        {!isLoading &&
          data?.map(repo => {
            return (
              <li key={repo?.name}>
                <Title level={3}>
                  <Link href={`repos/${repo.name}`}>{repo?.name}</Link>
                </Title>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Home;
