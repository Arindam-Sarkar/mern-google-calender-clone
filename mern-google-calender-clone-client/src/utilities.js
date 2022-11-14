export const getMonthObjectArray = (month = new Date().getMonth(), year = new Date().getFullYear()) => {
  let firstDayOfMonth = (new Date(year, month, 1)).getDay()

  // Start the first day from sunday
  let startingDate = 0 - firstDayOfMonth

  let monthObjectArray = new Array(35).fill({}).map(() => {
    startingDate++

    return ({
      month: month,
      year: year,
      dateObj: new Date(year, month, startingDate)
    })
  })

  return (monthObjectArray)
}


// export function getMonth(month = dayjs().month()) {
//   month = Math.floor(month);


//   const year = dayjs().year();
//   const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();

//   let currentMonthCount = 0 - firstDayOfTheMonth;
//   const daysMatrix = new Array(5).fill([]).map(() => {
//     return new Array(7).fill(null).map(() => {
//       currentMonthCount++;
//       return dayjs(new Date(year, month, currentMonthCount));
//     });
//   });
//   return daysMatrix;
// }
