import AuthService from "../services/auth";
import CartService from "./cart";
import OrderService from "./order";
import ProductService from "./product";
import PayService from "./Vnpay";
import CategoryService from "./category";
import AddressUserService from "./addressUser"
import ChatService from "./chat";

const repositories = {
  user: new AuthService(),
  product: new ProductService(),
  order :new OrderService(),
  cart : new CartService(),
  vnpay : new PayService(),
  category :new CategoryService(),
  addressUser :new AddressUserService(),
  chat : new ChatService(),
  
};

export const RepositoryFactory = {
  get: <K extends keyof typeof repositories>(name: K): typeof repositories[K] => {
    return repositories[name];
  },
};