import { AlertComponent, InputCheckComponent } from '@libs/shared/data-access-user/src';
import { Subject, map } from 'rxjs';
import {Tramite260904State, Tramite260904Store } from '../../estados/tramite260904.store';
import { ALERT } from '../../enums/domicilio-del-establecimiento-260904.enum';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery} from "@ng-mf/data-access-user";
import { DomicilioDelEstablecimientoService } from '../../services/domicilio-del-establecimiento/domicilio-del-establecimiento.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { MERCANCIAS_DATA } from '../../modelos/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { MercanciasInfo } from '../../modelos/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { NICO_TABLA } from '../../modelos/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { NicoInfo } from '../../modelos/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { OPCIONES_DE_BOTON_DE_RADIO } from '../../enums/domicilio-del-establecimiento-260904.enum';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntil } from 'rxjs';

import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite260904Query } from '../../estados/tramite260904.query';

import { Validators } from '@angular/forms';

/**
 * Componente para gestionar el domicilio del establecimiento 260904.
 *
 * @selector app-domicilio-del-establecimiento-260904
 * @standalone true
 * @imports [
 *   CommonModule,
 *   TituloComponent,
 *   ReactiveFormsModule,
 *   CatalogoSelectComponent,
 *   AlertComponent,
 *   TablaDinamicaComponent,
 *   InputRadioComponent,
 *   InputCheckComponent
 * ]
 * @templateUrl ./domicilio-del-establecimiento-260904.component.html
 * @styleUrl ./domicilio-del-establecimiento-260904.component.scss
 */
