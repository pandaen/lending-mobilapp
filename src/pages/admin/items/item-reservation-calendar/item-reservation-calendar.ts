import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { NgCalendarModule } from 'ionic2-calendar';
import { DatabaseService } from '../../../../providers/database-service';


@Component({
  selector: 'page-item-reservation-calendar',
  templateUrl: 'item-reservation-calendar.html'
})
export class ItemReservationCalendarPage {
 eventSource;
    viewTitle;
    isToday: boolean;
    loadedFirstTime: boolean;
    currentEntity;
    openingInfo;
    selectedDay;
    item: any;
    clickedTwice:boolean;
    unableForReservation = false;
    reservation;
    loan;

    notClickable=[];

    constructor(public navCtrl: NavController, public navParams: NavParams, public ngCal: NgCalendarModule,
    public db: DatabaseService, public zone: NgZone, public alertCtrl: AlertController) {
        this.item = navParams.get("item");
        this.loadEvents();
    }
    

  calendar = {
      mode: 'month',
      currentDate: new Date(),
  }; // these are the variable used by the calendar.

 loadEvents() {
        this.eventSource = this.createRandomEvents();
    }

  onViewTitleChanged(title) {
      this.viewTitle = title;
  }
  onEventSelected(event) {
      console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
      
  }
  today() {
      this.calendar.currentDate = new Date();
  }
  onTimeSelected(ev) {
      if(this.item.reserved!=null){
      for(var reservation of this.item.reserved){
        if(reservation.pickupDate<=ev.selectedTime.getTime() && reservation.returnDate>=ev.selectedTime.getTime()){
      this.reservation=reservation;
      break;
        }
        else this.reservation=null;
      }
      }
      if(this.item.loan!=null){
          var today = new Date();
          today.setHours(0o0,0o0,0o0,0o0);
          if(today.getTime()<=ev.selectedTime.getTime() && this.item.loan.timeInMillis>=ev.selectedTime.getTime()){
       this.loan=this.item.loan;
        }
        else this.loan=null;
      }

      console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
          (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);

  }
  onCurrentDateChanged(event: Date) {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      event.setHours(0, 0, 0, 0);
      var newDay= new Date(event);
      
     
     
      this.selectedDay=new Date(newDay);
      this.isToday = today.getTime() === event.getTime();
     
    
  }

  nextMonth() {
      this.loadedFirstTime = false;
      this.calendar.currentDate = new Date(this.calendar.currentDate.setMonth(this.calendar.currentDate.getMonth() + 1));
      
  }
  previousMonth() {
      this.loadedFirstTime = false;
      this.calendar.currentDate = new Date(this.calendar.currentDate.setMonth(this.calendar.currentDate.getMonth() - 1));
  }

  swipeEvent() {
      this.loadedFirstTime = false;
  }
    
  onRangeChanged(ev) {
      console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

   createRandomEvents() {
        var events = [];
        var reservations = [];
        if(this.item.reserved!=null){
             reservations = this.item.reserved;
        }
        if(reservations!=null){
        for(var reservation of reservations) {
            var startDate = new Date();
            startDate.setTime(reservation.pickupDate);
            var endDate = new Date();
            endDate.setTime(reservation.returnDate);
            
            var startTime;
            var endTime;
                startTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+1);
               
                endTime = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()+1);
               
                events.push({
                    title: '',
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true,
                    resName:reservation.userName,
                    color: "resLoaned"
                });
        }
            
    }
    if(this.item.loan!=null){
           var startDate = new Date();
            var endDate = new Date();
            endDate.setTime(this.item.loan.timeInMillis);
            var startTime;
            var endTime;
                startTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+1);
               
                endTime = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()+1);
               
                events.push({
                    title: '',
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true,
                    color: "resLoaned"
                });
        }
        return events;
    }
   
   
  markDisabled = (date: Date) => {
    
      
  };

  cancelRes(reservation){
      this.alertCtrl.create({
      title: 'Confirm',
      message: 'Are you sure you want to cancel the reservation made by ' + reservation.userName,
      buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Confirm',
        handler: () => {
          var index = this.item.reserved.indexOf(reservation);
            if (this.item.reserved.length > -1) {
                this.item.reserved.splice(index, 1);
                this.db.addReservation(this.item.reserved, this.item);
                this.reservation=null;
                this.loadEvents();
            }
        }
      }
      ]
    }).present();
  }
}