import React from 'react';
import ReactDOM from 'react-dom';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import ruLocale from 'date-fns/locale/ru';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/lab';

import {App} from './Components/App';
import {COLORS} from './constants';

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.primary,
    },
    secondary: {
      main: COLORS.secondary,
    },
  },
});

const appContainer = document.getElementById('appContainer');

ReactDOM.render(
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
      <App />
      </LocalizationProvider>
    </ThemeProvider>
  </>,
  appContainer,
);
