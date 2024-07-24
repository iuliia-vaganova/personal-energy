import React from 'react';
import {Box, Stack, TextField} from '@mui/material';
import {DatePicker} from '@mui/lab';
import {isValid, isBefore, isAfter} from 'date-fns';
import { MAX_BIRTH_DATE, MIN_BIRTH_DATE } from '../constants';
import { PersonalEnergyChart } from './PersonalEnergyChart';

const isValidBirthDate = (date: Date): boolean =>
  isValid(date) && !isBefore(date, MIN_BIRTH_DATE) && !isAfter(date, MAX_BIRTH_DATE);

export const App = () => {
  const [birthDate, setBirthDate] = React.useState<Date | null>(null);

  return (
    <Stack spacing={2} sx={{p: {xs: 2, sm: 3}}}>
      <Box>
        <DatePicker
          disableFuture
          label="Дата рождения"
          cancelText={null}
          okText="Закрыть"
          mask="__.__.____"
          openTo="year"
          views={['year', 'month', 'day']}
          value={birthDate}
          minDate={MIN_BIRTH_DATE}
          maxDate={MAX_BIRTH_DATE}
          onChange={(date) => {
            setBirthDate(date);
          }}
          renderInput={(params) => (
            <TextField {...params} inputProps={{...params.inputProps, placeholder: 'дд.мм.гггг'}} />
          )}
        />
      </Box>
      {birthDate && isValidBirthDate(birthDate) ? (
        <Stack spacing={2}>
          <PersonalEnergyChart birthDate={birthDate} />
        </Stack>
      ) : null}
    </Stack>
  );
};
