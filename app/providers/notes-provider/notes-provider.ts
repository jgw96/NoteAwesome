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
      "_id": title,
      "title": title,
      "body": body
    }
    database.put(note).then((data) => {
      return (data);
    }).catch((err) => {
      return (err);
    })
  }

  public getNotes(): Promise<any> {
    return this.mainDb.allDocs({include_docs: true});
  }
  
  public removeNote(id: string): void {
    let database = new PouchDB("notes");
    //return new Promise((resolve, recj))
    database.get(id).then((doc) => {
      return database.remove(doc);
    })
  }

}

