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
  let totalAmount = 0;
  let frequentRenterPoints = 0;
  let result = `Rental Record for ${customer.name}\n`;

  moviesPerCustomer(customer, movies)
    .forEach((movie) => {
      const price = getPricePerMovie(movie, movie.days);

      frequentRenterPoints++;

      if(movie.code === "new" && movie.days > 2) frequentRenterPoints++;

      result += `\t${movie.title}\t${price}\n` ;

      totalAmount += price;
    });

  // add footer lines
  result += `Amount owed is ${totalAmount}\n`;
  result += `You earned ${frequentRenterPoints} frequent renter points\n`;

  return result;
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
