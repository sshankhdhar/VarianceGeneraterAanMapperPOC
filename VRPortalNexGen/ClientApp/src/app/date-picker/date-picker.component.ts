import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  NgbDatepickerConfig,
  NgbCalendar,
  NgbTimepickerConfig,
  NgbTimeStruct,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
 @Input() datemodel: NgbDateStruct;
 @Output() DateFilterColumnValue = new EventEmitter<string>();
  constructor( date: NgbDatepickerConfig, calendar: NgbCalendar) {
    // customize default values of datepickers used by this component tree
    // date.minDate = {
    //   year: calendar.getToday().year,
    //   month: calendar.getToday().month,
    //   day: calendar.getToday().day
    // };
    date.maxDate = { year: 2099, month: 12, day: 31 };
    console.log(this.datemodel);
    // this.datemodel = {
    //   year: calendar.getToday().year,
    //   month: calendar.getToday().month,
    //   day: calendar.getToday().day
    // };

  }

  ngOnInit() {
  }
  onDateClick($event) {
    this.DateFilterColumnValue.emit(this.datemodel.year + '-' + this.datemodel.month + '-' + this.datemodel.day);
    console.log(this.DateFilterColumnValue);
  }
  ngOnChanges(changes: any) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        if (propName === 'datemodel') {

          this.DateFilterColumnValue.emit(this.datemodel.year + '-' + this.datemodel.month + '-' + this.datemodel.day);
          console.log(this.DateFilterColumnValue);
        }
    }
  }
}
}
