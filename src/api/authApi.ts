import axios from "../configs/axios";
type body = {
  username: string;
  password: string;
};

type user = {
  id: number;
  username: string;
  email: string;
};
type data = {
  accessToken: string;
  user: user;

};

export const loginUser = async (body: body) => {
  const respone = await axios.post<data>("/auth/login", body);
  return respone.data;
};
