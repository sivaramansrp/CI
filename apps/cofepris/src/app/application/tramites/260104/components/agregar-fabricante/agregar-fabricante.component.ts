import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CommonModule,Location } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { Catalogo, TipoPersona } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';

import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { Fabricante } from '../../models/terceros-relacionados-destino.model';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite260104Store } from '../../estados/stores/tramite260104.store';



/**
 * @module AgregarFabricanteComponent
 * @description
 * Este componente es responsable de gestionar la funcionalidad para agregar fabricantes en el trámite 260104.
 * Proporciona un formulario reactivo para capturar los datos del fabricante, maneja la lógica de validación,
 * y actualiza el estado del store con los datos ingresados. También permite la navegación hacia la vista anterior.
 * 
 * @selector app-agregar-fabricante
 * @standalone true
 * @imports
 * - CommonModule: Módulo común de Angular.
 * - ReactiveFormsModule: Módulo para trabajar con formularios reactivos.
 * - CatalogoSelectComponent: Componente para seleccionar elementos de un catálogo.
 * - TituloComponent: Componente para mostrar títulos en la interfaz.
 * 
 * @templateUrl ./agregar-fabricante.component.html
 * @styleUrl ./agregar-fabricante.component.scss
 * 
 * @implements
 * - OnDestroy: Interfaz para manejar la lógica de destrucción del componente.
 * - OnInit: Interfaz para manejar la inicialización del componente.
 */
@Component({
  selector: 'app-agregar-fabricante',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
  ],
  templateUrl: './agregar-fabricante.component.html',
  styleUrl: './agregar-fabricante.component.scss',
})

