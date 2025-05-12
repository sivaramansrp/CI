import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, merge, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

import { AlertComponent, Catalogo, CatalogoSelectComponent, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { CONFIGURACION_PARA_PMN_ENCABEZADO_DE_TABLA, TEXTOS } from '../../constantes/transportacion-maritima.enum';
import { Tramite40201Store, TransportacionMaritima40201State } from '../../../../core/estados/tramites/tramite40201.store';
import { PersonaMoralNacionalForm } from '../../models/transportacion-maritima.model';
import { Tramite40201Query } from '../../../../core/queries/tramite40201.query';
import { TransportacionMaritimaService } from '../../services/transportacion-maritima/transportacion-maritima.service';

/**
 * Componente para gestionar la información de personas morales nacionales.
 */
@Component({
  selector: 'app-persona-moral-nacional',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertComponent,
    TituloComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent
  ],
  templateUrl: './persona-moral-nacional.component.html',
  styleUrl: './persona-moral-nacional.component.css',
})
export class PersonaMoralNacionalComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para gestionar la información de personas morales nacionales.
   */
  personaMoralForm!: FormGroup;

  /**
   * País.
   * @type {Catalogo[]}
   * @description Este arreglo contiene los catálogos de países.
   */
  pais!: Catalogo[];

  /**
   * Estado.
   * @type {Catalogo[]}
   * @description Este arreglo contiene los catálogos de estados.
   */
  estado!: Catalogo[];

  /**
   * Municipio.
   * @type {Catalogo[]}
   * @description Este arreglo contiene los catálogos de municipios.
   */
  municipio!: Catalogo[];

  /**
   * Colonia.
   * @type {Catalogo[]}
   * @description Este arreglo contiene los catálogos de colonias.
   */
  colonia!: Catalogo[];

  /**
   * Configuración para el persona moral nacional encabezado de la tabla.
   */
  configuracionParaPMNEncabezadoDeTabla = CONFIGURACION_PARA_PMN_ENCABEZADO_DE_TABLA;

  /**
   * Tabla de datos de personas morales nacionales.
   * @type {PersonaMoralNacionalForm[]}
   */
  personaMoralNacionalTabla: PersonaMoralNacionalForm[] = [];

  /**
   * Texto de aviso de privacidad simplificado.
   * @type {string}
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
  ) {
    // El constructor se utiliza para la inyección de dependencias
  }

  /**
   * Inicializa el componente.
   * Suscribe a los cambios en el estado de la sección y crea el formulario reactivo.
   */
  ngOnInit(): void {
    this.inicializaCatalogos();

    this.tramite40201Query.selectSeccionState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.transportacionMaritimaState = seccionState;
          this.personaMoralNacionalTabla = seccionState.personaMoralNacionalTabla || [];
        })
      )
      .subscribe();

    // Inicializar el formulario principal
    this.crearAgregarPMNForm();

    this.paisSeleccion();
    this.estadoSeleccion();
    this.municipioSeleccion();
    this.coloniaSeleccion();
  }

  /**
   * Inicializa el formulario reactivo para agregar personas morales nacionales.
   * @returns {void}
   */
  crearAgregarPMNForm(): void {
    this.personaMoralForm = this.fb.group({
      buscarRfcPMN: [
        this.transportacionMaritimaState.buscarRfcPMN,
        [
          Validators.required,
          Validators.maxLength(13)
        ]
      ],
      rfcPMN: [
        { value: this.transportacionMaritimaState.rfcPMN, disabled: true },
        [
          Validators.maxLength(13)
        ]
      ],
      denominacionPMN: [
        { value: this.transportacionMaritimaState.denominacionPMN, disabled: true },
        [
          Validators.maxLength(254)
        ]
      ],
      correoPMN: [
        { value: this.transportacionMaritimaState.correoPMN, disabled: true },
        [
          Validators.maxLength(320)
        ]
      ],
      paisPMN: [
        this.transportacionMaritimaState.paisPMN,
      ],
      codigoPostalPMN: [
        { value: this.transportacionMaritimaState.codigoPostalPMN, disabled: true },
        [
          Validators.maxLength(12)
        ]
      ],
      estadoPMN: [
        this.transportacionMaritimaState.estadoPMN,
      ],
      municipioPMN: [
        this.transportacionMaritimaState.municipioPMN,
      ],
      localidadPMN: [
        { value: this.transportacionMaritimaState.localidadPMN, disabled: true },
        [
          Validators.maxLength(120)
        ]
      ],
      coloniaPMN: [
        this.transportacionMaritimaState.coloniaPMN,
      ],
      callePMN: [
        { value: this.transportacionMaritimaState.callePMN, disabled: true },
        [
          Validators.maxLength(100)
        ]
      ],
      numeroExteriorPMN: [
        { value: this.transportacionMaritimaState.numeroExteriorPMN, disabled: true },
        [
          Validators.maxLength(55)
        ]
      ],
      numeroInteriorPMN: [
        { value: this.transportacionMaritimaState.numeroInteriorPMN, disabled: true },
        [
          Validators.maxLength(55)
        ]
      ],
      nombreDirectorGeneral: [
        this.transportacionMaritimaState.nombreDirectorGeneral,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ],
      apellidoPaternoDirectorGeneral: [
        this.transportacionMaritimaState.apellidoPaternoDirectorGeneral,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ],
      apellidoMaternoDirectorGeneral: [
        this.transportacionMaritimaState.apellidoMaternoDirectorGeneral,
        [
          Validators.maxLength(200)
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

    const ESTADO$ = this.transportacionMaritimaService
      .getEstadoCatalogo()
      .pipe(
        map((resp) => {
          this.estado = resp.data;
        })
      );

    const MUNICIPIO$ = this.transportacionMaritimaService
      .getMunicipioCatalogo()
      .pipe(
        map((resp) => {
          this.municipio = resp.data;
        })
      );

    const COLONIA$ = this.transportacionMaritimaService
      .getColoniaCatalogo()
      .pipe(
        map((resp) => {
          this.colonia = resp.data;
        })
      );

    merge(
      PAIS$,
      ESTADO$,
      MUNICIPIO$,
      COLONIA$
    )
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe();
  }

  /**
   * Selecciona el país y actualiza el store.
   * @returns {void}
   */
  paisSeleccion(): void {
    const PAIS = this.personaMoralForm.get('paisPMN')?.value;
    this.tramite40201Store.setPaisPMN(PAIS);
  }

  /**
   * Selecciona el estado y actualiza el store.
   * @returns {void}
   */
  estadoSeleccion(): void {
    const ESTADO = this.personaMoralForm.get('estadoPMN')?.value;
    this.tramite40201Store.setEstadoPMN(ESTADO);
  }

  /**
   * Selecciona el municipio y actualiza el store.
   * @returns {void}
   */
  municipioSeleccion(): void {
    const MUNICIPIO = this.personaMoralForm.get('municipioPMN')?.value;
    this.tramite40201Store.setMunicipioPMN(MUNICIPIO);
  }

  /**
   * Selecciona la colonia y actualiza el store.
   * @returns {void}
   */
  coloniaSeleccion(): void {
    const COLONIA = this.personaMoralForm.get('coloniaPMN')?.value;
    this.tramite40201Store.setColoniaPMN(COLONIA);
  }

  /**
   * Busca un contribuyente por su RFC.
   * @param {string} rfc - El RFC del contribuyente a buscar.
   * @returns {void}
   */
  buscarContribuyente(rfc: string): void {
    if (rfc.length > 0) {
      this.transportacionMaritimaService.buscarContribuyentePMN()
        .pipe(takeUntil(this.destruirNotificador$))
        .subscribe({
          next: (result) => {
            const TABLA_DATOS = result.data[0];
            this.personaMoralForm.patchValue({
              buscarRfcPMN: '',
              rfcPMN: TABLA_DATOS.rfcPMN,
              denominacionPMN: TABLA_DATOS.denominacionPMN,
              correoPMN: TABLA_DATOS.correoPMN,
              paisPMN: TABLA_DATOS.paisPMN,
              codigoPostalPMN: TABLA_DATOS.codigoPostalPMN,
              estadoPMN: TABLA_DATOS.estadoPMN,
              municipioPMN: TABLA_DATOS.municipioPMN,
              localidadPMN: TABLA_DATOS.localidadPMN,
              coloniaPMN: TABLA_DATOS.coloniaPMN,
              callePMN: TABLA_DATOS.callePMN,
              numeroExteriorPMN: TABLA_DATOS.numeroExteriorPMN,
              numeroInteriorPMN: TABLA_DATOS.numeroInteriorPMN
            });
            this.actualizarFormularioState();
          }
        });
    }
  }

  /**
   * Agrega una nueva persona moral nacional a la tabla.
   * @param {PersonaMoralNacionalForm} personaMoralNacionalFormDatos - Los datos de la persona moral nacional a agregar.
   * @returns {void}
   */
  agregarPMN(personaMoralNacionalFormDatos: PersonaMoralNacionalForm): void {
    const COLONIA = this.colonia.find((colonia) => colonia.id === personaMoralNacionalFormDatos.coloniaPMN)?.descripcion;
    const PAIS = this.pais.find((pais) => pais.id === personaMoralNacionalFormDatos.paisPMN)?.descripcion;
    const ESTADO = this.estado.find((estado) => estado.id === personaMoralNacionalFormDatos.estadoPMN)?.descripcion;
    const MUNICIPIO = this.municipio.find((municipio) => municipio.id === personaMoralNacionalFormDatos.municipioPMN)?.descripcion;

    const NUEVO_CUERPO_TABLA = [...this.personaMoralNacionalTabla];

    NUEVO_CUERPO_TABLA.push({
      denominacionPMN: personaMoralNacionalFormDatos.denominacionPMN,
      rfcPMN: personaMoralNacionalFormDatos.rfcPMN,
      correoPMN: personaMoralNacionalFormDatos.correoPMN,
      localidadPMN: personaMoralNacionalFormDatos.localidadPMN,
      callePMN: personaMoralNacionalFormDatos.callePMN,
      coloniaPMN: COLONIA || '',
      paisPMN: PAIS || '',
      estadoPMN: ESTADO || '',
      municipioPMN: MUNICIPIO || '',
      nombreDirectorGeneral: `${personaMoralNacionalFormDatos.nombreDirectorGeneral} ${personaMoralNacionalFormDatos.apellidoPaternoDirectorGeneral} ${personaMoralNacionalFormDatos.apellidoMaternoDirectorGeneral}`.trim(),
      domicilioPMN: `${personaMoralNacionalFormDatos.callePMN} ${personaMoralNacionalFormDatos.numeroExteriorPMN} ${COLONIA} ${ESTADO} ${MUNICIPIO} ${PAIS} ${personaMoralNacionalFormDatos.codigoPostalPMN}`.trim(),
    });
    this.personaMoralNacionalTabla = NUEVO_CUERPO_TABLA;
    this.tramite40201Store.setPersonaMoralNacionalTabla(this.personaMoralNacionalTabla);
    this.limpiarDatosPMN();
    this.cerrarModal();
  }

  /**
   * Actualiza el estado del formulario.
   * @returns {void}
   * @description Este método se utiliza para actualizar el estado del formulario y establecer los valores en el store.
   */
  actualizarFormularioState(): void {
    this.setValoresStore(this.personaMoralForm, 'buscarRfcPMN', 'setBuscarRfcPMN');
    this.setValoresStore(this.personaMoralForm, 'rfcPMN', 'setRfcPMN');
    this.setValoresStore(this.personaMoralForm, 'denominacionPMN', 'setDenominacionPMN');
    this.setValoresStore(this.personaMoralForm, 'correoPMN', 'setCorreoPMN');
    this.setValoresStore(this.personaMoralForm, 'paisPMN', 'setPaisPMN');
    this.setValoresStore(this.personaMoralForm, 'codigoPostalPMN', 'setCodigoPostalPMN');
    this.setValoresStore(this.personaMoralForm, 'estadoPMN', 'setEstadoPMN');
    this.setValoresStore(this.personaMoralForm, 'callePMN', 'setCallePMN');
    this.setValoresStore(this.personaMoralForm, 'municipioPMN', 'setMunicipioPMN');
    this.setValoresStore(this.personaMoralForm, 'localidadPMN', 'setLocalidadPMN');
    this.setValoresStore(this.personaMoralForm, 'coloniaPMN', 'setColoniaPMN');
    this.setValoresStore(this.personaMoralForm, 'numeroExteriorPMN', 'setNumeroExteriorPMN');
    this.setValoresStore(this.personaMoralForm, 'numeroInteriorPMN', 'setNumeroInteriorPMN');
    this.setValoresStore(this.personaMoralForm, 'nombreDirectorGeneral', 'setNombreDirectorGeneral');
    this.setValoresStore(this.personaMoralForm, 'apellidoPaternoDirectorGeneral', 'setApellidoPaternoDirectorGeneral');
    this.setValoresStore(this.personaMoralForm, 'apellidoMaternoDirectorGeneral', 'setApellidoMaternoDirectorGeneral');
  }

  /**
   * Limpia los datos del formulario de persona moral nacional.
   * @returns {void}
   * @description Este método se utiliza para limpiar los datos del formulario de persona moral nacional.
   */
  limpiarDatosPMN(): void {
    this.personaMoralForm.reset();
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
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite40201Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite40201Store[metodoNombre] as (value: unknown) => void)(VALOR);
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