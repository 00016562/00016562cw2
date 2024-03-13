import fs from "fs";

export const writeToFile = async (db) => {
  try {
    await fs.promises.writeFile(global.mock_db, JSON.stringify(db, null, 2));
  } catch (error) {
    console.error(error);
    throw error;
  }
};
