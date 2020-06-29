import { Component, OnInit ,Input} from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import{DataSourceColumnList} from '../Models/data-source-column-list'

@Component({
  selector: 'app-sqlspparameter',
  templateUrl: './sqlspparameter.component.html',
  styleUrls: ['./sqlspparameter.component.scss']
})
export class SqlspparameterComponent implements OnInit {
  @Input() storedProcedureParameterNameList: StoredProcedureParameterNameList[];
  public DataSourceColumns = new DataSourceColumnList();
  SpParameterValue: any = {};
  constructor(public activeModal: NgbActiveModal) { 
    console.log(this.storedProcedureParameterNameList);
  }

  ngOnInit() {
  }
  onSubmit()
  {
    this.DataSourceColumns.UserName="sa";
    this.DataSourceColumns.SpParameterValue=this.SpParameterValue;
    this.activeModal.close(this.DataSourceColumns);    
    console.log(this.DataSourceColumns.SpParameterValue);
  }
}
export interface StoredProcedureParameterNameList {
  storedProcedureParameterName: string;
}
