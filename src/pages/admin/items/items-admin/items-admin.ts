﻿import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { DropDownMenuService} from '../../../../providers/drop-down-menu-service';
import { ItemsAddNameAdminPage } from '../items-add-name-admin/items-add-name-admin';
import { ItemsTabsPage } from '../items-tabs/items-tabs';

@Component({
  selector: 'page-items-admin',
  templateUrl: 'items-admin.html'
})

export class ItemsAdminPage {
  numberOfItems;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: DropDownMenuService,
  public zone: NgZone, public db: DatabaseService) {
    db.loadNumberOfItems(this.onNumberOfItemsLoaded.bind(this));
  }

  onNumberOfItemsLoaded(numberOfItems) {
    this.zone.run(() => {
      this.numberOfItems = numberOfItems;
    });
  }

  goToItemsListAdminPage() {
     this.navCtrl.push(ItemsTabsPage);
  }

  goToItemsAddNameAdminPage(){
    this.navCtrl.push(ItemsAddNameAdminPage);
  }

}
