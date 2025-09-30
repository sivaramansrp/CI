// Componente para la vista de los anexos dos y tres en el trámite 80103
import { Catalogo, ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DisponsibleFiscal } from '../../../../shared/models/empresas.model';
import { EmpresasComponent } from '../../../../shared/components/empresas/empresas.component';
import { NuevoProgramaIndustrialService } from '../../services/modalidad-albergue.service';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { Tramite80101Store} from '../../estados/tramite80101.store';
/*
  * Componente para mostrar la lista de empresas terciarizadas en el trámite 80103.
  *
  * Este componente utiliza el servicio `NuevoProgramaIndustrialService` para obtener la lista de estados
  * y gestionar la información relacionada con las empresas terciarizadas.
  *
  * @export
  * @class EmpresascontroladasComponent
  */

@Component({
  selector: 'app-empresas-controladas',
  standalone: true,
  imports: [CommonModule,EmpresasComponent],
  templateUrl: './empresas-controladas.component.html',
  styleUrl: './empresas-controladas.component.scss',
})
/*
  * Clase que representa el componente de empresas terciarizadas.
  *
  * @class EmpresasTerciarizadaasComponent
  * @implements {OnDestroy}
  */
export class EmpresasControladasComponent implements OnDestroy, OnInit {

  public estadosCatalogo$!: Observable<Catalogo[]>;

  /*
  * Constructor del componente.
  * @param {NuevoProgramaIndustrialService} nuevoProgramaIndustrialService - Servicio para gestionar la información del nuevo programa industrial.
  */
  constructor(private nuevoProgramaIndustrialService: NuevoProgramaIndustrialService, private tramite80104Store: Tramite80101Store, private tramite80104Query: Tramite80101Query){

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
/*
* Lista de encabezados de la tabla de empresas terciarizadas.
* @type {ConfiguracionColumna<DisponsibleFiscal>[]}
*/
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