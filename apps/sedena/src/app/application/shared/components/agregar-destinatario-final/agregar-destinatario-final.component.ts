import {
  CAMPO_OBLIGATORIO_DESTINATARIO,
  PROCEDIMIENTOS_PARA_NO_CONTRIBUYENTE,
  TIPO_PERSONA_OPCIONES_NO_CONTRIBUYENTE,
} from '../../constants/datos-solicitud.enum';
import { STR_NACIONAL } from '../../constants/datos-solicitud.enum';
import { TERCEROS_NACIONALIDAD_OPCIONES } from '../../constants/datos-solicitud.enum';
import { TIPO_PERSONA_OPCIONES } from '../../constants/datos-solicitud.enum';

import {
  DestinoFinal,
  Proveedor,
} from '../../models/terceros-relacionados.model';

import { DatosSolicitudService } from '../../services/datos-solicitud.service';

import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { OnChanges } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { TipoPersona } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

import { ES_CURP } from '../../constants/datos-del-tramilte.enum';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Componente para agregar un destinatario final (Destinatario) al formulario y almacenarlo.
 *
 * @example
 * <app-agregar-destinatario-final></app-agregar-destinatario-final>
 */
@Component({
  selector: 'app-agregar-destinatario-final',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
    InputRadioComponent,
  ],
  templateUrl: './agregar-destinatario-final.component.html',
  styleUrl: './agregar-destinatario-final.component.scss',
})
export class AgregarDestinatarioFinalComponent
  implements OnDestroy, OnInit, OnChanges
{
  /**
   * Subject utilizado para gestionar la desuscripción de observables.
   * Se completa en `ngOnDestroy()` para prevenir fugas de memoria.
   * @property {Subject<void>} destroyNotifier$
   * @private
   */
  private destroyNotifier$ = new Subject<void>();

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
   * @property tipoPersona
   * @description Proporciona acceso al enum `TipoPersona` para su uso en la clase.
   * @type {TipoPersona}
   */
  public tipoPersona = TipoPersona;

  /**
   * Arreglo que almacena la lista de destinatarios.
   * @property {Destinatario[]} destinatarios
   */
  destinatarios: DestinoFinal[] = [];

  /**
   * @property idProcedimiento
   * @description Identificador del procedimiento asociado a este componente.
   * @type {number}
   */
  @Input() idProcedimiento!: number;

  /**
   * Indica si el formulario se encuentra en modo solo lectura.
   * Cuando es verdadero, los campos del formulario no pueden ser editados.
   * @property {boolean} esFormularioSoloLectura
   * @default false
   */
  @Input() esFormularioSoloLectura: boolean = false;

  /**
   * @property mostrarCamposNoContribuyente
   * @description Controla la visibilidad de los campos específicos para no contribuyentes.
   * @type {boolean}
   * @default false
   */
  public mostrarCamposNoContribuyente: boolean = false;

  /**
   * @property esCURP
   * @description Controla la visibilidad de los campos específicoS C.U.R.P.
   * @type {boolean}
   * @default false
   */
  public esCURP = false;

  /**
   * Emite la lista de destinatarios actualizada para ser consumida por otros componentes.
   * @property {EventEmitter<Destinatario[]>} updateDestinatarioFinalTabla
   **/

  @Output() updateDestinatarioFinalTablaDatos = new EventEmitter<
    DestinoFinal[]
  >();


  @Output() cancelarEventListener = new EventEmitter<boolean>();
  /**
   * Constante que almacena el valor de "Nacional" para su uso en el formulario.
   * @property {string} nacionalStr
   * @default STR_NACIONAL
   */

  public nacionalStr = STR_NACIONAL;

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
  tipoPersonaRadioOpcionesNoContribuyente =
    TIPO_PERSONA_OPCIONES_NO_CONTRIBUYENTE;

  /**
   * Datos del formulario que pueden ser de tipo `DestinoFinal`, `Proveedor`, `null` o `undefined`.
   * Este input se utiliza para recibir la información necesaria desde el componente padre.
   *
   * @type {DestinoFinal | Proveedor | null | undefined}
   */
  @Input() formaDatos!: DestinoFinal | Proveedor | null | undefined;

  /**
   * @property campoObligatorio
   * @description Indica si ciertos campos del formulario son obligatorios según el procedimiento.
   * @type {boolean}
   * @default true
   */
  public campoObligatorio = false;

  /**
   * Crea el componente e inicializa el grupo de formulario.
   *
   * @param {FormBuilder} fb - Inyector de FormBuilder para crear formularios reactivos.
   * @param {Location} ubicaccion - Servicio de Angular para navegar hacia atrás en el historial.
   * @param {DatosSolicitudService} datosSolicitudService - Servicio para obtener diferentes listas de datos.
   * @param consultaioQuery - Servicio para consultar el estado del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private ubicaccion: Location,
    private datosSolicitudService: DatosSolicitudService,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.mostrarCamposNoContribuyente =
      PROCEDIMIENTOS_PARA_NO_CONTRIBUYENTE.includes(this.idProcedimiento);
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState: { readonly: boolean }) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }
  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.crearFormaulario();
    }
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.crearFormaulario();
    if (this.esFormularioSoloLectura) {
      this.agregarDestinatarioFinal.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.agregarDestinatarioFinal.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }
  /**
   * Hook de ciclo de vida de Angular que se llama cuando se detectan cambios en las propiedades de entrada.
   * Llama al método `mostrarCamposNoContribuyente()`.
   */
  ngOnChanges(): void {
    this.mostrarCamposNoContribuyente =
      PROCEDIMIENTOS_PARA_NO_CONTRIBUYENTE.includes(this.idProcedimiento);
  }

  /**
   * Guarda un nuevo destinatario en el arreglo local `destinatarios`
   * y actualiza la información en el store. Finalmente, resetea el formulario
   * y navega hacia atrás en el historial.
   */
  guardarDestinatario(): void {
    if (this.agregarDestinatarioFinal.invalid) {
      this.agregarDestinatarioFinal.markAllAsTouched();
      return;
    }
    const NUEVO_DESTINATARIO: DestinoFinal = {
      nombreRazonSocial: `${this.agregarDestinatarioFinal.value.nombres} ${
        this.agregarDestinatarioFinal.value.primerApellido
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
      tipoPersona: this.agregarDestinatarioFinal.value.tipoPersona,
      estado: this.agregarDestinatarioFinal.value.estado,
    };

    this.destinatarios.push(NUEVO_DESTINATARIO);
    this.updateDestinatarioFinalTablaDatos.emit(this.destinatarios);
    this.agregarDestinatarioFinal.reset();
    this.ubicaccion.back();
  }

  /**
   * Hook del ciclo de vida que se invoca cuando se inicializa el componente.
   * Llama al método `cargarDatos()`.
   */
  ngOnInit(): void {
    this.crearFormaulario();
    this.campoObligatorio = CAMPO_OBLIGATORIO_DESTINATARIO.includes(
      this.idProcedimiento
    );
    this.campoObligatorioChange();
    this.cargarDatos();
    this.esCURP = ES_CURP.includes(this.idProcedimiento);
  }

  /**
   * Crea el formulario reactivo `agregarDestinatarioFinal` utilizando `FormBuilder`.
   * Define los campos y sus validaciones.
   *
   */
  crearFormaulario(): void {
    this.agregarDestinatarioFinal = this.fb.group({
      tipoPersona: ['', Validators.required],
      rfc: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(13),
        ],
      ],
      curp: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(13),
        ],
      ],
      nombres: ['', [Validators.required, Validators.maxLength(200)]],
      denominacionRazon: ['', [Validators.required, Validators.maxLength(254)]],
      primerApellido: ['', [Validators.required, Validators.maxLength(200)]],
      segundoApellido: ['', Validators.maxLength(200)],
      pais: ['', Validators.required],
      estado: ['', [Validators.required, Validators.maxLength(120)]],
      municipio: ['', Validators.required],
      localidad: ['', Validators.required],
      codigoPostal: ['', [Validators.required, Validators.maxLength(12)]],
      colonia: ['', Validators.required],
      calle: ['', [Validators.required, Validators.maxLength(300)]],
      numeroExterior: ['', [Validators.required, Validators.maxLength(55)]],
      numeroInterior: ['', Validators.maxLength(55)],
      lada: ['', Validators.maxLength(5)],
      telefono: ['', Validators.maxLength(24)],
      correoElectronico: ['', [Validators.email, Validators.maxLength(320)]],
      nacionalidad: ['', Validators.required],
    });
    this.cargarDatos();
    this.agregarDestinatarioFinal.disable();
    this.agregarDestinatarioFinal.get('tipoPersona')?.enable();
    this.agregarDestinatarioFinal.get('nacionalidad')?.enable();
    if (this.formaDatos) {
      this.agregarDestinatarioFinal.patchValue(this.formaDatos);
    }
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
   * Recupera varias listas de datos del servicio `DatosSolicitudService` y
   * las asigna a propiedades locales. Se desuscribe automáticamente en el hook de
   * destrucción usando `takeUntil(this.destroyNotifier$)`.
   */
  cargarDatos(): void {
    this.datosSolicitudService
      .obtenerListaCodigosPostales()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.codigosPostalesDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaPaises()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.paisesDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaEstados()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.estadosDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaMunicipios()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.municipiosDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaLocalidades()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.localidadesDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaColonias()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.coloniasDatos = data;
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
    this.agregarDestinatarioFinal.disable();
    this.agregarDestinatarioFinal.get('tipoPersona')?.enable();
    this.agregarDestinatarioFinal.get('nacionalidad')?.enable();
  }
  /**
   * @method cancelar
   * @description Navega hacia la vista anterior utilizando el servicio de ubicación (`Location`).
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  cancelar(): void {
    this.cancelarEventListener.emit(true);
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
   * * Método que se ejecuta cuando se selecciona un país en el formulario.
   * * @param {string} event - El país seleccionado.
   * * @returns {void} No retorna ningún valor.
   */

  terecerosNacionalidadCambioDeValor(event: string | number): void {
    this.agregarDestinatarioFinal.patchValue({
      nacionalidad: event,
    });
  }

  /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   *
   * Este método emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
   * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
   *
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
