﻿import { Component, NgZone} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { EntityListAdminPage } from '../entity-list-admin/entity-list-admin';
import { EntityDetailsAdminPage } from '../entity-details-admin/entity-details-admin';
import { EntityInfoAdminPage } from '../entity-info-admin/entity-info-admin';

@Component({
  selector: 'page-entity-admin',
  templateUrl: 'entity-admin.html'
})
export class EntityAdminPage {
  currentUserName = "";
  currentUserEntity = "";
  currentEntity;

  sentThis;

  constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone, public db: DatabaseService) {
    this.db.loadCurrentUser(this.onDataLoaded.bind(this));
    this.db.getEntity(this.onEntityLoaded.bind(this));

  }

  onDataLoaded(currentUser) {
    this.zone.run(() => {
      this.currentUserName = currentUser.fullname;
      this.currentUserEntity = currentUser.entityName;
    });
  }


onEntityLoaded(entities){
  this.zone.run(() => {
      this.currentEntity = entities[0];
    });
}


  goToEntityDetailsAdminPage() {
    if(this.db.currentUser.entity != "No library, join a library to get started") {
      this.navCtrl.push(EntityDetailsAdminPage, {entity:this.currentEntity});
    }
  }

  goToEntityListAdminPage() {
    this.navCtrl.push(EntityListAdminPage, {self:this.sentThis});
  }

  goToEntityInfoAdminPage() {
      this.navCtrl.push(EntityInfoAdminPage);
  }
}
