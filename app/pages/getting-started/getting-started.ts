import {Page, Modal, NavController} from 'ionic-angular';

import {NotesProvider} from "../../providers/notes-provider/notes-provider";
import {MyModal} from "./add-modal";


@Page({
  templateUrl: 'build/pages/getting-started/getting-started.html',
  providers: [NotesProvider]
})
export class GettingStartedPage {

  public notes: any[];

  onPageLoaded() {
    this.notesProvider.initDB();
  }

  onPageDidEnter() {
    this.notesProvider.getNotes().then((response) => {
      this.notes = response.rows;
      console.log(this.notes);
    }).catch((err) => {
      console.error(err);
    })
  }

  constructor(private notesProvider: NotesProvider, private nav: NavController) {

  }

  public addNote(title: string, body: string): void {
    let modal = Modal.create(MyModal);
    this.nav.present(modal)
  }

  public remove(id: string): void {
    this.notesProvider.removeNote(id);
    this.notesProvider.getNotes().then((response) => {
      this.notes = response.rows;
      console.log(this.notes);
    }).catch((err) => {
      console.error(err);
    })
  }

}
