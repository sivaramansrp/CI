import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, merge, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

import { AlertComponent, Catalogo, CatalogoSelectComponent, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { CONFIGURACION_PARA_ENCABEZADO_DE_TABLA, TEXTOS } from '../../constantes/transportacion-maritima.enum';
import { Tramite40201Store, TransportacionMaritima40201State } from '../../../../core/estados/tramites/tramite40201.store';
import { PersonaFisicaNacionalForm } from '../../models/transportacion-maritima.model';
import { Tramite40201Query } from '../../../../core/queries/tramite40201.query';
import { TransportacionMaritimaService } from '../../services/transportacion-maritima/transportacion-maritima.service';

/**
 * Componente para gestionar la información de personas físicas nacionales.
 */
@Component({
  selector: 'app-persona-fisica-nacional',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    TablaDinamicaComponent,
    AlertComponent,
    CatalogoSelectComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './persona-fisica-nacional.component.html',
  styleUrl: './persona-fisica-nacional.component.css',
})
export class PersonaFisicaNacionalComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para gestionar la información de personas físicas nacionales.
   */
  personaFisicaForm!: FormGroup;

  /**
   * País.
   * @type {Catalogo[]}
   * @description Catálogos para los campos de selección en el formulario.
   */
  pais!: Catalogo[];

  /**
   * Estado.
   * @type {Catalogo[]}
   * @description Catálogos para los campos de selección en el formulario.
   */
  estado!: Catalogo[];

  /**
   * Municipio.
   * @type {Catalogo[]}
   * @description Catálogos para los campos de selección en el formulario.
   */
  municipio!: Catalogo[];

  /**
   * Colonia.
   * @type {Catalogo[]}
   * @description Catálogos para los campos de selección en el formulario.
   */
  colonia!: Catalogo[];

  /**
   * Configuración para el encabezado de la tabla.
   */
  configuracionParaEncabezadoDeTabla = CONFIGURACION_PARA_ENCABEZADO_DE_TABLA;

  /**
   * Tabla de datos de personas físicas nacionales.
   * @type {PersonaFisicaNacionalForm[]}
   * @description Almacena la información de las personas físicas nacionales.
   */
  personaFisicaNacionalTabla: PersonaFisicaNacionalForm[] = [];

  /**
   * Cadena que representa el aviso de privacidad simplificado.
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
   */
  ngOnInit(): void {
    this.inicializaCatalogos();

    this.tramite40201Query.selectSeccionState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.transportacionMaritimaState = seccionState;
          this.personaFisicaNacionalTabla = seccionState.personaFisicaNacionalTabla || [];
        })
      )
      .subscribe();

    // Inicializar el formulario principal
    this.crearAgregarPFNForm();

    this.paisSeleccion();
    this.estadoSeleccion();
    this.municipioSeleccion();
    this.coloniaSeleccion();
  }

  /**
   * Crea el formulario reactivo para gestionar la información de personas físicas nacionales.
   */
  crearAgregarPFNForm(): void {
    this.personaFisicaForm = this.fb.group({
      buscarRfcPFN: [
        this.transportacionMaritimaState.buscarRfcPFN,
        [
          Validators.required,
          Validators.maxLength(15)
        ]
      ],
      rfcPFN: [
        { value: this.transportacionMaritimaState.rfcPFN, disabled: true },
        [
          Validators.maxLength(13)
        ]
      ],
      nombrePFN: [
        { value: this.transportacionMaritimaState.nombrePFN, disabled: true },
        [
          Validators.maxLength(200)
        ]
      ],
      apellidoPaternoPFN: [
        { value: this.transportacionMaritimaState.apellidoPaternoPFN, disabled: true },
        [
          Validators.maxLength(200)
        ]
      ],
      apellidoMaternoPFN: [
        { value: this.transportacionMaritimaState.apellidoMaternoPFN, disabled: true },
        [
          Validators.maxLength(200)
        ]
      ],
      paisPFN: [
        this.transportacionMaritimaState.paisPFN,
      ],
      codigoPostalPFN: [
        { value: this.transportacionMaritimaState.codigoPostalPFN, disabled: true },
        [
          Validators.maxLength(12)
        ]
      ],
      estadoPFN: [
        this.transportacionMaritimaState.estadoPFN,
      ],
      municipioPFN: [
        this.transportacionMaritimaState.municipioPFN,
      ],
      localidadPFN: [
        { value: this.transportacionMaritimaState.localidadPFN, disabled: true },
        [
          Validators.maxLength(120)
        ]
      ],
      coloniaPFN: [
        this.transportacionMaritimaState.coloniaPFN,
      ],
      callePFN: [
        { value: this.transportacionMaritimaState.callePFN, disabled: true },
        [
          Validators.maxLength(100)
        ]
      ],
      numeroExteriorPFN: [
        { value: this.transportacionMaritimaState.numeroExteriorPFN, disabled: true },
        [
          Validators.maxLength(55)
        ]
      ],
      numeroInteriorPFN: [
        { value: this.transportacionMaritimaState.numeroInteriorPFN, disabled: true },
        [
          Validators.maxLength(55)
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
   * Selecciona el país y lo almacena en el store.
   * @returns {void}
   * @description Este método se ejecuta cuando se selecciona un país en el formulario.
   */
  paisSeleccion(): void {
    const PAIS = this.personaFisicaForm.get('paisPFN')?.value;
    this.tramite40201Store.setPaisPFN(PAIS);
  }

  /**
   * Selecciona el estado y lo almacena en el store.
   * @returns {void}
   * @description Este método se ejecuta cuando se selecciona un estado en el formulario.
   */
  estadoSeleccion(): void {
    const ESTADO = this.personaFisicaForm.get('estadoPFN')?.value;
    this.tramite40201Store.setEstadoPFN(ESTADO);
  }

  /**
   * Selecciona el municipio y lo almacena en el store.
   * @returns {void}
   * @description Este método se ejecuta cuando se selecciona un municipio en el formulario.
   */
  municipioSeleccion(): void {
    const MUNICIPIO = this.personaFisicaForm.get('municipioPFN')?.value;
    this.tramite40201Store.setMunicipioPFN(MUNICIPIO);
  }

  /**
   * Selecciona la colonia y lo almacena en el store.
   * @returns {void}
   * @description Este método se ejecuta cuando se selecciona una colonia en el formulario.
   */
  coloniaSeleccion(): void {
    const COLONIA = this.personaFisicaForm.get('coloniaPFN')?.value;
    this.tramite40201Store.setColoniaPFN(COLONIA);
  }

  /**
   * Busca un contribuyente por su RFC.
   * @param {string} rfc - RFC del contribuyente a buscar.
   * @returns {void}
   * @description Este método se ejecuta cuando se busca un contribuyente por su RFC en el formulario.
   */
  buscarContribuyente(rfc: string): void {
    if (rfc.length > 0) {
      this.transportacionMaritimaService.buscarContribuyentePFN()
        .pipe(takeUntil(this.destruirNotificador$))
        .subscribe({
          next: (result) => {
            const TABLA_DATOS = result.data[0];
            this.personaFisicaForm.patchValue({
              buscarRfcPFN: '',
              rfcPFN: TABLA_DATOS?.rfcPFN,
              nombrePFN: TABLA_DATOS.nombrePFN,
              apellidoPaternoPFN: TABLA_DATOS.apellidoPaternoPFN,
              apellidoMaternoPFN: TABLA_DATOS.apellidoMaternoPFN,
              paisPFN: TABLA_DATOS.paisPFN,
              codigoPostalPFN: TABLA_DATOS.codigoPostalPFN,
              estadoPFN: TABLA_DATOS.estadoPFN,
              municipioPFN: TABLA_DATOS.municipioPFN,
              localidadPFN: TABLA_DATOS.localidadPFN,
              coloniaPFN: TABLA_DATOS.coloniaPFN,
              callePFN: TABLA_DATOS.callePFN,
              numeroExteriorPFN: TABLA_DATOS.numeroExteriorPFN,
              numeroInteriorPFN: TABLA_DATOS.numeroInteriorPFN,
            });
            this.actualizarFormularioState();
          }
        });
    }
  }

  /**
   * Agrega una nueva persona física nacional a la tabla.
   * @param {PersonaFisicaNacionalForm} personaFisicaFormDatos - Datos de la persona física nacional a agregar.
   * @returns {void}
   * @description Este método se ejecuta cuando se agrega una nueva persona física nacional en el formulario.
   */
  agregarPFN(personaFisicaFormDatos: PersonaFisicaNacionalForm): void {
    const COLONIA = this.colonia.find((colonia) => colonia.id === personaFisicaFormDatos.coloniaPFN)?.descripcion;
    const PAIS = this.pais.find((pais) => pais.id === personaFisicaFormDatos.paisPFN)?.descripcion;
    const ESTADO = this.estado.find((estado) => estado.id === personaFisicaFormDatos.estadoPFN)?.descripcion;
    const MUNICIPIO = this.municipio.find((municipio) => municipio.id === personaFisicaFormDatos.municipioPFN)?.descripcion;

    const NUEVO_CUERPO_TABLA = [...this.personaFisicaNacionalTabla];

    NUEVO_CUERPO_TABLA.push({
      nombrePFN: personaFisicaFormDatos.nombrePFN,
      rfcPFN: personaFisicaFormDatos.rfcPFN,
      codigoPostalPFN: personaFisicaFormDatos.codigoPostalPFN,
      localidadPFN: personaFisicaFormDatos.localidadPFN,
      callePFN: personaFisicaFormDatos.callePFN,
      coloniaPFN: COLONIA || '',
      paisPFN: PAIS || '',
      estadoPFN: ESTADO || '',
      municipioPFN: MUNICIPIO || '',
      domicilioPFN: `${personaFisicaFormDatos.callePFN} ${personaFisicaFormDatos.numeroExteriorPFN} ${COLONIA} ${ESTADO} ${MUNICIPIO} ${PAIS} ${personaFisicaFormDatos.codigoPostalPFN}`.trim(),
    });
    this.personaFisicaNacionalTabla = NUEVO_CUERPO_TABLA;
    this.tramite40201Store.setPersonaFisicaNacionalTabla(this.personaFisicaNacionalTabla);
    this.limpiarDatosPFN();
    this.cerrarModal();
  }

  /**
   * Actualiza el estado del formulario y lo almacena en el store.
   * @returns {void}
   * @description Este método se ejecuta para actualizar el estado del formulario y almacenar los valores en el store.
   */
  actualizarFormularioState(): void {
    this.setValoresStore(this.personaFisicaForm, 'buscarRfcPFN', 'setBuscarRfcPFN');
    this.setValoresStore(this.personaFisicaForm, 'rfcPFN', 'setRfcPFN');
    this.setValoresStore(this.personaFisicaForm, 'nombrePFN', 'setNombrePFN');
    this.setValoresStore(this.personaFisicaForm, 'apellidoPaternoPFN', 'setApellidoPaternoPFN');
    this.setValoresStore(this.personaFisicaForm, 'apellidoMaternoPFN', 'setApellidoMaternoPFN');
    this.setValoresStore(this.personaFisicaForm, 'codigoPostalPFN', 'setCodigoPostalPFN');
    this.setValoresStore(this.personaFisicaForm, 'localidadPFN', 'setLocalidadPFN');
    this.setValoresStore(this.personaFisicaForm, 'callePFN', 'setCallePFN');
    this.setValoresStore(this.personaFisicaForm, 'numeroExteriorPFN', 'setNumeroExteriorPFN');
    this.setValoresStore(this.personaFisicaForm, 'numeroInteriorPFN', 'setNumeroInteriorPFN');
    this.setValoresStore(this.personaFisicaForm, 'coloniaPFN', 'setColoniaPFN');
    this.setValoresStore(this.personaFisicaForm, 'estadoPFN', 'setEstadoPFN');
    this.setValoresStore(this.personaFisicaForm, 'municipioPFN', 'setMunicipioPFN');
    this.setValoresStore(this.personaFisicaForm, 'paisPFN', 'setPaisPFN');
  }

  /**
   * Limpia los datos del formulario de persona física nacional.
   * @returns {void}
   * @description Este método se ejecuta para limpiar los datos del formulario de persona física nacional.
   */
  limpiarDatosPFN(): void {
    this.personaFisicaForm.reset();
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