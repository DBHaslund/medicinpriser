import * as SQLite from 'expo-sqlite';

// SQLite.deleteDatabaseSync('medicineDb');
const db = SQLite.openDatabaseSync('medicineDb');

export async function init() {
  db.withTransactionAsync(async () => {
    db.execAsync(
      `CREATE TABLE IF NOT EXISTS medicineDb (
            id INTEGER PRIMARY KEY NOT NULL,
            Varenummer TEXT NOT NULL
      )`
    );
  });
}

export async function insertFav(vnr: string) {
    const statement = await db.prepareAsync(`
      INSERT INTO medicineDb (Varenummer) VALUES ($vnr);
      `)
    
    try {
        await statement.executeAsync({ $vnr: vnr })
    }
    finally {
        await statement.finalizeAsync();
    }
}

export async function deleteFav(vnr: string) {
    const statement = await db.prepareAsync(`
        DELETE FROM medicineDb WHERE Varenummer = $vnr;
        `)
      
    try {
        await statement.executeAsync({ $vnr: vnr })
    }
    finally {
        await statement.finalizeAsync();
    }
}

export async function fetchFavs() {
    const all = await db.getAllAsync('SELECT * FROM medicineDb');
    return all;
}