export class AgregarFabricanteComponent
  implements OnDestroy, OnInit
{

  /**
 * @property unsubscribe$
 * @description Observable utilizado para manejar la desuscripción de los observables y evitar fugas de memoria.
 * @type {Subject<void>}
 */
  private unsubscribe$ = new Subject<void>();

 /**
 * @property agregarFabricante
 * @description Formulario reactivo utilizado para capturar los datos del fabricante.
 * @type {FormGroup}
 */
  agregarFabricante!: FormGroup;

  /**
 * @property fabricantes
 * @description Arreglo que almacena los fabricantes agregados.
 * @type {Fabricante[]}
 */

  fabricantes:Fabricante[] = [];
/**
 * @property paisesDatos
 * @description Lista de países obtenida del servicio `DatosSolicitudService`.
 * @type {Catalogo[]}
 */
 
  public paisesDatos: Catalogo[] = [];

 
  /**
   * @property tipoPersona
   * @description Proporciona acceso al enum `TipoPersona` para su uso en la clase.
   * @type {TipoPersona}
   */
  public tipoPersona = TipoPersona;

/**
 * @constructor
 * @description Constructor del componente que inicializa los servicios necesarios.
 * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
 * @param {Location} ubicaccion - Servicio para manejar la navegación.
 * @param {DatosSolicitudService} datosSolicitudService - Servicio para obtener datos relacionados con la solicitud.
 * @param {Tramite260104Store} tramiteStore - Servicio para gestionar el estado del trámite.
 */

  constructor(
    private fb: FormBuilder,
    private ubicaccion: Location,
    private datosSolicitudService: DatosSolicitudService,
    private tramiteStore:Tramite260104Store
  ) {
    //constructor necesario para el servicio
  }

 /**
 * @method guardarFabricante
 * @description Método que guarda los datos del fabricante en el arreglo `fabricantes` y actualiza el estado en el store.
 * También resetea el formulario y navega a la vista anterior.
 * @returns {void}
 */
 
  guardarFabricante(): void {
    const VALOR_FORMULARIO = this.agregarFabricante.getRawValue();

    let nombreRazonSocial: string;

    if (VALOR_FORMULARIO.tipoPersona === this.tipoPersona.MORAL) {
      nombreRazonSocial = VALOR_FORMULARIO.denominacionRazon;
    } else if (VALOR_FORMULARIO.tipoPersona === this.tipoPersona.FISICA) {
      nombreRazonSocial = `${VALOR_FORMULARIO.nombres} ${
        VALOR_FORMULARIO.primerApellido
      } ${VALOR_FORMULARIO.segundoApellido || ''}`.trim();
    } else {
      nombreRazonSocial = ''; 
    }
    const NUEVO_FABRICANTE: Fabricante = {
      tipoPersona:VALOR_FORMULARIO.tipoPersona,
      nombreRazonSocial:nombreRazonSocial,
      rfc: VALOR_FORMULARIO.rfc,
      curp: '',
      telefono:
        `${VALOR_FORMULARIO.lada} ${VALOR_FORMULARIO.telefono}`.trim(),
      correoElectronico: VALOR_FORMULARIO.correoElectronico,
      calle: VALOR_FORMULARIO.calle,
      numeroExterior: VALOR_FORMULARIO.numeroExterior,
      numeroInterior: VALOR_FORMULARIO.numeroInterior || '',
      pais: VALOR_FORMULARIO.pais,
      colonia: VALOR_FORMULARIO.colonia,
      municipioAlcaldia: VALOR_FORMULARIO.municipio,
      localidad: VALOR_FORMULARIO.localidad,
      estadoLocalidad: VALOR_FORMULARIO.estado,
      estado: VALOR_FORMULARIO.estado,
      coloniaEquivalente: VALOR_FORMULARIO.codigoPostal,
      lada:VALOR_FORMULARIO.lada,
      descPais:VALOR_FORMULARIO.descPais,
    };

    this.fabricantes.push(NUEVO_FABRICANTE);
    this.tramiteStore.updateFabricanteTablaDatos(this.fabricantes);
    this.agregarFabricante.reset();
    this.ubicaccion.back();
  }

 /**
 * @method ngOnInit
 * @description Hook del ciclo de vida que se ejecuta al inicializar el componente.
 * Llama a los métodos `cargarDatos` y `crearAgregarFormularioAgregarDestinatarioFinal`.
 * @returns {void}
 */
  ngOnInit(): void {
    this.cargarDatos();
    this.crearAgregarFormularioAgregarDestinatarioFinal();
  }

  /**
 * @method cargarDatos
 * @description Método que obtiene la lista de países desde el servicio `DatosSolicitudService` y la asigna a `paisesDatos`.
 * Utiliza `takeUntil` para manejar la desuscripción.
 * @returns {void}
 */

    cargarDatos(): void {
    this.datosSolicitudService
      .obtenerListaPaises()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.paisesDatos = data;
      });

    }
 

  
  


  /**
   * @method crearAgregarFormularioAgregarDestinatarioFinal
   * @description
   * This method initializes the `FormGroup` for the "Agregar Destinatario Final" component. 
   * It sets up the form controls with their default values, validation rules, and disabled states 
   * based on the `elementosDeshabilitados` and `elementosNoRequeridos` arrays.
   * @returns {void} This method does not return any value.
   */
  crearAgregarFormularioAgregarDestinatarioFinal(): void {
    this.agregarFabricante = this.fb.group({
      tipoPersona: ['', Validators.required],
      rfc: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(13),
        ],
      ],
      nombres: ['',
       [Validators.required, Validators.maxLength(200)],
      ],
      denominacionRazon: ['', Validators.required],
      primerApellido: ['',  
        Validators.required],
      segundoApellido: [''],
      pais: [
        {
          value: '1',
          disabled: true,
        },
        Validators.required,
      ],
      descPais: [''], // Added this line
      estado: ['', Validators.required],
      municipio: ['', Validators.required],
      localidad: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      colonia: ['',[Validators.required]
      ],
      calle: [
        '',Validators.required],
      numeroExterior: [
        '',Validators.required],

           numeroInterior: [''],
      lada: ['', Validators.required],
      telefono: [''
      ],
      correoElectronico: [
        '',[Validators.required, Validators.email],
      ],
    });
  }

/**
 * @method limpiarFormulario
 * @description Resetea el formulario `agregarFabricante` para limpiar todos los campos.
 * @returns {void}
 */ 
  limpiarFormulario(): void {
    this.agregarFabricante.reset();
  }
  /**
 * @method cancelar
 * @description Navega hacia la vista anterior utilizando el servicio `Location`.
 * @returns {void}
 */
  cancelar(): void {
    this.ubicaccion.back();
  }


/**
 * @method ngOnDestroy
 * @description Hook del ciclo de vida que se ejecuta justo antes de destruir el componente.
 * Emite un valor en `unsubscribe$` para notificar a los suscriptores y completa el observable.
 * @returns {void}
 */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
