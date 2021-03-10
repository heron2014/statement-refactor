import { statement } from './';

const result = `
Rental Record for franklin
Ran 3.5
Trois Couleurs: Bleu 2
Amount owed is 5.5
You earned 2 frequent renter points
`;

const customer = {
  "name": "franklin",
  "rentals": [
    {"movieID": "F001", "days": 3},
    {"movieID": "F002", "days": 1},
  ]
}

const movies = {
  "F001": {"title": "Ran", "code": "regular"},
  "F002": {"title": "Trois Couleurs: Bleu", "code": "regular"},
  // etc
}

it('test statement"', () => {
  console.log = jest.fn();
  console.log(statement(customer, movies).replace(/\s/g,''));
  // The first argument of the first call to the function was 'hello'
  expect(console.log.mock.calls[0][0]).toBe(result.replace(/\s/g,''));
});

