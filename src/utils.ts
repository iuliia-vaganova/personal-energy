import {isValid, isBefore, isAfter} from 'date-fns';
import {MAX_BIRTH_DATE, MIN_BIRTH_DATE} from './constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidBirthDate = (date: any): boolean =>
  isValid(date) && !isBefore(date, MIN_BIRTH_DATE) && !isAfter(date, MAX_BIRTH_DATE);