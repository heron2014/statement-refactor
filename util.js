const REGULAR_PRICE = 2;
const NEW_PRICE = 3;
const BASE_PRICE = 1.5;
const FULL_REGULAR_PRICE_IN_DAYS = 2;
const FULL_CHILDREN_PRICE_IN_DAYS = 3;

const getPrice = (price, days, daysBeforeDiscount) =>
  days > daysBeforeDiscount
    ? price + (days - daysBeforeDiscount) * BASE_PRICE
    : price;

const getPricePerMovie = (movie, days) => {
  switch (movie.code) {
    case "regular":
      return getPrice(REGULAR_PRICE, days, FULL_REGULAR_PRICE_IN_DAYS);
    case "new":
      return days * NEW_PRICE;
    case "childrens":
      return getPrice(BASE_PRICE, days, FULL_CHILDREN_PRICE_IN_DAYS);
  }
}

const getAmountInfoPerCustomer = (totalAmount) => `Amount owed is ${totalAmount}\n`;
const getPointsInfoPerCustomer = (frequentRenterPoints) => `You earned ${frequentRenterPoints} frequent renter points\n`;

const createCustomerStatement = (values) =>
  values.result
    .concat(
      getAmountInfoPerCustomer(values.totalAmount),
      getPointsInfoPerCustomer(values.frequentRenterPoints)
    );

export { getPricePerMovie, createCustomerStatement };
