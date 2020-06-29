
import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { VrportalService } from '../vrportal.service';
import {ComparisonResult} from '../Models/comparison-result';
import {DataSourceColumnList} from '../Models/data-source-column-list';
import {SiblingComponentDataSharingService} from '../Services/component.2way.databinding.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-schedulefilereport',
  templateUrl: './schedulefilereport.component.html',
  styleUrls: ['./schedulefilereport.component.scss']
})
export class SchedulefilereportComponent implements OnInit {
  @ViewChild('filedetails1', { static: true }) filedetails1: any;
  @ViewChild('filedetails2', { static: true }) filedetails2: any;
  @ViewChild('calendar', { static: true }) calendar: any;
  selectedFile: File = null;
  source: string = null;
  source1 = 'FileSource1';
  source2 = 'FileSource2';


  dataSourceColumnList1: DataSourceColumnList;
  dataSourceColumnList2: DataSourceColumnList;
  dataSourceColumnList: DataSourceColumnList[] = [];
  comparisonResult: ComparisonResult;
  subscription: Subscription;
  public ScheduleDate: string;

  DataSource1: any;
  DataSource2: any;
  constructor(private http: HttpClient, private vrportalservice: VrportalService,
              private siblingComponentDataSharingService: SiblingComponentDataSharingService) {
      this.subscription = this.siblingComponentDataSharingService.DataSourceColumnList$.subscribe(message =>
        this.checkIndex(this.dataSourceColumnList.findIndex((x: DataSourceColumnList) => x.Source === message.Source), message));
     }

  ngOnInit() {
  }
  checkIndex(index: any, dataSourceColumnListObject: DataSourceColumnList) {
    dataSourceColumnListObject.RequestType = 'schedulejob';
    if (index >= 0) {this.dataSourceColumnList[index] = dataSourceColumnListObject; } else {
      this.dataSourceColumnList.push(dataSourceColumnListObject);
    }
    if (dataSourceColumnListObject.Source === 'FileSource1') {
      this.dataSourceColumnList1 = dataSourceColumnListObject;
    }
    if (dataSourceColumnListObject.Source === 'FileSource2') {
      this.dataSourceColumnList2 = dataSourceColumnListObject;
    }
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  ScheduleReport() {

    this.ScheduleDate =
      this.calendar.datemodel.year +
      '-' +
      this.calendar.datemodel.month +
      '-' +
      this.calendar.datemodel.day +
      ' ' +
      this.calendar.timemodel.hour +
      ':' +
      this.calendar.timemodel.minute;

    const fd = new FormData();
    fd.append('File1', this.dataSourceColumnList[0].SourceFile, this.dataSourceColumnList[0].FileName);
    fd.append('File2', this.dataSourceColumnList[1].SourceFile, this.dataSourceColumnList[1].FileName);
    fd.append('FileDetailsObj', JSON.stringify(this.dataSourceColumnList));
    fd.append('ScheduleDate', JSON.stringify(this.ScheduleDate));

    this.http
        .post(
          'http://localhost:58487/' + 'api/ScheduleReport/ScheduleCompareFileReport',
          fd
        )
        .subscribe(
          (data: any) => {alert("Report scheduled successfully");},
          error => {
            console.error(error);
            alert('Something went wrong. Please try again.');
          }
        );
  }

}
