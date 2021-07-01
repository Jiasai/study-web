import React from 'react';
import ReactDOM from 'react-dom';

import ToDoListClass from './ToDoListClass';

//引入 Antd 样式
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <ToDoListClass />
  </React.StrictMode>,
  document.getElementById('root')
);

