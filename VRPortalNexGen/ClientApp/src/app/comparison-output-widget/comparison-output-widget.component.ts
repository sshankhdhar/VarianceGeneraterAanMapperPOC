import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-comparison-output-widget',
  templateUrl: './comparison-output-widget.component.html',
  styleUrls: ['./comparison-output-widget.component.css']
})
export class ComparisonOutputWidgetComponent implements OnInit {
  @Input() comparisonResult: Result[] = [];
  @Input() selectedRow:any;
  @Input() columnDefs: any;
  constructor(public activeModal: NgbActiveModal) {     
  }
  ngOnInit() {    
  }
}
interface Result {
  Result: ComparisonResult;
}
class ComparisonResult {
  Column1: string[];
  Column2: string[];
  Percentage: number[];
}
