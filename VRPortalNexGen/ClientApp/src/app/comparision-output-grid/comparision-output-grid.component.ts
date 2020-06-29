import { Component, OnInit , Input, Inject } from '@angular/core';
import { VrportalService } from '../vrportal.service';
import {ComparisonResult} from '../Models/comparison-result';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ComparisonOutputWidgetComponent} from '../comparison-output-widget/comparison-output-widget.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataSourceColumnList } from '../Models/data-source-column-list';
@Component({
  selector: 'app-comparision-output-grid',
  templateUrl: './comparision-output-grid.component.html',
  styleUrls: ['./comparision-output-grid.component.scss']
})
export class ComparisionOutputGridComponent implements OnInit {

  @Input() comparisonResult: ComparisonResult;
  @Input() dataSourceColumnList: DataSourceColumnList[] ;
  columnDefs: any = [];
  rowData: any = [];
  selectedRow: any = [];
  BaseUrl: string;
  ngOnChanges(changes: any) {
    this.columnDefs = [];
    this.comparisonResult.ColumnSet.forEach(element => {
      this.columnDefs.push({ headerName: element, field: element, sortable: true, filter: true});
        });

    this.rowData = this.comparisonResult.RowSet;
  }
    // {headerName: 'Model', field: 'model' },
    // {headerName: 'Make', field: 'make' }
  constructor( @Inject('BASE_URL') baseUrl: string, private vrportalservice: VrportalService, private modalService: NgbModal) {
    this.BaseUrl = baseUrl;
  }
  onRowClicked(event) {
    this.selectedRow = event.node.data;
    console.log('row' + JSON.stringify(this.selectedRow) + ' selected = ' + event.node.selected);
    const modalRef = this.modalService.open(ComparisonOutputWidgetComponent);
    modalRef.componentInstance.selectedRow = this.selectedRow;
    modalRef.componentInstance.columnDefs = this.columnDefs;
  }
  ngOnInit() {
  }

  onExport() {
    this.vrportalservice
    .DownloadExcelFile('http://localhost:58487/' + 'api/ReportExport/ExcelExport', this.dataSourceColumnList)
    .subscribe(
        result => {
          const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
          // const objectUrl = URL.createObjectURL(blob);
          // window.open(objectUrl);
          const url = window.URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.download = 'VarianceReport.xls';
          anchor.href = url;
          anchor.click();
         } ,
        error => console.log(error as any)
    );
  }

  onSaveConfiguration() {
    this.vrportalservice
    .createService(this.BaseUrl + 'AzureStorage/SaveConfiguration', this.dataSourceColumnList)
    .subscribe(
        result => {
          console.log(result);
         } ,
        error => console.log(error as any)
    );
  }
}
