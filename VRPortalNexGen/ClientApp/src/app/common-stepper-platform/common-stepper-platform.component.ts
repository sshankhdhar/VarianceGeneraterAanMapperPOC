import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DataSourceColumnList } from '../Models/data-source-column-list';
import { SiblingComponentDataSharingService } from '../Services/component.2way.databinding.service';
import { MatStepper } from '@angular/material';
import { ComparisonResult } from '../Models/comparison-result';
import { HttpParams, HttpClient } from '@angular/common/http';
import { VrportalService } from '../vrportal.service';
import { LoaderService } from '../Services/loader.service';

@Component({
  selector: 'app-common-stepper-platform',
  templateUrl: './common-stepper-platform.component.html',
  styleUrls: ['./common-stepper-platform.component.scss']
})
export class CommonStepperPlatformComponent implements OnInit {
  state$: Observable<object>;
  dataSourceColumnList: DataSourceColumnList[] = [];
  StepNumber: number;
  public DataSourceType1: any;
  public DataSourceType2: any;
  subscription: Subscription;
  dataSourceObject1 = new DataSourceColumnList();
  dataSourceObject2 = new DataSourceColumnList();
  // public comparison: Result[] = [];
  public comparisonResult: ComparisonResult;
  strColumnName: string;
  BaseUrl: any;
  loading = 0;
  constructor(private router: Router, @Inject('BASE_URL') baseUrl: string,
              private siblingComponentDataSharingService: SiblingComponentDataSharingService,
              private http: HttpClient, private vrportalservice: VrportalService,
              private loaderService: LoaderService) {
                this.BaseUrl = baseUrl;
                this.loaderService.isLoading.subscribe((v) => {
                  console.log(v);
                  this.loading = v;
                });
                this.StepNumber = 1;

                this.dataSourceObject1.Source = 'DataSource1';
                this.dataSourceObject1.Flag.IsColumnAvailable = false;
                this.dataSourceObject1.Flag.IsDBAvailable = false;
                this.dataSourceObject1.Flag.IsDatabaseSelected = false;
                this.dataSourceObject1.Flag.IsQuerySelected = false;
                this.dataSourceObject1.Flag.IsResultAvailable = false;
                this.dataSourceObject1.Flag.IsStoredProcedureAvailable = false;
                this.dataSourceObject1.Flag.IsTableAvailable = false;
                this.dataSourceObject1.Flag.show = false;
                this.dataSourceObject1.Flag.sqlflag = false;
                this.dataSourceObject1.Flag.windowsflag = false;

                this.dataSourceObject2.Source = 'DataSource2';
                this.dataSourceObject2.Flag.IsColumnAvailable = false;
                this.dataSourceObject2.Flag.IsDBAvailable = false;
                this.dataSourceObject2.Flag.IsDatabaseSelected = false;
                this.dataSourceObject2.Flag.IsQuerySelected = false;
                this.dataSourceObject2.Flag.IsResultAvailable = false;
                this.dataSourceObject2.Flag.IsStoredProcedureAvailable = false;
                this.dataSourceObject2.Flag.IsTableAvailable = false;
                this.dataSourceObject2.Flag.show = false;
                this.dataSourceObject2.Flag.sqlflag = false;
                this.dataSourceObject2.Flag.windowsflag = false;

                this.state$ = this.router.events.pipe(
      filter(e => e instanceof NavigationStart),
      map(() => {
        const currentNav = this.router.getCurrentNavigation();
        return currentNav.extras.state;
      })
    );

                this.subscription = this.siblingComponentDataSharingService
      .DataSourceColumnList$
      .subscribe(message => {
        this.dataSourceObject1.Source = 'DataSource1';
        this.dataSourceObject2.Source = 'DataSource2';
        if (message.Source === this.dataSourceObject1.Source) {
          this.dataSourceObject1 = message;
          console.log(this.dataSourceObject1);
        }
        if (message.Source === this.dataSourceObject2.Source) {
          this.dataSourceObject2 = message;
          console.log(this.dataSourceObject2);
        }
      });
  }

