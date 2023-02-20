const OPEN_WEATHER_API_KEY = 'bf257bccb692945cbea0b04778fdbd4c'

export interface OpenWeatherData{
    name: string
    main: {
        feels_like: number
        humidity: number
        pressure: number
        temp: number
        temp_max: number
        temp_min: number
    }
    weather: {
        description: string
        icon: string
        id: number
        main: string
    }[]
    wind: {
        deg: number
        speed: number
    }
}

export async function fetchOpenWeatherData(city: string): Promise<OpenWeatherData>{
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric`)

    if (!res.ok) {
        throw new Error('City not fount')
    }

    const data: OpenWeatherData = await res.json()
    return data
}