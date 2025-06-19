import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { CONFIGURACION_PARA_PFE_ENCABEZADO_DE_TABLA } from '../../../constants/transportacion-maritima.enum';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { PersonaFisicaExtranjeraForm } from '../../../../40402/models/transportacion-maritima.model';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { TEXTOS } from '../../../constants/transportacion-maritima.enum';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite40402Query } from '../../../estados/tramite40402.query';
import { Tramite40402Store } from '../../../estados/tramite40402.store';
import { Tramitenacionales40402State } from '../../../estados/tramite40402.store';
import { TransportacionMaritimaService } from '../../../../40402/services/transportacion-maritima/transportacion-maritima.service';
import { Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { merge } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente para gestionar la información de personas físicas extranjeras.
 */
@Component({
  selector: 'app-persona-fisica',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent
  ],
  templateUrl: './persona-fisica.component.html',
  styleUrl: './persona-fisica.component.css',
})
export class PersonaFisicaComponent implements OnInit, OnDestroy {
  /**
   * Configuración de la tabla de selección.
   */
  TablaSeleccion = TablaSeleccion;
  
  /**
   * Formulario reactivo para gestionar la información de personas físicas extranjeras.
   */
  personaFisicaExtranjeraForm!: FormGroup;

  /**
   * Catálogos para los selectores.
   */
  pais!: Catalogo[];

  /**
   * Configuración para el encabezado de tabla de personas físicas extranjeras.
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
  public transportacionMaritimaState!: Tramitenacionales40402State;

  /**
   * Subject para destruir notificador.
   */
  private destruirNotificador$: Subject<void> = new Subject();

  /**
   * @property {ConsultaioState} consultaDatos
   * @description
   * Datos de consulta del trámite almacenados en el estado global.
   */
  consultaDatos!: ConsultaioState;

  /**
   * @property {boolean} esDatosRespuesta
   * @description
   * Bandera que indica si los datos ya fueron obtenidos y se deben mostrar directamente.
   */
  public esDatosRespuesta: boolean = false;

