import adminController from "../controller/admin.controller";
import controller from "../controller/categories.controller";

export const login = async (email: string, password: string) => {
  const body = { email: email, password: password };
  const res = await adminController.postAdminLogin(body);
  return res.body.token;
};

export const createCategory = async (name: string, token: string) => {
  const body = { name: name };
  const res = await controller
    .postCategories(body)
    .set("Authorization", "Bearer " + token);

  return res;
};
