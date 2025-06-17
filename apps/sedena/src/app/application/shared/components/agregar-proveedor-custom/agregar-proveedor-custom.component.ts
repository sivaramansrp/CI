import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Catalogo, CatalogoSelectComponent, InputRadioComponent, TipoPersona, TituloComponent } from '@ng-mf/data-access-user';
import { DestinoFinal, Proveedor } from '../../models/terceros-relacionados.model';

import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CAMPO_OBLIGATORIO_DESTINATARIO, MOSTRAR_ASTERISCO, MOSTRAR_INFORMACION, PROCEDIMIENTOS_PARA_NO_CONTRIBUYENTE, PROVEEDOR_TITULO_CUSTOM, TERCEROS_NACIONALIDAD_OPCIONES, TERCEROS_NACIONALIDAD_OPCIONES_EXTRANJERO,TIPO_PERSONA_OPCIONES, TIPO_PERSONA_OPCIONES_NO_CONTRIBUYENTE } from '../../constants/datos-solicitud.enum';
import { Subject, takeUntil } from 'rxjs';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { ES_CURP } from '../../constants/datos-del-tramilte.enum';
import { ES_NACIONAL } from '../../constants/datos-del-tramilte.enum';
import { ES_RFC } from '../../constants/datos-del-tramilte.enum';
import { NUMERO_TRAMITE } from '../../constants/datos-solicitud.enum';


/**
 * @component AgregarProveedorComponent
 * @description Componente responsable de manejar el formulario para agregar proveedores.
 * Se encarga de obtener datos del catálogo (países), gestionar el formulario reactivo y
 * actualizar el estado del trámite con la información del proveedor capturado.
 */
@Component({
  selector: 'app-agregar-proveedor-custom',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    TituloComponent,
    InputRadioComponent,
  ],
  templateUrl: './agregar-proveedor-custom.component.html',
  styleUrl: './agregar-proveedor-custom.component.scss',
})
export class AgregarProveedorCustomComponent implements OnDestroy, OnInit, OnChanges,AfterViewInit {
  /**
    * Datos del formulario que pueden ser de tipo `DestinoFinal`, `Proveedor`, `null` o `undefined`.
    * Este input se utiliza para recibir la información necesaria desde el componente padre.
    *
    * @type {Proveedor | DestinoFinal | null | undefined}
    */
  @Input() formaDatos!: Proveedor | DestinoFinal | null | undefined;

    /**
   * Indica si el formulario debe mostrarse solo en modo de lectura.
   *
   * @type {boolean}
   * @default false
   * @see https://compodoc.app/
   *
   * @description
   * Si es `true`, el formulario se mostrará en modo solo lectura y no permitirá modificaciones.
   * Si es `false`, el formulario será editable.
   */
  @Input() esFormularioSoloLectura:boolean =false;

  /**
    * @property tipoPersona
    * @description Proporciona acceso al enum `TipoPersona` para su uso en la clase.
    * @type {TipoPersona}
    */
  public tipoPersona = TipoPersona;
  /**
   * @property {Subject<void>} unsubscribe$
   * Subject para cancelar suscripciones activas y evitar fugas de memoria.
   * Se completa en el hook `ngOnDestroy`.
   * @private
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * @property {Proveedor[]} proveedores
   * Arreglo de proveedores capturados en el formulario.
   */
  proveedores: Proveedor[] = [];

  /**
   * @property {FormGroup} agregarProveedorForm
   * Formulario reactivo utilizado para capturar los datos del proveedor.
   */
  agregarProveedorForm!: FormGroup;

  /**
   * @property {Catalogo[]} paisesDatos
   * Lista de países obtenida del servicio de datos.
   */
  public paisesDatos: Catalogo[] = [];

