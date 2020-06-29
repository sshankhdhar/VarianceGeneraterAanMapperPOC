import { Component, OnInit, Input } from '@angular/core';
import { DataSourceColumnList } from '../Models/data-source-column-list';
import { ColumnList } from '../Models/column-list';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DataTableFilter } from '../Models/data-table-filter';
import { isNullOrUndefined } from 'util';
@Component({
  selector: 'app-datafilterswidget',
  templateUrl: './datafilterswidget.component.html',
  styleUrls: ['./datafilterswidget.component.scss']
})
export class DatafilterswidgetComponent implements OnInit {
  @Input() dataSourceColumnList1: DataSourceColumnList;
  @Input() dataSourceColumnList2: DataSourceColumnList;
  datemodel1: NgbDateStruct ;
  datemodel2: NgbDateStruct ;

  dateColumnList1: ColumnList[] = [];
  dateColumnList2: ColumnList[] = [];

  loadCommonColumnfilters = false;
  loadDatefilters = false;

  ngOnInit() {
  }
  ngOnChanges(changes: any) {

      for (const propName in changes) {
        if (changes.hasOwnProperty(propName)) {
          if (propName === 'dataSourceColumnList1' && !isNullOrUndefined(this.dataSourceColumnList1)) {
            this.dateColumnList1 = new Array<ColumnList>();
            this.dataSourceColumnList1.ColumnNameList.forEach(obj => {
              if (obj.ColumnName.toLowerCase().indexOf('date') !== -1) {
                this.dateColumnList1.push(obj);
              }
          });
            this.dataSourceColumnList1.DataTableFilterList.push(new DataTableFilter());
            console.log(this.dateColumnList1);
          }
          if (propName === 'dataSourceColumnList2' && !isNullOrUndefined(this.dataSourceColumnList2)) {
            this.dateColumnList2 = new Array<ColumnList>();
            this.dataSourceColumnList2.ColumnNameList.forEach(obj => {
              if (obj.ColumnName.toLowerCase().indexOf('date') !== -1) {
                this.dateColumnList2.push(obj);
              }
          });
            this.dataSourceColumnList2.DataTableFilterList.push(new DataTableFilter());
          }
      }
    }
}
  constructor(calendar: NgbCalendar) {
    this.datemodel2 = {
      year: calendar.getToday().year,
      month: calendar.getToday().month,
      day: calendar.getToday().day
    };
    this.datemodel1 = {
      year: calendar.getToday().year,
      month: calendar.getToday().month,
      day: calendar.getToday().day
    };
  }



  onAddCommonCol() {
  this.loadCommonColumnfilters = true;
  }

  onAddDateCol() {
    this.loadDatefilters = true;
    }

    ondatemodel1Update(event: string) {
     this.dataSourceColumnList1.DataTableFilterList[0].ColumnValue = event;
    }
    ondatemodel2Update(event: string) {
      this.dataSourceColumnList2.DataTableFilterList[0].ColumnValue = event;
     }
}
