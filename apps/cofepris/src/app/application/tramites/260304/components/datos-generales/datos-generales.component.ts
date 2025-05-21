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
   * Variable que almacena el tipo de dato, que se inicializa más tarde.
   * Se usa el operador `!` para indicar que la variable no es nula ni indefinida en el momento de su uso.
   */
  tipoDatos!: string;

  /**
   * Lista de objetos `Catalogo` que contiene los datos de los países.
   * Esta variable se utiliza para almacenar los países en un catálogo.
   */
  paisesDatos: Catalogo[] = [];

  /**
   * @property {Subject<void>} unsubscribe$
   * Subject para cancelar suscripciones activas y evitar fugas de memoria.
   * Se completa en el hook `ngOnDestroy`.
   * @private
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * @property {FormGroup} agregarProveedorForm
   * Formulario reactivo utilizado para capturar los datos del proveedor.
   */
  agregarDatosForm!: FormGroup;

  /**
   * Asigna el valor de `TIPO_TABLA_DATOS` a la variable `tipoTablaDatos`.
   * `TIPO_TABLA_DATOS` es un objeto o constante que define los tipos de datos para las tablas.
   */
  tipoTablaDatos = TIPO_TABLA_DATOS;

  /**
   * Asigna el valor de `TipoPersona` a la variable `tipoPersona`.
   * `TipoPersona` es un objeto o constante que define los tipos de personas (física o moral).
   */
  public tipoPersona = TipoPersona;

  /**
   * Asigna el valor de `TERCEROS_NACIONALIDAD_RADIO_OPCIONS` a la variable `radioOpcions`.
   * `TERCEROS_NACIONALIDAD_RADIO_OPCIONS` es un objeto o constante que define las opciones de nacionalidad.
   */
  radioOpcions = TERCEROS_NACIONALIDAD_RADIO_OPCIONS;

  /**
   * Asigna el valor de `TERCEROS_PERSONA_RADIO_OPCIONS` a la variable `tipoPersonaRadioOpcions`.
   * `TERCEROS_PERSONA_RADIO_OPCIONS` es un objeto o constante que define las opciones de tipo de persona.
   */
  tipoPersonaRadioOpcions = TERCEROS_PERSONA_RADIO_OPCIONS;

    /**
   * @property {Destinatario} datoSeleccionado
   * Almacena el destinatario seleccionado.
   * Se inicializa como un objeto vacío de tipo `Destinatario`.
   */
  public datoSeleccionado!: Destinatario

  /**
   * Constructor del componente `DatosGeneralesComponent`.
   * Inicializa el formulario y carga los datos necesarios para el componente.
   *
   * @param {ActivatedRoute} route - Ruta activa para obtener parámetros de la URL.
   * @param {DatosSolicitudService} datosSolicitudService - Servicio para obtener datos de solicitud.
   * @param {FormBuilder} fb - Constructor de formularios reactivos de Angular.
   * @param {Tramite260304Store} tramiteStore - Store para manejar el estado del trámite 260304.
   * @param {Router} router - Router de Angular para la navegación entre rutas.
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
   * Verifica si un control del formulario es inválido, tocado o modificado.
   * @param {string} nombreControl - Nombre del control a verificar.
   * @returns {boolean} - True si el control es inválido, de lo contrario false.
   */
  public esInvalido(nombreControl: string): boolean {
    const CONTROL = this.agregarDatosForm.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * Crea y inicializa el formulario con los campos y validaciones necesarios.
   * Este formulario incluye información personal y de contacto.
   * 
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
   * @description Obtiene la lista de países del servicio de datos y la almacena en `paisesDatos`.
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
   * Obtiene el valor de un campo específico del formulario o de los datos seleccionados.
   * @param {keyof TablaMercanciasDatos | keyof MercanciaForm} field - Nombre del campo a obtener.
   * @returns {string | number | undefined | string[]} - Valor del campo especificado.
   */
  public obtenerValor(
    field: keyof Destinatario
  ): string | number | undefined | string[] {
    return this.datoSeleccionado?.[field as keyof Destinatario] ?? '';
  }

  /**
   * Navega a la ruta 'pago/importacion-materias-primas-estupefacientes'.
   */
  cancelar(): void {
    this.ubicaccion.back();
  }

  /**
   * Resetea los valores del formulario 'agregarDatosForm'.
   * Restaura el formulario a su estado inicial.
   */
  limpiarFormulario(): void {
    this.agregarDatosForm.reset();
  }

  /**
   * Guarda los datos del formulario dependiendo del tipo de datos (`tipoDatos`).
   * Dependiendo del valor de `tipoDatos`, se llama a un método específico para guardar los datos.
   * Luego navega a la ruta 'pago/importacion-materias-primas-estupefacientes'.
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
   * @description Agrega nuevos fabricantes a la tabla de datos del trámite.
   *
   * @param newFabricantes - Lista de objetos `Fabricante` a agregar.
   */
  addDestinatario(newDestinatario: Destinatario[]): void {
    this.tramiteStore.updateDestinatarioTablaDatos(newDestinatario);
  }

  /**
   * Actualiza los datos de tipo 'Otros' en el store 'tramiteStore'.
   * Recibe un array de objetos de tipo 'Facturador' y actualiza la información correspondiente.
   *
   * @param datos - Array de objetos `Facturador` con los datos a actualizar.
   */
  addOtros(datos: Otros[]): void {
    this.tramiteStore.updateOtrosTablaDatos(datos);
  }

  /**
   * @method ngOnDestroy
   * @description
   * Método del ciclo de vida de Angular que se llama antes de destruir el componente.
   * Libera recursos y completa el observable `destroyNotifier$`.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
