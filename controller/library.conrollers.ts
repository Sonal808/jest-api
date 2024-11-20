import * as supertest from "supertest";
import config from "../config/base.config";

const request = supertest(config.libraryUrl);

class LibraryController {
  getBookById(id: number) {
    return request.get("/GetBook.php").query({ ID: id });
  }

  getBookByName(name: string) {
    return request.get("/GetBook.php").query({ AuthorName: name });
  }

  postBook(data: { [key: string]: string | number }) {
    return request.post("/Addbook.php").send(data);
  }

  deleteBook() {
    return request.post("/DeleteBook.php");
  }
}

export default new LibraryController();
