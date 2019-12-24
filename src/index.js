// 这里负责导入全局的文件，比如全局样式，全局字体图标

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// 引入antd-mobile 样式
import 'antd-mobile/dist/antd-mobile.css'
// 引入字体图标
import './assets/fonts/iconfont.css'

ReactDOM.render(<App />, document.getElementById('root'));


