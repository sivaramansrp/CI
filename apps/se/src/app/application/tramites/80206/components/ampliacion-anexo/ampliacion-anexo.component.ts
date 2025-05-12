/**
 * @fileoverview
 * El `AmpliacionAnexoComponent` es un componente de Angular diseñado para gestionar la funcionalidad del módulo "Ampliación de Servicios".
 * Maneja formularios reactivos, catálogos, y la interacción con el estado para la gestión de datos relacionados con fracciones arancelarias,
 * importaciones y servicios IMMEX.
 * 
 * @module AmpliacionAnexoComponent
 * @description
 * Este componente proporciona funcionalidad para la ampliación de servicios, incluyendo la inicialización de formularios, 
 * la obtención de datos y la interacción con el estado para la gestión de fracciones arancelarias e importaciones.
 */

import {
  Catalogo,
  TablaSeleccion,
} from '@ng-mf/data-access-user';

import {
  Arancelaria,
  ArancelariaImportacion,
  Servicios
} from "../../models/datos-info.model";

import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';

import {
  CONFIGURACION_ARANCELARIAS,
  CONFIGURACION_ARANCELARIASIMPORTACION,
  TEXTOS_80206
} from "../../constantes/modificacion.constants";

import { OnDestroy, OnInit } from '@angular/core';
import { map,takeUntil} from 'rxjs/operators';
import { AmpliacionServiciosQuery } from '../../estados/tramite80206.query';
import { AmpliacionServiciosService } from '../../services/ampliacion-servicios.service';
import { AmpliacionServiciosState } from '../../estados/tramite80206.store';
import { ApiResponse } from "../../models/datos-info.model";
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '../../models/configuracion-columna.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Tramite80206Store } from '../../estados/tramite80206.store';


@Component({
  selector: 'app-ampliacion-servicios',
  templateUrl: './ampliacion-anexo.component.html',
  styleUrl: './ampliacion-anexo.component.scss',
})
export class AmpliacionAnexoComponent implements OnInit, OnDestroy {

  

  /**
   * Controla la visibilidad del modal de alerta.
   * @property {boolean} mostrarAlerta
   */
  mostrarAlerta: boolean = false;

  /**
   * Mensaje mostrado en el modal de alerta.
   * @property {string} mensajeDeAlerta
   */
  mensajeDeAlerta: string = 'Debe seleccionar una fracción de exportación';
  
    /**
     * Estado actual del trámite.
     * @property {AmpliacionServiciosState} tramiteState
     */
    tramiteState: AmpliacionServiciosState = {} as AmpliacionServiciosState;
  

  /**
   * Formulario reactivo para la información de registro.
   * @property {FormGroup} formularioInfoRegistro
   */
  formularioInfoRegistro!: FormGroup;

  /**
   * Tipo de selección de tabla (radio button).
   * @property {TablaSeleccion} tablaSeleccion
   */
  tablaSeleccion: TablaSeleccion = TablaSeleccion.RADIO;

  /**
   * Fracción arancelaria.
   * @property {string} fraccion
   */
  fraccion: string = '';

  /**
   * Cantidad de bienes.
   * @property {string} cantidad
   */
  cantidad: string = '';

  /**
   * Fracción arancelaria para servicios IMMEX.
   * @property {string} fraccionArancelaria
   */
  fraccionArancelaria: string = '';

  /**
   * Datos relacionados con la importación.
   * @property {string} importacion
   */
  importacion: string = '';

  /**
   * Valor de los bienes.
   * @property {string} valor
   */
  valor: string = '';

  /**
   * Configuración de la tabla para servicios IMMEX.
   * @property {ConfiguracionColumna<Arancelaria>[]} configuracionTablaServicio
   */
  configuracionTablaServicio: ConfiguracionColumna<Arancelaria>[] = CONFIGURACION_ARANCELARIAS;

  /**
   * Configuración de la tabla para importaciones.
   * @property {ConfiguracionColumna<ArancelariaImportacion>[]} configuracionTablaImportacion
   */
  configuracionTablaImportacion: ConfiguracionColumna<ArancelariaImportacion>[] = CONFIGURACION_ARANCELARIASIMPORTACION;

  /**
   * Lista de datos de servicios IMMEX.
   * @property {Arancelaria[]} datos
   */
  datos: Arancelaria[] = [];

  /**
   * Datos de servicios IMMEX para el grid.
   * @property {Arancelaria[]} datosImmex
   */
  datosImmex: Arancelaria[] = [];

  /**
   * Datos de importación para el grid.
   * @property {ArancelariaImportacion[]} datosImportacion
   */
  datosImportacion: ArancelariaImportacion[] = [];

  /**
   * Lista de domicilios seleccionados.
   * @property {Arancelaria[]} domiciliosSeleccionados
   */
  domiciliosSeleccionados: Arancelaria[] = [];

  /**
   * Lista de empresas seleccionadas.
   * @property {ServicioInmex[]} empresasSeleccionados
   */
  
  /**
   * Formulario reactivo para datos adicionales.
   * @property {FormGroup} forma
   */
  forma!: FormGroup;

