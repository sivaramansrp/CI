
import { Injectable } from '@angular/core';
import { URL } from '../enum/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DesistimientoSolicitudService {

  url: string = URL;
  constructor(private readonly http:HttpClient ) { 
    console.log('DesistimientoSolicitudService constructor');
  }

  getDesistimientoSolicitud(name: string) {
    const BASEURL = this.url + name;
    return this.http.get<any>(BASEURL);
  }
}
