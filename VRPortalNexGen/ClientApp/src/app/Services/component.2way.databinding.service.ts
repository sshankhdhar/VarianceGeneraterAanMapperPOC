import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {DataSourceColumnList} from '../Models/data-source-column-list';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class SiblingComponentDataSharingService {
  private DataSourceColumnList = new Subject<DataSourceColumnList>();

  DataSourceColumnList$ = this.DataSourceColumnList.asObservable();

  constructor() { }

  watchDataSourceColumnList(message: DataSourceColumnList) {
    if (message !== undefined) {
    this.DataSourceColumnList.next(message);
    console.log(message);
    }
  }
}
