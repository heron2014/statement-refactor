import { createCustomerStatement, getPricePerMovie } from './util';
import { Customer, Movies, MoviesPerCustomer, StatementValues } from './types';

const moviesPerCustomer = (customer: Customer, movies: Movies) =>
  customer.rentals
    .map((r) => ({ ...movies[r.movieID], days: r.days }));

const getStatementValues = (acc: StatementValues, cur: MoviesPerCustomer) => {
  const price = getPricePerMovie(cur, cur.days);
  const hasBonusPoints = cur.code === "new" && cur.days > 2;
  return {
    frequentRenterPoints: hasBonusPoints ? acc.frequentRenterPoints + 2 : acc.frequentRenterPoints + 1,
    result: `${acc.result}\t${cur.title}\t${price}\n`,
    totalAmount: acc.totalAmount + price,
  };
}

const defaultStatementValues = (name: Customer['name']) => ({
  totalAmount: 0,
  result: `Rental Record for ${name}\n`,
  frequentRenterPoints: 0,
});

function statement(customer: Customer, movies: Movies): string {
  return createCustomerStatement(
    moviesPerCustomer(customer, movies)
    .reduce<StatementValues>(getStatementValues, defaultStatementValues(customer.name))
  )
}

export { statement }