  /**
   * Indica si el formulario o los campos están en modo de solo lectura.
   * @default false
   */
  soloLectura: boolean = false;

  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios reactivos.
   * @param tramite40402Store Store para gestionar el estado del trámite 40402.
   * @param tramite40402Query Query para consultar el estado del trámite 40402.
   * @param transportacionMaritimaService Servicio para obtener catálogos de transporte marítimo.
   * @param consultaioQuery Query para consultar datos globales
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
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * @returns {void}
   */
  ngOnInit(): void {
    this.inicializaCatalogos();

    this.tramite40402Query.selectSeccionState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.transportacionMaritimaState = seccionState;
          this.personaFisicaExtranjeraTabla = seccionState.personaFisicaExtranjeraTabla || [];
        })
      )
      .subscribe();

    this.crearAgregarPFEForm();
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
   * Crea el formulario reactivo para agregar o editar personas físicas extranjeras.
   * @description Este método inicializa el formulario con los valores del estado de la solicitud.
   * @returns {void}
   */
  crearAgregarPFEForm(): void {
    this.personaFisicaExtranjeraForm = this.fb.group({
      seguroNumero: [
        this.transportacionMaritimaState?.seguroNumero,
        [
          Validators.required,
          Validators.maxLength(11)
        ]
      ],
      nombrePFE: [
        this.transportacionMaritimaState?.nombrePFE,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ],
      apellidoPaternoPFE: [
        this.transportacionMaritimaState?.apellidoPaternoPFE,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ],
      apellidoMaternoPFE: [
        this.transportacionMaritimaState?.apellidoMaternoPFE,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ],
      correoPFE: [
        this.transportacionMaritimaState?.correoPFE,
        [
          Validators.required,
          Validators.maxLength(320)
        ]
      ],
      paisPFE: [
        this.transportacionMaritimaState?.paisPFE,
        Validators.required
      ],
      codigoPostalPFE: [
        this.transportacionMaritimaState?.codigoPostalPFE,
        [
          Validators.required,
          Validators.maxLength(12)
        ]
      ],
      ciudadPFE: [
        this.transportacionMaritimaState?.ciudadPFE,
        [
          Validators.required,
          Validators.maxLength(120)
        ]
      ],
      estadoPFE: [
        this.transportacionMaritimaState?.estadoPFE,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ],
      callePFE: [
        this.transportacionMaritimaState?.callePFE,
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      numeroExteriorPFE: [
        this.transportacionMaritimaState?.numeroExteriorPFE,
        [
          Validators.required,
          Validators.maxLength(55)
        ]
      ],
      numeroInteriorPFE: [
        this.transportacionMaritimaState?.numeroInteriorPFE,
        [
          Validators.maxLength(55)
        ]
      ],
    });
    this.inicializarEstadoFormulario();
  }

  /**
   * Inicializa los catálogos necesarios para el formulario.
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

    merge(
      PAIS$
    )
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe();
  }

  /**
   * Selecciona el país de la persona física extranjera y lo guarda en el store.
   * @description Este método se ejecuta cuando se selecciona un país en el formulario.
   * @returns {void}
   */
  paisSeleccion(): void {
    const PAIS = this.personaFisicaExtranjeraForm.get('paisPFE')?.value;
    this.tramite40402Store.setPaisPFE(PAIS);
  }

  /**
   * Agrega una nueva persona física extranjera a la tabla.
   * @description Este método se ejecuta al hacer clic en el botón "Agregar".
   * @param personaFisicaExtranjeraFormDatos - Datos del formulario a agregar
   * @returns {void}
   */
  agregarPFE(personaFisicaExtranjeraFormDatos: PersonaFisicaExtranjeraForm): void {
    const PAIS = this.pais?.find((pais) => pais.id === Number(personaFisicaExtranjeraFormDatos.paisPFE))?.descripcion;

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
    this.tramite40402Store.setPersonaFisicaExtranjeraTabla(this.personaFisicaExtranjeraTabla);
    this.limpiarDatosPFE();
    this.cerrarModal();
  }

  /**
   * Actualiza el estado del formulario en el store.
   * @description Sincroniza los valores del formulario con el estado global.
   * @returns {void}
   */
  actualizarFormularioState(): void {
    this.setValoresStore(this.personaFisicaExtranjeraForm, 'nombrePFE', 'setNombrePFE');
    this.setValoresStore(this.personaFisicaExtranjeraForm, 'seguroNumero', 'setSeguroNumero');
    this.setValoresStore(this.personaFisicaExtranjeraForm, 'apellidoPaternoPFE', 'setApellidoMaternoPFE');
    this.setValoresStore(this.personaFisicaExtranjeraForm, 'apellidoMaternoPFE', 'setApellidoMaternoPFE');
    this.setValoresStore(this.personaFisicaExtranjeraForm, 'correoPFE', 'setCorreoPFE');
    this.setValoresStore(this.personaFisicaExtranjeraForm, 'paisPFE', 'setPaisPFE');
    this.setValoresStore(this.personaFisicaExtranjeraForm, 'codigoPostalPFE', 'setCodigoPostalPFE');
    this.setValoresStore(this.personaFisicaExtranjeraForm, 'ciudadPFE', 'setCiudadPFE');
    this.setValoresStore(this.personaFisicaExtranjeraForm, 'estadoPFE', 'setEstadoPFE');
    this.setValoresStore(this.personaFisicaExtranjeraForm, 'callePFE', 'setCallePFE');
    this.setValoresStore(this.personaFisicaExtranjeraForm, 'numeroExteriorPFE', 'setNumeroExteriorPFE');
    this.setValoresStore(this.personaFisicaExtranjeraForm, 'numeroInteriorPFE', 'setNumeroInteriorPFE');
  }

  /**
   * Limpia los datos del formulario de persona física extranjera.
   * @returns {void}
   */
  limpiarDatosPFE(): void {
    this.personaFisicaExtranjeraForm.reset();
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
   * @param form - Instancia del FormGroup
   * @param campo - Nombre del campo en el formulario
   * @param metodoNombre - Nombre del método en el store a invocar
   * @returns {void}
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite40402Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite40402Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * @description Cancela todas las suscripciones activas.
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destruirNotificador$.next();
    this.destruirNotificador$.complete();
  }

  /**
   * Inicializa el estado del formulario (habilitado/deshabilitado) basado en el modo de solo lectura.
   * @returns {void}
   */
  inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.personaFisicaExtranjeraForm?.disable();
    } else {
      this.personaFisicaExtranjeraForm?.enable();
    }
  }
}