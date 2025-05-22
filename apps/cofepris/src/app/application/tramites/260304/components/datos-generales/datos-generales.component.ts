import { ActivatedRoute, Router } from '@angular/router';
import {
  CatalogoSelectComponent,
  InputRadioComponent,
  TipoPersona,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { CommonModule, Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OnDestroy, OnInit } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { Catalogo } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { Destinatario } from '../../../../shared/models/terceros-relacionados.model';
import { Otros } from '../../models/medicamentos-contengan.model';
import { TERCEROS_NACIONALIDAD_RADIO_OPCIONS } from '../../constants/medicamentos-contengan.enum';
import { TERCEROS_PERSONA_RADIO_OPCIONS } from '../../constants/medicamentos-contengan.enum';
import { TIPO_TABLA_DATOS } from '../../constants/medicamentos-contengan.enum';
import { Tramite260304Query } from '../../estados/tramite260304Query.query';
import { Tramite260304Store } from '../../estados/tramite260304Store.store';

/**
 * @component DatosGeneralesComponent
 * @description
 * Componente encargado de gestionar el formulario de datos generales para las secciones de "Destinatario" y "Otros".
 * Permite capturar, validar y almacenar la información general requerida, así como navegar y limpiar el formulario.
 * Utiliza servicios y store para consultar catálogos, obtener datos seleccionados y actualizar el estado global.
 *
 * @selector app-datos-generales
 * @standalone true
 * @imports CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent, InputRadioComponent
 */
@Component({
  selector: 'app-datos-generales',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
    InputRadioComponent
  ],
  templateUrl: './datos-generales.component.html',
  styleUrl: './datos-generales.component.scss',
})
export class DatosGeneralesComponent implements OnDestroy, OnInit {
  /**
   * @property {string} tipoDatos
   * @description
   * Variable que almacena el tipo de dato a capturar o editar (por ejemplo, "DESTINATARIO" u "OTROS").
   */
  tipoDatos!: string;

  /**
   * @property {Catalogo[]} paisesDatos
   * @description
   * Lista de objetos `Catalogo` correspondiente a los países disponibles, obtenida del servicio de datos.
   */
  paisesDatos: Catalogo[] = [];

  /**
   * @property {Subject<void>} unsubscribe$
   * @description
   * Subject para cancelar suscripciones activas y evitar fugas de memoria.
   * Se completa en el hook `ngOnDestroy`.
   * @private
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * @property {FormGroup} agregarDatosForm
   * @description
   * Formulario reactivo utilizado para capturar los datos generales del destinatario u otros.
   */
  agregarDatosForm!: FormGroup;

  /**
   * @property {object} tipoTablaDatos
   * @description
   * Objeto que contiene las constantes de los tipos de tabla de datos.
   */
  tipoTablaDatos = TIPO_TABLA_DATOS;

  /**
   * @property {TipoPersona} tipoPersona
   * @description
   * Enum que representa los posibles tipos de persona (física o moral).
   */
  public tipoPersona = TipoPersona;

  /**
   * @property {any[]} radioOpcions
   * @description
   * Opciones de radio para la nacionalidad, obtenidas de la constante `TERCEROS_NACIONALIDAD_RADIO_OPCIONS`.
   */
  radioOpcions = TERCEROS_NACIONALIDAD_RADIO_OPCIONS;

  /**
   * @property {any[]} tipoPersonaRadioOpcions
   * @description
   * Opciones de radio para el tipo de persona, obtenidas de la constante `TERCEROS_PERSONA_RADIO_OPCIONS`.
   */
  tipoPersonaRadioOpcions = TERCEROS_PERSONA_RADIO_OPCIONS;

  /**
   * @property {Destinatario} datoSeleccionado
   * @description
   * Almacena el destinatario actualmente seleccionado. Se inicializa como un objeto vacío de tipo `Destinatario`.
   */
  public datoSeleccionado!: Destinatario;

  /**
   * @constructor
   * @description
   * Constructor del componente `DatosGeneralesComponent`.
   * Inicializa el tipo de datos a capturar, el formulario y los catálogos necesarios.
   *
   * @param {ActivatedRoute} route - Ruta activa para obtener parámetros de la URL.
   * @param {DatosSolicitudService} datosSolicitudService - Servicio para obtener datos de catálogos y listas.
   * @param {FormBuilder} fb - Constructor de formularios reactivos de Angular.
   * @param {Tramite260304Store} tramiteStore - Store para actualizar el estado del trámite 260304.
   * @param {Tramite260304Query} tramiteQuery - Servicio de consulta para el estado del trámite.
   * @param {Router} router - Router de Angular para navegación entre rutas.
   * @param {Location} ubicaccion - Servicio para interactuar con la ubicación del navegador.
   */
  constructor(
    private route: ActivatedRoute,
    private datosSolicitudService: DatosSolicitudService,
    private fb: FormBuilder,
    private tramiteStore: Tramite260304Store,
    private tramiteQuery: Tramite260304Query,
    private router: Router,
    private ubicaccion: Location
  ) {
    this.tipoDatos = this.route.snapshot.paramMap.get('tipo') || '';
    this.crearFormulario();
    this.cargarDatos();
  }

