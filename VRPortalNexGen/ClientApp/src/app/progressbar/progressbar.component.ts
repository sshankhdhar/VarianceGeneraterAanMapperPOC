import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css']
})
export class ProgressbarComponent implements OnInit {
  @Input('ProgressPercentage') ProgressPercentage: number;
  constructor() { }

  ngOnInit() {
  }

}
