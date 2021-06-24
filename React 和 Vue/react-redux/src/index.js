import React from 'react';
import ReactDOM from 'react-dom';

import ToDoList from './ToDoList';

//引入 Antd 样式
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <ToDoList />
  </React.StrictMode>,
  document.getElementById('root')
);

