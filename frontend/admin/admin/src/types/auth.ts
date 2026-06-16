export interface AuthLogin {
    email: string;
    password: string;
}

// export interface ApiResponse<T> {
//   success: boolean;
//   message: string;
//   data: T;
// }

export interface LoginData {
  accessToken : string;
  cartId:object
  result:object
}