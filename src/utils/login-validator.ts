import { ObjectSchema, object, string } from "yup";

type userLogin = {
  username: string;
  password: string;
};

export const userLoginShema: ObjectSchema<userLogin> = object({
  username: string().required(),
  password: string().required(),
});
