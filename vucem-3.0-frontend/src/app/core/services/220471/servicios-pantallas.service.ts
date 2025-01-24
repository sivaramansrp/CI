import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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

    constructor(private http: HttpClient) { }

    // Method to emit new values
    setPantallasFormData(key: string, data: object) {
        this.pantallasFormData = {
            ...this.pantallasFormData,
            [key]: data
        };
    }
}
