import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';
import 'cropperjs/dist/cropper.css';
import './styles/datepicker.css'
import './styles/global.css';

import App from './components/App';
import store from './duck/store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
