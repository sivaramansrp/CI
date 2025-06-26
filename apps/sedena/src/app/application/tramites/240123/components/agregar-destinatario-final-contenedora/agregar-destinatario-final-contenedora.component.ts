import { Catalogo, TipoPersona } from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

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
import { ReactiveFormsModule } from '@angular/forms';
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
export class AgregarDestinatarioFinalContenedoraComponent implements OnInit, OnDestroy {
@Output() cerrar = new EventEmitter<void>();
  /**
   * @private
   * @property unsubscribe$
   * @description Subject utilizado para gestionar la desuscripción de observables.
   * Se completa en `ngOnDestroy()` para prevenir fugas de memoria.
   * @type {Subject<void>}
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * @public
   * @property tipoPersona
   * @description Proporciona acceso al enum `TipoPersona` para su uso en la clase.
   * @type {TipoPersona}
   */
  public tipoPersona = TipoPersona;

  /**
   * @public
   * @property agregarDestinatarioFinal
   * @description Grupo de formulario reactivo para recopilar los datos del destinatario final.
   * @type {FormGroup}
   */
  agregarDestinatarioFinal!: FormGroup;

  /**
   * @public
   * @property paisesDatos
   * @description Datos de catálogo de países.
   * @type {Catalogo[]}
   */
  public paisesDatos: Catalogo[] = [];

  /**
   * @public
   * @property estadosDatos
   * @description Datos de catálogo de estados.
   * @type {Catalogo[]}
   */
  public estadosDatos: Catalogo[] = [];

  /**
   * @public
   * @property municipiosDatos
   * @description Datos de catálogo de municipios.
   * @type {Catalogo[]}
   */
  public municipiosDatos: Catalogo[] = [];

  /**
   * @public
   * @property localidadesDatos
   * @description Datos de catálogo de localidades.
   * @type {Catalogo[]}
   */
  public localidadesDatos: Catalogo[] = [];

  /**
   * @public
   * @property coloniasDatos
   * @description Datos de catálogo de colonias.
   * @type {Catalogo[]}
   */
  public coloniasDatos: Catalogo[] = [];

  /**
   * @public
   * @property codigosPostalesDatos
   * @description Datos de catálogo de códigos postales.
   * @type {Catalogo[]}
   */
  public codigosPostalesDatos: Catalogo[] = [];

  /**
   * @public
   * @property destinatarios
   * @description Arreglo que almacena la lista de destinatarios.
   * @type {DestinoFinal[]}
   */
  destinatarios: DestinoFinal[] = [];

  /**
   * @public
   * @property idProcedimiento
   * @description Identificador único del procedimiento actual. Este valor se utiliza para asociar el componente con un trámite específico en el sistema.
   * @type {number}
   */
  idProcedimiento = ID_PROCEDIMIENTO;

  /**
   * @public
   * @property campoObligatorio
   * @description Indica si ciertos campos del formulario son obligatorios según el procedimiento.
   * @type {boolean}
   * @default true
   */
  public campoObligatorio = false;

  /**
   * @public
   * @property tipoPersonaRadioOpciones
   * @description Opciones de radio para seleccionar el tipo de persona.
   * @type {string[]}
   */
  tipoPersonaRadioOpciones = TIPO_PERSONA_OPCIONES;

  /**
   * @public
   * @property tercerosNacionalidadOpciones
   * @description Opciones de nacionalidad para el formulario.
   * @type {string[]}
   */
  tercerosNacionalidadOpciones = TERCEROS_NACIONALIDAD_OPCIONES;

  /**
   * @public
   * @property tipoPersonaRadioOpcionesNoContribuyente
   * @description Opciones de tipo de persona para radio buttons, específicas para no contribuyentes.
   * @type {string[]}
   */
  tipoPersonaRadioOpcionesNoContribuyente = TIPO_PERSONA_OPCIONES_NO_CONTRIBUYENTE;

