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

  for (let r of customer.rentals) {
    let movie = movies[r.movieID];
    let thisAmount = 0;

    // determine amount for each movie
    switch (movie.code) {
      case "regular":
        thisAmount = 2;
        if (r.days > 2) {
          thisAmount += (r.days - 2) * 1.5;
        }
        break;
      case "new":
        thisAmount = r.days * 3;
        break;
      case "childrens":
        thisAmount = 1.5;
        if (r.days > 3) {
          thisAmount += (r.days - 3) * 1.5;
        }
        break;
    }

    //add frequent renter points
    frequentRenterPoints++;

    // add bonus for a two day new release rental
    if(movie.code === "new" && r.days > 2) frequentRenterPoints++;

    //print figures for this rental
    result += `\t${movie.title}\t${thisAmount}\n` ;
    totalAmount += thisAmount;
  }

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
