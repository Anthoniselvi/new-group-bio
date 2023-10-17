function generateYearOptions() {
  const currentYear = new Date().getFullYear();
  const startYear = 1960;
  const years = [];

  for (let year = currentYear; year >= startYear; year--) {
    years.push(year.toString());
  }

  return years;
}

export default generateYearOptions;