@Component({
  selector: 'app-domicilio-del-establecimiento-260904',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    AlertComponent,
    TablaDinamicaComponent,
    InputRadioComponent,
    InputCheckComponent
  ],
  templateUrl: './domicilio-del-establecimiento-260904.component.html',
  styleUrl: './domicilio-del-establecimiento-260904.component.scss',
})
export class DomicilioDelEstablecimiento260904Component
  implements OnInit, OnDestroy
{
  /**
    * Formulario principal.
    */
   form!: FormGroup;
 
   /**
    * Lista de estados.
    */
   estado: Catalogo[] = [];
 
   /**
    * Textos de alerta.
    */
   TEXTOS = ALERT;
 
   /**
    * Clase de alerta.
    */
   class = 'alert-warning';
 
   /**
    * Configuración de selección de tabla.
    */
   tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;
 
   /**
    * Configuración de columnas de la tabla NICO.
    */
   nicoTabla: ConfiguracionColumna<NicoInfo>[] = NICO_TABLA;
 
   /**
    * Datos de la tabla NICO.
    */
   nicoTablaDatos: NicoInfo[] = [];
 
   /**
    * Formulario de domicilio.
    */
   domicilio!: FormGroup;
 
   /**
    * Configuración de columnas de la tabla de mercancías.
    */
   mercanciasTabla: ConfiguracionColumna<MercanciasInfo>[] = MERCANCIAS_DATA;
 
   /**
    * Datos de la tabla de mercancías.
    */
   mercanciasTablaDatos: MercanciasInfo[] = [];
 
   /**
    * Manifiestos de alerta.
    */
   manifests = ALERT.MANIFESTS;
 
   /**
    * Opciones de botón de radio.
    */
   opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;
 
   /**
    * Formulario de representante legal.
    */
   representanteLegal!: FormGroup;

/** 
 * Observable utilizado para gestionar la destrucción de suscripciones y evitar fugas de memoria.
 * Se emite un valor y se completa cuando el componente se destruye.
 */
 
   private destroy$ = new Subject<void>();
 
   
     /**
      * Estado seleccionado del trámite 260911.
      */
     estadoSeleccionado!: Tramite260904State;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;
 
 
   /**
    * Constructor del componente.
    * 
    * @param fb FormBuilder para crear formularios.
    * @param httpServicios Servicio HTTP para realizar peticiones.
    * @param tramite260904Query Consulta de datos del trámite.
    * @param tramite260904Store Almacenamiento de datos del trámite.
    */
   constructor(
     private fb: FormBuilder,
     private tramite260904Query: Tramite260904Query,
     private tramite260904Store: Tramite260904Store,
     private domicilioDelEstablecimientoService:DomicilioDelEstablecimientoService,
    private consultaQuery: ConsultaioQuery,
         ) {
           this.consultaQuery.selectConsultaioState$
             .pipe(
               takeUntil(this.destroy$),
               map((seccionState) => {
                 this.esFormularioSoloLectura = seccionState.readonly || true;
                 this.inicializarEstadoFormulario();
               })
             )
             .subscribe();
         }
   /**
    * Método de inicialización del componente.
    */
   ngOnInit(): void {
     this.getValorStore();
     this.crearFormulario();
     this.obtenerTablaDatos();
     this.obtenerEstadoList();
     this.obtenerMercanciasDatos();
     this.inicializarEstadoFormulario();
 }

/**
 * @method inicializarEstadoFormulario
 * @description
 * Inicializa el estado de los controles del formulario dependiendo si el formulario es de solo lectura o editable.
 * 
 * Si `esFormularioSoloLectura` es verdadero, deshabilita los campos del formulario principal, del domicilio y del representante legal.
 * Si es falso, habilita dichos campos para su edición.
 *
 * @memberof DomicilioDelEstablecimiento260904Component
 * @returns {void}
 */
 inicializarEstadoFormulario():void {
   if (this.esFormularioSoloLectura) {
      this.form.get('codigoPostal')?.disable();
      this.form.get('municipioOAlcaldia')?.disable();
      this.form.get('localidad')?.disable();
      this.form.get('colonias')?.disable();
      this.form.get('calle')?.disable();
      this.form.get('lada')?.disable();
      this.form.get('telefono')?.disable();
      this.domicilio.get('avisoCheckbox')?.disable();
      this.domicilio.get('licenciaSanitaria')?.disable();
      this.domicilio.get('aduanasEntradas')?.disable();
      this.domicilio.get('aifaCheckbox')?.disable();
      this.domicilio.get('manifests')?.disable();
      this.representanteLegal.get('acuerdoPublico')?.disable();
      this.representanteLegal.get('rfc')?.disable();
    } else {
       this.form.get('codigoPostal')?.enable();
      this.form.get('municipioOAlcaldia')?.enable();
      this.form.get('localidad')?.enable();
      this.form.get('colonias')?.enable();
      this.form.get('calle')?.enable();
      this.form.get('lada')?.enable();
      this.form.get('telefono')?.enable();
      this.domicilio.get('avisoCheckbox')?.enable();
      this.domicilio.get('licenciaSanitaria')?.enable();
      this.domicilio.get('aduanasEntradas')?.enable();
      this.domicilio.get('aifaCheckbox')?.enable();
      this.domicilio.get('manifests')?.enable();
      this.representanteLegal.get('acuerdoPublico')?.enable();
      this.representanteLegal.get('rfc')?.enable();
 }
}
 
   /**
    * Método para crear el formulario.
    */
   crearFormulario(): void {
     this.form = this.fb.group({
       codigoPostal: [this.estadoSeleccionado.codigoPostal, [Validators.required]],
       estado: [this.estadoSeleccionado.estado],
       municipioOAlcaldia: [this.estadoSeleccionado.municipioOAlcaldia, [Validators.required]],
       localidad: [this.estadoSeleccionado.localidad],
       colonias: [this.estadoSeleccionado.colonias],
       calle: [this.estadoSeleccionado.calle, [Validators.required]],
       lada: [this.estadoSeleccionado.lada],
       telefono: [this.estadoSeleccionado.telefono, [Validators.required]],
     });
 
     this.domicilio = this.fb.group({
       avisoCheckbox: [true],
       licenciaSanitaria: [{ value: '', disabled: true }],
       regimen: [this.estadoSeleccionado.regimen],
       aduanasEntradas: [this.estadoSeleccionado.aduanasEntradas],
       aifaCheckbox: [true],
       manifests: [true],
     });
 
     this.representanteLegal = this.fb.group({
       acuerdoPublico: [this.estadoSeleccionado.acuerdoPublico],
       rfc: [this.estadoSeleccionado.rfc, [Validators.required]],
       nombre: [{ value: 'LUIS AMBROSIO', disabled: true }, [Validators.required]],
       apellidoPaterno: [{ value: 'MARTINEZ', disabled: true }, [Validators.required]],
       apellidoMaterno: [{ value: 'VALENZUELA', disabled: true }, [Validators.required]],
     });
   }
 
   /**
    * Método para obtener los datos de la tabla.
    */
   obtenerTablaDatos(): void {
     this.domicilioDelEstablecimientoService
       .obtenerTablaDatos()
       .pipe(takeUntil(this.destroy$))
       .subscribe((data) => {
         this.nicoTablaDatos = data?.data;
       });
   }
 
    /**
    * Método para obtener la lista de estados.
    */
    obtenerEstadoList(): void {
     this.domicilioDelEstablecimientoService
       .obtenerEstadoList()
       .pipe(takeUntil(this.destroy$))
       .subscribe((data) => {
         this.estado = data?.data || [];
       });
   }
  
 
   /**
    * Método para obtener los datos de mercancías.
    */
   obtenerMercanciasDatos(): void {
     this.domicilioDelEstablecimientoService
       .obtenerMercanciasDatos()
       .pipe(takeUntil(this.destroy$))
       .subscribe((data) => {
         this.mercanciasTablaDatos = data?.data || [];
       });
   }
 
   /**
    * Actualiza un valor específico en el store del trámite.
    * 
    * @param FormGroup - Formulario reactivo.
    * @param control - Nombre del control cuyo valor se actualizará en el store.
    */
   setValorStore(FormGroup: FormGroup, control: string): void {
     const VALOR = FormGroup.get(control)?.value;
     this.tramite260904Store.setTramite260904State({
       [control]: VALOR
     });
   }
 
   /**
    * Obtiene el estado actual del trámite desde el store.
    */
   getValorStore(): void {
     this.tramite260904Query.selectTramite260904$.pipe(
       takeUntil(this.destroy$)
     ).subscribe(
       (data) => {
         this.estadoSeleccionado = data;
       }
     );
   }

    /**
     * @inheritdoc
     * @description
     * Método del ciclo de vida de Angular que se llama justo antes de destruir el componente.
     * Aquí se emite y completa el observable `destroy$` para limpiar suscripciones y evitar fugas de memoria.
     */
     ngOnDestroy(): void {
     this.destroy$.next();
     this.destroy$.complete();
   }
   
 }