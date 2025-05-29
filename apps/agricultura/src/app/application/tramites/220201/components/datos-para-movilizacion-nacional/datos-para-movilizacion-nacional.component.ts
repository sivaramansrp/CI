import { HttpClient } from '@angular/common/http';

import { Catalogo, CatalogoSelectComponent, ConsultaioQuery, RespuestaCatalogos, SharedModule, TituloComponent } from '@ng-mf/data-access-user';

import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {Subject,map,skip, takeUntil } from 'rxjs';
import { CertificadoZoosanitarioServiceService } from '../../services/220201/certificado-zoosanitario.service';
import { CommonModule } from '@angular/common';
import { ZoosanitarioQuery } from '../../queries/220201/zoosanitario.query';

/**
 * @fileoverview Componente para la gestión del formulario de datos para la movilización nacional.
 * Este componente se encarga de la lógica y la presentación del formulario de datos para la movilización nacional,
 * incluyendo la inicialización, la obtención de datos y la gestión de los controles del formulario.
 * @module datosParaMovilizacionNacional
 */

/**
 * Componente para el formulario de datos para la movilización nacional.
 * @class DatosParaMovilizacionNacionalComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-datos-para-movilizacion-nacional',
  templateUrl: './datos-para-movilizacion-nacional.component.html',
  styleUrl: './datos-para-movilizacion-nacional.component.scss',
  standalone: true,
  imports:[SharedModule,
        CommonModule, TituloComponent,
            ReactiveFormsModule,
            CatalogoSelectComponent,
            ]
})
export class DatosParaMovilizacionNacionalComponent implements OnInit, OnDestroy,AfterViewInit {

  /**
   * Grupo de formularios para la movilización nacional.
   * @property {FormGroup} movilizacionForm
   */
  movilizacionForm: FormGroup;

  /**
   * Configuración para el selector de medio de transporte.
   * @property {CatalogosSelect} medioTransporteList
   */
  medioTransporteList: Catalogo[] = [];

  /**
   * Configuración para el selector de identificación del transporte.
   * @property {CatalogosSelect} identificacionTransporteList
   */
  identificacionTransporteList: Catalogo[] = [];

  /**
   * Configuración para el selector de nombre de la empresa transportista.
   * @property {CatalogosSelect} nombreDeLaEmpresaTransportista
   */
  nombreDeLaEmpresaTransportista: Catalogo[] = [];

  esFormularioSoloLectura:boolean = false;
  /**
   * Configuración para el selector de punto de verificación federal.
   * @property {CatalogosSelect} puntoDeVerificacionFederal
   */
  puntoDeVerificacionFederal: Catalogo[] = [];
    private destroyNotifier$ = new Subject<void>();
  /**
   * Constructor de la clase DatosParaMovilizacionNacionalComponent.
   * @constructor
   * @param {FormBuilder} fb - Inyección de dependencia del servicio FormBuilder.
   * @param {HttpClient} httpServicios - Inyección de dependencia del servicio HttpClient.
   */
  constructor(private readonly fb: FormBuilder, private readonly httpServicios: HttpClient, private readonly certificadoZoosanitarioServices: CertificadoZoosanitarioServiceService,
      private readonly certificadoZoosanitarioQuery:ZoosanitarioQuery,
        private consultaQuery: ConsultaioQuery
  ) {
    this.movilizacionForm = this.fb.group({
      coordenadas: [''],
      nombre: ['', Validators.required],
      medio: ['', Validators.required],
      transporte: [''],
      punto: ['']
    });
  }

  /**
   * Inicializa el componente.
   * @method ngOnInit
   */
  ngOnInit(): void {
       this.certificadoZoosanitarioQuery.seleccionarMovilizacionNacional$.pipe(takeUntil(this.destroyNotifier$)).subscribe((datosDeLaSolicitud) => {
      if (datosDeLaSolicitud) {
        this.movilizacionForm.patchValue(datosDeLaSolicitud);
      }
    });
    this.obtenerListasDesplegables();
  }

  ngAfterViewInit(): void {
        this.movilizacionForm.valueChanges.pipe(skip(1)).subscribe((changes) => {
      const FORMA_VALIDA_ACTUALIZADA = {
        dataParaMovilizacion: false,
      };
      if (this.movilizacionForm.valid) {
        FORMA_VALIDA_ACTUALIZADA.dataParaMovilizacion = true;
      }
      this.certificadoZoosanitarioServices.actualizarFormaValida(FORMA_VALIDA_ACTUALIZADA);
    });
     this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          if(this.esFormularioSoloLectura){
            this.movilizacionForm.disable();
          }
        })
      )
      .subscribe();
  }

  /**
   * Obtiene las listas desplegables.
   * @method obtenerListasDesplegables
   */
  obtenerListasDesplegables() {
    this.obtenerTransporteListList();
    this.obtenernombreDeLaEmpresaTransportistaList();
    this.obtenerPuntoDeVerificaciónList();
    this.obtenerIdentificacionTransporteList();
  }

  /**
   * Obtiene la lista de transportes.
   * @method obtenerTransporteListList
   */
  obtenerTransporteListList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/transporte.json').pipe(takeUntil(this.destroyNotifier$)).subscribe((data): void => {
      const DATOS = data?.data;
      this.medioTransporteList = DATOS;
    });
  }

  /**
   * Obtiene la lista de nombres de empresas transportistas.
   * @method obtenernombreDeLaEmpresaTransportistaList
   */
  obtenernombreDeLaEmpresaTransportistaList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/nombre.json').pipe(takeUntil(this.destroyNotifier$)).subscribe((data): void => {
      const DATOS = data?.data;
      this.nombreDeLaEmpresaTransportista = DATOS;
    });
  }

  /**
   * Obtiene la lista de puntos de verificación.
   * @method obtenerPuntoDeVerificaciónList
   */
  obtenerPuntoDeVerificaciónList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/punto.json').pipe(takeUntil(this.destroyNotifier$)).subscribe((data): void => {
      const DATOS = data?.data;
      this.puntoDeVerificacionFederal = DATOS;
    });
  }

  /**
 * Obtiene la lista de identificaciones de transporte. --220201
 * @method obtenerIdentificacionTransporteList
 */
  obtenerIdentificacionTransporteList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/punto.json').pipe(takeUntil(this.destroyNotifier$)).subscribe((data): void => {
      const DATOS = data?.data;
      this.identificacionTransporteList = DATOS;
    });
  }
     setValoresStore(
    ): void {
      const VALOR = this.movilizacionForm.value;
 this.certificadoZoosanitarioServices.updateDatosParaMovilizacionNacional(VALOR);
    }
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
   
  }
}