import { statement } from './index';
import { Customer, Movies } from './types';
import { Code_Enum } from './util';

const result = `
Rental Record for franklin
Ran 3.5
Trois Couleurs: Bleu 2
Amount owed is 5.5
You earned 2 frequent renter points
`;

const customer: Customer = {
  "name": "franklin",
  "rentals": [
    {"movieID": "F001", "days": 3},
    {"movieID": "F002", "days": 1},
  ]
}

const movies: Movies = {
  "F001": {"title": "Ran", "code": Code_Enum.REGULAR},
  "F002": {"title": "Trois Couleurs: Bleu", "code": Code_Enum.REGULAR},
  // etc
}

it('statement', () => {
  const res = statement(customer, movies);
  expect(res.replace(/\s/g,'')).toBe(result.replace(/\s/g,''));
});

