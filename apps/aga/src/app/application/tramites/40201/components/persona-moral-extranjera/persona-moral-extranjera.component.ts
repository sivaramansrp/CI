import { Catalogo, CatalogoSelectComponent, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, merge, takeUntil } from 'rxjs';
import { Tramite40201Store, TransportacionMaritima40201State } from '../../../../core/estados/tramites/tramite40201.store';
import { CONFIGURACION_PARA_PME_ENCABEZADO_DE_TABLA } from '../../constantes/transportacion-maritima.enum';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery} from '@ng-mf/data-access-user';
import { PersonaMoralExtranjeraForm } from '../../models/transportacion-maritima.model';
import { TEXTOS } from '../../constantes/transportacion-maritima.enum';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { Tramite40201Query } from '../../../../core/queries/tramite40201.query';
import { TransportacionMaritimaService } from '../../services/transportacion-maritima/transportacion-maritima.service';


/**
 * Componente para la captura de datos de persona moral extranjera.
 */
@Component({
  selector: 'app-persona-moral-extranjera',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    TablaDinamicaComponent,
    CatalogoSelectComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './persona-moral-extranjera.component.html',
  styleUrl: './persona-moral-extranjera.component.css',
})
export class PersonaMoralExtranjeraComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para la captura de datos de persona moral extranjera.
   */
  personaMoralExtranjeraForm!: FormGroup;

  /**
   * Catálogo de países.
   * @type {Catalogo[]}
   * @description Este catálogo se utiliza para seleccionar el país de la persona moral extranjera.
   */
  pais!: Catalogo[];

  /**
   * Configuración para el persona moral extranjera encabezado de la tabla.
   */
  configuracionParaPMEEncabezadoDeTabla = CONFIGURACION_PARA_PME_ENCABEZADO_DE_TABLA;

  /**
   * Tabla de datos de persona moral extranjera.
   * @type {PersonaMoralExtranjeraForm[]}
   * @description Esta tabla se utiliza para mostrar los datos de las personas morales extranjeras capturadas.
   */
  personaMoralExtranjeraTabla: PersonaMoralExtranjeraForm[] = [];

  /**
   * Texto de la sección.
   */
  TEXTOS = TEXTOS;

  /**
   * Referencia al botón de cerrar el modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * Estado de la solicitud.
   */
  public transportacionMaritimaState!: TransportacionMaritima40201State;

  /**
   * Subject para destruir notificador.
   */
  private destruirNotificador$: Subject<void> = new Subject();
  /**
   * Tabla de selección para la persona moral extranjera.
   */
  TablaSeleccion = TablaSeleccion;
   /**
   * Indica si el formulario está en modo solo lectura
   */
   esFormularioSoloLectura: boolean = false;
  /**
   * Constructor del componente.
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {Tramite40201Store} tramite40201Store - Store para gestionar el estado del trámite 40201.
   * @param {Tramite40201Query} tramite40201Query - Query para consultar el estado del trámite 40201.
   * @param {TransportacionMaritimaService} transportacionMaritimaService - Servicio para obtener datos de transportación marítima.
   */
  constructor(
    private fb: FormBuilder,
    private tramite40201Store: Tramite40201Store,
    private tramite40201Query: Tramite40201Query,
    private transportacionMaritimaService: TransportacionMaritimaService,
    private consultaioQuery: ConsultaioQuery
  ) {
   this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Se ejecuta al inicializar el componente.
   * Inicializa los catálogos y el formulario.
   */
  ngOnInit(): void {
    this.inicializaCatalogos();

    this.tramite40201Query.selectSeccionState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.transportacionMaritimaState = seccionState;
          this.personaMoralExtranjeraTabla = seccionState.personaMoralExtranjeraTabla || [];
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();

    this.paisSeleccion();
  }

  /**
   * Inicializa el formulario reactivo para la captura de datos de persona moral extranjera.
   * @returns {void}
   */
  crearAgregarPMNForm(): void {
     const STATE = this.transportacionMaritimaState || {} as TransportacionMaritima40201State;
    this.personaMoralExtranjeraForm = this.fb.group({
      denominacionPME: [
        STATE.denominacionPME,
        [
          Validators.required,
          Validators.maxLength(254)
        ]
      ],
      correoPME: [
        STATE.correoPME,
        [
          Validators.required,
          Validators.maxLength(320)
        ]
      ],
      paisPME: [
        STATE.paisPME,
      ],
      codigoPostalPME: [
       STATE.codigoPostalPME,
        [
          Validators.required,
          Validators.maxLength(12)
        ]
      ],
      ciudadPME: [
       STATE.ciudadPME,
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      estadoPME: [
        STATE.estadoPME,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ],
      callePME: [
        STATE.callePME,
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      numeroExteriorPME: [
        STATE.numeroExteriorPME,
        [
          Validators.required,
          Validators.maxLength(55)
        ]
      ],
      numeroInteriorPME: [
        STATE.numeroInteriorPME,
        [
          Validators.maxLength(55)
        ]
      ],
      nombreDG: [
        STATE.nombreDG,
        [
          Validators.required,
          Validators.maxLength(28)
        ]
      ],
      apellidoPaternoDG: [
        STATE.apellidoPaternoDG,
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ],
      apellidoMaternoDG: [
       STATE.apellidoMaternoDG,
        [
          Validators.maxLength(20)
        ]
      ]
    });
  }

  
  /**
   * Inicializa el estado del formulario.
   * Si el formulario es de solo lectura, guarda los datos del formulario.
   * Si no, crea el formulario reactivo.
   */
   inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.crearAgregarPMNForm();
    }
  }
/**
   * Guarda los datos del formulario y habilita o deshabilita el formulario según el estado de solo lectura.
   * @returns {void}
   * @description Este método se utiliza para guardar los datos del formulario y habilitar o deshabilitar el formulario según el estado de solo lectura.
   */
  guardarDatosFormulario(): void {
    this.crearAgregarPMNForm();
    if (this.esFormularioSoloLectura) {
      this.personaMoralExtranjeraForm.disable();
    } else {
      this.personaMoralExtranjeraForm.enable();
    }
}
  /**
   * Inicializa los catálogos necesarios para el formulario.
   */
  inicializaCatalogos(): void {
    const PAIS$ = this.transportacionMaritimaService
      .getPaisCatalogo()
      .pipe(
        map((resp) => {
          this.pais = resp.data;
        })
      );

    merge(
      PAIS$
    )
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe();
  }

  /**
   * Se ejecuta cuando se selecciona un país en el formulario.
   * Establece el país seleccionado en el store.
   * @returns {void}
   */
  paisSeleccion(): void {
    const PAIS = this.personaMoralExtranjeraForm.get('paisPME')?.value;
    this.tramite40201Store.setTramite40201State({
      paisPME: PAIS});
  }

  /**
   * Agrega una nueva persona moral extranjera a la tabla.
   * @param personaMoralExtranjeraFormDatos - Datos de la persona moral extranjera.
   * @returns {void}
   */
  agregarPME(personaMoralExtranjeraFormDatos: PersonaMoralExtranjeraForm): void {
    const PAIS = this.pais.find((pais) => pais.id === Number(personaMoralExtranjeraFormDatos.paisPME))?.descripcion;

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
      this.tramite40201Store.setTramite40201State({ personaMoralExtranjeraTabla: NUEVO_CUERPO_TABLA });
    this.limpiarDatosPME();
    this.cerrarModal();
  }


  /**
   * Actualiza el estado del formulario en el store de tramite40201.
   * @returns {void}
   * @description Este método se utiliza para actualizar el estado del formulario en el store de tramite40201.
   */
actualizarFormularioState(): void {
  const VALUES = this.personaMoralExtranjeraForm.value;
  this.tramite40201Store.setTramite40201State(VALUES);
}
  /**
   * Limpia los datos del formulario de persona moral extranjera.
   * @returns {void}
   */
  limpiarDatosPME(): void {
    this.personaMoralExtranjeraForm.reset();
    this.actualizarFormularioState();
  }

  /**
   * Cierra el modal.
   * 
   * @returns {void}
   */
  cerrarModal(): void {
    if (this.closeModal) {
      this.closeModal.nativeElement.click();
    }
  }

  /**
   * Establece los valores en el store de tramite40201.
   *
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
   * @returns {void}
   */
   setValoresStore(form: FormGroup, campo: keyof TransportacionMaritima40201State): void {
  const VALOR = form.get(campo)?.value;
  this.tramite40201Store.setTramite40201State({ [campo]: VALOR });
}

  /**
   * Se ejecuta al destruir el componente.
   * Emite un valor y completa el subject `destruirNotificador$` para cancelar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destruirNotificador$.next();
    this.destruirNotificador$.complete();
  }
}
