import { createCustomerStatement, getPricePerMovie } from './util';

const moviesPerCustomer = (customer, movies) =>
  customer.rentals
    .map((r) => ({ ...movies[r.movieID], days: r.days }));

const getStatementValues = (acc, cur) => {
  const price = getPricePerMovie(cur, cur.days);
  const hasBonusPoints = cur.code === "new" && cur.days > 2;
  return {
    frequentRenterPoints: hasBonusPoints ? acc.frequentRenterPoints + 2 : acc.frequentRenterPoints + 1,
    result: `${acc.result}\t${cur.title}\t${price}\n`,
    totalAmount: acc.totalAmount + price,
  };
}

const defaultStatementValues = (name) => ({
  totalAmount: 0,
  result: `Rental Record for ${name}\n`,
  frequentRenterPoints: 0,
});

// customer statement
function statement(customer, movies) {
  return createCustomerStatement(
    moviesPerCustomer(customer, movies)
    .reduce(getStatementValues, defaultStatementValues(customer.name))
  )
}

/* Customer Record
{
  "name": "franklin",
  "rentals": [
    {"movieID": "F001", "days": 3},
    {"movieID": "F002", "days": 1},
  ]
}
*/

/* Movie Dataset
{
  "F001": {"title": "Ran", "code": "regular"},
  "F002": {"title": "Trois Couleurs: Bleu", "code": "regular"},
  // etc
}
*/

export { statement }
