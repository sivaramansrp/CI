import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, merge, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

import { Catalogo, CatalogoSelectComponent, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { CONFIGURACION_PARA_PME_ENCABEZADO_DE_TABLA } from '../../../constants/transportacion-maritima.enum';
import { PersonaMoralExtranjeraForm } from '../../../../40402/models/transportacion-maritima.model';
import { TEXTOS } from '../../../constants/transportacion-maritima.enum';
import { Tramite40402Query } from '../../../estados/tramite40402.query';
import { Tramite40402Store } from '../../../estados/tramite40402.store';
import { Tramitenacionales40402State } from '../../../estados/tramite40402.store';
import { TransportacionMaritimaService } from '../../../../40402/services/transportacion-maritima/transportacion-maritima.service';

/**
 * Componente para la gestión de información de personas morales extranjeras.
 */
@Component({
  selector: 'app-persona-moral',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    TablaDinamicaComponent,
    CatalogoSelectComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './persona-moral.component.html',
  styleUrl: './persona-moral.component.css',
})
export class PersonaMoralComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para gestionar la información de personas morales extranjeras.
   */
  personaMoralExtranjeraForm!: FormGroup;

  /**
   * Catálogo de países disponibles.
   * @type {Catalogo[]}
   */
  pais!: Catalogo[];

  /**
   * Configuración para el encabezado de tabla de personas morales extranjeras.
   */
  configuracionParaPMEEncabezadoDeTabla = CONFIGURACION_PARA_PME_ENCABEZADO_DE_TABLA;

  /**
   * Tabla de datos de personas morales extranjeras.
   * @type {PersonaMoralExtranjeraForm[]}
   * @description Almacena la información de las personas morales extranjeras agregadas.
   */
  personaMoralExtranjeraTabla: PersonaMoralExtranjeraForm[] = [];

  /**
   * Textos estáticos para la interfaz de usuario.
   */
  TEXTOS = TEXTOS;

  /**
   * Referencia al botón de cerrar modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * Estado actual del trámite de transporte marítimo.
   */
  public transportacionMaritimaState!: Tramitenacionales40402State;

  /**
   * Subject para gestionar la destrucción de suscripciones.
   */
  private destruirNotificador$: Subject<void> = new Subject();

  /**
   * @property {ConsultaioState} consultaDatos
   * @description Datos de consulta obtenidos del estado global.
   */
  consultaDatos!: ConsultaioState;

  /**
   * @property {boolean} esDatosRespuesta
   * @description Indica si los datos son de respuesta y deben mostrarse.
   */
  public esDatosRespuesta: boolean = false;

  /**
   * @property {boolean} soloLectura
   * @description Bandera que indica si el formulario debe estar en modo solo lectura.
   * @default false
   */
  soloLectura: boolean = false;

  /**
   * Constructor del componente.
   * @param fb Constructor de formularios reactivos
   * @param tramite40402Store Almacenamiento del estado del trámite
   * @param tramite40402Query Consulta del estado del trámite
   * @param transportacionMaritimaService Servicio para transporte marítimo
   * @param consultaioQuery Consulta de datos globales
   */
  constructor(
    private fb: FormBuilder,
    private tramite40402Store: Tramite40402Store,
    private tramite40402Query: Tramite40402Query,
    private transportacionMaritimaService: TransportacionMaritimaService,
    private consultaioQuery: ConsultaioQuery
  ) {
    // El constructor se utiliza para la inyección de dependencias
  }

  /**
   * Método del ciclo de vida OnInit.
   * @description Inicializa catálogos, formularios y suscripciones.
   * @returns {void}
   */
  ngOnInit(): void {
    this.inicializaCatalogos();

    this.tramite40402Query.selectSeccionState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.transportacionMaritimaState = seccionState;
          this.personaMoralExtranjeraTabla = seccionState.personaMoralExtranjeraTabla || [];
        })
      )
      .subscribe();

    this.crearAgregarPMNForm();
    this.paisSeleccion();

    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Crea el formulario reactivo para personas morales extranjeras.
   * @description Inicializa el formulario con valores del estado actual.
   * @returns {void}
   */
  crearAgregarPMNForm(): void {
    this.personaMoralExtranjeraForm = this.fb.group({
      denominacionPME: [
        this.transportacionMaritimaState?.denominacionPME,
        [
          Validators.required,
          Validators.maxLength(254)
        ]
      ],
      correoPME: [
        this.transportacionMaritimaState?.correoPME,
        [
          Validators.required,
          Validators.maxLength(320)
        ]
      ],
      paisPME: [
        this.transportacionMaritimaState?.paisPME,
      ],
      codigoPostalPME: [
        this.transportacionMaritimaState?.codigoPostalPME,
        [
          Validators.required,
          Validators.maxLength(12)
        ]
      ],
      ciudadPME: [
        this.transportacionMaritimaState?.ciudadPME,
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      estadoPME: [
        this.transportacionMaritimaState?.estadoPME,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ],
      callePME: [
        this.transportacionMaritimaState?.callePME,
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      numeroExteriorPME: [
        this.transportacionMaritimaState?.numeroExteriorPME,
        [
          Validators.required,
          Validators.maxLength(55)
        ]
      ],
      numeroInteriorPME: [
        this.transportacionMaritimaState?.numeroInteriorPME,
        [
          Validators.maxLength(55)
        ]
      ],
      nombreDG: [
        this.transportacionMaritimaState?.nombreDG,
        [
          Validators.required,
          Validators.maxLength(28)
        ]
      ],
      apellidoPaternoDG: [
        this.transportacionMaritimaState?.apellidoPaternoDG,
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ],
      apellidoMaternoDG: [
        this.transportacionMaritimaState?.apellidoMaternoDG,
        [
          Validators.maxLength(20)
        ]
      ]
    });
    this.inicializarEstadoFormulario();
  }

  /**
   * Inicializa los catálogos necesarios para el componente.
   * @returns {void}
   */
  inicializaCatalogos(): void {
    const PAIS$ = this.transportacionMaritimaService
      .getPaisCatalogo()
      .pipe(
        map((resp) => {
          this.pais = resp.data;
        })
      );

    merge(PAIS$)
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe();
  }

  /**
   * Maneja la selección de país.
   * @description Actualiza el store con el país seleccionado.
   * @returns {void}
   */
  paisSeleccion(): void {
    const PAIS = this.personaMoralExtranjeraForm.get('paisPME')?.value;
    this.tramite40402Store.setPaisPME(PAIS);
  }

  /**
   * Agrega una nueva persona moral extranjera a la tabla.
   * @param personaMoralExtranjeraFormDatos Datos del formulario
   * @returns {void}
   */
  agregarPME(personaMoralExtranjeraFormDatos: PersonaMoralExtranjeraForm): void {
    this.personaMoralExtranjeraForm.markAllAsTouched();
    if (this.personaMoralExtranjeraForm.invalid) {
      return;
    }

    const PAIS = this.pais?.find((pais) => pais.id === Number(personaMoralExtranjeraFormDatos.paisPME))?.descripcion;

    const NUEVO_CUERPO_TABLA = [...this.personaMoralExtranjeraTabla];

    NUEVO_CUERPO_TABLA.push({
      denominacionPME: personaMoralExtranjeraFormDatos.denominacionPME,
      paisPME: PAIS ?? '',
      estadoPME: personaMoralExtranjeraFormDatos.estadoPME,
      codigoPostalPME: personaMoralExtranjeraFormDatos.codigoPostalPME,
      correoPME: personaMoralExtranjeraFormDatos.correoPME,
      nombreDG: `${personaMoralExtranjeraFormDatos.nombreDG} ${personaMoralExtranjeraFormDatos.apellidoPaternoDG} ${personaMoralExtranjeraFormDatos.apellidoMaternoDG}`.trim(),
      domicilioPME: `${personaMoralExtranjeraFormDatos.callePME} ${personaMoralExtranjeraFormDatos.numeroExteriorPME} ${personaMoralExtranjeraFormDatos.estadoPME} ${PAIS} ${personaMoralExtranjeraFormDatos.codigoPostalPME}`.trim(),
    });
    
    this.personaMoralExtranjeraTabla = NUEVO_CUERPO_TABLA;
    this.tramite40402Store.setPersonaMoralExtranjeraTabla(this.personaMoralExtranjeraTabla);
    this.limpiarDatosPME();
    this.cerrarModal();
  }

  /**
   * Actualiza el estado global con los valores del formulario.
   * @returns {void}
   */
  actualizarFormularioState(): void {
    this.setValoresStore(this.personaMoralExtranjeraForm, 'paisPME', 'setPaisPME');
    this.setValoresStore(this.personaMoralExtranjeraForm, 'codigoPostalPME', 'setCodigoPostalPME');
    this.setValoresStore(this.personaMoralExtranjeraForm, 'ciudadPME', 'setCiudadPME');
    this.setValoresStore(this.personaMoralExtranjeraForm, 'estadoPME', 'setEstadoPME');
    this.setValoresStore(this.personaMoralExtranjeraForm, 'callePME', 'setCallePME');
    this.setValoresStore(this.personaMoralExtranjeraForm, 'numeroExteriorPME', 'setNumeroExteriorPME');
    this.setValoresStore(this.personaMoralExtranjeraForm, 'numeroInteriorPME', 'setNumeroInteriorPME');
    this.setValoresStore(this.personaMoralExtranjeraForm, 'nombreDG', 'setNombreDG');
    this.setValoresStore(this.personaMoralExtranjeraForm, 'apellidoPaternoDG', 'setApellidoPaternoDG');
    this.setValoresStore(this.personaMoralExtranjeraForm, 'apellidoMaternoDG', 'setApellidoMaternoDG');
    this.setValoresStore(this.personaMoralExtranjeraForm, 'denominacionPME', 'setDenominacionPME');
    this.setValoresStore(this.personaMoralExtranjeraForm, 'correoPME', 'setCorreoPME');
  }

  /**
   * Limpia los datos del formulario.
   * @returns {void}
   */
  limpiarDatosPME(): void {
    this.personaMoralExtranjeraForm.reset();
    this.actualizarFormularioState();
  }

  /**
   * Cierra el modal mediante programación.
   * @returns {void}
   */
  cerrarModal(): void {
    if (this.closeModal) {
      this.closeModal.nativeElement.click();
    }
  }

  /**
   * Establece valores en el store del trámite.
   * @param form Grupo de formulario
   * @param campo Nombre del campo
   * @param metodoNombre Método del store a invocar
   * @returns {void}
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite40402Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite40402Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método del ciclo de vida OnDestroy.
   * @description Cancela todas las suscripciones activas.
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destruirNotificador$.next();
    this.destruirNotificador$.complete();
  }

  /**
   * Inicializa el estado de habilitación del formulario.
   * @description Habilita/deshabilita según el modo solo lectura.
   * @returns {void}
   */
  inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.personaMoralExtranjeraForm?.disable();
    } else {
      this.personaMoralExtranjeraForm?.enable();
    }
  }

  /**
   * Verifica si el control 'idSocioComercial' tiene el validador 'Validators.required'.
   *
   * @returns {boolean} `true` si el control es obligatorio, de lo contrario `false`.
   */
  // eslint-disable-next-line class-methods-use-this
  isRequired(form: FormGroup, field: string): boolean | null {
    const CONTROL = form.get(field) as FormControl;

    if (CONTROL) {
      const ERROR_PATTERN = CONTROL.hasError('required');
      return ERROR_PATTERN && CONTROL.touched;
    }

    return false;
  }
}