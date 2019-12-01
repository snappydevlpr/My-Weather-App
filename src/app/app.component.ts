import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {WeatherObject} from '../app/weather-object'
import { WeatherService } from './weather.service'
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private location:string = ""
  private location$: Observable<string>;
  private currentWeather: any = undefined;
  private myWeather: WeatherObject;
  private weather: Array<any> =[];
  private maxDailyTmps = [];
  private minDailyTmps = [];
  private msg: string;
  isFarenhieht:Boolean;

  constructor(private store: Store<any>, private weatherService: WeatherService) {
    this.location$ = store.pipe(select('location'));
    this.location$.subscribe(location => {
      this.location = location;

    })
    this.myWeather = new WeatherObject
  }

  public getLocation(event: any) {
    this.location = (event.target as HTMLInputElement).value
  }

  public getWeather(): void {
    this.clearPreviousSearch()
    this.searchWeather(this.location);
  }

  public searchWeather(location: string) {
    this.msg = '';
    this.currentWeather = {};
    
    this.weatherService.getCurrentWeather(location).subscribe(res => {
      this.currentWeather = <any>{};
      this.currentWeather = res;
      this.setWeatherInfo()
    },
      err => {
        if (err.error && err.error.message) {
          alert(err.error.message);
          this.msg = err.error.message;
          return;
        }
        alert('Failed to get weather.');
      }, () => { })
  }

  public setWeatherInfo():void{
    this.myWeather = new WeatherObject
    let today:Date = new Date()
    this.setTemps();
    this.myWeather.setCity(this.currentWeather.city.name);
    this.myWeather.setMaxTemp(this.maxDailyTmps)
    this.myWeather.setMinTemp(this.minDailyTmps)
    this.myWeather.setDailyTemps()
    this.myWeather.setDay(today)
    this.myWeather.setWeatherReadings(this.weather)
    this.myWeather.setData()

  }

  public setTemps() {
    this.setDailyHighs()
    this.setDailyLows()
  }

  public setDailyHighs() {
    var day = (this.currentWeather.list[0].dt_txt).split(" ");
    var highTmp = -Infinity
    this.weather.push(this.currentWeather.list[0].weather[0].main.toLowerCase())
    for (var index = 0; index < this.currentWeather.list.length; index++) {
      var x = (this.currentWeather.list[index].dt_txt).split(" ")
      if (day[0] === x[0]) {
        if (highTmp < parseInt(this.currentWeather.list[index].main.temp_max)) {
          
          highTmp = parseInt(this.currentWeather.list[index].main.temp_max)
        }
      }
      else {
        day = x
        this.weather.push(this.currentWeather.list[index].weather[0].main.toLowerCase())
        this.maxDailyTmps.push((highTmp-273.15).toPrecision(2));
        highTmp = parseInt(this.currentWeather.list[index].main.temp_max)
      }
    }
    console.log(this.weather)
    this.maxDailyTmps.push(highTmp-273.15);
  }

  public setDailyLows() {
    var day = (this.currentWeather.list[0].dt_txt).split(" ");
    var minTmp = Infinity

    for (var index = 0; index < this.currentWeather.list.length; index++) {
      var x = (this.currentWeather.list[index].dt_txt).split(" ")
      if (day[0] === x[0]) {
        if (minTmp > parseInt(this.currentWeather.list[index].main.temp_min)) {
          minTmp = parseInt(this.currentWeather.list[index].main.temp_min)
        }
      }
      else {

        day = x
        this.minDailyTmps.push((minTmp-273.15).toPrecision(2));
        minTmp = parseInt(this.currentWeather.list[index].main.temp_min)
      }
    }   
    this.minDailyTmps.push(minTmp-273.15);
  }

  public clearPreviousSearch(){
    this.maxDailyTmps = []
    this.minDailyTmps = []
  }

  public toggleUnit(){
    this.isFarenhieht = !this.isFarenhieht
  }
}
