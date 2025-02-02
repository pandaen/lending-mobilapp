import { Component } from '@angular/core';
import { NavController, NavParams, Platform  } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';

import { Toast } from 'ionic-native';


@Component({
  selector: 'page-item-confirm-confirm-pickup',
  templateUrl: 'item-confirm-confirm-pickup.html'
})
export class ItemConfirmConfirmPickupPage {
     eventDate: any;
    item: any;
    returnDate: any;
    currentEntity: any;
    officeLocation: any;
    officeRoom: any;
    officeHours: any;
    reservation:any;

    pUpDate;

    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService, private platform: Platform) {
        this.reservation = navParams.get("reservation");
        this.currentEntity = navParams.get("entity");
        this.item=navParams.get("item");
        this.officeLocation = this.currentEntity.office.location;
        this.officeRoom = this.currentEntity.office.room;
        this.officeHours = this.currentEntity.office.hours;

        this.returnDate = this.reservation.formattedRetDate;
        this.pUpDate = this.reservation.formattedpUpDate;

        const index = navParams.get("index");
        this.navCtrl.remove(1, index);
    }


 getWeekDay(n){
    var weekday = new Array(7);
      weekday[0] = "Sundays";
      weekday[1] = "Mondays";
      weekday[2] = "Tuesdays";
      weekday[3] = "Wednesdays";
      weekday[4] = "Thursdays";
      weekday[5] = "Fridays";
      weekday[6] = "Saturdays";

      return weekday[n];
}

getHours(n){
if(this.currentEntity.office.fromHours!=null && this.currentEntity.office.toHours!=null){
   var hoursFrom = this.currentEntity.office.fromHours;
   var hoursTo = this.currentEntity.office.toHours;

if(hoursFrom[n]!=null || hoursTo[n]!=null){
    return hoursFrom[n] + "-" + hoursTo[n];
}  else return "undefined";

   }
 
else return "undefined";
}


 
  getMonthAsText(n) {
      switch (n) {
          case 1: return "January";
          case 2: return "February";
          case 3: return "March";
          case 4: return "April";
          case 5: return "May";
          case 6: return "June";
          case 7: return "July";
          case 8: return "August";
          case 9: return "September";
          case 10: return "October";
          case 11: return "November";
          case 12: return "December";
      }
  }


 
  okClicked() {
    
      if (this.platform.is('cordova')) {
          this.showToast("You have reserved " + this.item.name, "center");
      }
      this.navCtrl.popToRoot();
      
  }

  showToast(message, position) {
      this.platform.ready().then(() => Toast.show(message, "long", position).subscribe(
          toast => {
              console.log(toast);
          }
      ));
  }


}
