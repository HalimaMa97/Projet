import { Component, OnInit, ViewChild, Input,ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as dates_data from 'src/assets/covid19.json';
import * as region_data from 'src/assets/region_cas.json';
@Component({
  selector: 'app-visualiseur',
  templateUrl: './visualiseur.component.html',
  styleUrls: ['./visualiseur.component.scss']
})

export class VisualiseurComponent implements OnInit {
  
  @ViewChild('chart',{static:true})
  private chartContainer: ElementRef;

  @Input() data: any;
  margin = {top: 20, right: 20, bottom: 30, left: 40};
  private dates_data: any=(dates_data as any).default;
  private region_data: any=(region_data as any).default;
  private dates:any=[];
  private regions:any=[];
  private cas_region:any=[];
  private cas_date:any=[];
  constructor() {
    
    this.getData();
    this.data=this.region_data;
    console.log(this.cas_region);
    console.log(Math.max(...this.cas_region));

   }

  ngOnInit() {
    this.data=this.region_data;
    if (!this.data) { console.log("no dataa");return; }

    this.createChart();

    
  }
  // get data to visualize in chart
  getData(){
    for( let i=0; i<this.dates_data.length;i++){
      
      this.dates.push(this.dates_data[i].date);
      this.cas_date.push(this.dates_data[i].Nombre_cas);
          }
    for( let i=0; i<this.region_data.length;i++){
          this.regions.push(this.region_data[i].région);
          this.cas_region.push(this.region_data[i].Nombre_cas);
                }
  }
  createChart() {
    d3.select('svg').remove();

    const element = this.chartContainer.nativeElement;
    const data = this.data;

    const svg = d3.select(element).append('svg')
        .attr('width', element.offsetWidth)
        .attr('height', element.offsetHeight);

    const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

    const x = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.1)
      .domain(data.map(d => d.région));

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, Math.max(...this.cas_region)]);

    const g = svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10, '%'))
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Nombre de cas confirmés');

        g.selectAll('.bar')
        .data(data)
        .enter().append('rect')
          .attr('class', 'bar');
  }
  

}
