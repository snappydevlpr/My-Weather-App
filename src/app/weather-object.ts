import {WeatherService} from './weather.service'
export class WeatherObject {

    private data: Array<object> = []
    private minTemp: Array<any>;
    private maxTemp: Array<any>;
    private city: string ='';
    private weatherReading: Array<any>;
    private weatherIcons: Array<string> = [];
    private dailyTemps: Array<any> = []
    private days: Array<any> = []

    constructor() {
    }

    private  weatherIndicator = {
        "sunny": 0,
        "clouds": 1,
        "rain": 2,
        "wind": 3,
        "snow": 4,
        "thunder": 5,
        "lightining": 6,
        "tornado": 7,
    }

    private DAYS_OF_THE_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    public getDailyTemps(): Array<any>{
        return this.dailyTemps
    }

    public getData(): Array<object>{
        return this.data
    }

    public getDays(): Array<any>{
        return this.days
    }
    
    public getMinTemp(): Array<any> {
        return this.minTemp;
    }

    public getMaxTemp(): Array<any>{
        return this.maxTemp;
    }
    public getCity():string{
        return this.city
    }

    public setData():void{
        for(let i = 0; i < 5; i++){
            this.data.push({
                day: this.days[i],
                maxC: this.maxTemp[i],
                minC: this.minTemp[i],
                maxF: (this.maxTemp[i]* 9/5) + 32 ,
                minF: (this.minTemp[i]* 9/5) + 32 ,
                icon: (this.weatherIcons[i]),
            })
        }
    }

    public setDay(today: Date):void{
        for( let i =0 ; i<5; i++){
            this.days.push(this.DAYS_OF_THE_WEEK[today.getDay()])
            today.setDate(today.getDate()+1)
        }
    }

    public setWeatherReadings(weather: Array<any>):void{
        this.weatherReading = Object.assign([],weather)
        this.weatherIndicator[this.weatherReading[0].toLowerCase()]
        this.getWeatherPicture()
    }
    public setCity(location:string):void{
        this.city=location
    }

    public setDailyTemps(): void{
        for(let i = 0; i < this.maxTemp.length; i++){
            this.dailyTemps.push([this.minTemp[i],this.minTemp[i]])
        }
    }

    public setMinTemp(temp: Array<any>): void {
       this.minTemp = Object.assign([], temp);
    }

    public setMaxTemp(temp: Array<any>): void {
        this.maxTemp = Object.assign([],temp)
    }

    public getWeatherPicture() {
        for(let i =0; i<5; i++){
            switch (this.weatherIndicator[this.weatherReading[i].toLowerCase()]) {
                case 0: this.weatherIcons.push("001-sunny.png")
                    break
                case 1: this.weatherIcons.push("002-cloudy.png")
                    break
                case 2: this.weatherIcons.push("003-rain.png")
                    break
                case 3: this.weatherIcons.push("024-wind.png")
                    break
                case 4: this.weatherIcons.push("021-snow.png")
                    break
                case 5:
                case 6:
                    this.weatherIcons.push("006-storm.png")
                    break
                case 7: this.weatherIcons.push("038-tornado.png")
                    break
                default:
                    this.weatherIcons.push("040-earth.png")
            }
        }
       
    }
}