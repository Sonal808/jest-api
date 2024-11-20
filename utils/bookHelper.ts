import libraryConrollers from "../controller/library.conrollers";

export const getBookId = async (data: { [key: string]: string | number }) => {
  const res = await libraryConrollers.postBook(data);
  const id = res.body.ID;
  return id;
};
