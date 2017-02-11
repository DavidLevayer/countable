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

const accountDataset: string[] = [
  'INSERT INTO Account VALUES (1, \'test-account1\');',
  'INSERT INTO Account VALUES (2, \'test-account2\');',
  'INSERT INTO Account VALUES (3, \'test-account3\');'
];

export const datasetQueries: string[] = accountDataset;
