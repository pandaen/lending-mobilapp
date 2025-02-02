import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';

@Component({
  selector: 'page-items-add-success-admin',
  templateUrl: 'items-add-success-admin.html',
  providers: [DatabaseService]
})
export class ItemsAddSuccessAdminPage {
  itemName = "";
  tagId = "0";
  photoURI;
  currentEntity;
  added: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public platform: Platform, public db: DatabaseService) {
    platform.registerBackButtonAction(this.onBackPressed.bind(this));
    this.itemName = navParams.get("itemName");
    this.photoURI = navParams.get("photoURI");
    let tagId = navParams.get("tagId");
    this.added = false;
    if (tagId) {
      this.tagId = tagId;
    }
    db.getEntity(this.onEntityLoaded.bind(this));
  }

  onEntityLoaded(entity){
    this.currentEntity = entity[0];
    if(!this.added){
    this.db.addItem(this.itemName, this.tagId, this.photoURI, this.currentEntity.reservationDays);
    this.added=true;
    }
  }

  goBackToItemsAdminPage() {
    this.navCtrl.popToRoot();
  }

  onBackPressed() {
    this.navCtrl.popToRoot();
  }
}