import { Component, OnInit, Input } from '@angular/core';
import {WeatherObject} from '../weather-object'
@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {
  private  weatherDetails = undefined
  private  cityName: string = ""
  private  weatherEntered =false
  @Input() currentWeather:WeatherObject = new WeatherObject
  @Input() isFarenhieht:boolean = false;

  constructor() { 
    this.isFarenhieht = false
  }

  ngOnInit() {
    this.isFarenhieht = false
  }

  ngOnChanges(){
  }

}
