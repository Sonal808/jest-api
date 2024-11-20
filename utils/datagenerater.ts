export const generateIsbn = async () => {
  const companyCode = "RS";
  const val = Math.floor(Math.random() * 10000);

  const isbn = companyCode + val;

  return isbn;
};

export const generateBookInfo = async (name: string) => {
  const val = name + Math.floor(Math.random() * 10000);

  return val;
};
