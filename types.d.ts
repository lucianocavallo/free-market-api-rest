interface User {
  email: string;
  password: string;
  role: string;
}

interface InputUser {
  email: string;
  password: string;
  role: string;
}

interface InputProduct {
  name: string;
  price: number;
  description: string;
  image: string;
}

interface InputCategory {
  name: string;
  image: string;
}

interface InputCustomer {
  firstName: string;
  lastName: string;
  phone: string;
  user: { email: string; password: string };
  orders: string[];
}

interface InputOrder {
  customer: string;
  products: string[];
}

type CorsOptions =
  | CorsOptions
  | CorsOptionsDelegate<
      Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>
    >
  | undefined;
