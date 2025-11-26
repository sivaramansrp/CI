import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { PrellenadoMovilizacion, PrellenadoPagoDerechos, PrellenadoTercerosRelacionados } from '../../models/220201/prellenado-solicitud.model';

@Injectable({ providedIn: 'root' })
export class SharedFormService {
    private dataSource = new BehaviorSubject<PrellenadoMovilizacion | null>(null);
    data$ = this.dataSource.asObservable();

    private dataSourceTerceros = new BehaviorSubject<PrellenadoTercerosRelacionados | null>(null);
    dataTerceros$ = this.dataSourceTerceros.asObservable();

    private dataSourcePagoDerechos = new BehaviorSubject<PrellenadoPagoDerechos | null>(null);
    dataPagoDerechos$ = this.dataSourcePagoDerechos.asObservable();

    // Método para enviar datos de prellenado de movilización
    enviarMovilizacionPrellenado(data: PrellenadoMovilizacion): void {
        this.dataSource.next(data);
    }

    // // Método para enviar datos de prellenado de terceros relacionados
    enviarTercerosRelacionadosPrellenado(dataSourceTerceros: PrellenadoTercerosRelacionados): void {
        this.dataSourceTerceros.next(dataSourceTerceros);
    }

    // // Método para enviar datos de prellenado de terceros relacionados
    enviarPagoDerechosPrellenado(dataSourcePagoDerechos: PrellenadoPagoDerechos): void {
        this.dataSourcePagoDerechos.next(dataSourcePagoDerechos);
    }
}
