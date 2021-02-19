import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { GlobalStyle } from './styles/global';
import { StyleSheetManager } from 'styled-components';

const Root = () => (
  <React.Fragment>
    <React.StrictMode>
      <GlobalStyle />
      <App />
    </React.StrictMode>
  </React.Fragment>
)


ReactDOM.render(
    <StyleSheetManager disableVendorPrefixes={process.env.NODE_ENV === 'development'}>
      <Root />
    </StyleSheetManager>,
  document.getElementById('root')
);
