const fillDateForm = (inputDate: string) => {
  let parsedDate = Date.parse(inputDate);
  if (!isNaN(parsedDate)) {
    return new Date(parsedDate);
  } else {
    return new Date();
  }
};

export default fillDateForm;
