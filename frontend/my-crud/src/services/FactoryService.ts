import AuthService from "../services/auth";
import CartService from "./cart";
import OrderService from "./order";
import ProductService from "./product";
import PayService from "./Vnpay";


const repositories = {
  user: new AuthService(),
  product: new ProductService(),
  order :new OrderService(),
  cart : new CartService(),
  vnpay : new PayService()
};

export const RepositoryFactory = {
  get: <K extends keyof typeof repositories>(name: K): typeof repositories[K] => {
    return repositories[name];
  },
};