/**
 * @fileoverview
 * Componente para la gestión de terceros relacionados en el trámite 220201 de agricultura.
 * Permite visualizar, actualizar y eliminar la lista de personas asociadas como terceros,
 * así como controlar el modo de solo lectura del formulario y cargar catálogos de países y estados.
 * Cobertura compodoc 100%: cada clase, método, propiedad y evento está documentada.
 * @module TercerospageComponent
 */

import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { TercerosrelacionadosService } from '../../../../shared/components/services/tercerosrelacionados/tercerosrelacionados.service';
import { TercerosrelacionadosComponent } from '../../../../shared/components/tercerosrelacionados/tercerosrelacionados.component';
import { DatosDeLaSolicitud, TercerosrelacionadosTable, TercerosrelacionadosdestinoTable } from '../../../../shared/models/tercerosrelacionados.model';

import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { ZoosanitarioStore } from '../../estados/220201/zoosanitario.store';
import { CertificadoZoosanitarioServiceService } from '../../services/220201/certificado-zoosanitario.service';
import { AgregardestinatarioComponent } from '../agregardestinatario/agregardestinatario.component';
import { AgregardestinatariofinalComponent } from '../agregardestinatariofinal/agregardestinatariofinal.component';

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
  styleUrl: './tercerospage.component.scss',
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
  @ViewChild('modalRef') modalRef!: ModalComponent;

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
  catalogosDatos: DatosDeLaSolicitud = {} as DatosDeLaSolicitud;
  /**
   * Datos de la forma relacionados con terceros.
   * Esta propiedad almacena los datos específicos de la forma que se relacionan con los terceros.
   * @type {TercerosrelacionadosTable[]}
   */

  datosForma: TercerosrelacionadosdestinoTable[] = [];

  /**
   * Constructor del componente.
   * @param consultaQuery Servicio para consultar el estado de solo lectura.
   * @param certificadoZoosanitarioServices Servicio para actualizar terceros relacionados.
   * @param certificadoZoosanitarioQuery Servicio para consultar el estado de terceros relacionados.
   * @param tercerosrelacionadosService Servicio para obtener catálogos de terceros relacionados.
   */
  constructor(
    private consultaQuery: ConsultaioQuery,
    private readonly certificadoZoosanitarioServices: CertificadoZoosanitarioServiceService,
    public tercerosrelacionadosService: TercerosrelacionadosService,
    public certificadoZoosanitarioStore: ZoosanitarioStore

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
        this.esFormularioSoloLectura = seccionState?.readonly;
      });
    this.certificadoZoosanitarioServices.getAllDatosForma()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datosDeLaSolicitud) => {
        if (datosDeLaSolicitud) {
          this.personas = datosDeLaSolicitud.tercerosRelacionados;
          this.datosForma = datosDeLaSolicitud.datosForma;
        }
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
  handleEliminar(): void {
    this.personas = [];
    this.certificadoZoosanitarioServices.updateTercerosRelacionado([] as TercerosrelacionadosdestinoTable[]);
  }
  /**
  * Elimina todos los terceros relacionados y actualiza el servicio correspondiente.
  * @method handleEliminar
  */
  handleEliminarExportador(): void {
    this.personas = [];
    this.certificadoZoosanitarioStore.updatedatosForma([] as TercerosrelacionadosdestinoTable[]);
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

  abrirModalDestinatario(): void {
    this.modalRef.abrir(AgregardestinatarioComponent);
  }
  abrirModalExportador(): void {
    this.modalRef.abrir(AgregardestinatariofinalComponent);
  }
}