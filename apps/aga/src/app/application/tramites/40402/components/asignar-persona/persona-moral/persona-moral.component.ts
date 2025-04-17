import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
 * Componente para la captura de datos de persona moral extranjera.
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
  public transportacionMaritimaState!: Tramitenacionales40402State;

  /**
   * Subject para destruir notificador.
   */
  private destruirNotificador$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {Tramite40402Store} tramite40402Store - Store para gestionar el estado del trámite 40402.
   * @param {Tramite40402Query} tramite40402Query - Query para consultar el estado del trámite 40402.
   * @param {TransportacionMaritimaService} transportacionMaritimaService - Servicio para obtener datos de transportación marítima.
   */
  constructor(
    private fb: FormBuilder,
    private tramite40402Store: Tramite40402Store,
    private tramite40402Query: Tramite40402Query,
    private transportacionMaritimaService: TransportacionMaritimaService,
  ) {
    // El constructor se utiliza para la inyección de dependencias
  }

  /**
   * Se ejecuta al inicializar el componente.
   * Inicializa los catálogos y el formulario.
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

    // Inicializar el formulario principal
    this.crearAgregarPMNForm();

    this.paisSeleccion();
  }

  /**
   * Inicializa el formulario reactivo para la captura de datos de persona moral extranjera.
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
    this.tramite40402Store.setPaisPME(PAIS);
  }

  /**
   * Agrega una nueva persona moral extranjera a la tabla.
   * @param personaMoralExtranjeraFormDatos - Datos de la persona moral extranjera.
   * @returns {void}
   */
  agregarPME(personaMoralExtranjeraFormDatos: PersonaMoralExtranjeraForm): void {
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
   * Actualiza el estado del formulario y los valores en el store.
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
   * Establece los valores en el store de tramite40402.
   *
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
   * @returns {void}
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite40402Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite40402Store[metodoNombre] as (value: unknown) => void)(VALOR);
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
