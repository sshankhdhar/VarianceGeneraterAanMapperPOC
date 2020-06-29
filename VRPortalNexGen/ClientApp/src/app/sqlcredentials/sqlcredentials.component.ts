import { Component, OnInit } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import{DataSourceColumnList} from '../Models/data-source-column-list'
@Component({
  selector: 'app-sqlcredentials',
  templateUrl: './sqlcredentials.component.html',
  styleUrls: ['./sqlcredentials.component.scss']
})
export class SqlcredentialsComponent implements OnInit {
  windowsflag:boolean=false;
  sqlflag:boolean=false;
  credentialType="Windows";  
  dbServerUserName;
  dbServerPassword;
  public DataSourceColumns = new DataSourceColumnList();
  constructor(public activeModal: NgbActiveModal) {     
    this.DataSourceColumns.AuthenticationType=this.credentialType;
    this.DataSourceColumns.UserName="";
    this.DataSourceColumns.Password="";
  }

  ngOnInit() {
  }
  handleChange(event)
  {
    console.log("assam");
    this.DataSourceColumns.AuthenticationType=event.target.value;
    if(event.target.value==="Windows")
    {
      this.windowsflag=true;
      this.sqlflag=false;
      
    }
    else
    {
      this.windowsflag=false;
      this.sqlflag=true;
    }
  }
  onSubmit()
  {
    this.DataSourceColumns.UserName=this.dbServerUserName;
    this.DataSourceColumns.Password=this.dbServerPassword;    
    this.activeModal.close(this.DataSourceColumns);    
  }
}

