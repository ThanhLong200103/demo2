import AuthService from "./auth";

const repositories = {
  auth: new AuthService()
};

export const RepositoryFactory = {
  get: <K extends keyof typeof repositories>(name: K): typeof repositories[K] => {
    return repositories[name];
  },
};