  /**
   * @property updateProveedorTablaDatos
   * @description Evento que emite una lista actualizada de objetos `Proveedor` hacia el componente padre.
   * Se utiliza para sincronizar los datos de la tabla o disparar acciones relacionadas.
   * @type {EventEmitter<Proveedor[]>}
   */
  @Output() updateProveedorTablaDatos = new EventEmitter<Proveedor[]>();
  /**
   * @property actualizaExistenteEnProveedorDatos
   * @description Evento que emite una lista de objetos `Proveedor` hacia el componente padre.
   * Se utiliza para actualizar un proveedor existente en la tabla.
   * @type {EventEmitter<Proveedor[]>}
   */

  @Output() actualizaExistenteEnProveedorDatos= new EventEmitter<Proveedor[]>();

  /**
   * @property proveedorTablaDatos
   * @description Datos de la tabla de proveedores.
   * Se utiliza para mostrar la información de los proveedores en el componente.
   * @type {Proveedor[]}
   */
  
  
  @Input() proveedorTablaDatos: Proveedor[] = [];
  /**
   * @property isProveedorModificar
   * @description Indica si el proveedor está en modo de modificación.
   * Se utiliza para determinar si se debe mostrar el título de modificación o creación.
   * @type {boolean}
   */
  isProveedorModificar: boolean = false;

  /**
   * @property titluoMensaje
   * @description Título del mensaje que se muestra en el formulario.
   * Se utiliza para indicar si se está creando o modificando un proveedor.
   * @type {string}
   */


  titluoMensaje: string = 'Agregar Proveedor'

  


  /**
   * Opciones de radio para seleccionar el tipo de persona.
   */
  tipoPersonaRadioOpciones = TIPO_PERSONA_OPCIONES;

  /**
   * @description Opciones de tipo de persona para radio buttons, específicas para no contribuyentes.
   * @command Opciones utilizadas para determinar el tipo de persona en el formulario de proveedor.
   */
  tipoPersonaRadioOpcionesNoContribuyente = TIPO_PERSONA_OPCIONES_NO_CONTRIBUYENTE;


  /**
 * @property mostrarCamposNoContribuyente
 * @description Controla la visibilidad de los campos específicos para no contribuyentes.
 * @type {boolean}
 * @default false
 */
  public mostrarCamposNoContribuyente: boolean = false;

  /*
   * Opciones de nacionalidad para el formulario.
   */

  tercerosNacionalidadOpciones = TERCEROS_NACIONALIDAD_OPCIONES;


  /**
   * @property idProcedimiento
   * @description Identificador del procedimiento asociado a este componente.
   * @type {number}
   */
  @Input() idProcedimiento!: number;

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
  * @property esCURP
  * @description Controla la visibilidad de los campos específicoS C.U.R.P.
  * @type {boolean}
  * @default false
  */
  public esCURP = false;

    /**
  * @property esNacional
  * @description Controla la visibilidad de los campos específicoS C.U.R.P.
  * @type {boolean}
  * @default false
  */
  public esNacional = false;

  /**
   * @property {boolean} esRFC
   * @description Indica si el valor actual corresponde a un RFC (Registro Federal de Contribuyentes).
   * @default false
   */
  public esRFC = false;

  /**
 * @property campoObligatorioProveedor
 * @description Indica si ciertos campos del formulario son obligatorios según el procedimiento.
 * @type {boolean}
 * @default true
 */
  public campoObligatorioProveedor = false;

  /**
 * @property mostrarAsterisco
 * @description Indica si ciertos campos del formulario son obligatorios según el procedimiento.
 * @type {boolean}
 * @default true
 */
  public mostrarAsterisco = false;

    /**
 * @property MOSTRAR_INFORMACION
 * @description Indica si ciertos campos del formulario son obligatorios según el procedimiento.
 * @type {boolean}
 * @default true
 */
  public mostrarInformacion = false;

