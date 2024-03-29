import { getISOWeek, getISOWeekYear } from "date-fns";

export const generateYearAndWeek = (date: Date) => {
  const year = getISOWeekYear(date);
  const week = getISOWeek(date);
  return { year, week, key: `${year}-${week}` };
};