  /**
   * Lista de aduanas de ingreso.
   * @property {Catalogo[]} aduanaDeIngreso
   */
  aduanaDeIngreso!: Catalogo[];

  /**
   * Datos de entidades autorizadas.
   * @property {[]} autorizadosBodyData
   */
  autorizadosBodyData: [] = [];

  /**
   * Información sobre el registro actual.
   * @property {Servicios} infoRegistro
   */
  infoRegistro!: Servicios;

  /**
   * Textos constantes para el componente.
   * @property {any} TEXTOS
   */
  TEXTOS = TEXTOS_80206;

  /**
   * Notificador para gestionar la destrucción o desuscripción de observables.
   * @property {Subject<void>} destroyNotifier$
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para la creación de formularios.
   * @param {AmpliacionServiciosService} ampliacionServiciosService - Servicio para obtener datos de ampliación de servicios.
   * @param {HttpClient} httpServicios - Servicio HTTP para realizar peticiones.
   */

  constructor(
    private fb: FormBuilder,
    private ampliacionServiciosService: AmpliacionServiciosService,
    private ampliacionServiciosQuery: AmpliacionServiciosQuery, 
    private tramite80206Store: Tramite80206Store,
    private readonly httpServicios: HttpClient
  ) {
   
    this.inicializarFormularioInfoRegistro();
  
  }

  /**
   * Método de inicialización del componente.
   * @method ngOnInit
   */
  ngOnInit():void {
   this.getDatos();
    this.suscribirseADatosImmex();
   // this.suscribirseADatos();
    this.suscribirseAFields();
  }
  /**
   * Activa el modal de alerta.
   * @method activarModal
   * @returns {void}
   */
  activarModal(): void {
    this.mostrarAlerta = true;
  }
  /**
   * Cierra el modal de alerta.
   * @method cerrarModal
   * @returns {void}
   */
  aceptar(): void {
    this.mostrarAlerta = false;
  }
  /**
   * Cambia el valor de un campo específico en el estado.
   * @method enCambioDeCampo
   * @param {string} fieldName - Nombre del campo.
   * @param {string} newValue - Nuevo valor del campo.
   */
  enCambioDeCampo(fieldName: string, newValue: string): void {
    switch (fieldName) {
      case 'fraccionArancelaria':
        this.tramite80206Store.setFraccionArancelaria(newValue);
        break;
      
      case 'fraccion':
        this.tramite80206Store.setRfcEmpresa(newValue);
        break;
      case 'cantidad':
        this.tramite80206Store.setCantidad(newValue);
        break;
      
      case 'valor':
        this.tramite80206Store.setValor(newValue);
        break;
      case 'importacion':
          this.tramite80206Store.setImportacion(newValue);
          break;
      default:
        break;
    }
  }

  

  /**
 * Se suscribe a los suscribirseAFields cambios en los campos del estado y actualiza las propiedades locales.
 * @method suscribirseAFields
 */

  suscribirseAFields(): void {
   
    this.ampliacionServiciosQuery.selectSolicitudTramite$
         .pipe(
           takeUntil(this.destroyNotifier$),
           map((todosDatos: AmpliacionServiciosState) => {
             this.tramiteState = todosDatos;
             this.fraccion = todosDatos.fraccion;
             this.cantidad = todosDatos.cantidad;
             this.fraccionArancelaria = todosDatos.fraccionArancelaria;
             this.importacion = todosDatos.importacion;
             this.valor = todosDatos.valor;
             this.datos=this.tramiteState.datos;
          
           })
         )
         .subscribe();
  
  }
    
  
  /**
   * Obtiene los datos del servicio y actualiza el estado del formulario.
   * @method getDatos
   */
  getDatos(): void {
    
    this.ampliacionServiciosService.getDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((respuesta) => {
       const RESPONSE = respuesta as unknown as ApiResponse;
      if (RESPONSE) {
        this.tramite80206Store.setInfoRegistro(RESPONSE.data.infoServicios);
        this.inicializarFormularioDesdeAlmacen();
      }
    })
  
  }
  /**
 * Se suscribe a los datos de IMMEX desde el store para mantener el componente actualizado.
 * @method suscribirseADatosImmex
 */
  suscribirseADatosImmex(): void {
    
    this.ampliacionServiciosQuery.selectSolicitudTramite$.pipe(takeUntil(this.destroyNotifier$)).subscribe((datos) => {
      this.datosImmex = datos.datosImmex;
      this.datosImportacion = datos.datosImportacion;
     
    });
  }
  
  /**
   * Inicializa el formulario a partir de los datos del store.
   * @method inicializarFormularioDesdeAlmacen
   */
  inicializarFormularioDesdeAlmacen(): void {
      this.formularioInfoRegistro = this.fb.group({
        seleccionaLaModalidad: [{ value: this.tramiteState.infoRegistro.seleccionaLaModalidad, disabled: true }],
        folio: [{ value: this.tramiteState.infoRegistro.folio, disabled: true }],
        ano: [{ value: this.tramiteState.infoRegistro.ano, disabled: true }],
      })
   
  }
  
  

