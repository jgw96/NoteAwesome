import {Page, NavController, Alert} from 'ionic-angular';

import {NotesProvider} from "../../providers/notes-provider/notes-provider";

/*
  Generated class for the VoiceNotesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/voice-notes/voice-notes.html',
  providers: [NotesProvider]
})
export class VoiceNotesPage {

  public notes: any[];

  onPageDidEnter() {
    this.notes = [];
    this.notesProvider.getNotes().then((response) => {
      response.rows.forEach((note) => {
        console.log(note.doc.audio);
        if (note.doc.audio) {
          this.notes.push(note);
        }
      })
      console.log(this.notes);
    }).catch((err) => {
      console.error(err);
    })
  }

  constructor(private nav: NavController, private notesProvider: NotesProvider) {

  }

  addNote() {
    let captureSuccess = (mediaFiles) => {
      let i, path, len;
      for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
        // do something interesting with the file
        console.log(path);

        let prompt = Alert.create({
          title: 'Voice Memo',
          message: "Enter a title for this voice memo and save it.",
          inputs: [
            {
              name: 'title',
              placeholder: 'Title'
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Save',
              handler: data => {
                console.log('Saved clicked');
                this.notesProvider.addAudioNote(data.title, path);
              }
            }
          ]
        });
        this.nav.present(prompt);

      }
    }

    navigator.device.capture.captureAudio(captureSuccess, (error) => {
      let alert = Alert.create({
        title: 'Error',
        subTitle: "Your device does not have an audio recording app, sorry",
        buttons: ['OK']
      });
      this.nav.present(alert);
    });
  }
}
