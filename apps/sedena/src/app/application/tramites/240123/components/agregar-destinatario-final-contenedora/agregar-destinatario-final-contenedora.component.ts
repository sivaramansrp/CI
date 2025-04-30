import { Catalogo, TipoPersona } from '@libs/shared/data-access-user/src';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { TERCEROS_NACIONALIDAD_OPCIONES, TIPO_PERSONA_OPCIONES, TIPO_PERSONA_OPCIONES_NO_CONTRIBUYENTE } from '../../../../shared/constants/datos-solicitud.enum';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';

import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { DestinoFinal } from '../../../../shared/models/terceros-relacionados.model';
import { ID_PROCEDIMIENTO } from '../../constants/exportacion-sustancias-quimicas.enum';
import { InputRadioComponent } from '@ng-mf/data-access-user';

import { Location } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { Tramite240123Query } from '../../estados/tramite240123Query.query';
import { Tramite240123Store } from '../../estados/tramite240123Store.store';

/**
 * @title Agregar Destinatario Final Contenedora
 * @description Componente contenedor que gestiona la integración del componente de destinatario final con el store.
 * @summary Encapsula el componente de agregar destinatario final y propaga los datos al estado global.
 */

@Component({
  selector: 'app-agregar-destinatario-final-contenedora',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, CatalogoSelectComponent, InputRadioComponent],
  templateUrl: './agregar-destinatario-final-contenedora.component.html',
  styleUrl: './agregar-destinatario-final-contenedora.component.scss',
})
export class AgregarDestinatarioFinalContenedoraComponent implements OnInit {
 
 /**
   * Subject utilizado para gestionar la desuscripción de observables.
   * Se completa en `ngOnDestroy()` para prevenir fugas de memoria.
   * @property {Subject<void>} unsubscribe$
   * @private
   */
  private unsubscribe$ = new Subject<void>();
  
   /**
     * @property tipoPersona
     * @description Proporciona acceso al enum `TipoPersona` para su uso en la clase.
     * @type {TipoPersona}
     */
    public tipoPersona = TipoPersona;

   /**
   * Grupo de formulario reactivo para recopilar los datos del destinatario final.
   * @property {FormGroup} agregarDestinatarioFinal
   */
   agregarDestinatarioFinal!: FormGroup;
  
    /**
     * Datos de catálogo de países.
     * @property {Catalogo[]} paisesDatos
     */
    public paisesDatos: Catalogo[] = [];
  
    /**
     * Datos de catálogo de estados.
     * @property {Catalogo[]} estadosDatos
     */
    public estadosDatos: Catalogo[] = [];
  
    /**
     * Datos de catálogo de municipios.
     * @property {Catalogo[]} municipiosDatos
     */
    public municipiosDatos: Catalogo[] = [];
  
    /**
     * Datos de catálogo de localidades.
     * @property {Catalogo[]} localidadesDatos
     */
    public localidadesDatos: Catalogo[] = [];
  
    /**
     * Datos de catálogo de colonias.
     * @property {Catalogo[]} coloniasDatos
     */
    public coloniasDatos: Catalogo[] = [];
  
    /**
     * Datos de catálogo de códigos postales.
     * @property {Catalogo[]} codigosPostalesDatos
     */
    public codigosPostalesDatos: Catalogo[] = [];

     /**
   * Arreglo que almacena la lista de destinatarios.
   * @property {Destinatario[]} destinatarios
   */
  destinatarios: DestinoFinal[] = [];

 /**
 * @property
 * @name idProcedimiento
 * @type {number}
 * @description Identificador único del procedimiento actual. Este valor se utiliza para asociar el componente con un trámite específico en el sistema.
 */
    idProcedimiento = ID_PROCEDIMIENTO;

  /**
   * @property campoObligatorio
   * @description Indica si ciertos campos del formulario son obligatorios según el procedimiento.
   * @type {boolean}
   * @default true
   */
  public campoObligatorio = false;
  
