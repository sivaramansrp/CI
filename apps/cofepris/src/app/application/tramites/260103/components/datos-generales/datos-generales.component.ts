import { ActivatedRoute, Router } from '@angular/router';
import {
  CatalogoSelectComponent,
  InputRadioComponent,
  TipoPersona,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { CommonModule, Location } from '@angular/common';
import { Destinatario, Fabricante } from '../../../../shared/models/terceros-relacionados.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Catalogo } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { OnDestroy } from '@angular/core';

import {
  TERCEROS_NACIONALIDAD_RADIO_OPCIONS,
  TERCEROS_PERSONA_RADIO_OPCIONS,
  TIPO_TABLA_DATOS,
} from '../../constants/importacion-retorno-sanitario.enum';
import { Tramite260103Store } from '../../estados/tramite260103Store.store';

@Component({
  selector: 'app-datos-generales',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
    InputRadioComponent,
  ],
  templateUrl: './datos-generales.component.html',
  styleUrl: './datos-generales.component.scss',
})
export class DatosGeneralesComponent implements OnDestroy {
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
   * Datos de catálogo de estados.
   * @property {Catalogo[]} estadosDatos
   */
  public estadosDatos: Catalogo[] = [];
  public tipoPersonaValor: string | number = '';

  /**
   * Constructor del componente `DatosGeneralesComponent`.
   * Inicializa el formulario y carga los datos necesarios para el componente.
   *
   * @param {ActivatedRoute} route - Ruta activa para obtener parámetros de la URL.
   * @param {DatosSolicitudService} datosSolicitudService - Servicio para obtener datos de solicitud.
   * @param {FormBuilder} fb - Constructor de formularios reactivos de Angular.
   * @param {Tramite260103Store} tramiteStore - Store para manejar el estado del trámite 260103.
   * @param {Router} router - Router de Angular para la navegación entre rutas.
   * @param {Location} ubicaccion - Servicio para interactuar con la ubicación del navegador.
   */
  constructor(
    private route: ActivatedRoute,
    private datosSolicitudService: DatosSolicitudService,
    private fb: FormBuilder,
    private tramiteStore: Tramite260103Store,
    private router: Router,
    private ubicaccion: Location
  ) {
    this.tipoDatos = this.route.snapshot.paramMap.get('tipo') || '';
    this.crearFormulario();
    this.cargarDatos();
  }

  /**
   * Crea y inicializa el formulario con los campos y validaciones necesarios.
   * Este formulario incluye información personal y de contacto.
   *
   * @returns {void}
   */
  crearFormulario(): void {
   this.agregarDatosForm = this.fb.group({
  id: [
    Math.floor(100000 + Math.random() * 900000),
    Validators.required,
  ],
  rfc: [
    '',
    [
      Validators.required,
      Validators.maxLength(15),
    ],
  ],
  curp: [''],
  nombreRazonSocial: [
    '',
    [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(150),
    ],
  ],
  denominacionRazon: [
    '',
    [
      Validators.required,
      Validators.maxLength(254),
    ],
  ],
  nombres: ['', Validators.required],
  primerApellido: ['', Validators.required],
  segundoApellido: [''],
  pais: [
    { value: '1', disabled: true },
    Validators.required,
  ],
  municipioAlcaldia: ['', Validators.required],
  localidad: ['', Validators.required],
  codigoPostal: ['', Validators.required],
  estado: ['', Validators.required],
  colonia: ['', Validators.required],
  calle: [
    '',
    [
      Validators.required,
      Validators.maxLength(100),
    ],
  ],
  numeroExterior: [
    '',
    [
      Validators.required,
      Validators.maxLength(55),
    ],
  ],
  numeroInterior: [
    '',
    Validators.maxLength(55),
  ],
  lada: [
    '',
    Validators.maxLength(5),
  ],
  telefono: [
    '',
    [
    Validators.maxLength(24),
    Validators.pattern(/^[0-9]*$/)
  ]
  
  ],
  correoElectronico: [
    '',
    [
      Validators.required,
      Validators.email,
      Validators.maxLength(320),
    ],
  ],
  tipoPersona: ['', Validators.required ]
});

    this.agregarDatosForm.disable();
    this.agregarDatosForm.get('tipoPersona')?.enable();
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
      .obtenerListaColonias()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.coloniasDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaCodigosPostales()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.codigosPostalesDatos = data;
      });
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
        this.addDestinatario(this.agregarDatosForm.getRawValue());
        break;
      case this.tipoTablaDatos.Fabricante:
        this.addFabricante([this.agregarDatosForm.value]);
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
  addDestinatario(newDestinatario: Destinatario): void {
    const VALOR_FORMULARIO = this.agregarDatosForm.getRawValue();

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
    newDestinatario.nombreRazonSocial = nombreRazonSocial;
    this.tramiteStore.updateDestinatarioTablaDatos([newDestinatario]);
  }

  /**
   * Actualiza los datos de tipo 'Otros' en el store 'tramiteStore'.
   * Recibe un array de objetos de tipo 'Facturador' y actualiza la información correspondiente.
   *
   * @param datos - Array de objetos `Facturador` con los datos a actualizar.
   */
  addFabricante(datos: Fabricante[]): void {
    this.tramiteStore.updateFabricanteTablaDatos(datos);
  }

  public cambioDeValorIndique(value: string | number): void {
    this.tipoPersonaValor = value;
    this.agregarDatosForm.enable();
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
