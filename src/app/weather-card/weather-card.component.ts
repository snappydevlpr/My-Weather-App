import { Component, OnInit, Input } from '@angular/core';
import {WeatherObject} from '../weather-object'
@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {
  private  weatherDetails = undefined
  @Input() weather:object

  constructor() { 
    this.weatherDetails = new WeatherObject()
  }


  ngOnInit() {
  }

}
