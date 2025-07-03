import { CONFIGURACION_PARA_PFE_ENCABEZADO_DE_TABLA, TEXTOS } from '../../constantes/transportacion-maritima.enum';
import { Catalogo, CatalogoSelectComponent, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, merge, takeUntil } from 'rxjs';
import { Tramite40201Store, TransportacionMaritima40201State } from '../../../../core/estados/tramites/tramite40201.store';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery} from '@ng-mf/data-access-user';
import { PersonaFisicaExtranjeraForm } from '../../models/transportacion-maritima.model';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { Tramite40201Query } from '../../../../core/queries/tramite40201.query';
import { TransportacionMaritimaService } from '../../services/transportacion-maritima/transportacion-maritima.service';


/**
 * Componente para gestionar la información de personas físicas extranjeras.
 */
@Component({
  selector: 'app-persona-fisica-extranjera',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent
  ],
  templateUrl: './persona-fisica-extranjera.component.html',
  styleUrl: './persona-fisica-extranjera.component.css',
})
export class PersonaFisicaExtranjeraComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para gestionar la información de personas físicas extranjeras.
   */
  personaFisicaExtranjeraForm!: FormGroup;

  /**
   * Catálogos para los selectores.
   */
  pais!: Catalogo[];

  /**
   * Configuración para el persona moral nacional encabezado de la tabla.
   */
  configuracionParaPFEEncabezadoDeTabla = CONFIGURACION_PARA_PFE_ENCABEZADO_DE_TABLA;

  /**
   * Tabla de datos de personas físicas extranjeras.
   * @description Esta tabla almacena la información de las personas físicas extranjeras que se han agregado.
   */
  personaFisicaExtranjeraTabla: PersonaFisicaExtranjeraForm[] = [];

  /**
   * Texto de aviso de privacidad simplificado.
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
   * Tabla de selección para mostrar la información de personas físicas extranjeras.
   */
  TablaSeleccion = TablaSeleccion;
 /**
   * Indica si el formulario está en modo solo lectura
   */
   esFormularioSoloLectura: boolean = false;
  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios reactivos.
   * @param tramite40201Store Store para gestionar el estado del trámite 40201.
   * @param tramite40201Query Query para consultar el estado del trámite 40201.
   * @param transportacionMaritimaService Servicio para obtener los catálogos y datos relacionados con los transportacion marítima.
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
   */
 ngOnInit(): void {
  this.inicializaCatalogos();

  this.tramite40201Query.selectSeccionState$
    .pipe(
      takeUntil(this.destruirNotificador$),
      map((seccionState) => {
        this.transportacionMaritimaState = seccionState;
        this.personaFisicaExtranjeraTabla = seccionState.personaFisicaExtranjeraTabla || [];
        this.inicializarEstadoFormulario();
      })
    )
    .subscribe();

  this.paisSeleccion();
}

  /**
   * Crea el formulario reactivo para agregar o editar personas físicas extranjeras.
   * @description Este método inicializa el formulario con los valores del estado de la solicitud.
   */
  crearAgregarPFEForm(): void {
    const STATE = this.transportacionMaritimaState || {} as TransportacionMaritima40201State;
    this.personaFisicaExtranjeraForm = this.fb.group({
      seguroNumero: [
        STATE.seguroNumero,
        [
          Validators.required,
          Validators.maxLength(11)
        ]
      ],
      nombrePFE: [
        STATE.nombrePFE,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ],
      apellidoPaternoPFE: [
        STATE.apellidoPaternoPFE,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ],
      apellidoMaternoPFE: [
        STATE.apellidoMaternoPFE,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ],
      correoPFE: [
        STATE.correoPFE,
        [
          Validators.required,
          Validators.maxLength(320)
        ]
      ],
      paisPFE: [
        STATE.paisPFE,
        Validators.required
      ],
      codigoPostalPFE: [
        STATE.codigoPostalPFE,
        [
          Validators.required,
          Validators.maxLength(12)
        ]
      ],
      ciudadPFE: [
        STATE.ciudadPFE,
        [
          Validators.required,
          Validators.maxLength(120)
        ]
      ],
      estadoPFE: [
        STATE.estadoPFE,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ],
      callePFE: [
        STATE.callePFE,
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      numeroExteriorPFE: [
        STATE.numeroExteriorPFE,
        [
          Validators.required,
          Validators.maxLength(55)
        ]
      ],
      numeroInteriorPFE: [
        STATE.numeroInteriorPFE,
        [
          Validators.maxLength(55)
        ]
      ],
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
      this.crearAgregarPFEForm();
    }
  }
  /**
   * Guarda los datos del formulario y habilita o deshabilita el formulario según el estado de solo lectura.
   * @returns {void}
   * @description Este método se utiliza para guardar los datos del formulario y habilitar o deshabilitar el formulario según el estado de solo lectura.
   */
    guardarDatosFormulario(): void {
    this.crearAgregarPFEForm();
    if (this.esFormularioSoloLectura) {
      this.personaFisicaExtranjeraForm.disable();
    } else {
      this.personaFisicaExtranjeraForm.enable();
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
   * Selecciona el país de la persona física extranjera y lo guarda en el store.
   * @description Este método se ejecuta cuando se selecciona un país en el formulario.
   */
  paisSeleccion(): void {
    const PAIS = this.personaFisicaExtranjeraForm.get('paisPFE')?.value;
    this.tramite40201Store.setTramite40201State({ paisPFE: PAIS });
  }

  /**
   * Agrega una nueva persona física extranjera a la tabla.
   * @description Este método se ejecuta cuando se hace clic en el botón "Agregar" en el formulario.
   * @param personaFisicaExtranjeraFormDatos - Los datos de la persona física extranjera a agregar.
   * @returns {void}
   */
  agregarPFE(personaFisicaExtranjeraFormDatos: PersonaFisicaExtranjeraForm): void {
    const PAIS = this.pais.find((pais) => pais.id === Number(personaFisicaExtranjeraFormDatos.paisPFE))?.descripcion;

    const NUEVO_CUERPO_TABLA = [...this.personaFisicaExtranjeraTabla];

    NUEVO_CUERPO_TABLA.push({
      nombrePFE: `${personaFisicaExtranjeraFormDatos.nombrePFE} ${personaFisicaExtranjeraFormDatos.apellidoPaternoPFE} ${personaFisicaExtranjeraFormDatos.apellidoMaternoPFE}`.trim(),
      seguroNumero: personaFisicaExtranjeraFormDatos.seguroNumero,
      estadoPFE: personaFisicaExtranjeraFormDatos.estadoPFE,
      correoPFE: personaFisicaExtranjeraFormDatos.correoPFE,
      paisPFE: PAIS || '',
      domicilioPFE: `${personaFisicaExtranjeraFormDatos.callePFE} ${personaFisicaExtranjeraFormDatos.numeroExteriorPFE} ${personaFisicaExtranjeraFormDatos.ciudadPFE} ${personaFisicaExtranjeraFormDatos.estadoPFE} ${PAIS} ${personaFisicaExtranjeraFormDatos.codigoPostalPFE}`.trim(),
    });
    this.personaFisicaExtranjeraTabla = NUEVO_CUERPO_TABLA;
    this.tramite40201Store.setTramite40201State({ personaFisicaExtranjeraTabla: NUEVO_CUERPO_TABLA });
    this.limpiarDatosPFE();
    this.cerrarModal();
  }

  /**
   * Actualiza el estado del formulario en el store.
   * @description Este método se utiliza para actualizar el estado del formulario en el store de tramite40201.
   * @returns {void}
   */
actualizarFormularioState(): void {
  const VALUES = this.personaFisicaExtranjeraForm.value;
  this.tramite40201Store.setTramite40201State(VALUES);
}
  /**
   * Limpia los datos del formulario de persona física extranjera.
   * @description Este método se ejecuta cuando se hace clic en el botón "Limpiar" en el formulario.
   * @returns {void}
   */
  limpiarDatosPFE(): void {
    this.personaFisicaExtranjeraForm.reset();
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