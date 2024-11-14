import * as supertest from "supertest";

const request = supertest("https://jsonplaceholder.typicode.com");

describe("POC Tests", () => {
  describe("GET requests", () => {
    it("GET/posts", async () => {
      const res = await request.get("/posts");
      //console.log(res);

      expect(res.statusCode).toBe(200);
      expect(res.body[0].id).toBe(1);
    });

    it("GET/comments with query params", async () => {
      //const res = await request.get("/comments?postId=1");
      const res = await request
        .get("/comments")
        .query({ postId: 1, limit: 10 });

      console.log(res);

      expect(res.body[0].postId).toBe(1);
    });
  });

  describe("POST request", () => {
    it("POST/posts", async () => {
      const data = {
        title: "My fav animes",
        body: "Naruto , Last Air Bender, Death Note",
        userId: 1,
      };

      const res = await request.post("/posts").send(data);

      //console.log(res.body);

      expect(res.body.title).toBe("data.title");
    });
  });

  describe("PUT requests", () => {
    it("PUT /posts/{id}", async () => {
      const data = {
        title: "Updated Title",
        body: "Updated Body",
        userId: 1,
      };

      const getRes = await request.get("/posts/1");
      const beforeTitle = getRes.body.title;

      console.log(beforeTitle); // random text

      const res = await request.put("/posts/1").send(data);

      //console.log(res.body);

      expect(res.body.title).not.toBe(beforeTitle); //null
      expect(res.body.title).toBe(data.title);
    });
  });

  describe("PATCH requests", () => {
    it("PATCH /posts/{id}", async () => {
      const data = {
        title: "Updated Title new",
      };

      const getRes = await request.get("/posts/1");
      const beforeTitle = getRes.body.title;

      console.log(beforeTitle); // random text

      const res = await request.patch("/posts/1").send(data);

      //console.log(res.body);

      expect(res.body.title).not.toBe(beforeTitle); //null
      expect(res.body.title).toBe(data.title);

      //to do a another get call
    });
  });

  describe("DELETE requests", () => {
    it.only("DELETE /posts/{id}", async () => {
      //const getRes = await request.get("/posts/1");
      // const beforeTitle = getRes.body.title;

      // console.log(beforeTitle); // random text

      const res = await request.delete("/posts/1");

      expect(res.body).toBeNull;
      expect(res.body).toEqual({});

      expect(res.statusCode).toBe(200);
    });
  });
});
