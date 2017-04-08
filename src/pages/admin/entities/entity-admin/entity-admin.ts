import { Component, NgZone} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { EntityAddAdminPage } from '../entity-add-admin/entity-add-admin';
import { EntityListAdminPage } from '../entity-list-admin/entity-list-admin';
import { EntityDetailsAdminPage } from '../entity-details-admin/entity-details-admin';

@Component({
  selector: 'page-entity-admin',
  templateUrl: 'entity-admin.html'
})
export class EntityAdminPage {
  currentUser = "";
  currentEntity = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public zone: NgZone, public db: DatabaseService) {
    this.db.loadCurrentEntity(this.onDataLoaded.bind(this));
    this.currentUser = this.db.currentUserName;
  }

  onDataLoaded(data) {
    this.zone.run(() => {
      this.currentEntity = data;
    });
  }

  goToEntityDetailsAdminPage() {
    this.navCtrl.push(EntityDetailsAdminPage);
  }

  goToEntityListAdminPage() {
    this.navCtrl.push(EntityListAdminPage);
  }

  goToEntityAddAdminPage() {
    this.navCtrl.push(EntityAddAdminPage);
  }
}
