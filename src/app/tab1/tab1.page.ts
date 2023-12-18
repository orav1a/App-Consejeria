import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { FirestorageService } from '../services/firestorage.service';
import { OpenWeatherService } from '../services/openweather.service';
import { FeriadoService } from "../services/feriado.service"


// Definir un mapeo de descripciones en inglés a español
const weatherDescriptionMapping: { [key: string]: string } = {
  'clear sky': 'Cielo despejado',
  'few clouds': 'Pocas nubes',
  'scattered clouds': 'Nubes dispersas',
  'broken clouds': 'Nubes rotas',
  'overcast clouds': 'Nublado',
  'shower rain': 'Aguacero',
  'rain': 'Lluvia',
  'light rain': 'Lluvia ligera',
  'moderate rain': 'Lluvia moderada',
  'heavy rain': 'Lluvia intensa',
  'thunderstorm': 'Tormenta',
  'snow': 'Nieve',
  'mist': 'Niebla',
};

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  weatherData: any; // Esta propiedad contendrá los datos climáticos
  data: any = [];
  disponibles: any = [];
  totalDisponibles: number = 0;
  feriados: any;
  feria2: any = [];
  feriadoMasCercano: any = {};
  idIcon!: string;
  urlIcon!: string;




  constructor(
    private feriadoService: FeriadoService,
    private fireService: FirestorageService,
    private openWeatherService: OpenWeatherService) { 
      
    }

  ngOnInit() {
    // Obtener los datos del servicio Firestorage
    this.fireService.obtenerDoc().subscribe(doc => {
      console.log(doc);

      // Filtra los documentos con 'disponible' igual a true
      this.data = doc.filter(item => item.disponible === true);

      // Calcula el total de documentos disponibles
      this.totalDisponibles = this.data.length;
    });

    // Obtén los datos climáticos y asígnalos a weatherData
    this.openWeatherService.getWeatherByCoordinates(-33.5922, -70.6992).subscribe(data => {
      // Convertir la temperatura de Kelvin a Celsius y redondear
      this.weatherData = data;
      console.log(this.weatherData);
      this.weatherData.main.temp = Math.round(this.weatherData.main.temp - 273.15); // Restar 273.15, luego redondear
      this.idIcon = this.weatherData.weather[0].icon;
      this.urlIcon = 'https://openweathermap.org/img/wn/' + this.idIcon + '@2x.png'
      console.log(this.urlIcon);


      // Obtener la descripción del clima en inglés
      const weatherDescriptionInEnglish = this.weatherData.weather[0].description;

      // Traducir la descripción al español utilizando el mapeo
      const weatherDescriptionInSpanish = weatherDescriptionMapping[weatherDescriptionInEnglish];

      // Reemplazar la descripción en inglés con la traducción en español
      this.weatherData.weather[0].description = weatherDescriptionInSpanish;


    });

    this.feriadoService.getFeriados().subscribe((data: any) => {
      const fechaActual = new Date();

      this.feriados = data;
      this.feria2 = this.feriados.data;

      const feriadosFuturos = this.feria2.filter((feriado: any) => new Date(feriado.date) >= fechaActual);

      if (feriadosFuturos.length > 0) {
        feriadosFuturos.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
        this.feriadoMasCercano = feriadosFuturos[0];
      }


    });

  }


}
