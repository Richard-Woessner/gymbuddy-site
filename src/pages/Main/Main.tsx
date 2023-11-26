import React, { useEffect, useState } from 'react';

import api from '@api/api';
import { Tag } from 'antd';

import logo from '../../logo.svg';

import './Main.scss';

function Main() {
  const [isExample, setIsExample] = useState(false);
  useEffect(() => {
    api.get('/api/getExample').then((res) => {
      setIsExample(res.data.isExample);
    });
  }, []);
  return (
    <div className="Main">
      <header className="Main-header">
        <img src={logo} className="Main-logo" alt="logo" />
        <Tag color="gold"> Project Template</Tag>
        <p>Mock data from json-server: {String(isExample)}</p>
      </header>
    </div>
  );
}

export default Main;
