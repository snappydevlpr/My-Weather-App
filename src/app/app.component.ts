import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { WeatherService } from './weather.service'
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  location = ""
  location$: Observable<string>;
  currentWeather: any = <any>{};
  maxTmps = []
  minTmps = []
  maxDailyTmps = []
  minDailyTmps = []
  msg: string;

  constructor(private store: Store<any>, private weatherService: WeatherService) {
    this.location$ = store.pipe(select('location'));
    this.location$.subscribe(location => {
      this.location = location;

    })
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
      this.currentWeather = res;
      console.log(this.currentWeather)
      this.setTemps()
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

  public setTemps() {
    for (var index = 0; index < this.currentWeather.list.length; index++) {
      this.maxTmps[index] = ((this.currentWeather.list[index].main.temp_max - 273.15) * 9 / 5 + 32).toFixed(2);
      this.minTmps[index] = ((this.currentWeather.list[index].main.temp_min - 273.15) * 9 / 5 + 32).toFixed(2);
    }
    this.getDailyHighs()
    this.getDailyLows()
  }

  public getDailyHighs() {
    var day = (this.currentWeather.list[0].dt_txt).split(" ");
    var highTmp = -Infinity

    for (var index = 0; index < this.currentWeather.list.length; index++) {
      var x = (this.currentWeather.list[index].dt_txt).split(" ")
      if (day[0] === x[0]) {
        if (highTmp < this.maxTmps[index]) {
          highTmp = this.maxTmps[index]
        }
      }
      else {
        day = x
        this.maxDailyTmps.push(highTmp);
        highTmp = this.maxTmps[index]
      }
    }
  }

  public getDailyLows() {
    var day = (this.currentWeather.list[0].dt_txt).split(" ");
    var minTmp = Infinity

    for (var index = 0; index < this.currentWeather.list.length; index++) {
      var x = (this.currentWeather.list[index].dt_txt).split(" ")
      if (day[0] === x[0]) {

        if (minTmp > this.minTmps[index]) {
          minTmp = this.minTmps[index]
        }
      }
      else {
        day = x
        this.minDailyTmps.push(minTmp);
        minTmp = this.minTmps[index]
      }
    }
  }

  public clearPreviousSearch(){
    this.maxTmps = []
    this.minTmps = []
    this.maxDailyTmps = []
    this.minDailyTmps = []
  }

}