  /**
   * Inicializa el formulario de información de registro.
   * @method inicializarFormularioInfoRegistro
   */
  
  inicializarFormularioInfoRegistro(): void {
    this.formularioInfoRegistro = this.fb.group({
      seleccionaLaModalidad: [{ value: '', disabled: true }],
      folio: [{ value: '', disabled: true }],
      ano: [{ value: '', disabled: true }],
    });
  }


  
  

  /**
   * Elimina servicios del grid.
   * @method eliminarServiciosGrid
   */
  eliminarServiciosGrid(): void {
    
    const INDICE = this.datosImmex.findIndex((item:Arancelaria) => item.fraccionArancelaria === this.domiciliosSeleccionados[0]?.['fraccionArancelaria']);
    if (INDICE !== -1) {
      const DATOS_IMMEX_ACTUALIZADOS = [...this.datosImmex];
      DATOS_IMMEX_ACTUALIZADOS.splice(INDICE, 1); 
      this.tramite80206Store.setDatosImmex(DATOS_IMMEX_ACTUALIZADOS); 
      this.domiciliosSeleccionados = [];
    }
  }
  /**
   * Elimina datos de importación seleccionados del grid.
   * @method eliminarImportacion
   */
  eliminarImportacion(): void {
    const INDICE = this.datosImportacion.findIndex((item:ArancelariaImportacion) => item.fraccionArancelaria === this.domiciliosSeleccionados[0]?.['fraccionArancelaria']);
    if (INDICE !== -1) {
      const DATOS_IMPORTACION_ACTUALIZADOS = [...this.datosImportacion];
      DATOS_IMPORTACION_ACTUALIZADOS.splice(INDICE, 1); 
      this.tramite80206Store.setDatosImportacion(DATOS_IMPORTACION_ACTUALIZADOS); 
      this.domiciliosSeleccionados = [];
    }
  }
  /**
   * Actualiza el grid de empresas nacionales.
   * @method actualizaGridEmpresasNacionales
   */
  actualizaGridEmpresasNacionales(): void {
    const CUERPODATOS = {
      fraccion: "1",
      fraccionArancelaria: this.fraccionArancelaria,
      descripcionComercial:"Usados",
      anexoII: "NO SENSIBLE",
      tipo: "",
      umt: "",
      categoria: "",
      valorMensual: "",
      valorAnual: "",
      volumenrMensual: "",
      volumenAnual: "",
    };

    this.tramite80206Store.setDatosImmex([...this.datosImmex, CUERPODATOS]);

  }
  
  /**
   * Cierra el modal de alerta.
   * @method cerrarModal
   */
  cerrarModal():void{
    this.mostrarAlerta = false;

  }
   /**
   * Agrega datos de importación al grid.
   * @method agregarImportacion
   */
  agregarImportacion(): void {
    if(this.domiciliosSeleccionados.length === 0) {
      this.activarModal();
    }
    else{
    const CUERPODATOS = {
      fraccion: this.domiciliosSeleccionados[0]?.fraccion,
      fraccionArancelaria: this.domiciliosSeleccionados[0]?.fraccionArancelaria,
      descripcionComercial:this.domiciliosSeleccionados[0]?.descripcionComercial,
      fraccionArancelariaImportacion: this.importacion,
      descripcionComercialImportacion:"Mercancias destinadas a procesos tales como reparacion, reacondicionamiento o remanufactura, cuando las empresas cuenten con registro otorgado conforme a los lineamientos establecidos por la Secretaria de Economia.  ", 
      anexoII: this.domiciliosSeleccionados[0]?.anexoII,
      tipo: this.domiciliosSeleccionados[0]?.tipo,
      umt:this.domiciliosSeleccionados[0]?.umt,
      categoria: this.domiciliosSeleccionados[0]?.categoria,
      valorMensual: this.domiciliosSeleccionados[0]?.valorMensual,
      valorAnual: this.domiciliosSeleccionados[0]?.valorAnual,
      volumenrMensual: this.domiciliosSeleccionados[0]?.volumenrMensual,
      volumenAnual: this.domiciliosSeleccionados[0]?.volumenAnual,
    }
    this.tramite80206Store.setDatosImportacion([...this.datosImportacion, CUERPODATOS]);

  }
}

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

 /**
   * Maneja los datos recibidos del componente hijo.
   * @method procesarDatosDelHijo
   * @param {Catalogo | Catalogo[]} data - Datos recibidos.
   */
  procesarDatosDelHijo(data: Catalogo | Catalogo[]): void {
    
    this.tramite80206Store.setAduanaDeIngresoSeleccion(data as Catalogo);
  }
  

  /**
   * Actualiza la lista de domicilios seleccionados.
   * @method seleccionarDomicilios
   * @param {Arancelaria} domicilios - Domicilios seleccionados.
   */
  seleccionarDomicilios(domicilios: Arancelaria): void {
    this.domiciliosSeleccionados = [domicilios];
  }

  
}