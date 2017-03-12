import { Service } from 'ts-express-decorators';
import { DatabaseService } from '../database/database.service';
import { CrudService } from '../crud.service';
import { Transaction } from '../../models/transaction/transaction';

@Service()
export class TransactionService implements CrudService {

  constructor(private databaseService: DatabaseService) {
  }

  get(id: number): Promise<Transaction> {

    return null;
  }

  getAll(): Promise<Transaction[]> {

    return null;
  }

  create(category: Transaction): Promise<Transaction> {

    return null;
  }

  update(category: Transaction): Promise<Transaction> {

    return null;
  }

  delete(id: number): Promise<boolean> {

    return null;
  }
}