  /**
   * @constructor
   * Inicializa el formulario y los servicios necesarios para el componente.
   *
   * @param fb - FormBuilder para construir el formulario reactivo.
   * @param datosSolicitudService - Servicio para obtener datos del backend.
   * @param tramiteStore - Store que administra el estado del trámite actual.
   * @param tramiteQuery - Servicio para consultar el estado del trámite.
   * @param ubicaccion - Servicio de Angular para navegación de retroceso.
   */
  constructor(
    private fb: FormBuilder,
    private datosSolicitudService: DatosSolicitudService,
    private ubicaccion: Location // eslint-disable-next-line no-empty-function
  ) {
    this.mostrarCamposNoContribuyente =
      PROCEDIMIENTOS_PARA_NO_CONTRIBUYENTE.includes(this.idProcedimiento);
  }

  /**
   * Hook de ciclo de vida de Angular que se llama cuando se detectan cambios en las propiedades de entrada.
   * Llama al método `mostrarCamposNoContribuyente()`.
   */
  ngOnChanges(): void {
    this.mostrarCamposNoContribuyente =
      PROCEDIMIENTOS_PARA_NO_CONTRIBUYENTE.includes(this.idProcedimiento);
  }
ngAfterViewInit(): void {
  if(this.esFormularioSoloLectura){
    this.agregarProveedorForm.disable();
  }
  else{
    this.agregarProveedorForm.enable();
  }
}

