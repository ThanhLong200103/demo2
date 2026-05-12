import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import {
  BrowserRouter,
} from "react-router-dom";

import App from './App.tsx'
import { CssBaseline } from '@mui/material';
import { Provider } from "react-redux";
import store from "./redux/store";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <Provider store={store}>
    <ThemeProvider theme={theme}>
     <BrowserRouter>
    <CssBaseline/>
    <App />
    </BrowserRouter>
   </ThemeProvider>
   </Provider>
    
  </StrictMode>,
)
