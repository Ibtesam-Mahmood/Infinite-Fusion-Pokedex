import React from 'react';
import ReactDOM from 'react-dom/client';
import PokemonStore from './state/InfinitePokedexStore/store';
import { Provider } from 'react-redux';
import App from './App';

// Importing the Bootstrap CSS
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
// import $ from 'jquery';
// import Popper from 'popper.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={PokemonStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
