/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @fileoverview
 * Componente para la gestión de terceros relacionados en el trámite 220201 de agricultura.
 * Permite visualizar, actualizar y eliminar la lista de personas asociadas como terceros,
 * así como controlar el modo de solo lectura del formulario y cargar catálogos de países y estados.
 * Cobertura compodoc 100%: cada clase, método, propiedad y evento está documentada.
 * @module TercerospageComponent
 */

import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TercerosRelacionados,TercerosrelacionadosExportadorTable, TercerosrelacionadosdestinoTable } from '../../models/220202/fitosanitario.model';
import { AgregarExportadorComponent } from '../agregar-exportador/agregar-exportador.component';
import { AgregardestinatarioComponent } from '../agregardestinatario/agregardestinatario.component';
import { AgriculturaApiService } from '../../services/220202/agricultura-api.service';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { FitosanitarioQuery } from '../../queries/fitosanitario.query';
import { FitosanitarioStore } from '../../estados/fitosanitario.store';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { TercerosrelacionadosComponent } from '../../shared/tercerosrelacionados/tercerosrelacionados.component';
import { TercerosrelacionadosService } from '../../../../shared/components/services/tercerosrelacionados/tercerosrelacionados.service';

/**
 * Componente para la gestión de terceros relacionados en el trámite.
 * Permite visualizar, actualizar y eliminar la lista de personas asociadas como terceros,
 * así como controlar el modo de solo lectura del formulario y cargar catálogos de países y estados.
 *
 * @class TercerospageComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-tercerospage',
  standalone: true,
  imports: [
    CommonModule,
    TercerosrelacionadosComponent,
    ModalComponent
  ],
  templateUrl: './tercerospage.component.html',
})
export class TercerospageComponent implements OnInit, OnDestroy, AfterViewInit {
  /**
   * Subject utilizado como notificador para destruir suscripciones y evitar fugas de memoria.
   * Se emite cuando el componente se destruye, permitiendo cancelar las suscripciones a observables.
   * @type {Subject<void>}
   * @private
   */
  private destroyNotifier$ = new Subject<void>();

  /**
   * Lista de personas asociadas como terceros en el trámite actual.
   * @type {TercerosrelacionadosdestinoTable[]}
   */
  personas: TercerosrelacionadosdestinoTable[] = [];

  /**
   * Indica si el formulario se encuentra en modo solo lectura.
   * Determina si el formulario debe mostrarse únicamente para lectura, sin permitir modificaciones.
   * @type {boolean}
   * @default false
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Catálogos de datos de la solicitud, como países y estados.
   * @type {DatosDeLaSolicitud}
   */
  catalogosDatos: TercerosRelacionados = {} as TercerosRelacionados;

  /**
   * Datos de la forma relacionados con terceros.
   * Esta propiedad almacena los datos específicos de la forma que se relacionan con los terceros.
   * @type {TercerosrelacionadosExportadorTable[]}
   */
  datosForma: TercerosrelacionadosExportadorTable[] = [];

  /**
   * Indica si el formulario debe mostrarse en modo solo lectura.
   * Cuando es verdadero, el formulario se presenta únicamente para visualización,
   * deshabilitando la edición de los campos.
   * @type {modalRef}
   */
  @ViewChild('modalRef') modalRef!: ModalComponent;

  /**
   * Constructor del componente.
   * @param consultaQuery Servicio para consultar el estado de solo lectura.
   * @param agriculturaApiService Servicio para actualizar terceros relacionados.
   * @param fitosanitarioQuery Servicio para consultar el estado de terceros relacionados.
   * @param tercerosrelacionadosService Servicio para obtener catálogos de terceros relacionados.
   */
  constructor(
    private consultaQuery: ConsultaioQuery,
    private readonly agriculturaApiService: AgriculturaApiService,
    private readonly fitosanitarioQuery: FitosanitarioQuery,
    public tercerosrelacionadosService: TercerosrelacionadosService,
    public fitosanitarioStore: FitosanitarioStore
  ) { }

  /**
   * Ciclo de vida de Angular que se ejecuta al iniciar el componente.
   * Suscribe al estado de solo lectura y a la lista de terceros relacionados.
   * @method ngOnInit
   */
  ngOnInit(): void {
  this.consultaQuery.selectConsultaioState$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((seccionState) => {
        this.esFormularioSoloLectura = seccionState.readonly;
      });
      
    // Suscríbete reactivamente para almacenar cambios para terceros relacionados (destinatario)
    this.fitosanitarioStore._select(state => state.tercerosRelacionados)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((tercerosRelacionados) => {
        this.personas = tercerosRelacionados || [];
      });

    // Suscribirse reactivamente para almacenar cambios en los datos del exportador
    this.fitosanitarioStore._select(state => state.datosForma)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datosForma) => {
        this.datosForma = datosForma || [];
      });
  }

  /**
   * Ciclo de vida de Angular que se ejecuta después de inicializar la vista.
   * Carga los catálogos de países y estados.
   * @method ngAfterViewInit
   */
  ngAfterViewInit(): void {
    this.pairsCatalogChange();
    this.estadoCatalogChange();
  }

  /**
   * Carga el catálogo de países y lo asigna a la propiedad catalogosDatos.paises.
   * @method pairsCatalogChange
   */
  pairsCatalogChange(): void {
    this.tercerosrelacionadosService.obtenerSelectorList('paisprocedencia.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(data => {
        this.catalogosDatos.paises = data;
      });
  }

  /**
   * Carga el catálogo de estados y lo asigna a la propiedad catalogosDatos.estados.
   * @method estadoCatalogChange
   */
  estadoCatalogChange(): void {
    this.tercerosrelacionadosService.obtenerSelectorList('estados.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(data => {
        this.catalogosDatos.estados = data;
      });
  }

  /**
   * Elimina todos los terceros relacionados y actualiza el servicio correspondiente.
   * @method handleEliminar
   */
  handleEliminarDestinatario(): void {
    this.personas = [];
    this.agriculturaApiService.updateTercerosRelacionado([] as TercerosrelacionadosdestinoTable[]);
  }

  /**
   * Elimina todos los exportadores relacionados y actualiza el servicio correspondiente.
   * @method handleEliminarExportador
   */
  handleEliminarExportador(): void {
    this.datosForma = [];
    this.agriculturaApiService.updateTercerosExportador([] as TercerosrelacionadosdestinoTable[]);
  }

  /**
   * Ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Libera recursos y cancela las suscripciones.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Abre el modal para agregar o editar un exportador.
   * Si se proporciona datos, los utiliza para prellenar el formulario del modal.
   * @param {any} data Datos del exportador a editar (opcional).
   */
  abrirModalExportador(data: any): void { 
    if (data) {
      this.fitosanitarioStore.actualizarSelectedExdora(data);
    }
    this.modalRef.abrir(AgregarExportadorComponent);
  }

  /**
   * Abre el modal para agregar o editar un destinatario.
   * Si se proporciona datos, los utiliza para prellenar el formulario del modal.
   * @param {any} data Datos del destinatario a editar (opcional).
   */
  abrirModalDestinatario(data?: any): void {
    if (data) {
      this.fitosanitarioStore.actualizarSelectedTerceros(data);
    }
    this.modalRef.abrir(AgregardestinatarioComponent);
  }

}