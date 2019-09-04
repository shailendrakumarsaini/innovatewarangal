import { Component,ChangeDetectionStrategy,ViewChild,TemplateRef, OnInit } from '@angular/core';
import { startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView } from 'angular-calendar';
import { EventService } from '../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { AlertService } from '../shared/Directives/alert/alert.service';

  interface EventShape {
    id: number;
    title: string;
    release_date: string;
    eventName: string;
    start;
    end;
    color;
    location: string;
    siteURL: string;
    flyer: string;
  }

  const colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };

  @Component({ 
    selector: 'app-eventdetails',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './eventdetails.component.html',
    styleUrls: ['./eventdetails.component.css']
  })
  export class EventdetailsComponent implements OnInit {
  loading: boolean;
  data;
  todayDate =  new Date()
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      // label: '<i class="fa fa-fw fa-pencil"></i>',
      label: '<i></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      // label: '<i class="fa fa-fw fa-times"></i>',
      label: '<i></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();
  events$;
  events: CalendarEvent[] = [
    // {
    //   // start: subDays(startOfDay(new Date()), 1),
    //   start: startOfDay(new Date()),
    //   // end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: colors.red,
    //   actions: this.actions,
    //   // allDay: true,
    //   // resizable: {
    //   //   beforeStart: true,
    //   //   afterEnd: true
    //   // },
    //   // draggable: true,
    //   // eventName:'asdsds',
    //   location : 'location'
    // },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'An event with no end date',
    //   color: colors.yellow,
    //   actions: this.actions,
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: colors.blue,
    //   allDay: true,
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2), 
    //   end: new Date(),
    //   title: 'A draggable and resizable event',
    //   color: colors.yellow,
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true
    //   },
    //   draggable: true
    // },
    // {
    //   start: startOfDay(new Date('2019-05-13T18:30:00.000Z')),
    //   title: "ertert",
    //   "color": {
    //     "primary": "#ad2121",
    //     "secondary": "#FAE3E3"
    //   },
    //   actions:this.actions,
    //   location: "retret",
    //   siteURL: "www.godavarisnacks.com"
    // },
    // {
    //   start: startOfDay(new Date("2019-04-30T18:30:00.000Z")),
    //   title: "reeer",
    //   color: {
    //     "primary": "#ad2121",
    //     "secondary": "#FAE3E3"
    //   },
    //   actions: this.actions,
    //   location: "ererer",
    //   siteURL: "ererer"
    // }
  ];

  activeDayIsOpen: boolean = false;

  constructor(private modal: NgbModal,
    private eventService :EventService,
    private ActivatedRoute:ActivatedRoute,
    private router :Router,
    private http :HttpClient,
    private alertService :AlertService) {}

  ngOnInit(){
    let date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let daysInMonth = this.daysInMonth(month,year);
    
    let formDate = year +'-'+ month +'-'+ 1;
    let toDate = year +'-'+ month  +'-'+ daysInMonth;

    this.getEvents(formDate,toDate);
  } 

  getEvents(formDate,toDate){ 
    this.events$ = this.http.get('https://godavarisnacks.in/api/user/events/'+formDate+'/'+toDate+'/false')
    .pipe(
      map((EventData:EventShape) => {
          // console.log(new Date().toTimeString(),EventData) 
          var CaendarEvents = [];
          for(let i= 0; i < EventData['length']; i++){
            if(EventData[i]['isActive'] == true){ 
              let temp;
              if(EventData[i].toDate == null){
                 temp = {
                  start: startOfDay(new Date(EventData[i].eventDate)),
                  end: endOfDay(new Date(EventData[i].eventDate)),
                  title : EventData[i].eventName,
                  color: colors.blue,
                  // actions: this.actions,
                  location : EventData[i].location,
                  siteURL : EventData[i].siteURL,
                  flyer : EventData[i].flyer,
                }
              }else{
                 temp = {
                  start: startOfDay(new Date(EventData[i].eventDate)),
                  end: endOfDay(new Date(EventData[i].toDate)),
                  title : EventData[i].eventName,
                  color: colors.blue,
                  // actions: this.actions,
                  location : EventData[i].location,
                  siteURL : EventData[i].siteURL,
                  flyer : EventData[i].flyer,
                }
              }
              CaendarEvents.push(temp);
            }
          }
          if(EventData['length'] <= 0){
            this.alertService.error('No Event in this Month');
          }
          // console.log(new Date().toTimeString(),CaendarEvents)
          return CaendarEvents;
      })
    )
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] },Date): void {
    // if (isSameMonth(date, this.viewDate)) {
    //   this.viewDate = date;
    //   if (
    //     (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
    //     events.length === 0
    //   ) {
    //     this.activeDayIsOpen = false;
    //   } else { 
    //     this.activeDayIsOpen = true;
    //   }
    // }
    // if(this.formatTheDate(date) >= this.formatTheDate(this.todayDate )){
    //   this.router.navigate(['events', { EventDate: date }]); 
    // }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        location : 'location',
        siteURL : 'siteURL',
        flyer : 'flyer'
      }
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay(flag,month) {
    this.activeDayIsOpen = false;
    if(flag == 'Previous'){
      this.previousMonthEvents(month);
    }
    if(flag == 'Next'){
      this.nextMonthEvents(month);
    }
  }

  previousMonthEvents(CurrentDate){
    // console.log(CurrentDate)
    let month = new Date(CurrentDate).getMonth() + 1;
    let year = CurrentDate.getFullYear();
    let daysInMonth = this.daysInMonth(month,year);
    
    let formDate = year +'-'+ month +'-'+ 1;
    let toDate = year +'-'+ month +'-'+ daysInMonth;
    // console.log('formDate',formDate)
    // console.log('toDate',toDate)
    this.getEvents(formDate,toDate);
  }

  currentMonthEvents(CurrentDate){
    // console.log(CurrentDate)
    let month = new Date(CurrentDate).getMonth() + 1;
    let year = CurrentDate.getFullYear();
    let daysInMonth = this.daysInMonth(month,year);
    
    let formDate = year +'-'+ month +'-'+ 1;
    let toDate = year +'-'+ month  +'-'+ daysInMonth;
    // console.log('formDate',formDate)
    // console.log('toDate',toDate)
    this.getEvents(formDate,toDate);
  }

  nextMonthEvents(CurrentDate){
    // console.log(CurrentDate)
    let month = new Date(CurrentDate).getMonth() + 1;
    let year = CurrentDate.getFullYear();
    let daysInMonth = this.daysInMonth(month,year);
    
    let formDate = year +'-'+ month +'-'+ 1;
    let toDate = year +'-'+ month  +'-'+ daysInMonth;
    // console.log('formDate',formDate)
    // console.log('toDate',toDate)
    this.getEvents(formDate,toDate);
  }

  daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
  }

  formatTheDate(date){ 
    if(date)
      {
        if((date.getMonth() + 1) <= 9){
          var month = '0'+(date.getMonth() + 1);
        }else{
          month = '' + (date.getMonth() + 1);
        }

        if((date.getDate()) <= 9){
          var day = '0'+(date.getDate());
        }else{
          day = '' + date.getDate();
        }

        return  date.getFullYear() + '-' + month + '-' + day;
      }
  }

}