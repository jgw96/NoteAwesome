import {Page, NavController, NavParams} from 'ionic-angular';
import {OnInit} from "@angular/core";

import {NotesProvider} from "../../providers/notes-provider/notes-provider";

@Page({
  templateUrl: 'build/pages/list/list.html',
  providers: [NotesProvider]
})
export class ListPage {
  
  public notes: any[];

  onPageDidEnter() {
    this.notes = [];
    this.notesProvider.getNotes().then((response) => {
      response.rows.forEach((note) => {
        console.log(note.doc.starred);
        if (note.doc.starred === true) {
          this.notes.push(note);
        }
      })
      console.log(this.notes);
    }).catch((err) => {
      console.error(err);
    })
  }

  constructor(private notesProvider: NotesProvider) {

  }


}
