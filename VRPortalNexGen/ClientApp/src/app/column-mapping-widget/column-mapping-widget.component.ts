import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import {SiblingComponentDataSharingService} from '../Services/component.2way.databinding.service';
import {DataSourceColumnList} from '../Models/data-source-column-list';
import { Subject , Subscription} from 'rxjs';


@Component({
  selector: 'app-column-mapping-widget',
  templateUrl: './column-mapping-widget.component.html',
  styleUrls: ['./column-mapping-widget.component.css']
})
export class ColumnMappingWidgetComponent implements OnInit {
  private destroy$ = new Subject();
  @Input() source: string;
  @Input() dataSourceColumnList: DataSourceColumnList;
  subscription: Subscription;
  // @Output() listChange: EventEmitter<ColumnList[]> = new EventEmitter();
  constructor(private dragulaService: DragulaService, private siblingComponentDataSharingService: SiblingComponentDataSharingService) {

  }

  ngOnInit() {
    this.subscription = this.dragulaService.drop(this.source).subscribe((response) => {
      console.log('On Drop called for.', this.dataSourceColumnList.Source);
      this.siblingComponentDataSharingService.watchDataSourceColumnList(this.dataSourceColumnList);
    });
    this.dragulaService.destroy(this.source);
    this.dragulaService.createGroup(this.source, {
      removeOnSpill: true
    });
  }

  // ngOnChanges() {
  //   this.dragulaService.drop().subscribe((response) => {
  //     // this.listChange.emit(this.List);
  //     this.siblingComponentDataSharingService.watchColumn(this.List);
  //   });
  // }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
