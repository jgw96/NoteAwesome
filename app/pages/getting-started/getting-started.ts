import {Page, Modal, NavController, ActionSheet} from 'ionic-angular';
import {Camera} from 'ionic-native';
import {SocialSharing} from 'ionic-native';
import {Calendar} from "ionic-native";

import {NotesProvider} from "../../providers/notes-provider/notes-provider";
import {MyModal} from "./add-modal";
import {EditModal} from "./edit-modal";


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
    this.notes = [];
    this.notesProvider.getNotes().then((response) => {
      response.rows.forEach((note) => {
        console.log(note.doc.starred);
        if (note.doc.starred === false) {
          this.notes.push(note);
        }
      })
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
    this.notesProvider.removeNote(id).then((response) => {
      this.notesProvider.getNotes().then((response) => {
        this.notes = [];
        response.rows.forEach((note) => {
          console.log(note.doc.starred);
          if (note.doc.starred === false) {
            this.notes.push(note);
          }
          return false;
        })
        console.log(this.notes);
      }).catch((err) => {
        console.error(err);
        return false;
      })
    })
  }

  public starNote(id: string): void {
    this.notesProvider.starNote(id).then((response) => {
      this.notesProvider.getNotes().then((response) => {
        this.notes = [];
        response.rows.forEach((note) => {
          console.log(note.doc.starred);
          if (note.doc.starred === false) {
            this.notes.push(note);
          }
        })
        console.log(this.notes);
      }).catch((err) => {
        console.error(err);
      })
    })
  }

  public edit(title: string, body: string): void {
    let modal = Modal.create(EditModal, { title: title, body: body });
    this.nav.present(modal)
  }

  public picNote(): void {
    let options = {
      quality: 90,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 400,
      targetHeight: 400,
      saveToPhotoAlbum: false
    }

    Camera.getPicture(options).then((imageData) => {
      let base64Image = "data:image/jpeg;base64," + imageData;
      console.log(base64Image);

      let modal = Modal.create(MyModal, { picture: base64Image });
      this.nav.present(modal);
    }, (err) => {
      console.log(err);
    });
  }

  public showSheet(title: string, body: string): void {
    let sheet = ActionSheet.create({
      title: "Actions",
      buttons: [
        {
          text: 'Share',
          icon: "share",
          handler: () => {
            SocialSharing.share(body, title);
          }
        }, {
          text: 'Calendar',
          icon: "calendar",
          handler: () => {
            Calendar.createEventInteractively(title, null, body, new Date(), new Date()).then(() => {
              console.log("event made");
            }).catch((err) => {
              console.log(err);
            })
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          icon: "close",
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    })
    
    this.nav.present(sheet);
  }

}
