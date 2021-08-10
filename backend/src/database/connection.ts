import { createConnection } from "typeorm";

const createTypeORMConnection = async () => {
  try {
    await createConnection();
    console.log("TypeORM successfully connected with the database.");
  } catch (err) {
    console.log(err);
    console.log("TypeORM could not successfully connect with the database.");
  }
};

export default createTypeORMConnection;
