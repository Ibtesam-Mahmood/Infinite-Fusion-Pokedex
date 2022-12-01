import React from 'react';
import ReactDOM from 'react-dom/client';
import PokemonStore from './state/InfinitePokedexStore/store';
import { Provider } from 'react-redux';
import App from './App';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={PokemonStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
