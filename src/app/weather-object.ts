export class WeatherObject {
    private minTemp: number;
    private maxTemp: number;
    private weather: string;

    constructor() {
    }

    private weatherIndicator = {
        "sunny": 0,
        "cloudy": 1,
        "rainy": 2,
        "windy": 3,
        "snow": 4,
        "thunder": 5,
        "lightining": 6,
        "tornado": 7,
    }

    public getMinTemp(): number {
        return this.minTemp;
    }

    public getMaxTemp(): number {
        return this.maxTemp;
    }

    public getWeather(): string {
        return this.weather;
    }

    public setMinTemp(temp: number): void {
        this.minTemp = temp
    }

    public setMaxTemp(temp: number): void {
        this.maxTemp = temp
    }

    public setWeather(weatherReading: string): void {
        this.weather = weatherReading
    }

    public getWeatherPicture(weather: string) {
        var imageWeather: string = ""
        switch (this.weatherIndicator[weather.toLowerCase()]) {
            case 0: imageWeather = "001-sunny.png"
                break
            case 1: imageWeather = "002-cloudy.png"
                break
            case 2: imageWeather = "003-rain.png"
                break
            case 3: imageWeather = "024-wind.png"
                break
            case 4: imageWeather = "021-snow.png"
                break
            case 5:
            case 6:
                imageWeather = "006-storm.png"
                break
            case 7: imageWeather = "038-tornado.png"
                break
            default:
                imageWeather = "040-earth.png"
        }
    }


}