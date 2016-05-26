import {ViewChild} from '@angular/core';
import {App, Platform, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {GettingStartedPage} from './pages/getting-started/getting-started';
import {ListPage} from './pages/list/list';
import {VoiceNotesPage} from "./pages/voice-notes/voice-notes";

PouchDB.debug.enable('*');

@App({
  templateUrl: 'build/app.html',
  config: {
  },
  styles: [
    `
      #menuIcon {
        margin-right: 3%;
      }
      
      #menuToolbar {
        min-height: 10rem;
      }
    `
  ]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = GettingStartedPage;
  pages: Array<{ title: string, icon: string, component: any }>

  constructor(private platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Notes', icon: "create", component: GettingStartedPage },
      { title: 'Voice Memos', icon: "microphone", component: VoiceNotesPage},
      { title: 'Starred', icon: "star", component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
