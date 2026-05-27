import AuthService from "./auth";
import ChatService from "./chat";
import Order from "./order";
import Pay from "./pay";
import ProductService from "./product";
import RoleService from "./role";
import UserService from "./user";

const repositories = {
  auth: new AuthService(),
  pay: new Pay(),
  order:new Order(),
  user: new UserService(),
  product : new ProductService(),
  role: new RoleService(),
  chat: new ChatService(),
};

export const RepositoryFactory = {
  get: <K extends keyof typeof repositories>(name: K): typeof repositories[K] => {
    return repositories[name];
  },
};