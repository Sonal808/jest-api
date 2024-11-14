import * as supertest from "supertest";
import config from "../config/base.config";

const request = supertest(config.baseUrl);

class CategoriesController {
  getCagtegories() {
    return request.get("/categories");
  }

  getCagtegoriesById(id: string) {
    return request.get("/categories/" + id);
  }

  postCategories(data: { [key: string]: string | number }) {
    return request.post("/categories").send(data);
  }

  putCategories(id: string, data: { [key: string]: string | number }) {
    return request.put("/categories/" + id).send(data);
  }

  deleteCategories(id: string) {
    return request.delete("/categories/" + id);
  }
}

export default new CategoriesController();
