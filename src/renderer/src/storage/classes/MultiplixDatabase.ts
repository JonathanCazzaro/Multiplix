import Dexie, { Table } from 'dexie';

export class MultiplixDatabase extends Dexie {
  users!: Table<Multiplix.Services.User>;

  constructor(name?: string) {
    super(name || 'multiplixDatabase');
    this.version(1).stores({
      users: '++id, name, password, score, rewards, achievements, [name+password], chosenTables'
    });
  }
}
