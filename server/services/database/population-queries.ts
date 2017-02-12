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
  'FOREIGN KEY(refCategory) REFERENCES Category(id));';

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

const categoryDataset: string[] = [
  'INSERT INTO Category VALUES(1, \'test-cat1\');',
  'INSERT INTO Category VALUES(2, \'test-cat2\');',
  'INSERT INTO Category VALUES(3, \'test-cat3\');',
  'INSERT INTO Subcategory VALUES(1, \'test-subcat-1.1\', 1);',
  'INSERT INTO Subcategory VALUES(2, \'test-subcat-1.2\', 1);',
  'INSERT INTO Subcategory VALUES(3, \'test-subcat-2.1\', 2);'
];

export const datasetQueries: string[] = accountDataset.concat(categoryDataset);
