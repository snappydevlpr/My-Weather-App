import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatInputModule} from '@angular/material/input'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { StoreModule } from '@ngrx/store';
import {locationState} from './location-state';
import {MatButtonModule} from '@angular/material/button';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import {MatCardModule} from '@angular/material/card';
@NgModule({
  declarations: [
    AppComponent,
    WeatherCardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    StoreModule.forRoot({
      location: locationState
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
