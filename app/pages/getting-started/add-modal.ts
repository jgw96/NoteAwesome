import {Page, ViewController, NavParams} from "ionic-angular";

import {NotesProvider} from "../../providers/notes-provider/notes-provider";

@Page({
  template: `
    <ion-navbar style="opacity: 1;" primary>
    <ion-title>New Note</ion-title>
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
    <ion-input #title type="text" placeholder="Title"></ion-input>
  </ion-item>

  <ion-item>
    <ion-input #body type="text" placeholder="Note"></ion-input>
  </ion-item>

</ion-list>
<div padding>
  <img *ngIf="picture !== null || undefined" src="{{picture}}">
</div>

<div padding>
  <button (click)="addNote(title.value, body.value)" block secondary>Add Note</button>
</div>
    
  </ion-content>`,
  providers: [NotesProvider]
})
export class MyModal {

  private picture: string;

  onPageDidEnter() {
    if (this.params.get("picture")) {
      this.picture = this.params.get("picture");
    }
  }

  constructor(private viewCtrl: ViewController, private notesProvider: NotesProvider, private params: NavParams) {
    this.viewCtrl = viewCtrl;
  }

  close() {
    this.viewCtrl.dismiss();
  }

  public addNote(title: string, body: string): void {
    if (this.picture !== null || undefined) {
      this.notesProvider.addPicNote(this.picture, title, body);
      this.close();
    }
    else {
      this.notesProvider.addNote(title, body);
      this.close();
    }
  }
}