  ngOnInit() {
  }
  onNavigateDataSource1() {
    this.router.navigate(['common-platform', this.DataSourceType1], { state: { datasource: this.dataSourceObject1 } });
  }
  onNavigateDataSource2() {
    this.router.navigate(['common-platform', this.DataSourceType2], { state: { datasource: this.dataSourceObject2 } });
  }
  goBack(stepper: MatStepper) {
    this.StepNumber--;
    this.dataSourceObject1.Source = 'DataSource1';
    this.dataSourceObject2.Source = 'DataSource2';
    stepper.previous();
    if (this.StepNumber === 1 && this.DataSourceType1 !== undefined) {
      this.router.navigate(['common-platform', this.DataSourceType1], { state: { datasource: this.dataSourceObject1 } });
    } else if (this.StepNumber === 2 && this.DataSourceType2 !== undefined) {
      this.router.navigate(['common-platform', this.DataSourceType2], { state: { datasource: this.dataSourceObject2 } });
    } else {
      this.router.navigate(['common-platform']);
    }
  }

  goForward(stepper: MatStepper) {
    this.StepNumber++;
    this.dataSourceObject1.Source = 'DataSource1';
    this.dataSourceObject2.Source = 'DataSource2';
    stepper.selected.completed = true;
    if (this.StepNumber === 1 && this.DataSourceType1 !== undefined) {
    stepper.next();
    this.router.navigate(['common-platform', this.DataSourceType1], { state: { datasource: this.dataSourceObject1 } });
    } else if (this.StepNumber === 2 && this.DataSourceType2 !== undefined) {
    stepper.next();
    this.router.navigate(['common-platform', this.DataSourceType2], { state: { datasource: this.dataSourceObject2 } });
    } else if (this.StepNumber === 4 && this.DataSourceType2 !== undefined) {
      this.GetComparePercentage().subscribe(
        result => {stepper.next();
    }
      );
    } else {
    stepper.next();
    this.router.navigate(['common-platform']);
    }
  }

  GetComparePercentage(): Observable<any> {
    this.dataSourceObject1.DataSourceType = this.DataSourceType1;
    this.dataSourceObject2.DataSourceType = this.DataSourceType2;
    for (let i = 0; i < this.dataSourceObject1.ColumnNameList.length; i++) {
      if (i === 0) {
        this.strColumnName = this.dataSourceObject1.ColumnNameList[i].ColumnName;
      } else {
        this.strColumnName =
          this.strColumnName + ',' + this.dataSourceObject1.ColumnNameList[i].ColumnName;
      }
    }
    this.dataSourceObject1.ColumnName = this.strColumnName;

    this.strColumnName = '';

    for (let i = 0; i < this.dataSourceObject2.ColumnNameList.length; i++) {
      if (i === 0) {
        this.strColumnName = this.dataSourceObject2.ColumnNameList[i].ColumnName;
      } else {
        this.strColumnName =
          this.strColumnName + ',' + this.dataSourceObject2.ColumnNameList[i].ColumnName;
      }
    }
    this.dataSourceObject2.ColumnName = this.strColumnName;
    // if (this.DataSourceType1 === 'db-source' && this.DataSourceType2 === 'db-source') {
    //   let body: HttpParams = new HttpParams();
    //   body = body.append('DBDetailsObj1', JSON.stringify(this.dataSourceObject1));
    //   body = body.append('DBDetailsObj2', JSON.stringify(this.dataSourceObject2));
    //   this.http
    //     .post('http://localhost:58487/api/VRDb/CompareColumns', body)
    //     .subscribe(
    //       (data: ComparisonResult) => {
    //         // this.comparison = data
    //         this.comparisonResult = data;
    //         //return of(data);
    //       },
    //       error => {
    //         console.error(error);
    //         alert(error.error.ExceptionMessage);
    //         //return of(error);
    //       }
    //     );
    // } else {
    this.dataSourceColumnList = [];
    this.dataSourceColumnList.push(this.dataSourceObject1, this.dataSourceObject2);
    this.vrportalservice
        .createService(this.BaseUrl + 'Comparision/CompareColumns', this.dataSourceColumnList)
        .subscribe(
          result => { this.comparisonResult = result,
                      console.log(result);
                      //return of(result);
            },
          error => {console.log(error as any);
                    //return of(error);
          }
        );
    // }
    return of('');

  }



  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}

interface Result {
  Result: ComparisonResult;
}

