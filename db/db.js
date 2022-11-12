import * as SQLite from 'expo-sqlite'
import Toast from "react-native-toast-message"
const db = SQLite.openDatabase('notesApp.db');

export const initializeDatabase = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL,color TEXT NOT NULL);',
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                    Toast.show({
                        type: "error",
                        text1: err
                    })
                }
            );
        });
    });
    return promise;
};

export const insertNotes = (title, description, color) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO notes (title, description, color ) VALUES (?, ?, ? );`,
                [title, description, color],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};
export const fetchNotes = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM notes',
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};
export const deleteNote = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM  notes where id=?',
                [id],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                    Toast.show({
                        type: "error",
                        text1: err
                    })
                }
            );
        });
    });
    return promise;
};