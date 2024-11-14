import controller from "../controller/brand.controller";
describe("Brands", () => {
  describe("Fetch Brands", () => {
    it("GET/brands", async () => {
      const res = await controller.getBrands();
      expect(res.statusCode).toEqual(200);

      expect(Object.keys(res.body[0])).toEqual(["_id", "name"]);
      expect(res.body.length).toBeGreaterThan(1);
    });
  });

  describe("Create brands", () => {
    let postBrand;
    const data = {
      name: "Test Brand" + Math.floor(Math.random() * 100000),
      description: "Test Brand Decs",
    };
    beforeAll(async () => {
      postBrand = await controller.postBrands(data);
    });

    afterAll(async () => {
      await controller.deleteBrand(postBrand.body._id);
    });

    it("POST/brands", async () => {
      expect(postBrand.statusCode).toEqual(200);
      expect(postBrand.body.name).toEqual(data.name);
      expect(postBrand.body.description).toEqual(data.description);
      expect(Object.keys(postBrand.body)).toEqual([
        "name",
        "description",
        "_id",
        "createdAt",
        "updatedAt",
        "__v",
      ]);

      expect(postBrand.body).toHaveProperty("createdAt");

      //newBrand = postBrand.body;
      //console.log(res);
    });

    it("Schema verification - name is mandatory field", async () => {
      const data = {
        name: "",
        description: "Test Brand Decs",
      };

      const res = await controller.postBrands(data);

      expect(res.statusCode).toEqual(422);
      expect(res.body.error).toEqual("Name is required");
    });

    it("Schema verification - Min Char length for Name>1", async () => {
      const data = {
        name: "a",
        description: "Test Brand Decs",
      };

      const res = await controller.postBrands(data);

      expect(res.statusCode).toEqual(422);
      expect(res.body.error).toEqual("Brand name is too short");
    });

    it("Bussiness Logic - Duplicate brand entries are not allowed.", async () => {
      //const name = "Test Brand" + Math.floor(Math.random() * 100000);
      //const data = {
      //  name: name,
      //description: "Test Brand Decs",
      // };

      //await request.post("/brands").send(data);
      const res2 = await controller.postBrands(data);

      expect(res2.statusCode).toEqual(422);

      expect(res2.body.error).toContain("already exists");

      //console.log(res2.body.error).to;
    });
  });

  describe("Fetch Individual Brand", () => {
    let postBrand;
    const data = {
      name: "Test Brand" + Math.floor(Math.random() * 100000),
      description: "Test Brand Decs",
    };
    beforeAll(async () => {
      postBrand = await controller.postBrands(data);
    });

    afterAll(async () => {
      await controller.deleteBrand(postBrand.body._id);
    });

    it("BusinessLogic - GET/brands/:id invalid  hexid should throw 404", async () => {
      //let num = Math.floor(Math.random() * 100000);
      //const res = await request.get("/brands/" + "65b41f5949e85607248e2895");
      const res = await controller.getBrandById("65b41f5949e85607248e2895");
      expect(res.statusCode).toEqual(404);

      expect(res.body.error).toContain("Brand not found.");
    });

    it("BusinessLogic - GET/brands/:id invalid  id should throw 422", async () => {
      let num = Math.floor(Math.random() * 100000);
      const res = await controller.getBrandById(num.toString());
      expect(res.statusCode).toEqual(422);

      expect(res.body.error).toContain("Unable to fetch brand");
    });

    it("GET/brands/:id", async () => {
      const res = await controller.getBrandById(postBrand.body._id);
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toEqual(postBrand.body.name);
    });
  });

  describe("Brands PUT request Tests", () => {
    let postBrand;
    const data = {
      name: "Test Brand" + Math.floor(Math.random() * 100000),
      description: "Test Brand Decs",
    };
    beforeAll(async () => {
      postBrand = await controller.postBrands(data);
    });

    afterAll(async () => {
      await controller.deleteBrand(postBrand.body._id);
    });

    it("PUT/brands/:id", async () => {
      const data = {
        name: postBrand.body.name + "Updated",
        description: postBrand.body.description + "Updated",
      };
      const res = await controller.putBrands(postBrand.body._id, data);
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toEqual(data.name);
      expect(res.body.description).toEqual(data.description);
      expect(Object.keys(res.body)).toEqual([
        "_id",
        "name",
        "description",
        "createdAt",
        "updatedAt",
        "__v",
      ]);

      expect(res.body).toHaveProperty("createdAt");
    });

    it("Schema verification - Max Char Length for name =30", async () => {
      const data = {
        name: "This is a Really Long Brand name",
      };
      const res = await controller.putBrands(postBrand.body._id, data);
      expect(res.statusCode).toEqual(422);
      expect(res.body.error).toEqual("Brand name is too long");
    });

    it("Schema verification - Description must be a String", async () => {
      const data = {
        name: "Test",
        description: 123,
      };
      const res = await controller.putBrands(postBrand.body._id, data);
      expect(res.statusCode).toEqual(422);
      expect(res.body.error).toEqual("Brand description must be a string");
    });

    it("Bussiness Logic Validation - PUT/brands/InvalidId", async () => {
      const data = {
        name: postBrand.body.name + "Updated",
        description: postBrand.body.description + "Updated",
      };
      const res = await controller.putBrands("123", data);
      expect(res.statusCode).toEqual(422);
      expect(res.body.error).toEqual("Unable to update brands");
    });
  });

  describe("Brands DELETE request Tests", () => {
    let postBrand;
    const data = {
      name: "Test Brand" + Math.floor(Math.random() * 100000),
      description: "Test Brand Decs",
    };
    beforeAll(async () => {
      postBrand = await controller.postBrands(data);
    });
    it("DELETE/brands/:id", async () => {
      const res = await controller.deleteBrand(postBrand.body._id);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(null);
    });

    it("DELETE/brands/invalid_id", async () => {
      const res = await controller.deleteBrand("123");

      expect(res.statusCode).toEqual(422);
      expect(res.body.error).toEqual("Unable to delete brand");
    });
  });
});
