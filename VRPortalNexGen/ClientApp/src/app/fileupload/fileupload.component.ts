import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VrportalService } from '../vrportal.service';
import { ComparisonResult } from '../Models/comparison-result';
import { DataSourceColumnList } from '../Models/data-source-column-list';
import { ColumnList } from '../Models/column-list';
import { SiblingComponentDataSharingService } from '../Services/component.2way.databinding.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent {
  selectedFile: File = null;
  source: string = null;
  source1 = 'FileSource1';
  source2 = 'FileSource2';
  dataSourceColumnList1: DataSourceColumnList;
  dataSourceColumnList2: DataSourceColumnList;
  dataSourceColumnList: DataSourceColumnList[] = [];
  public comparisonResult: ComparisonResult;
  public chartData: ComparisonResult;
  subscription: Subscription;

  constructor(
    private http: HttpClient, private vrportalservice: VrportalService,
    private siblingComponentDataSharingService: SiblingComponentDataSharingService) {

    this.subscription = this.siblingComponentDataSharingService.DataSourceColumnList$.subscribe(message =>
      this.checkIndex(this.dataSourceColumnList.findIndex((x: DataSourceColumnList) => x.Source === message.Source), message));
  }

  checkIndex(index: any, dataSourceColumnListObject: DataSourceColumnList) {
    dataSourceColumnListObject.RequestType = 'immediate';
    if (index >= 0) { this.dataSourceColumnList[index] = dataSourceColumnListObject; } else {
      this.dataSourceColumnList.push(dataSourceColumnListObject);
    }
    if (dataSourceColumnListObject.Source === 'FileSource1') {
      this.dataSourceColumnList1 = dataSourceColumnListObject;
    }
    if (dataSourceColumnListObject.Source === 'FileSource2') {
      this.dataSourceColumnList2 = dataSourceColumnListObject;
    }
  }

  onCompare() {

    this.vrportalservice
      .createService('http://localhost:58487/' + 'api/DataCompare/CompareColumns', this.dataSourceColumnList)
      .subscribe(
        result => { this.comparisonResult = this.chartData = result, console.log(result); },
        error => console.log(error as any)
      );
    console.log("Res-chartData" + this.chartData);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
