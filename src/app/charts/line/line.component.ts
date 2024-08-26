import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexNonAxisChartSeries,
  ApexTooltip
} from "ng-apexcharts";
import { DevicesService } from 'src/app/services/devices.service';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private devicesService: DevicesService, private route: ActivatedRoute) {
    this.chartOptions = {
      series: [],
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: []
      },
      tooltip: {
        x: {
          format: 'dd-MM-yy HH:mm:ss'
        }
      }
    };
  }

  ngOnInit(): void {
    // Récupérer 'DevEUI' à partir des paramètres de route
    this.route.paramMap.subscribe(params => {
      const devEUI = params.get('devEUI');
      if (devEUI) {
        // Appeler le service pour récupérer les données du périphérique sélectionné
        this.devicesService.getDetail(devEUI).subscribe(
          (data: any[]) => {
            console.log('Device details:', data);
            
            // Préparer les données pour le graphique
            const temperatureData = data.map(item => ({
              x: new Date(item.DateTime).getTime() + (60 * 60 * 1000*2), // Ajouter 1 heure en millisecondes
              y: item.Temperature
            }));
            const humidityData = data.map(item => ({
              x: new Date(item.DateTime).getTime() + (60 * 60 * 1000*2), // Ajouter 1 heure en millisecondes
              y: item.Humidity
            }));
            
            // Mettre à jour les séries du graphique
            this.updateChart(temperatureData, humidityData);
          },
          (error) => {
            console.error('Failed to fetch temperature and humidity data', error);
            // Gérer l'erreur (par exemple, afficher un message à l'utilisateur)
          }
        );
      }
    });
  }

  private updateChart(temperatureData: any[], humidityData: any[]) {
    this.chartOptions.series = [
      { name: 'Temperature', data: temperatureData },
      { name: 'Humidity', data: humidityData }
    ];

    // Rafraîchir le graphique avec les nouvelles données
    if (this.chart) {
      this.chart.updateSeries(this.chartOptions.series);
    }
  }
}
