import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Device } from '../interfaces/Device';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  getDeviceByDevEUI(DevEUI: any) {
    throw new Error('Method not implemented.');
  }
  private id: string = '';
  private temp: number = 0;
  private hum: number = 0;

  constructor(private http: HttpClient) { 
    this.getid();
  }

  private getid(): void {
    const item = localStorage.getItem('token');
    if (item) {
      try {
        const decodedToken = jwt_decode.jwtDecode(item) as any;
        if (decodedToken && decodedToken.id) {
          this.id = decodedToken.id;
          console.log(this.id);
        } else {
          console.error('ID not found in token');
        }
      } catch (error) {
        console.error('Failed to decode token', error);
      }
    } else {
      console.error('Token not found in local storage');
    }
  }

  getdevices(): Observable<any> {
    if (this.id) {
      return this.http.get(`http://localhost:3000/devices/${this.id}/all`).pipe(
        catchError(this.handleError)
      );
    } else {
      console.error('ID is not defined');
      return throwError('ID is not defined');
    }
  }

  
  countDevices():any {
    if (this.id) {
      this.http.get<any[]>(`http://localhost:3000/devices/${this.id}/all`).pipe(
        map(devices => {
          const count = devices.length;
          console.log(count); // Affiche le nombre de dispositifs dans la console
          return count;
        })
      );
    } else {
      // Gérer le cas où this.id n'est pas défini
      console.error('ID is not defined');
     
    }
  }


  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error.message || 'Server error');
  }

  adddevices(name: string, deveui: string, type: string) {
    const body = { name, deveui, type };
    const authtoken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authtoken}`
    });

    if (this.id) {
      return this.http.post(`http://localhost:3000/devices/${this.id}/add`, body, { headers }).pipe(
        tap(response => console.log('Device added successfully:', response)),
        catchError(error => {
          console.error('Error adding device:', error);
          return throwError(error);
        })
      );
    } else {
      console.error('ID is not defined');
      return throwError('ID is not defined');
    }
  }

  deleteDevice(iddev: string) {
    const authtoken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authtoken}`
    });

    if (this.id) {
      return this.http.delete(`http://localhost:3000/devices/${this.id}/${iddev}`, { headers }).pipe(
        tap(response => console.log('Device deleted successfully:', response)),
        catchError(error => {
          console.error('Error deleting device:', error);
          return throwError(error);
        })
      );
    } else {
      console.error('ID is not defined');
      return throwError('ID is not defined');
    }
  }

  updateDevice(iddev: string, name: string, deveui: string, type: string) {
    const authtoken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authtoken}`,
      'Content-Type': 'application/json'
    });

    const body = { name, deveui, type };

    return this.http.put(`http://localhost:3000/devices/${iddev}`, body, { headers }).pipe(
      tap(response => console.log('Device updated successfully:', response)),
      catchError(error => {
        console.error('Error updating device:', error);
        return throwError(error);
      })
    );
  }

  sendDownlink(): Observable<any> {
    return this.http.get('http://localhost:3000/devices/run');
  }

  toggleDevice(deveui: string, onoff: string): Observable<any> {
    const authtoken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authtoken}`,
      'Content-Type': 'application/json'
    });

    const body = { deveui, onoff };

    return this.http.post(`http://localhost:3000/devices/toggle`, body, { headers }).pipe(
      tap(response => console.log('Device toggled successfully:', response)),
      catchError(error => {
        console.error('Error toggling device:', error);
        return throwError(error);
      })
    );
  }

  getDetail(DevEUI: string): Observable<any> {
    return this.http.get(`http://localhost:3000/sensors/${DevEUI}`);
  }
  getLastValues(): Observable<any> {
    return this.http.get(`http://localhost:3000/sensors/last`)
  }
}


