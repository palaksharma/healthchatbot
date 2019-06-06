export const checkTime = (t) => {
  return (t < 10) ? ('0' + t) : t;
};

export const getTimeAsHHMM = (time:Date) => {
  let hh = time.getHours();
  let mm = time.getMinutes();
  hh = checkTime(hh);
  mm = checkTime(mm);
  return hh + ':' + mm;
};