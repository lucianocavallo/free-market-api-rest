interface User {
  email: string;
  password: string;
  role: string;
}

interface InputUser {
  email?: string;
  password?: string;
  role?: string;
  recoveryToken?: string;
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

interface JwtUser {
  _id: string;
  role: string;
  sub: string;
}

interface InfoMail {
  from: string;
  to: string;
  subject: string;
  // text: string;
  html: string;
}
