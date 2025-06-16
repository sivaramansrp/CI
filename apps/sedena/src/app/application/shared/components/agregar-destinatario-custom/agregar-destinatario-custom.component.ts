import { COLONIA_FIELD_FLAG, NUMERO_TRAMITE, PROCEDIMIENTOS_PARA_NO_CONTRIBUYENTE } from '../../constants/datos-solicitud.enum';
import { STR_NACIONAL } from '../../constants/datos-solicitud.enum';
import { TERCEROS_NACIONALIDAD_OPCIONES } from '../../constants/datos-solicitud.enum';
import { TIPO_PERSONA_OPCIONES } from '../../constants/datos-solicitud.enum';

import { DestinoFinal, Proveedor } from '../../models/terceros-relacionados.model';
import { DESTINATARIO_TITULO_CUSTOM } from '../../constants/datos-solicitud.enum';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';

import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

import { AfterViewInit, Component } from '@angular/core';
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
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { TipoPersona } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-agregar-destinatario-custom',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
    InputRadioComponent,
  ],
  templateUrl: './agregar-destinatario-custom.component.html',
  styleUrl: './agregar-destinatario-custom.component.scss',
})
export class AgregarDestinatarioCustomComponent
  implements OnDestroy, OnInit, OnChanges,AfterViewInit {
  /**
   * Subject utilizado para gestionar la desuscripción de observables.
   * Se completa en `ngOnDestroy()` para prevenir fugas de memoria.
   * @property {Subject<void>} unsubscribe$
   * @private
   */
  private unsubscribe$ = new Subject<void>();

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
   * @property destinatarioTituloModificar
   * @description Título del destinatario en modo de modificación.
   * @type {string}
   */

 destinatarioTituloModificar = DESTINATARIO_TITULO_CUSTOM;
  /**
   * @property isDestinatarioModificar
   * @description Indica si el destinatario está en modo de modificación.
   * @type {boolean}
   */
  isDestinatarioModificar: boolean = false;


  /**
   * @property idProcedimiento
   * @description Identificador del procedimiento asociado a este componente.
   * @type {number}
   */
  @Input() idProcedimiento!: number;

/**
   * Datos del formulario que pueden ser de tipo `DestinoFinal`, `Proveedor`, `null` o `undefined`.
   * Este input se utiliza para recibir la información necesaria desde el componente padre.
   *
   * @type {DestinoFinal | Proveedor | null | undefined}
   */
@Input() formaDatos!: DestinoFinal | Proveedor | null | undefined;


/**
   * Datos del formulario que pueden ser de tipo `DestinoFinal`, `Proveedor`, `null` o `undefined`.
   * Este input se utiliza para recibir la información necesaria desde el componente padre.
   *
   * @type {boolean}
   */
@Input() esFormularioSoloLectura:boolean = false;
  /**
   * @property mostrarCamposNoContribuyente
   * @description Controla la visibilidad de los campos específicos para no contribuyentes.
   * @type {boolean}
   * @default false
   */
  public mostrarCamposNoContribuyente: boolean = false;


    /**
   * @property mostrarCamposNoContribuyente
   * @description Controla la visibilidad de los campos específicos para no contribuyentes.
   * @type {boolean}
   * @default false
   */
    public colonia_visibilidad: boolean = false;


  /**
   * Emite la lista de destinatarios actualizada para ser consumida por otros componentes.
   * @property {EventEmitter<Destinatario[]>} updateDestinatarioFinalTabla
   **/

  @Output() updateDestinatarioFinalTablaDatos = new EventEmitter<
    DestinoFinal[]
  >();
  /**
   * Emite la lista de destinatarios actualizada para ser consumida por otros componentes.
   * @property {EventEmitter<Destinatario[]>} actualizaExistenteEnDestinatarioDatos
   * @description Emite la lista de destinatarios actualizada para ser consumida por otros componentes.
   * @type {EventEmitter<Destinatario[]>}
   */

   @Output() actualizaExistenteEnDestinatarioDatos= new EventEmitter<DestinoFinal[]>();

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


  @Input() destinatarioFinalTablaDatos: DestinoFinal[] = [];

  /*
   * Opciones de nacionalidad para el formulario.
   */

  tercerosNacionalidadOpciones = TERCEROS_NACIONALIDAD_OPCIONES;
  /**
   * Crea el componente e inicializa el grupo de formulario.
   *
   * @param {FormBuilder} fb - Inyector de FormBuilder para crear formularios reactivos.
   * @param {Tramite260204Store} tramiteStore - Servicio que maneja las actualizaciones de estado para "Tramite260204".
   * @param {Tramite260204Query} tramiteQuery - Servicio para consultar el estado de "Tramite260204".
   * @param {Location} ubicaccion - Servicio de Angular para navegar hacia atrás en el historial.
   * @param {DatosSolicitudService} datosSolicitudService - Servicio para obtener diferentes listas de datos.
   */
  constructor(
    private fb: FormBuilder,
    private ubicaccion: Location,
    private datosSolicitudService: DatosSolicitudService
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

  /**
   * Guarda un nuevo destinatario en el arreglo local `destinatarios`
   * y actualiza la información en el store. Finalmente, resetea el formulario
   * y navega hacia atrás en el historial.
   */
  guardarDestinatario(): void {
    const DENOMINACIONRAZON_ONLY_FLAG = (this.agregarDestinatarioFinal.value.tipoPersona === TipoPersona.MORAL) && (NUMERO_TRAMITE.TRAMITE_240117 === this.idProcedimiento);
    const NUEVO_DESTINATARIO: DestinoFinal = {
      nombreRazonSocial: DENOMINACIONRAZON_ONLY_FLAG ? `${this.agregarDestinatarioFinal.value.denominacionRazon}`.trim() : `${this.agregarDestinatarioFinal.value.nombres} ${this.agregarDestinatarioFinal.value.primerApellido
        } ${this.agregarDestinatarioFinal.value.segundoApellido || ''} `.trim(),
      rfc: this.agregarDestinatarioFinal.value.rfc,
      curp: '',
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
      denominacionRazon: this.agregarDestinatarioFinal.value.denominacionRazon,
      nombres: this.agregarDestinatarioFinal.value.nombres,
      primerApellido: this.agregarDestinatarioFinal.value.primerApellido,
      segundoApellido: this.agregarDestinatarioFinal.value.segundoApellido,
      estado: this.agregarDestinatarioFinal.value.estado,
    };
    this.destinatarios.push(NUEVO_DESTINATARIO);
    if(this.formaDatos) {
      if ('tableindex' in this.formaDatos) {
        this.destinatarios[0].tableindex = (this.formaDatos as DestinoFinal).tableindex;
      }
      this.actualizaExistenteEnDestinatarioDatos.emit(this.destinatarios);
    }
    else{
    this.updateDestinatarioFinalTablaDatos.emit(this.destinatarios);
    }
    this.agregarDestinatarioFinal.reset();
    this.ubicaccion.back();
  }

  /**
   * Hook del ciclo de vida que se invoca cuando se inicializa el componente.
   * Llama al método `cargarDatos()`.
   */
  ngOnInit(): void {
    this.colonia_visibilidad = COLONIA_FIELD_FLAG.includes(this.idProcedimiento);
    this.isDestinatarioModificar= DESTINATARIO_TITULO_CUSTOM.includes(this.idProcedimiento);
    this.crearFormaulario();
    this.cargarDatos();
    if(this.formaDatos) {
      this.agregarDestinatarioFinal.patchValue(this.formaDatos);
      this.agregarDestinatarioFinal.enable(); 
    }
    if(this.destinatarioFinalTablaDatos.length > 0) {
      this.agregarDestinatarioFinal.patchValue(this.destinatarioFinalTablaDatos[0]);
      this.tipoPersonaCambioDeValor('Fisica');
    }

   
  }
  /**
   * @inheritdoc
   * @description
   * Método del ciclo de vida de Angular que se ejecuta después de que la vista del componente ha sido inicializada.
   * 
   * @remarks
   * Este método verifica si el formulario está en modo solo lectura (`esFormularioSoloLectura`). 
   * Si es así, deshabilita el control `agregarDestinatarioFinal`; de lo contrario, lo habilita.
   * 
   * @see https://angular.io/api/core/AfterViewInit
   */
  ngAfterViewInit(): void {
    if(this.esFormularioSoloLectura){
      this.agregarDestinatarioFinal.disable();
    }
    else{
      this.agregarDestinatarioFinal.enable();
    }
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
    
    this.agregarDestinatarioFinal.disable();
    this.agregarDestinatarioFinal.get('tipoPersona')?.enable();
    this.agregarDestinatarioFinal.get('nacionalidad')?.enable();
    if(this.formaDatos) {
      this.agregarDestinatarioFinal.patchValue(this.formaDatos);
    }
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
   * @method limpiarFormulario
   * @description Resetea el formulario reactivo `agregarProveedorForm` para limpiar todos los campos.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  limpiarFormulario(): void {
    this.agregarDestinatarioFinal.reset();
    this.agregarDestinatarioFinal.disable();
    this.agregarDestinatarioFinal.get('tipoPersona')?.enable();
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
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
