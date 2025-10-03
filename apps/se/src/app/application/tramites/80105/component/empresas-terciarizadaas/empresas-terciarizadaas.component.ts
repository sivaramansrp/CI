import { Catalogo, ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DisponsibleFiscal } from '../../../../shared/models/empresas.model';
import { EmpresasComponent } from '../../../../shared/components/empresas/empresas.component';
import { NuevoProgramaIndustrialService } from '../../services/modalidad-terciarización.service';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { Tramite80101Store } from '../../estados/tramite80101.store';

@Component({
  selector: 'app-empresas-terciarizadaas',
  standalone: true,
  imports: [CommonModule, EmpresasComponent],
  templateUrl: './empresas-terciarizadaas.component.html',
  styleUrl: './empresas-terciarizadaas.component.scss',
})
export class EmpresasTerciarizadaasComponent implements OnDestroy, OnInit {

  public estadosCatalogo$!: Observable<Catalogo[]>;
  
  constructor(private nuevoProgramaIndustrialService: NuevoProgramaIndustrialService,
    private tramite80104Store: Tramite80101Store, private tramite80104Query: Tramite80101Query
  ) {
  }

  ngOnInit(): void {
    this.estadosCatalogo$ = this.tramite80104Query.selectEstadosOpciones$;
  }

  /**
  * Notificador utilizado para manejar la destrucción o desuscripción de observables.
  * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido.
  *
  * @property {Subject<void>} destroyNotifier$
  */
  private destroyNotifier$: Subject<void> = new Subject();

  public parentTablaConfig: ConfiguracionColumna<DisponsibleFiscal>[] = [
    { encabezado: 'Calle', clave: (item) => item.calle, orden: 1 },
    { encabezado: 'Número exterior', clave: (item) => item.numeroExterior, orden: 2 },
    { encabezado: 'Número interior', clave: (item) => item.numeroInterior || '', orden: 3 },
    { encabezado: 'Código postal', clave: (item) => item.codigoPostal, orden: 4 },
    { encabezado: 'Colonia', clave: (item) => item.colonia, orden: 5 },
    { encabezado: 'Municipio o delegación', clave: (item) => item.municipioDelegacion, orden: 6 },
    { encabezado: 'Entidad federativa', clave: (item) => item.entidadFederativa, orden: 7 },
    { encabezado: 'País', clave: (item) => item.pais, orden: 8 },
    { encabezado: 'Registro federal de contribuyentes', clave: (item) => item.registroFederalContribuyentes, orden: 9 },
    { encabezado: 'Domicilio fiscal del solicitante', clave: (item) => item.domicilioFiscalSolicitante, orden: 10 },
    { encabezado: 'Razón social', clave: (item) => item.razonSocial, orden: 11 },
  ];

  actualizarSeleccionadas(event: DisponsibleFiscal[]): void {
   if (event) {
    this.tramite80104Store.setSeleccionadas(event);
   }
  }

  actualizarEstados(event: Catalogo[]): void {
    if (event) {
      this.tramite80104Store.setEstadosOpciones(event);
    }
  }

  /**
 * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
 * Limpia las suscripciones y actualiza los BehaviorSubject para ocultar las tablas.
 * @method ngOnDestroy
 */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
