import { Component, OnInit, OnDestroy } from '@angular/core';
import { DevicesService } from '../services/devices.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-dash-admin',
  templateUrl: './dash-admin.component.html',
  styleUrls: ['./dash-admin.component.css']
})
export class DashAdminComponent implements OnInit, OnDestroy {
  errorMessage: string = '';
  lastValues: any[] = [];
  private pollingSubscription: Subscription | undefined;

  constructor(private devicesService: DevicesService) { }

  ngOnInit(): void {
    this.fetchData();
    this.startPolling();
  }

  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe(); // Clean up the polling subscription
    }
  }

  private fetchData(): void {
    this.devicesService.getLastValues().subscribe(
      (data: any[]) => {
        this.lastValues = data;
      },
      (error: any) => {
        this.errorMessage = 'Erreur lors de la récupération des données.';
        console.error(error);
      }
    );
  }

  private startPolling(): void {
    this.pollingSubscription = interval(5000).subscribe(() => { // Poll every 5 seconds
      this.fetchData();
    });
  }
  // Add this method in DashAdminComponent
  getDynamicFields(deviceData: any): { name: string, value: any }[] {
    return Object.keys(deviceData)
      .filter(key => key !== 'DevEUI' && key !== '_id') // Filter out 'DevEUI' and '_id'
      .map(key => ({ name: key, value: deviceData[key] }));
  }
  

}
