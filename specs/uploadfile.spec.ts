import controller from "../controller/upload.controller";

describe("UploadFile", () => {
  it("Upload Single", async () => {
    const res = await controller.postUploadSingle("data\\TestImage.jpg");

    console.log(res.body);

    expect(res.body.filename).toEqual("TestImage.jpg");
    expect(res.body.mimetype).toEqual("image/jpeg");
    expect(res.statusCode).toBe(200);
  });

  it("POST upload/multiple", async () => {
    const files = ["data\\TestImage.jpg", "data\\TestImage.jpg"];
    const res = await controller.postUploadMultiple(files);
    expect(res.statusCode).toBe(200);
    expect(res.body[0].filename).toEqual("TestImage.jpg");
    expect(res.body[1].filename).toEqual("TestImage.jpg");
    expect(res.body.length).toBe(2);
  });
});
