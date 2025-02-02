﻿import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { CheckoutUserPage } from '../checkout-user/checkout-user';
import { CheckoutScanUserPage } from '../checkout-scan-user/checkout-scan-user';


@Component({
  selector: 'page-checkout-item-picked',
  templateUrl: 'checkout-item-picked.html',
})
export class CheckoutItemPickedPage {
	itemList:any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService, public zone: NgZone) {
        this.itemList = db.getTemporaryItems();
  }
 
  goToCheckoutUserPage() {
      this.navCtrl.push(CheckoutUserPage);
  }

  goToCheckoutScanUserPage() {
      this.navCtrl.push(CheckoutScanUserPage);
  }

  
  removeItem(item) {
      this.db.removeTemporaryItem(item);
  }
}
