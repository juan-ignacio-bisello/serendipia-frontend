import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './style.css';

import { store } from './store/store.js';
import { SerendipiaApp } from './SerendipiaApp.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={ store }>
    <BrowserRouter>
      <SerendipiaApp />
    </BrowserRouter>
  </Provider>
)
