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
  'name TEXT NOT NULL,' +
  'refCategory INTEGER NOT NULL,' +
  'UNIQUE (name, refCategory),' +
  'FOREIGN KEY(refCategory) REFERENCES Category(id));';

const transactionTableQuery: string =
  'CREATE TABLE IF NOT EXISTS MoneyTransaction(' +
  'id INTEGER PRIMARY KEY,' +
  'amount INTEGER NOT NULL,' +
  'transactionDate DATETIME NOT NULL,' +
  'refAccount INTEGER NOT NULL,' +
  'refSubcategory INTEGER NOT NULL,' +
  'FOREIGN KEY(refAccount) REFERENCES Account(id),' +
  'FOREIGN KEY(refSubcategory) REFERENCES Subcategory(id));';

export const populationQueries: string[] = [
  accountTableQuery,
  categoryTableQuery,
  subcategoryTableQuery,
  transactionTableQuery
];

const accountDataset: string[] = [
  'INSERT INTO Account VALUES (1, \'test-account1\');',
  'INSERT INTO Account VALUES (2, \'test-account2\');',
  'INSERT INTO Account VALUES (10, \'test-account10\');',
  'INSERT INTO Account VALUES (11, \'test-account11\');'
];

const categoryDataset: string[] = [
  'INSERT INTO Category VALUES(1, \'test-cat1\');',
  'INSERT INTO Category VALUES(2, \'test-cat2\');',
  'INSERT INTO Category VALUES(10, \'test-cat10\');',
  'INSERT INTO Category VALUES(11, \'test-cat11\');',
  'INSERT INTO Subcategory VALUES(1, \'test-subcat-1.1\', 1);',
  'INSERT INTO Subcategory VALUES(2, \'test-subcat-1.2\', 1);',
  'INSERT INTO Subcategory VALUES(10, \'test-subcat-2.1\', 2);',
  'INSERT INTO Subcategory VALUES(11, \'test-subcat-2.1\', 2);'
];

const transactionDataset: string[] = [
  'INSERT INTO MoneyTransaction VALUES(1, 10, \'2017-03-14T13:04:48.844Z\', 1, 1);',
  'INSERT INTO MoneyTransaction VALUES(2, 20, \'2017-03-14T14:04:48.844Z\', 1, 1);',
  'INSERT INTO MoneyTransaction VALUES(10, 30, \'2017-03-14T14:04:48.844Z\', 2, 2);'
];

export const datasetQueries: string[] = accountDataset.concat(categoryDataset).concat(transactionDataset);
