import * as supertest from "supertest";
import config from "../config/base.config";

const request = supertest(config.baseUrl);

class UploadController {
  postUploadSingle(filePath: string) {
    return request.post("/upload/single").attach("single", filePath);
  }

  postUploadMultiple(files: string[]) {
    const req = request.post("/upload/multiple");

    files.forEach((file) => {
      req.attach("multiple", file);
    });

    return req;
  }
}

export default new UploadController();