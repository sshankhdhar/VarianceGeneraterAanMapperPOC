import { Component, OnInit } from '@angular/core';
import {
  NgbDatepickerConfig,
  NgbCalendar,
  NgbTimepickerConfig,
  NgbTimeStruct,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  datemodel: NgbDateStruct;
  timemodel: NgbTimeStruct;

  constructor(
    date: NgbDatepickerConfig,
    time: NgbTimepickerConfig,
    calendar: NgbCalendar
  ) {
    // customize default values of datepickers used by this component tree
    date.minDate = {
      year: calendar.getToday().year,
      month: calendar.getToday().month,
      day: calendar.getToday().day
    };
    date.maxDate = { year: 2099, month: 12, day: 31 };

    // days that don't belong to current month are not visible
    date.outsideDays = 'hidden';

    this.datemodel = {
      year: calendar.getToday().year,
      month: calendar.getToday().month,
      day: calendar.getToday().day
    };
    this.timemodel = { hour: 0, minute: 0, second: 0 };
  }
  ngOnInit() {}
}
