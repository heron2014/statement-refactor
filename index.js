const REGULAR_PRICE = 2;
const NEW_PRICE = 3;
const BASE_PRICE = 1.5;

const getPricePerMovie = (movie, days) => {
  switch (movie.code) {
    case "regular":
      if (days > 2) {
        return REGULAR_PRICE + (days - 2) * BASE_PRICE;
      }
      return REGULAR_PRICE;
    case "new":
      return days * NEW_PRICE;
    case "childrens":
      if (days > 3) {
        return BASE_PRICE + (days - 3) * BASE_PRICE;
      }
      return BASE_PRICE;
  }
}

const moviesPerCustomer = (customer, movies) =>
  customer.rentals
    .map((r) => ({ ...movies[r.movieID], days: r.days }));

// customer statement
function statement(customer, movies) {
  const statementValues = moviesPerCustomer(customer, movies)
    .reduce((acc, cur ) => {
      const price = getPricePerMovie(cur, cur.days);
      return {
        frequentRenterPoints: (cur.code === "new" && cur.days > 2) ? acc.frequentRenterPoints + 2 : acc.frequentRenterPoints + 1,
        result: `${acc.result}\t${cur.title}\t${price}\n`,
        totalAmount: acc.totalAmount + price,
      };
    }, {
      totalAmount: 0,
      result: `Rental Record for ${customer.name}\n`,
      frequentRenterPoints: 0,
    })

  // add footer lines
  statementValues.result += `Amount owed is ${statementValues.totalAmount}\n`;
  statementValues.result += `You earned ${statementValues.frequentRenterPoints} frequent renter points\n`;

  return statementValues.result;
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
