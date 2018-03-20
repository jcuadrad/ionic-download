import { Component, NgZone } from '@angular/core';
import { NavController, normalizeURL } from 'ionic-angular';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  localURL: string;
  fullResponse;
  printResponse;
  loading = false;
  status = 'Progress Bar...'

  constructor(public navCtrl: NavController, 
              private transfer: FileTransfer, 
              private file: File,
              public _zone: NgZone) {

  }

  // onDownload() {
  //   const fileTransfer: FileTransferObject = this.transfer.create();
  //   const url = encodeURI('http://4.bp.blogspot.com/-QHOsfBR4Z1Y/T0flIkJkxtI/AAAAAAAAO2s/BCYDu3rppBA/s1600/X-Men-V1-128.jpg');
  //   const fileName = url.replace(/^.*[\\\/]/, '');

  //   fileTransfer.download(url, this.file.dataDirectory + fileName, true)
  //     .then(res => {
  //       console.log(res);
  //       this.fullResponse = res;
  //       this.printResponse = JSON.stringify(res);
  //       this.localURL = normalizeURL(res.nativeURL);
  //     })
  //     .catch(err => {
  //       this.fullResponse = err;
  //       this.printResponse = JSON.stringify(err);
  //     });
  // }

  onDownload() {
    this.loading = true;
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = encodeURI('http://movietrailers.apple.com/movies/wb/real-player-one/ready-player-one-trailer-4_h480p.mov');
    const fileName = url.replace(/^.*[\\\/]/, '');

    fileTransfer.onProgress((progressEvent) => {
      this._zone.run(() => {
        console.log(progressEvent);
        if (progressEvent.lengthComputable) {
          var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
          this.status = perc + "% loaded...";
        } else {
          if (this.status == "") {
            this.status = "Loading";
          } else {
            this.status += ".";
          }
        }
      });
    });

    fileTransfer.download(url, this.file.dataDirectory + fileName, true)
      .then(res => {
        this.loading = false;
        console.log(res);
        this.fullResponse = res;
        this.printResponse = JSON.stringify(res);
        this.localURL = normalizeURL(res.nativeURL);
      })
      .catch(err => {
        this.loading = false;
        this.fullResponse = err;
        this.printResponse = JSON.stringify(err);
      });
  }

  onDelete() {
    const path = this.fullResponse.nativeURL.replace(/[^\/]*$/, '');
    const fileName = this.fullResponse.name;

    console.log('path:', path, 'File Name:', fileName);

    this.file.removeFile(path, fileName)
      .then(res => {
        console.log('Deleted:', res)
        this.fullResponse = res;
        this.printResponse = JSON.stringify(res);
        this.localURL = '';
      })
      .catch(err => {
        console.log(err);
        this.fullResponse = err;
        this.printResponse = JSON.stringify(err);
      })
  }

  // play() {
  //   const video: HTMLMediaElement = document.getElementsByName('video')[0];

  //   video.play();
  // }

}
