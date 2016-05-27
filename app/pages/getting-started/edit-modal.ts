import {Page, ViewController, NavParams} from "ionic-angular";
import {ViewChild} from "@angular/core";

import {NotesProvider} from "../../providers/notes-provider/notes-provider";

@Page({
  template: `
    <ion-navbar style="opacity: 1;" primary>
    <ion-title>Edit Note</ion-title>
    <ion-buttons start>
    <button (click)="close()">
      <span primary showWhen="ios">Cancel</span>
      <ion-icon name='close' showWhen="android"></ion-icon>
    </button>
  </ion-buttons>
    </ion-navbar>
  <ion-content>
  
    <ion-list>

  <ion-item>
    <ion-input #title type="text" [value]="firstTitle" placeholder="Title"></ion-input>
  </ion-item>

  <ion-item>
    <ion-input #body type="text" [value]="firstBody" placeholder="Note"></ion-input>
  </ion-item>

</ion-list>

<div padding>
<button (click)="addNote(title.value, body.value)" block secondary>Submit</button>
</div>
    
  </ion-content>`,
  providers: [NotesProvider]
})
export class EditModal {
  private firstTitle: string;
  private firstBody: string;
  public title: string;
  public body: string;

  onPageDidEnter() {
    this.firstTitle = this.params.get("title");
    this.firstBody = this.params.get("body");
  }

  constructor(private viewCtrl: ViewController, private notesProvider: NotesProvider, private params: NavParams) {
    this.viewCtrl = viewCtrl;
  }

  close() {
    this.viewCtrl.dismiss();
  }

  public addNote(title: string, body: string): void {
    this.notesProvider.editNote(title, body, this.firstBody).then(() => {
      this.close();
    }).catch((err) => {
      console.log(err);
    })
  }
}