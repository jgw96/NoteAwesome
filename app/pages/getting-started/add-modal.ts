import {Page, ViewController} from "ionic-angular";

import {NotesProvider} from "../../providers/notes-provider/notes-provider";

@Page({
    template: `
    <ion-navbar *navbar primary>
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
<button (click)="addNote(title.value, body.value)" block secondary>Add Note</button>
</div>
    
  </ion-content>`,
  providers: [NotesProvider]
})
export class MyModal {
    constructor(private viewCtrl: ViewController, private notesProvider: NotesProvider) {
        this.viewCtrl = viewCtrl;
    }

    close() {
        this.viewCtrl.dismiss();
    }
    
    public addNote(title: string, body: string): void {
        this.notesProvider.addNote(title, body);
    }
}