import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { Avatar, Input, Typography } from '@material-ui/core';

const App = () => {
  const [input, setInput] = useState<string>();

  console.log(input);

  return (
    <>
      <Avatar />
      <Input
        color="primary"
        onChange={e => {
          setInput(e.target.value);
        }}
      />
      <Typography>:{input}</Typography>
    </>
  );
};

export default hot(App);
