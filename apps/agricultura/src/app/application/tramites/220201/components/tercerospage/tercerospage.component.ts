import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DatosDeLaSolicitud, TercerosrelacionadosdestinoTable } from '../../../../shared/models/tercerosrelacionados.model';
import { Subject, takeUntil } from 'rxjs';
import { CertificadoZoosanitarioServiceService } from '../../services/220201/certificado-zoosanitario.service';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { TercerosrelacionadosComponent } from '../../../../shared/components/tercerosrelacionados/tercerosrelacionados.component';
import { TercerosrelacionadosService } from '../../../../shared/components/services/tercerosrelacionados/tercerosrelacionados.service';
import { ZoosanitarioQuery } from '../../queries/220201/zoosanitario.query';

/**
 * @fileoverview Componente para la gestión de terceros relacionados en el trámite.
 * Este componente permite visualizar y actualizar la lista de personas asociadas como terceros,
 * así como controlar el modo de solo lectura del formulario.
 * @module TercerospageComponent
 */

/**
 * Componente para la gestión de terceros relacionados en el trámite.
 * @class TercerospageComponent
 * @implements {OnInit, OnDestroy, AfterViewInit}
 */
@Component({
  selector: 'app-tercerospage',
  standalone: true,
  imports: [
    CommonModule,
  TercerosrelacionadosComponent
  ],
  templateUrl: './tercerospage.component.html',
  styleUrl: './tercerospage.component.scss',
})
export class TercerospageComponent implements OnInit, OnDestroy,AfterViewInit {
  /**
   * Subject utilizado como notificador para destruir suscripciones y evitar fugas de memoria.
   * 
   * @remarks
   * Este Subject se emite cuando el componente se destruye, permitiendo que las suscripciones
   * a observables se cancelen correctamente usando el operador `takeUntil`.
   * 
   * @compodoc
   * @property {Subject<void>} destroyNotifier$
   */
  private destroyNotifier$ = new Subject<void>();

  /**
   * Lista de personas asociadas como terceros en el trámite actual.
   * @property {PersonaTerceros[]} personas
   */
  personas: TercerosrelacionadosdestinoTable[] = [];

  /**
   * Indica si el formulario se encuentra en modo solo lectura.
   * 
   * @desc [es] Determina si el formulario debe mostrarse únicamente para lectura, sin permitir modificaciones.
   * @property {boolean} esFormularioSoloLectura
   */
  esFormularioSoloLectura: boolean = false;
catalogosDatos: DatosDeLaSolicitud = {} as DatosDeLaSolicitud;
  /**
   * Constructor del componente.
   * @method constructor
   * @param consultaQuery Servicio para consultar el estado de solo lectura.
   * @param certificadoZoosanitarioServices Servicio para actualizar terceros relacionados.
   * @param certificadoZoosanitarioQuery Servicio para consultar el estado de terceros relacionados.
   */
  constructor(
    private consultaQuery: ConsultaioQuery,
    private readonly certificadoZoosanitarioServices: CertificadoZoosanitarioServiceService,
    private readonly certificadoZoosanitarioQuery: ZoosanitarioQuery,
    public tercerosrelacionadosService: TercerosrelacionadosService
  ) {}

  /**
   * Ciclo de vida de Angular que se ejecuta al iniciar el componente.
   * Suscribe al estado de solo lectura y actualiza la propiedad correspondiente.
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((seccionState) => {
        this.esFormularioSoloLectura = seccionState?.readonly;
      });
       this.certificadoZoosanitarioQuery.seleccionarTercerosRelacionados$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datosDeLaSolicitud) => {
        if (datosDeLaSolicitud) {
          this.personas = datosDeLaSolicitud;
        }
      });
  }
  ngAfterViewInit(): void {
    this.pairsCatalogChange();
    this.estadoCatalogChange();
  }

  pairsCatalogChange():void {
       this.tercerosrelacionadosService.obtenerSelectorList('paisprocedencia.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
          this.catalogosDatos.paises = data;
        })
  }
  estadoCatalogChange():void {
    this.tercerosrelacionadosService.obtenerSelectorList('estados.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.catalogosDatos.estados = data;
    })
  }
  /**
   * Navega a la página de agregar destinatario.
   * 
   * @remarks
   * Este método redirige al usuario a la página de agregar destinatario,
   * permitiendo la modificación de los datos de terceros relacionados.
   * 
   * @method goToAgregarDestinatario
   */
   handleEliminar() :void{
     this.personas=[];
     this.certificadoZoosanitarioServices.updateTercerosRelacionado([] as TercerosrelacionadosdestinoTable[]);
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
}