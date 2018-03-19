import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private transfer: FileTransfer, private file: File) {

  }

  downdoad() {
    const fileTransfer: FileTransferObject = this.transfer.create();
  }

}