    /**
     * Opciones de radio para seleccionar el tipo de persona.
     */
    tipoPersonaRadioOpciones = TIPO_PERSONA_OPCIONES;
  
    /*
     * Opciones de nacionalidad para el formulario.
     */
    tercerosNacionalidadOpciones = TERCEROS_NACIONALIDAD_OPCIONES;

     /**
       * @description Opciones de tipo de persona para radio buttons, específicas para no contribuyentes.
       * @command Opciones utilizadas para determinar el tipo de persona en el formulario de proveedor.
       */
      tipoPersonaRadioOpcionesNoContribuyente = TIPO_PERSONA_OPCIONES_NO_CONTRIBUYENTE;

  /**
   * Constructor del componente.
   *
   * @method constructor
   * @param {Tramite240123Store} tramiteStore - Store que administra el estado del trámite.
   * @returns {void}
   */
  constructor(
    private fb: FormBuilder,    
    private datosSolicitudService: DatosSolicitudService,
    private ubicaccion: Location,    
    public tramiteStore: Tramite240123Store,
    public tramiteQuery: Tramite240123Query) {

    }
 
ngOnInit():void{
  this.crearFormaulario();
}

  /**
   * Crea el formulario reactivo `agregarDestinatarioFinal` utilizando `FormBuilder`.
   * Define los campos y sus validaciones.
   *
   */
  crearFormaulario(): void {
    this.agregarDestinatarioFinal = this.fb.group({
      tipoPersona: ['', Validators.required],     
      nombres: ['', Validators.required],
      denominacionRazon: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      pais: ['', Validators.required],
      estado: ['', Validators.required],
      municipio: ['', Validators.required],
      localidad: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      colonia: ['', Validators.required],
      calle: ['', Validators.required],
      numeroExterior: ['', Validators.required],
      numeroInterior: [''],
      lada: ['', Validators.required],
      telefono: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      nacionalidad: [],
    });
    this.cargarDatos();
    this.agregarDestinatarioFinal.disable();
    this.agregarDestinatarioFinal.get('tipoPersona')?.enable();
    this.agregarDestinatarioFinal.get('nacionalidad')?.enable();
  }
   /**
   * @method campoObligatorioChange
   * @description Cambia las validaciones de los campos del formulario según el valor de `campoObligatorio`.
   * Si `campoObligatorio` es verdadero, se eliminan las validaciones de la colonia y se agregan
   * validaciones requeridas para la calle y el número exterior. Si es falso, se realiza lo contrario.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
   campoObligatorioChange(): void {
    const COLONIA = this.agregarDestinatarioFinal.get('colonia')
    const CALLE = this.agregarDestinatarioFinal.get('calle')
    const NUMEROEXTERIOR = this.agregarDestinatarioFinal.get('numeroExterior')
    if (this.campoObligatorio) {
      COLONIA?.clearValidators();
      CALLE?.setValidators([Validators.required]);
      NUMEROEXTERIOR?.setValidators([Validators.required]);
    }
    else {
      COLONIA?.setValidators([Validators.required]);
      CALLE?.clearValidators();
      NUMEROEXTERIOR?.clearValidators();
    }
    COLONIA?.updateValueAndValidity();
    CALLE?.updateValueAndValidity();
    NUMEROEXTERIOR?.updateValueAndValidity();
  }

  /**
     * Recupera varias listas de datos del servicio `DatosSolicitudService` y
     * las asigna a propiedades locales. Se desuscribe automáticamente en el hook de
     * destrucción usando `takeUntil(this.unsubscribe$)`.
     */
    cargarDatos(): void {
      this.datosSolicitudService
        .obtenerListaCodigosPostales()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data) => {
          this.codigosPostalesDatos = data;
        });
  
      this.datosSolicitudService
        .obtenerListaPaises()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data) => {
          this.paisesDatos = data;
        });
  
      this.datosSolicitudService
        .obtenerListaEstados()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data) => {
          this.estadosDatos = data;
        });
  
      this.datosSolicitudService
        .obtenerListaMunicipios()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data) => {
          this.municipiosDatos = data;
        });
  
      this.datosSolicitudService
        .obtenerListaLocalidades()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data) => {
          this.localidadesDatos = data;
        });
  
      this.datosSolicitudService
        .obtenerListaColonias()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data) => {
          this.coloniasDatos = data;
        });
    }


 /**
   * Guarda un nuevo destinatario en el arreglo local `destinatarios`
   * y actualiza la información en el store. Finalmente, resetea el formulario
   * y navega hacia atrás en el historial.
   */
 guardarDestinatario(): void {
  const NUEVO_DESTINATARIO: DestinoFinal = {
    nombreRazonSocial: `${this.agregarDestinatarioFinal.value.nombres} ${this.agregarDestinatarioFinal.value.primerApellido
      } ${this.agregarDestinatarioFinal.value.segundoApellido || ''}`.trim(),
    rfc: this.agregarDestinatarioFinal.value.rfc,
    curp: this.agregarDestinatarioFinal.value.curp,
    telefono:
      `${this.agregarDestinatarioFinal.value.lada} ${this.agregarDestinatarioFinal.value.telefono}`.trim(),
    correoElectronico: this.agregarDestinatarioFinal.value.correoElectronico,
    calle: this.agregarDestinatarioFinal.value.calle,
    numeroExterior: this.agregarDestinatarioFinal.value.numeroExterior,
    numeroInterior: this.agregarDestinatarioFinal.value.numeroInterior || '',
    pais: this.agregarDestinatarioFinal.value.pais,
    colonia: this.agregarDestinatarioFinal.value.colonia,
    municipioAlcaldia: this.agregarDestinatarioFinal.value.municipio,
    localidad: this.agregarDestinatarioFinal.value.localidad,
    entidadFederativa: '',
    estadoLocalidad: this.agregarDestinatarioFinal.value.estado,
    codigoPostal: this.agregarDestinatarioFinal.value.codigoPostal,
  };

  this.destinatarios.push(NUEVO_DESTINATARIO);
  this.updateDestinatarioFinalTablaDatos(this.destinatarios);
  this.agregarDestinatarioFinal.reset();
  this.ubicaccion.back();
}
  /**
   * Actualiza la lista de destinatarios finales en el store del trámite.
   *
   * @method updateDestinatarioFinalTablaDatos
   * @param {DestinoFinal[]} event - Lista de destinatarios finales actualizada.
   * @returns {void}
   */
  updateDestinatarioFinalTablaDatos(event: DestinoFinal[]): void {
    this.tramiteStore.updateDestinatarioFinalTablaDatos(event);
  }

  /**
   * @method cancelar
   * @description Navega hacia la vista anterior utilizando el servicio de ubicación (`Location`).
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  cancelar(): void {
    this.ubicaccion.back();
  }

  /**
   * * Método que se ejecuta cuando se selecciona un país en el formulario.
   * * @param {string} event - El país seleccionado.
   * * @returns {void} No retorna ningún valor.
   */
  tipoPersonaCambioDeValor(event: string | number): void {
    this.agregarDestinatarioFinal.enable();
    this.agregarDestinatarioFinal.patchValue({
      tipoPersona: event,
    });
  }

   /**
   * @method limpiarFormulario
   * @description Resetea el formulario reactivo `agregarProveedorForm` para limpiar todos los campos.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  limpiarFormulario(): void {
    this.agregarDestinatarioFinal.reset();
  }

   /**
   * * Método que se ejecuta cuando se selecciona un país en el formulario.
   * * @param {string} event - El país seleccionado.
   * * @returns {void} No retorna ningún valor.
   */
   terecerosNacionalidadCambioDeValor(event: string | number): void {
    this.agregarDestinatarioFinal.patchValue({
      nacionalidad: event,
    });
  }
}
