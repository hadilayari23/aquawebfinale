import { Component } from '@angular/core';
import { Device } from '../interfaces/Device';
import { DevicesService } from '../services/devices.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewers-devices',
  templateUrl: './viewers-devices.component.html',
  styleUrls: ['./viewers-devices.component.css']
})
export class ViewersDevicesComponent {

  devices: Device[] = [];
  
  selectedDeviceId: string | null = null;
  deviceDetails: any = null; // Pour stocker les détails du dispositif

  constructor(private devicesService: DevicesService, private router: Router) {
   
  }

  ngOnInit(): void {
    this.getDevices();
  }

  getDevices(): void {
    this.devicesService.getdevices().subscribe(
      (devices) => {
        console.log('List of devices:', devices.data);
        this.devices = devices.data;
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  handleError(error: any): void {
    console.error('Error fetching devices:', error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error fetching devices!'
    });
  }


 
  
  onRunPythonScript(): void {
    this.devicesService.sendDownlink().subscribe(
      response => {
        console.log('Python script executed successfully:', response);
      },
      error => {
        console.error('Error executing Python script:', error);
      }
    );
  }

  onToggleDevice(device: Device): void {
    if (!device.deveui || !device.onoff) {
      console.error('Device deveui or onoff is undefined');
      alert('Error toggling device: Device deveui or onoff is undefined');
      return;
    }

    const newStatus = device.onoff === '01' ? '00' : '01';
    this.devicesService.toggleDevice(device.deveui, newStatus).subscribe(
      response => {
        console.log('Device toggled successfully:', response);
        device.onoff = newStatus;
        this.onRunPythonScript(); 
      },
      error => {
        console.error('Error toggling device:', error);
      }
    );
  }
 
  selectDevice(devEUI: string): void {
    // Naviguer vers le composant 'device/detail' et transmettre 'devEUI' comme paramètre
    this.router.navigate(['device/detail', devEUI]);
  }
}
