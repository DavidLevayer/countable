const accountTableQuery: string =
  'CREATE TABLE IF NOT EXISTS Account(' +
  'id INTEGER PRIMARY KEY,' +
  'name TEXT NOT NULL UNIQUE);';

const categoryTableQuery: string =
  'CREATE TABLE IF NOT EXISTS Category(' +
  'id INTEGER PRIMARY KEY,' +
  'name TEXT NOT NULL UNIQUE);';

const subcategoryTableQuery: string =
  'CREATE TABLE IF NOT EXISTS Subcategory(' +
  'id INTEGER PRIMARY KEY,' +
  'name TEXT NOT NULL UNIQUE,' +
  'refCategory INTEGER NOT NULL,' +
  'FOREIGN KEY(refCategory) REFERENCES Category(categoryId));';

export const populationQueries: string[] = [
  accountTableQuery,
  categoryTableQuery,
  subcategoryTableQuery
];