  /**
   * @method ngOnInit
   * @description
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Suscribe a los datos seleccionados desde el store y actualiza el formulario con los datos recuperados.
   */
  ngOnInit(): void {
    this.cargarDatos();
    this.tramiteQuery.getDestinatarioSeleccionado$
      .pipe(
        takeUntil(this.unsubscribe$),
        map((seccionState) => {
          this.datoSeleccionado = seccionState?.[0] ?? ({} as Destinatario);
          this.crearFormulario();
        })
      )
      .subscribe();
  }

  /**
   * @method esInvalido
   * @description
   * Verifica si un control del formulario es inválido, tocado o modificado.
   * @param {string} nombreControl - Nombre del control a verificar.
   * @returns {boolean} `true` si el control es inválido, de lo contrario `false`.
   */
  public esInvalido(nombreControl: string): boolean {
    const CONTROL = this.agregarDatosForm.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * @method crearFormulario
   * @description
   * Crea y configura el formulario reactivo con los campos y validaciones necesarios.
   * El formulario incluye información personal, de contacto y de ubicación.
   * @returns {void}
   */
  crearFormulario(): void {
    this.agregarDatosForm = this.fb.group({
      nombreRazonSocial: [
        this.obtenerValor('nombreRazonSocial'),
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(150),
        ],
      ],
      nombres: [this.obtenerValor('nombres'), Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      pais: ['', Validators.required],
      estado: [this.obtenerValor('codigoPostal')],
      codigoPostal: [this.obtenerValor('codigoPostal')],
      colonia: [''],
      calle: [this.obtenerValor('calle'), Validators.required],
      numeroExterior: [''],
      numeroInterior: [''],
      lada: [''],
      telefono: [''],
      correoElectronico: ['', [Validators.email]],
      tipoPersona: ['', Validators.required],
      denominacionRazon: [''],
    });
  }

  /**
   * @method cargarDatos
   * @description
   * Obtiene la lista de países del servicio de datos y la almacena en `paisesDatos`.
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
   * @method obtenerValor
   * @description
   * Obtiene el valor de un campo específico del formulario o de los datos seleccionados.
   * @param {keyof Destinatario} field - Nombre del campo a obtener.
   * @returns {string | number | undefined | string[]} Valor del campo especificado.
   */
  public obtenerValor(
    field: keyof Destinatario
  ): string | number | undefined | string[] {
    return this.datoSeleccionado?.[field as keyof Destinatario] ?? '';
  }

  /**
   * @method cancelar
   * @description
   * Navega hacia la vista anterior utilizando el servicio de ubicación (`Location`).
   */
  cancelar(): void {
    this.ubicaccion.back();
  }

  /**
   * @method limpiarFormulario
   * @description
   * Resetea los valores del formulario `agregarDatosForm` a su estado inicial.
   */
  limpiarFormulario(): void {
    this.agregarDatosForm.reset();
  }

  /**
   * @method guardarDatos
   * @description
   * Guarda los datos del formulario dependiendo del tipo de datos (`tipoDatos`).
   * Dependiendo del valor de `tipoDatos`, se llama a un método específico para actualizar los datos en el store.
   * Después navega a la vista anterior.
   */
  guardarDatos(): void {
    switch (this.tipoDatos) {
      case this.tipoTablaDatos.DESTINATARIO:
        this.addDestinatario([this.agregarDatosForm.getRawValue()]);
        break;
      case this.tipoTablaDatos.OTROS:
        this.addOtros([this.agregarDatosForm.value]);
        break;
      default:
        break;
    }
    this.ubicaccion.back();
  }

  /**
   * @method addDestinatario
   * @description
   * Agrega nuevos destinatarios a la tabla de datos del trámite.
   * @param {Destinatario[]} newDestinatario - Lista de objetos `Destinatario` a agregar.
   */
  addDestinatario(newDestinatario: Destinatario[]): void {
    this.tramiteStore.updateDestinatarioTablaDatos(newDestinatario);
  }

  /**
   * @method addOtros
   * @description
   * Actualiza los datos de tipo 'Otros' en el store `tramiteStore`.
   * @param {Otros[]} datos - Array de objetos `Otros` con los datos a actualizar.
   */
  addOtros(datos: Otros[]): void {
    this.tramiteStore.updateOtrosTablaDatos(datos);
  }

  /**
   * @method ngOnDestroy
   * @description
   * Método del ciclo de vida que se llama antes de destruir el componente.
   * Libera recursos y completa el observable `unsubscribe$`.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}