import libraryConrollers from "../controller/library.conrollers";
import { getBookId } from "../utils/bookHelper";
import { generateIsbn, generateBookInfo } from "../utils/datagenerater";

describe("Libary tests", () => {
  it("POST/AddBooks", async () => {
    const isbn = await generateIsbn();
    const name = await generateBookInfo("Test Book");
    const author = await generateBookInfo("Test Author");

    const data = {
      name: name,
      isbn: isbn,
      aisle: "89087",
      author: author,
    };

    const res = await libraryConrollers.postBook(data);

    expect(res.statusCode).toBe(200);
    expect(res.body.ID).toEqual(data.isbn + data.aisle);
    expect(res.body.Msg).toContain("successfully added");
  });
});

describe("fetch book", () => {
  it("Get/book/{id}", async () => {
    const isbn = await generateIsbn();
    const name = await generateBookInfo("Test Book");
    const author = await generateBookInfo("Test Author");

    const data = {
      name: name,
      isbn: isbn,
      aisle: "89087",
      author: author,
    };
    const id = await getBookId(data);
    const getBookRes = await libraryConrollers.getBookById(id);

    expect(getBookRes.statusCode).toBe(200);
    expect(getBookRes.body[0].book_name).toEqual(data.name);
    expect(getBookRes.body[0].isbn).toEqual(data.isbn);
    expect(getBookRes.body[0].aisle).toEqual(data.aisle);
    expect(getBookRes.body[0].author).toEqual(data.author);
    //console.log(getBookRes.body);
  });
});
