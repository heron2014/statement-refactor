import { Code_Enum } from './util';

interface Code {
  name: Code_Enum;
  price: number;
}

export interface Movie {
  title: string;
  code: Code['name'];
}

export interface Movies {
  [id: string]: Movie;
}

interface Rental {
  movieID: string;
  days: number;
}

export interface Customer {
  name: string;
  rentals: Rental[]
}

export interface MoviesPerCustomer {
  title: string;
  code: Code_Enum;
  days: number;
}

export interface StatementValues {
  frequentRenterPoints: number;
  result: string;
  totalAmount: number;
}
