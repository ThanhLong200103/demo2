export interface UserType {
      id: number;
  name: string;
  email: string;
  phone: string;
  role_name: string;
  status: string;
}

export interface FormDataCreate  {
  name: string;
  email: string;
  phone: string;
  role_id: number;
  password: string;
};

export interface FormDataEdit  {
  name: string;
  email: string;
  phone: string;
  role_id: number;
  role_name :string;
  status:string,
  password:string
};