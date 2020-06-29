import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ComparisonResult } from '../Models/comparison-result'
@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {
  @Input() chartData: ComparisonResult;
  public chartResult: ChartResult[] = [];
  public columnName: string[];
  public matchCount: number;
  public notMatchCount: number;
  public NotMatchCount1: number;
  public NotMatchCount2: number;
  public NotMatchCount3: number;
  
  public DisplayParent: boolean=false;
  public DisplayChild: boolean=false;
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        }
      },
    }
  };
  public pieChartData: SingleDataSet;
  public pieChartLabels: Label[];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];

  public detailPieChartData: SingleDataSet;
  public detailPieChartLabels: Label[];
  public detailPieChartType: ChartType = 'pie';
  public detailPieChartLegend = true;
  public detailPieChartPlugins = [pluginDataLabels];

  constructor() {
  }

  ngOnInit() {
    this.DisplayParentChart();
  }
  ngOnChanges() {
    this.DisplayParentChart();
  }
  public DisplayParentChart()
  {
      this.DisplayParent=true;
      this.DisplayChild=false;  
      this.matchCount = 0;
      this.notMatchCount = 0;
      this.columnName=[];
      this.chartResult=[];
    for (var columnIndex = 0; columnIndex < this.chartData.ColumnSet.length; columnIndex++) {
      if (this.chartData.ColumnSet[columnIndex].includes("Similarity")) {
        this.columnName.push(this.chartData.ColumnSet[columnIndex]);
      }
    }
    for (var i = 0; i < this.chartData.RowSet.length; i++) {
      for (var j = 0; j < this.columnName.length; j++) {
        const SimilarityValue: number =this.chartData.RowSet[i][this.columnName[j]];
        if (SimilarityValue == 100) {
          this.matchCount++;
        }
        else {
          this.notMatchCount++;
        }
      }
    }
    this.chartResult = [{ ChartRange: "Match (100%)", Count: this.matchCount }, { ChartRange: "Not Match (<100%)", Count: this.notMatchCount }];
    this.pieChartLabels = [this.chartResult[1].ChartRange, this.chartResult[0].ChartRange];
    this.pieChartData = [this.chartResult[1].Count, this.chartResult[0].Count];
  }
  public chartClicked(event) { 
    if(this.DisplayParent===true)
    {
      this.DisplayParent=false;
      this.DisplayChild=true;            
      this.DisplayChildChart();
    }
    else
    {
      this.DisplayParent=true;
      this.DisplayChild=false;
      this.DisplayParentChart();
    }
  }
  public DisplayChildChart()
  {
      this.DisplayParent=false;
      this.DisplayChild=true;  
      this.NotMatchCount1= 0;
      this.NotMatchCount2= 0;
      this.NotMatchCount3= 0;
      this.columnName=[];
      this.chartResult=[];

      for (var columnIndex = 0; columnIndex < this.chartData.ColumnSet.length; columnIndex++) {
        if (this.chartData.ColumnSet[columnIndex].includes("Similarity")) {
          this.columnName.push(this.chartData.ColumnSet[columnIndex]);
        }
      }

    for (var i = 0; i < this.chartData.RowSet.length; i++) {
      for (var j = 0; j < this.columnName.length; j++) {
        const SimilarityValue: number =this.chartData.RowSet[i][this.columnName[j]];        
        if (SimilarityValue >= 90 && SimilarityValue < 100) {
          this.NotMatchCount1++;
        }
        else if(SimilarityValue >= 80 && SimilarityValue < 90)
        {
          this.NotMatchCount2++;
        }
        else if(SimilarityValue < 80)
        {
          this.NotMatchCount3++;
        }
      }
    }
    this.chartResult = [{ ChartRange: "Match (90%-99%)", Count: this.NotMatchCount1 }, { ChartRange: "Match (80%-90%)", Count: this.NotMatchCount2 },{ ChartRange: "Match (<80%)", Count: this.NotMatchCount3 }];
    this.detailPieChartLabels = [this.chartResult[0].ChartRange, this.chartResult[1].ChartRange,this.chartResult[2].ChartRange];
    this.detailPieChartData = [this.chartResult[0].Count, this.chartResult[1].Count,this.chartResult[2].Count];
  }
}
interface ChartResult {
  ChartRange: string;
  Count: number;
}