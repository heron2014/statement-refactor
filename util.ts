import { Movie, StatementValues } from './types';

const REGULAR_PRICE = 2;
const NEW_PRICE = 3;
const BASE_PRICE = 1.5;
const FULL_REGULAR_PRICE_IN_DAYS = 2;
const FULL_CHILDREN_PRICE_IN_DAYS = 3;

export enum Code_Enum {
  REGULAR = 'regular',
  NEW = 'new',
  CHILDREN = 'children'
}


const getPrice = (price: number, days: number, daysBeforeDiscount: number) =>
  days > daysBeforeDiscount
    ? price + (days - daysBeforeDiscount) * BASE_PRICE
    : price;

const getPricePerMovie = (movie: Movie, days: number) => {
  switch (movie.code) {
    case Code_Enum.REGULAR:
      return getPrice(REGULAR_PRICE, days, FULL_REGULAR_PRICE_IN_DAYS);
    case Code_Enum.NEW:
      return days * NEW_PRICE;
    case Code_Enum.CHILDREN:
      return getPrice(BASE_PRICE, days, FULL_CHILDREN_PRICE_IN_DAYS);
  }
}

const getAmountInfoPerCustomer = (totalAmount: number) => `Amount owed is ${totalAmount}\n`;
const getPointsInfoPerCustomer = (points: number) => `You earned ${points} frequent renter points\n`;

const createCustomerStatement = (values: StatementValues) =>
  values.result
    .concat(
      getAmountInfoPerCustomer(values.totalAmount),
      getPointsInfoPerCustomer(values.frequentRenterPoints)
    );

export { getPricePerMovie, createCustomerStatement };
