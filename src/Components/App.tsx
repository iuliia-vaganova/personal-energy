import React from 'react';
import {AppBar, Stack, Toolbar, Typography} from '@mui/material';
import {LocalizationProvider} from '@mui/lab';
import ruLocale from 'date-fns/locale/ru';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {Calculator} from './Calculator';

export const App = (): React.ReactElement => (
  <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
    <Stack spacing={3} sx={{paddingBottom: 3}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" component="div">
            График личной энергии
          </Typography>
        </Toolbar>
      </AppBar>

      <Calculator />
    </Stack>
  </LocalizationProvider>
);
