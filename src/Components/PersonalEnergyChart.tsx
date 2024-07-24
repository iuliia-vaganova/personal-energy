import React from 'react';
import {Box} from '@mui/material';
import {Area, AreaChart, Brush, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {COLORS, CURRENT_YEAR} from '../constants';

const YEARS_COUNT = 101;

const getEnergyNumbers = (birthDate: Date): number[] => {
  const year = birthDate.getFullYear();
  const product = (birthDate.getDate() * 100 + birthDate.getMonth() + 1) * year;
  const energyNumbers = [...product.toString()].map((n) => +n);

  while (energyNumbers.length < 7) {
    energyNumbers.push(0);
  }

  // special cases:
  // people whose birth year starts from 2000 and energy numbers contains 3 and more continuous zeros
  if (year > 1999 && product.toString().includes('000')) {
    // skip last 2 digits and find start index of zero for replace
    let index = energyNumbers.length - 3;
    while(index > 0 && energyNumbers[index] !== 0){
      index--;
    }

    // change zeros with digits from 9 and less
    let digitForReplace = 9;
    while(index > 0 && energyNumbers[index] === 0){
      energyNumbers[index] = digitForReplace;
      digitForReplace--;
      index--;
    }
  }

  return energyNumbers;
};

const groupEnergiesByYears = (birthYear: number, energyNumbers: number[]) => {
  if (!birthYear) {
    return [];
  }

  return Array.from({length: YEARS_COUNT}, (_, i) => ({year: birthYear + i, energie: energyNumbers[i % 7]}));
};

export const PersonalEnergyChart = ({birthDate}: {birthDate: Date}) => {
  const energieNumbers = getEnergyNumbers(birthDate);
  const birthYear = birthDate.getFullYear();
  const energiesByYears = groupEnergiesByYears(birthYear, energieNumbers);

  let startIndex, endIndex;
  if (birthYear){
    let startYear = CURRENT_YEAR - 3;
    if (startYear < birthYear){
      startYear = birthYear
    }
    if (startYear > birthYear + YEARS_COUNT - 7)
    {
      startYear = birthYear + YEARS_COUNT - 7
    }
    startIndex = startYear - birthYear;
    endIndex = startIndex + 6;
  }

  return !energiesByYears.length ? null : (
    <Box sx={{width:"100%", maxWidth: "1000px", height: "350px"}}>
      <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={energiesByYears} margin={{top: 10, right: 30, left: -40, bottom: 0}}>
        <defs>
          <linearGradient id="colorEnergie" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8} />
            <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="year" interval={0} />
        <YAxis scale="linear" domain={[0, 9]} interval={0} tickCount={9} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          dot
          type="monotone"
          dataKey="energie"
          stroke={COLORS.primary}
          fillOpacity={1}
          fill="url(#colorEnergie)"
          name="Энергия"
          isAnimationActive={false}
        />
        <ReferenceLine x={CURRENT_YEAR} stroke={COLORS.secondary} />
        <Brush dataKey="year" height={30} stroke={COLORS.primary} startIndex={startIndex} endIndex={endIndex}/>
      </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};
