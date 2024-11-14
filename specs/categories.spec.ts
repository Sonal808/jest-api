import config from "../config/base.config";
import controller from "../controller/categories.controller";
import { login, createCategory } from "../utils/helper";

describe("Get categories", () => {
  it("GET/categories", async () => {
    const res = await controller.getCagtegories();
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(1);
    expect(Object.keys(res.body[0])).toEqual(["_id", "name"]);
  });
});

describe("Create Categories", () => {
  let createCat, token, categoryId;
  let name = "TestCategory" + Math.floor(Math.random() * 10000);

  beforeAll(async () => {
    token = await login(config.email, config.password);
    createCat = await createCategory(name, token);
    categoryId = createCat.body._id;
    //const logData = { email: config.email, password: config.password };
    //const logRes = await adminController.postAdminLogin(logData);
    //token = logRes.body.token;
    //const body = { name: "TestCategory" + Math.floor(Math.random() * 10000) };
    //postCategories = await controller
    //.postCategories(body)
    //.set("Authorization", "Bearer " + token);
  });

  afterAll(async () => {
    await controller.deleteCategories(categoryId);
  });

  it("POST/categories", async () => {
    expect(createCat.statusCode).toEqual(200);
    expect(createCat.body.name).toEqual(name);
  });

  it("Shema validation - name is mandatory field", async () => {
    const data = { name: "" };
    const res = await controller
      .postCategories(data)
      .set("Authorization", "Bearer " + token);
    expect(res.statusCode).toEqual(422);
    expect(res.body.error).toEqual("Name is required");
  });

  it("Shema validation - Min Char Length for name >1", async () => {
    const data = { name: "a" };
    const res = await controller
      .postCategories(data)
      .set("Authorization", "Bearer " + token);
    expect(res.statusCode).toEqual(422);
    expect(res.body.error).toEqual("Brand name is too short"); // should be category anme
  });

  it("Shema validation - Max Char Length for name =30", async () => {
    const data = { name: "This is a Really Long Category name" };
    const res = await controller
      .postCategories(data)
      .set("Authorization", "Bearer " + token);
    expect(res.statusCode).toEqual(422);
    expect(res.body.error).toEqual("Brand name is too long"); // should be category anme
  });
});

describe("Update Categories", () => {
  let createCat, token, categoryId;

  let name = "TestCategory" + Math.floor(Math.random() * 10000);

  beforeAll(async () => {
    //const logData = { email: config.email, password: config.password };
    //const logRes = await adminController.postAdminLogin(logData);
    //token = logRes.body.token;
    token = await login(config.email, config.password);
    createCat = await createCategory(name, token);
    categoryId = createCat.body._id;

    //const body = { name: "TestCategory" + Math.floor(Math.random() * 10000) };
    //postCategory = await controller
    // .postCategories(body)
    // .set("Authorization", "Bearer " + token);
  });

  afterAll(async () => {
    await controller
      .deleteCategories(categoryId)
      .set("Authorization", "Bearer " + token);
  });

  it("PUT/categories", async () => {
    const data = { name: createCat.body.name + "Updated" };
    const res = await controller
      .putCategories(categoryId, data)
      .set("Authorization", "Bearer " + token);
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toEqual(data.name);
    expect(Object.keys(res.body)).toEqual(["_id", "name", "__v"]);
  });

  it("Shema validation - Max Char Length for name =30", async () => {
    const data = { name: "This is a Really Long Category name" };
    const res = await controller
      .putCategories(categoryId, data)
      .set("Authorization", "Bearer " + token);
    expect(res.statusCode).toEqual(422);
    expect(res.body.error).toEqual("Brand name is too long"); // should be category anme
  });

  it("Shema validation - Min Char Length for name >1", async () => {
    const data = { name: "a" };
    const res = await controller
      .putCategories(categoryId, data)
      .set("Authorization", "Bearer " + token);
    expect(res.statusCode).toEqual(422);
    expect(res.body.error).toEqual("Brand name is too short"); // should be category anme
  });

  it("Shema validation - name is mandatory field", async () => {
    const data = { name: "" };
    const res = await controller
      .putCategories(categoryId, data)
      .set("Authorization", "Bearer " + token);
    expect(res.statusCode).toEqual(422);
    expect(res.body.error).toEqual("Name is required"); // should be category anme
  });

  it("Business Logic validation - PUT/categories/InvalidId", async () => {
    const data = { name: createCat.body.name + "Updated" };
    const res = await controller
      .putCategories("1234", data)
      .set("Authorization", "Bearer " + token);
    expect(res.statusCode).toEqual(422);
    expect(res.body.error).toEqual("Unable to update categories"); //6732aaa4986188d4dce53389
  });
});

describe("Categories DELETE request Tests", () => {
  let createCat, token, categoryId;
  let name = "TestCategory" + Math.floor(Math.random() * 10000);

  beforeAll(async () => {
    //const logData = { email: config.email, password: config.password };
    //const logRes = await adminController.postAdminLogin(logData);
    //token = logRes.body.token;
    token = await login(config.email, config.password);
    createCat = await createCategory(name, token);
    categoryId = createCat.body._id;

    //const body = { name: "TestCategory" + Math.floor(Math.random() * 10000) };
    //postCategory = await controller
    // .postCategories(body)
    //.set("Authorization", "Bearer " + token);
  });

  it("DELETE/categories/:id", async () => {
    const res = await controller
      .deleteCategories(categoryId)
      .set("Authorization", "Bearer " + token);
    //console.log(res);
    expect(res.statusCode).toEqual(200);
    //expect(res.body).toEqual(null);
  });

  it("DELETE/categories/:invalidId", async () => {
    const res = await controller
      .deleteCategories("1234")
      .set("Authorization", "Bearer " + token);
    expect(res.statusCode).toEqual(422);
    expect(res.body.error).toEqual("Unable to delete categories");
  });
});
