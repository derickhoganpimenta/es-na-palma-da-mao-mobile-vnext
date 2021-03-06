import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Environment, EnvVariables } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';

import { DriverLicense, DriverStatus, Ticket, Vehicle, VehiclesData } from '../model';

/**
 *
 *
 */
@Injectable()
export class DetranApiService {
  /**
   *
   *
   */
  constructor(private http: HttpClient, @Inject(EnvVariables) private env: Environment) {}

  /**
   *
   */
  saveCNH = (license: DriverLicense): Observable<any> => {
    const model = { numero: license.registerNumber, cedula: license.ballot };
    return this.http.post<any>(`${this.env.api.acessocidadaoApi}/Perfil/SalvarCNH`, model).pipe(share());
  };

  /**
   *
   */
  getDriverStatus = (): Observable<DriverStatus> => {
    return this.http.get<DriverStatus>(`${this.env.api.detran}/driver`).pipe(share());
  };

  /**
   *
   */
  getDriverTickets = (): Observable<Ticket[]> => {
    return this.http.get<Ticket[]>(`${this.env.api.detran}/driver/tickets`).pipe(share());
  };

  /**
   *
   */
  getVehicleTickets = (vehicle: Vehicle): Observable<Ticket[]> => {
    return this.http
      .get<Ticket[]>(`${this.env.api.detran}/vehicle/tickets`, {
        params: new HttpParams().set('plate', vehicle.plate).set('renavam', vehicle.renavam.toString())
      })
      .pipe(share());
  };

  /**
   *
   */
  syncVehicles = (vehicles: VehiclesData): Observable<VehiclesData> => {
    return this.http.post<VehiclesData>(`${this.env.api.espm}/data/vehicles`, vehicles).pipe(share());
  };

  /**
   *
   */
  getVehicleInfo = (vehicle: Vehicle): Observable<Partial<Vehicle>> => {
    return this.http
      .get<Partial<Vehicle>>(`${this.env.api.detran}/vehicle`, {
        params: new HttpParams().set('plate', vehicle.plate).set('renavam', vehicle.renavam.toString())
      })
      .pipe(share());
  };
}
