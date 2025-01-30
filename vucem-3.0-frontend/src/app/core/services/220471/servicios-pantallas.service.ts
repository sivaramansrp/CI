import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { PantallasFormData } from '../../models/220401/servicios-pantallas.model';

@Injectable({
    providedIn: 'root',
})
export class ServiciosPantallasService {
    public pantallasFormData:  PantallasFormData = {
        solict: [],
        datosDel: [],
        combinacionRequerida: [],
        unidads: [],
        datasGenerals: []
    };
    private pantallasFormSubject = new BehaviorSubject<PantallasFormData>(this.pantallasFormData);
    public pantallasFormObservable$ = this.pantallasFormSubject.asObservable();

    private dummyJson: string = '/assets/json/5701/220401/mercancias.json';
    
    
    constructor(private http: HttpClient) { }

    // Method to set in the form data
    setPantallasFormData(key: string, data: object) {
        this.pantallasFormData = {
            ...this.pantallasFormData,
            [key]: data
        };
    }

    // Method to set in the subject form data
    setPantallasFormDataSubject(data: PantallasFormData) {
        this.pantallasFormSubject.next(data);
    }

    fetchMercanciasData() {
       return this.http.get(this.dummyJson)
      }
}
