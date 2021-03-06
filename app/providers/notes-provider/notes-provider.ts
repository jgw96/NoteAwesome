import {Injectable} from '@angular/core';

/*
  Generated class for the NotesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NotesProvider {

  private mainDb: any;

  constructor() {

  }

  public initDB(): void {
    this.mainDb = new PouchDB("notes");
  }

  public addNote(title: string, body: string): any {
    let database = new PouchDB("notes");
    let note = {
      "_id": body,
      "title": title,
      "body": body,
      "starred": false
    }
    database.put(note).then((data) => {
      return (data);
    }).catch((err) => {
      return (err);
    })
  }

  public addPicNote(picture: string, title: string, body: string): any {
    let database = new PouchDB("notes");
    let note = {
      "_id": body,
      "title": title,
      "body": body,
      "pic": picture,
      "starred": false
    }
    database.put(note).then((data) => {
      return (data);
    }).catch((err) => {
      return (err);
    })
  }

  public addAudioNote(title: string, voiceMemo: string): any {
    let database = new PouchDB("notes");

    let note = {
      "_id": voiceMemo,
      "title": title,
      "note": voiceMemo,
      "starred": false,
      "audio": true
    }
    database.put(note).then((data) => {
      return data;
    }).catch((err) => {
      return err;
    })
  }

  public starNote(id: string): Promise<any> {
    let database = new PouchDB("notes");

    return new Promise((resolve, reject) => {
      database.get(id).then((note) => {
        return database.put({
          _id: id,
          _rev: note._rev,
          "title": note.title,
          "body": note.body,
          "starred": true
        })
      }).then((response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      })
    })


  }

  public getNotes(): Promise<any> {
    let database = new PouchDB("notes");
    return database.allDocs({ include_docs: true });
  }

  public removeNote(id: string): Promise<any> {
    let database = new PouchDB("notes");
    return new Promise((resolve, reject) => {
      database.get(id).then((doc) => {
        database.remove(doc);
        resolve("done");
      })
    })
  }

  public editNote(title: string, body: string, firstBody: string): Promise<any> {
    let database = new PouchDB("notes");
    return new Promise((resolve, reject) => {
      this.removeNote(firstBody).then(() => {
        resolve(database.put({
          "title": title,
          "body": body,
          "starred": false,
          _id: body
        }));
      }).catch((err) => {
        reject(err);
      })
    });
  }

}

