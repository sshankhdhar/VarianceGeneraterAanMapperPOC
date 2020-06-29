import { Component, OnInit, Input, Inject} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {DataSourceColumnList} from '../Models/data-source-column-list';
import {ColumnList} from '../Models/column-list';
import {SiblingComponentDataSharingService} from '../Services/component.2way.databinding.service';
import { DataTableFilter } from '../Models/data-table-filter';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoaderService } from '../Services/loader.service';

@Component({
  selector: 'app-file-input-widget',
  templateUrl: './file-input-widget.component.html',
  styleUrls: ['./file-input-widget.component.scss']
})
export class FileInputWidgetComponent implements OnInit {
  // @Input() source: string;
  selectedFile: File = null;
  ColumnList: ColumnList[];
  DataSource: any;
  FileBase64URL: string;
  navigationSubscription;
  state$: Observable<DataSourceColumnList>;
  dataSourceColumns = new DataSourceColumnList();
  loading = 0;
  BaseUrl: any;

  constructor(private http: HttpClient , @Inject('BASE_URL') baseUrl: string, private router: Router, public activatedRoute: ActivatedRoute,
              private siblingComponentDataSharingService: SiblingComponentDataSharingService,
              private loaderService: LoaderService) {
                this.BaseUrl = baseUrl;
                this.loaderService.isLoading.subscribe((v) => {
                  console.log(v);
                  this.loading = v;
                });

                this.navigationSubscription = this.router.events.subscribe((e: any) => {
                // If it is a NavigationEnd event re-initalise the component
                if (e instanceof NavigationEnd) {
                  this.initialiseInvites();
                 }
                });

   }

   initialiseInvites() {
    this.activatedRoute.paramMap
    .pipe(map(() => window.history.state.datasource as DataSourceColumnList)).subscribe(
      result => {this.dataSourceColumns = result, console.log(this.dataSourceColumns); } ,
      error => console.log(error as any)
  );
  }

  ngOnInit() {
  }
  fileexplorer() {
    const element: HTMLElement = document.getElementById('fileexplorer') as HTMLElement;
    element.click();
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0] as File;
    const reader = new FileReader();
    reader.onload = (event: any) => {
                this.FileBase64URL = event.target.result;
            };
    reader.readAsDataURL(event.target.files[0]);
    this.onUpload();
  }

  onUpload() {
    const fd = new FormData();
    fd.append('File', this.selectedFile, this.selectedFile.name);
    fd.append('Source', this.dataSourceColumns.Source);
    this.http.post<any>(this.BaseUrl + 'VRDocument/TranslateExcelFile', fd, {
      reportProgress: true,
    }).subscribe(
      result => {
          this.ColumnList = result;
          // this.DataSource = this.source;
          this.dataSourceColumns.DataSourceType = 'File';
          this.dataSourceColumns.SourceFile = this.selectedFile;
          // this.dataSourceColumns.Source = this.source;
          this.dataSourceColumns.FileName = this.selectedFile.name;
          this.dataSourceColumns.FilePath = this.FileBase64URL;
          this.dataSourceColumns.ColumnNameList = this.ColumnList;
          this.dataSourceColumns.DataTableFilterList = new Array<DataTableFilter>();
          this.siblingComponentDataSharingService.watchDataSourceColumnList(this.dataSourceColumns);

      }, error => {
          this.ColumnList = null;
          console.error(error);
      });
  }

}
