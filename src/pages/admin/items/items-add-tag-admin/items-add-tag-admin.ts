import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemsAddTagScannAdminPage } from '../items-add-tag-scann-admin/items-add-tag-scann-admin';
import { ItemsAddSuccessAdminPage } from '../items-add-success-admin/items-add-success-admin';

@Component({
  selector: 'page-items-add-tag-admin',
  templateUrl: 'items-add-tag-admin.html'
})
export class ItemsAddTagAdminPage {
  itemName = "";
  photoURI;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.itemName = navParams.get("itemName");
    this.photoURI = navParams.get("photoURI");
  }

  goToItemsAddTagScannAdminPage(){
    this.navCtrl.push(ItemsAddTagScannAdminPage,{itemName: this.itemName, photoURI: this.photoURI});
  }

  goToItemsAddSuccessAdminPage(){
    this.navCtrl.push(ItemsAddSuccessAdminPage,{itemName: this.itemName, photoURI: this.photoURI});
  }

}
