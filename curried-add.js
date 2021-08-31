function curriedAdd(total) {
  if (total === undefined) return 0;
  return function addAnother(number) {
    if (number === undefined) {
      return total;
    } else {
      total += number;
      return addAnother;
    }
  }
}

module.exports = { curriedAdd };