  /**
   * @constructor
   * @description Constructor del componente que inicializa los servicios y store necesarios para el funcionamiento del componente.
   * @param {FormBuilder} fb - Instancia de FormBuilder para la creación de formularios reactivos.
   * @param {DatosSolicitudService} datosSolicitudService - Servicio que proporciona los datos necesarios para completar el formulario.
   * @param {Location} ubicaccion - Servicio de ubicación para la navegación entre vistas.
   * @param {Tramite240123Store} tramiteStore - Store que administra el estado del trámite.
   * @param {Tramite240123Query} tramiteQuery - Query para obtener el estado del trámite.
   * @returns {void}
   */
  constructor(
    private fb: FormBuilder,    
    private datosSolicitudService: DatosSolicitudService,
    private ubicaccion: Location,    
    public tramiteStore: Tramite240123Store,
    public tramiteQuery: Tramite240123Query
  ) {}

  /**
   * @method ngOnInit
   * @description Método que se ejecuta al inicializar el componente. Llama a la creación del formulario.
   * @returns {void}
   */
  ngOnInit(): void {
    this.crearFormaulario();
  }

  /**
   * @method crearFormaulario
   * @description Crea el formulario reactivo `agregarDestinatarioFinal` utilizando `FormBuilder`. Define los campos y sus validaciones.
   * @returns {void}
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
   * @returns {void}
   */
  campoObligatorioChange(): void {
    const COLONIA = this.agregarDestinatarioFinal.get('colonia');
    const CALLE = this.agregarDestinatarioFinal.get('calle');
    const NUMEROEXTERIOR = this.agregarDestinatarioFinal.get('numeroExterior');
    if (this.campoObligatorio) {
      COLONIA?.clearValidators();
      CALLE?.setValidators([Validators.required]);
      NUMEROEXTERIOR?.setValidators([Validators.required]);
    } else {
      COLONIA?.setValidators([Validators.required]);
      CALLE?.clearValidators();
      NUMEROEXTERIOR?.clearValidators();
    }
    COLONIA?.updateValueAndValidity();
    CALLE?.updateValueAndValidity();
    NUMEROEXTERIOR?.updateValueAndValidity();
  }

  /**
   * @method cargarDatos
   * @description Recupera varias listas de datos del servicio `DatosSolicitudService` y
   * las asigna a propiedades locales. Se desuscribe automáticamente en el hook de
   * destrucción usando `takeUntil(this.unsubscribe$)`.
   * @returns {void}
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
   * @method guardarDestinatario
   * @description Guarda un nuevo destinatario en el arreglo local `destinatarios`
   * y actualiza la información en el store. Finalmente, resetea el formulario
   * y navega hacia atrás en el historial.
   * @returns {void}
   */
  guardarDestinatario(): void {
    const NUEVO_DESTINATARIO: DestinoFinal = {
      nombreRazonSocial: `${this.agregarDestinatarioFinal.value.nombres } ${this.agregarDestinatarioFinal.value.denominacionRazon} ${this.agregarDestinatarioFinal.value.primerApellido} 
      ${this.agregarDestinatarioFinal.value.segundoApellido || ''}`.trim(),
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
    this.cerrar.emit()
  }

  /**
   * @method updateDestinatarioFinalTablaDatos
   * @description Actualiza la lista de destinatarios finales en el store del trámite.
   * @param {DestinoFinal[]} event - Lista de destinatarios finales actualizada.
   * @returns {void}
   */
  updateDestinatarioFinalTablaDatos(event: DestinoFinal[]): void {
    this.tramiteStore.updateDestinatarioFinalTablaDatos(event);
  }

  /**
   * @method cancelar
   * @description Navega hacia la vista anterior utilizando el servicio de ubicación (`Location`).
   * @returns {void}
   */
  cancelar(): void {
    this.cerrar.emit()
  }

  /**
   * @method tipoPersonaCambioDeValor
   * @description Método que se ejecuta cuando se selecciona un país en el formulario.
   * @param {string} event - El país seleccionado.
   * @returns {void}
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
   * @returns {void}
   */
  limpiarFormulario(): void {
    this.agregarDestinatarioFinal.reset();
  }

  /**
   * @method terecerosNacionalidadCambioDeValor
   * @description Método que se ejecuta cuando se selecciona un país en el formulario.
   * @param {string} event - El país seleccionado.
   * @returns {void}
   */
  terecerosNacionalidadCambioDeValor(event: string | number): void {
    this.agregarDestinatarioFinal.patchValue({
      nacionalidad: event,
    });
  }
  ngOnDestroy(): void {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}
}