  /**
   * Crea el formulario reactivo `agregarDestinatarioFinal` utilizando `FormBuilder`.
   * Define los campos y sus validaciones.
   *
   */
  Formulario(): void {
    this.agregarProveedorForm = this.fb.group({
      tipoPersona: ['', Validators.required],
      denominacionRazon: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(150),
        ],
      ],
      nombres: ['', [Validators.required, Validators.maxLength(200)]],
      primerApellido: ['', [Validators.required, Validators.maxLength(200)]],
      segundoApellido: ['', Validators.maxLength(200)],
      pais: ['', Validators.required],
      estado: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      colonia: ['', Validators.required],
      calle: ['', Validators.required],
      numeroExterior: ['', Validators.required],
      numeroInterior: ['', Validators.required],
      lada: ['', Validators.required],
      telefono: ['', Validators.required],
      nacionalidad: ['', Validators.required],
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
      municipio: ['', Validators.required],
      localidad: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
    });
    this.agregarProveedorForm.disable();
    this.agregarProveedorForm.get('tipoPersona')?.enable();
    this.agregarProveedorForm.get('nacionalidad')?.enable();
  }
  /**
   * @method ngOnInit
   * @description Hook de inicialización del componente. Llama a `cargarDatos()` para obtener catálogos.
   */
  ngOnInit(): void {
    this.Formulario();
    this.cargarDatos();
    this.esCURP = ES_CURP.includes(this.idProcedimiento);
    this.esNacional = ES_NACIONAL.includes(this.idProcedimiento);
    this.esRFC = ES_RFC.includes(this.idProcedimiento);
    this.campoObligatorioProveedor = CAMPO_OBLIGATORIO_DESTINATARIO.includes(this.idProcedimiento)
    this.mostrarAsterisco = MOSTRAR_ASTERISCO.includes(this.idProcedimiento)
    this.mostrarInformacion = MOSTRAR_INFORMACION.includes(this.idProcedimiento)
    this.isProveedorModificar= PROVEEDOR_TITULO_CUSTOM.includes(this.idProcedimiento);
    if(this.isProveedorModificar) {
      this.titluoMensaje = 'Modificar Proveedor';
    }
    this.campoObligatorioChange();
    if (this.formaDatos) {
      this.agregarProveedorForm.patchValue(this.formaDatos);
      this.agregarProveedorForm.enable(); 
    }
    if(this.proveedorTablaDatos.length > 0) {
      this.agregarProveedorForm.patchValue(this.proveedorTablaDatos[0]);
      this.tipoPersonaCambioDeValor('Moral');
      this.terecerosNacionalidadCambioDeValor('Nacional');
    }
    this.nacionalidadOpciones();
    this.mostrarAsterisco = true;
    this.mostrarInformacion = true;
  }

  /**
   * @method cargarDatos
   * @description Obtiene la lista de países del servicio de datos y la almacena en `paisesDatos`.
   */
  cargarDatos(): void {
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
      .obtenerListaCodigosPostales()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.codigosPostalesDatos = data;
      });
    this.datosSolicitudService
      .obtenerListaColonias()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.coloniasDatos = data;
      });
  }

  /**
   * @method guardarProveedor
   * @description Toma los datos del formulario, crea un objeto `Proveedor`, lo agrega al arreglo
   * local, actualiza el store del trámite y luego limpia el formulario y regresa a la vista anterior.
   */
  guardarProveedor(): void {
    if (this.agregarProveedorForm.invalid) {
      this.agregarProveedorForm.markAllAsTouched();
      return;
    }    
    const DENOMINACIONRAZON_ONLY_FLAG = (this.agregarProveedorForm.value.tipoPersona === TipoPersona.MORAL) && (NUMERO_TRAMITE.TRAMITE_240117 === this.idProcedimiento);
    const NUEVO_PROVEEDOR: Proveedor = {
      nombreRazonSocial: DENOMINACIONRAZON_ONLY_FLAG ? `${this.agregarProveedorForm.value.denominacionRazon}`.trim() : `${this.agregarProveedorForm.value.nombres} ${this.agregarProveedorForm.value.primerApellido
        } ${this.agregarProveedorForm.value.segundoApellido || ''} `.trim(),
      rfc: '',
      curp: '',
      telefono:
        `${this.agregarProveedorForm.value.lada} ${this.agregarProveedorForm.value.telefono}`.trim(),
      correoElectronico:
        this.agregarProveedorForm.value.correoElectronico || '',
      calle: this.agregarProveedorForm.value.calle || '',
      numeroExterior: this.agregarProveedorForm.value.numeroExterior || '',
      numeroInterior: this.agregarProveedorForm.value.numeroInterior || '',
      pais: this.agregarProveedorForm.value.pais || '',
      colonia: this.agregarProveedorForm.value.colonia || '',
      municipioAlcaldia: '',
      localidad: '',
      entidadFederativa: this.agregarProveedorForm.value.estado || '',
      estadoLocalidad: '',
      codigoPostal: this.agregarProveedorForm.value.codigoPostal || '',
    };

    this.proveedores.push(NUEVO_PROVEEDOR);
    if(this.formaDatos) {
      if ('tableindex' in this.formaDatos) {
        this.proveedores[0].tableIndex = (this.formaDatos as Proveedor).tableIndex;
      }
      this.actualizaExistenteEnProveedorDatos.emit(this.proveedores);
    }
    else{
      this.updateProveedorTablaDatos.emit(this.proveedores);
    }
    this.agregarProveedorForm.reset();
    this.ubicaccion.back();
  }
  /**
   * @method limpiarFormulario
   * @description Resetea el formulario reactivo `agregarProveedorForm` para limpiar todos los campos.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  limpiarFormulario(): void {
    this.agregarProveedorForm.reset();
    this.agregarProveedorForm.disable();
    this.agregarProveedorForm.get('tipoPersona')?.enable();
    this.agregarProveedorForm.get('nacionalidad')?.enable();
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
    this.agregarProveedorForm.enable();
    this.agregarProveedorForm.patchValue({
      tipoPersona: event,
    });
  }
  /**
 * * Método que se ejecuta cuando se selecciona un país en el formulario.
 * * @param {string} event - El país seleccionado.
 * * @returns {void} No retorna ningún valor.
 */

  terecerosNacionalidadCambioDeValor(event: string | number): void {
    this.agregarProveedorForm.patchValue({
      nacionalidad: event,
    });
  }
  /**
   * @method nacionalidadOpciones
   * @description Configura las opciones de nacionalidad según el procedimiento.
   * Utiliza el enum `NUMERO_TRAMITE` para determinar qué opciones mostrar.
   *
   * @returns {void} Este método no retorna ningún valor.
   */

  nacionalidadOpciones(): void {
    switch (this.idProcedimiento) {
      case NUMERO_TRAMITE.TRAMITE_240114:
        this.tercerosNacionalidadOpciones = TERCEROS_NACIONALIDAD_OPCIONES_EXTRANJERO;
        break
      case NUMERO_TRAMITE.TRAMITE_240117:
        this.tercerosNacionalidadOpciones = TERCEROS_NACIONALIDAD_OPCIONES_EXTRANJERO;
        break
      case NUMERO_TRAMITE.TRAMITE_240118:
        this.tercerosNacionalidadOpciones = TERCEROS_NACIONALIDAD_OPCIONES_EXTRANJERO;
        break
         case NUMERO_TRAMITE.TRAMITE_240120:
        this.tercerosNacionalidadOpciones = TERCEROS_NACIONALIDAD_OPCIONES_EXTRANJERO;
        break
      case NUMERO_TRAMITE.TRAMITE_240121:
      case NUMERO_TRAMITE.TRAMITE_240321:
        this.tercerosNacionalidadOpciones =
          TERCEROS_NACIONALIDAD_OPCIONES_EXTRANJERO;
        break;
      
      default:
        this.tercerosNacionalidadOpciones = TERCEROS_NACIONALIDAD_OPCIONES;

    }
  }

  /**
     * @method campoObligatorioChange
     * @description Cambia las validaciones de los campos del formulario según el valor de `campoObligatorioProveedor`.
     * Si `campoObligatorioProveedor` es verdadero, se eliminan las validaciones de la colonia y se agregan
     * validaciones requeridas para la calle y el número exterior. Si es falso, se realiza lo contrario.
     *
     * @returns {void} Este método no retorna ningún valor.
     */
  campoObligatorioChange(): void {
    const NOMBRES = this.agregarProveedorForm.get('nombres')
    const PRIMERAPELLIDO = this.agregarProveedorForm.get('primerApellido')
    const MUNICIPIO = this.agregarProveedorForm.get('municipio')
    const LOCALIDAD = this.agregarProveedorForm.get('localidad')
    const COLINIA = this.agregarProveedorForm.get('colonia');
    const CALLE = this.agregarProveedorForm.get('calle');
    const NUMEROEXTERIOR = this.agregarProveedorForm.get('numeroExterior');
    const ESTADO = this.agregarProveedorForm.get('estado');
    const CODIGOPOSTAL = this.agregarProveedorForm.get('codigoPostal');
    const CURP = this.agregarProveedorForm.get('curp');

    if (this.campoObligatorioProveedor) {
      NOMBRES?.setValidators([Validators.required]);
      PRIMERAPELLIDO?.setValidators([Validators.required]);
      MUNICIPIO?.clearValidators();
      LOCALIDAD?.clearValidators();
      COLINIA?.clearValidators();
      CALLE?.setValidators([Validators.required]);
      NUMEROEXTERIOR?.setValidators([Validators.required]);
      ESTADO?.setValidators([Validators.required]);
      CODIGOPOSTAL?.setValidators([Validators.required]);
    } else {
      NOMBRES?.clearValidators();
      PRIMERAPELLIDO?.clearValidators();
      MUNICIPIO?.setValidators([Validators.required]);
      LOCALIDAD?.setValidators([Validators.required]);
      COLINIA?.setValidators([Validators.required]);
      CALLE?.clearValidators();
      NUMEROEXTERIOR?.clearValidators();
      ESTADO?.clearValidators();
      CODIGOPOSTAL?.clearValidators();
    }
    NOMBRES?.updateValueAndValidity();
    PRIMERAPELLIDO?.updateValueAndValidity();
    MUNICIPIO?.updateValueAndValidity();
    LOCALIDAD?.updateValueAndValidity();
    COLINIA?.updateValueAndValidity();
    CALLE?.updateValueAndValidity();
    NUMEROEXTERIOR?.updateValueAndValidity();
    ESTADO?.updateValueAndValidity();
    CODIGOPOSTAL?.updateValueAndValidity();
    if (!this.esCURP) {
      CURP?.clearValidators();
    }
    CURP?.updateValueAndValidity();
  }


  /**
   * @method ngOnDestroy
   * @description Hook de destrucción del componente. Libera las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}