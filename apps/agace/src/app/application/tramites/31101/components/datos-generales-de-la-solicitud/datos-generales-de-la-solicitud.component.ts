import {
  CatalogoSelectComponent,
  Notificacion,
  NotificacionesComponent,
  Pedimento,
} from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { DOMICILIOS_CONFIGURACION_COLUMNAS } from '../../constants/solicitud.enum';
import { DatosGeneralesDeLaSolicitudCatologo } from '../../models/solicitud.model';
import { DatosGeneralesDeLaSolicitudDatos } from '../../models/solicitud.model';
import { DatosGeneralesDeLaSolicitudRadioLista } from '../../models/solicitud.model';
import { Domicilios } from '../../models/solicitud.model';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputRadio } from '../../models/solicitud.model';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { MiembroDeLaEmpresaComponent } from '../miembro-de-la-empresa/miembro-de-la-empresa.component';
import { Modal } from 'bootstrap';
import { ModificarImmexProgramComponent } from '../modificar-immex-program/modificar-immex-program.component';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { REGEX_SOLO_NUMEROS } from '@libs/shared/data-access-user/src';
import { REG_X } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import { SECCION_SOCIOSIC_CONFIGURACION_COLUMNAS } from '../../constants/solicitud.enum';
import { SUB_CONTRATISTAS_CONFIGURACION } from '../../constants/solicitud.enum';
import { SeccionSociosIC } from '../../models/solicitud.model';
import { Solicitud31101Query } from '../../estados/solicitud31101.query';
import { Solicitud31101State } from '../../estados/solicitud31101.store';
import { Solicitud31101Store } from '../../estados/solicitud31101.store';
import { SolicitudService } from '../../services/solicitud.service';
import { SubContratistas } from '../../models/solicitud.model';
import { Subject } from 'rxjs';
import { TIPO_DE_INVERSION_CONFIGURACION_COLUMNAS } from '../../constants/solicitud.enum';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TipoDeInversion } from '../../models/solicitud.model';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
import { AgregarImmexProgramComponent } from '../agregar-immex-program/agregar-immex-program.component';

@Component({
  selector: 'app-datos-generales-de-la-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
    InputRadioComponent,
    TablaDinamicaComponent,
    NotificacionesComponent,
    MiembroDeLaEmpresaComponent,
    ModificarImmexProgramComponent,
    AgregarImmexProgramComponent
  ],
  providers: [SolicitudService],
  templateUrl: './datos-generales-de-la-solicitud.component.html',
  styleUrl: './datos-generales-de-la-solicitud.component.scss',
})
export class DatosGeneralesDeLaSolicitudComponent implements OnInit, OnDestroy {
  /** Formulario principal que contiene los datos generales */
  datosGeneralesForm!: FormGroup;

  /** Subject utilizado para destruir observables y evitar fugas de memoria */
  private destroy$: Subject<void> = new Subject<void>();

  /** Opciones para el tipo de endoso */
  // tipoDeEndosoOpcion: InputRadio = {} as InputRadio;
  /** Opciones para el tipo de garantía */
  tipoDeGarantiaOpcion: InputRadio = {} as InputRadio;
  /** Opciones para la modalidad de la garantía */
  modalidadDeLaGarantiaOpcion: InputRadio = {} as InputRadio;
  /** Opciones para el tipo de sector */
  tipoSectorOpcion: InputRadio = {} as InputRadio;
  /** Opciones de sí/no */
  sinoOpcion: InputRadio = {} as InputRadio;

  /** Catálogo de conceptos */
  conceptoLista: CatalogosSelect = {} as CatalogosSelect;
  /** Catálogo de tipos de inversión */
  tipoDeInversionLista: CatalogosSelect = {} as CatalogosSelect;

  modalidadDelProgramaIMMEX: CatalogosSelect = {} as CatalogosSelect;

  /** Tipo de selección en tabla: checkbox */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /** Configuración de columnas para la tabla de subcontratistas */
  configuracionColumnas: ConfiguracionColumna<SubContratistas>[] =
    SUB_CONTRATISTAS_CONFIGURACION;

  /** Lista de subcontratistas */
  listaDeSubcontratistas: SubContratistas[] = [] as SubContratistas[];

  /** Configuración de columnas para la sección de socios IC */
  seccionSociosICConfiguracionColumnas: ConfiguracionColumna<SeccionSociosIC>[] =
    SECCION_SOCIOSIC_CONFIGURACION_COLUMNAS;

  /** Lista de socios IC */
  listaSeccionSociosIC: SeccionSociosIC[] = [] as SeccionSociosIC[];

  /** Configuración de columnas para tipo de inversión */
  tipoDeInversionConfiguracionColumnas: ConfiguracionColumna<TipoDeInversion>[] =
    TIPO_DE_INVERSION_CONFIGURACION_COLUMNAS;

  /** Datos del tipo de inversión */
  tipoDeInversionDatos: TipoDeInversion[] = [] as TipoDeInversion[];

  /** Configuración de columnas para domicilios */
  domiciliosConfiguracionColumnas: ConfiguracionColumna<Domicilios>[] =
    DOMICILIOS_CONFIGURACION_COLUMNAS;

  /** Datos de los domicilios */
  domiciliosDatos: Domicilios[] = [] as Domicilios[];

  /** Lista de régimen aduanero */
  listaRegimenAduanero: string[] = [];

  /** Estado actual de la solicitud 31101 */
  solicitud31101State: Solicitud31101State = {} as Solicitud31101State;

  /**
   * @descripcion Notificación para mostrar mensajes al usuario.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * @description Elemento a eliminar de la tabla de pedimentos.
   */
  elementoParaEliminar!: number;

  /**
   * @description Array con los datos de los pedimentos.
   * Se utiliza para almacenar los pedimentos ingresados por el usuario.
   */
  pedimentos: Array<Pedimento> = [];

  subContratistasDatos: SubContratistas[] = [];

  /**
   * Referencia al modal para agregar mercancías.
   */
  @ViewChild('modalAgregarMiembrosEmpresa', { static: false })
  modalElement!: ElementRef;

  @ViewChild('modificarImmexProgram', { static: false })
  modificarImmexProgramElement!: ElementRef;

  /** Constructor del componente que inyecta dependencias y obtiene datos iniciales */
  constructor(
    public fb: FormBuilder,
    public solicitudService: SolicitudService,
    public solicitud31101Store: Solicitud31101Store,
    public solicitud31101Query: Solicitud31101Query
  ) {
    this.conseguirDatosGeneralesOpcionDeRadio();
    this.conseguirDatosGeneralesCatologo();
    this.conseguirListaDeSubcontratistas();
    this.conseguirRegimenAduanero();
    this.conseguirMiembrosDeLaEmpresa();
    this.conseguirTipoDeInversionDatos();
    this.conseguirDomicilios();
    this.conseguirDatosGeneralesDeLaSolicitudDatos();
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   *
   * - Crea el formulario `datosGeneralesForm` con todos sus controles y validaciones.
   * - Muchos campos están deshabilitados ya que son solo de lectura o están controlados por el estado.
   * - Se suscribe al observable `selectSolicitud$` para mantener actualizado el formulario con los datos del estado.
   * - Emite el cambio de `tipoDeEndoso` una vez que los datos se actualizan.
   */
  ngOnInit(): void {
    // Inicialización del formulario con los valores actuales del estado
    this.datosGeneralesForm = this.fb.group({
      // tipoDeEndoso: [
      //   this.solicitud31101State.tipoDeEndoso,
      //   [Validators.required],
      // ],
      tipoDeGarantia: [
        { value: this.solicitud31101State.tipoDeGarantia, disabled: false },
      ],
      modalidadDeLaGarantia: [
        {
          value: this.solicitud31101State.modalidadDeLaGarantia,
          disabled: false,
        },
      ],
      tipoSector: [
        { value: this.solicitud31101State.tipoSector, disabled: false },
      ],
      concepto: [{ value: this.solicitud31101State.concepto, disabled: false }],
      '3500': [{ value: this.solicitud31101State['3500'], disabled: false }],
      '3501': [{ value: this.solicitud31101State['3501'], disabled: false }],
      '3502': [{ value: this.solicitud31101State['3502'], disabled: false }],
      datosGeneralesRFC: [
        { value: this.solicitud31101State.datosGeneralesRFC, disabled: false },
      ],
      '3503': [{ value: this.solicitud31101State['3503'], disabled: false }],
      '3504': [{ value: this.solicitud31101State['3504'], disabled: false }],
      '3505': [{ value: this.solicitud31101State['3505'], disabled: false }],
      '3506': [{ value: this.solicitud31101State['3506'], disabled: false }],
      '3507': [{ value: this.solicitud31101State['3507'], disabled: false }],
      '3508': [{ value: this.solicitud31101State['3508'], disabled: false }],
      '3509': [{ value: this.solicitud31101State['3509'], disabled: false }],
      '3511': [{ value: this.solicitud31101State['3511'], disabled: false }],
      '3512': [{ value: this.solicitud31101State['3512'], disabled: false }],
      '3513': [{ value: this.solicitud31101State['3513'], disabled: false }],
      textoGenerico1: [
        { value: this.solicitud31101State.textoGenerico1, disabled: false },
      ],
      textoGenerico2: [
        { value: this.solicitud31101State.textoGenerico2, disabled: false },
      ],
      '3514': [{ value: this.solicitud31101State['3514'], disabled: false }],
      '3515': [{ value: this.solicitud31101State['3515'], disabled: false }],
      '3516': [{ value: this.solicitud31101State['3516'], disabled: false }],
      textoGenerico3: [
        { value: this.solicitud31101State.textoGenerico3, disabled: false },
      ],
      '3517': [{ value: this.solicitud31101State['3517'], disabled: false }],
      '3518': [{ value: this.solicitud31101State['3518'], disabled: false }],
      '3519': [{ value: this.solicitud31101State['3519'], disabled: false }],
      '3520': [{ value: this.solicitud31101State['3520'], disabled: false }],
      tipoInversion: [
        { value: this.solicitud31101State.tipoInversion, disabled: false },
        [Validators.required],
      ],
      cantidadInversion: [
        { value: this.solicitud31101State.cantidadInversion, disabled: false },
        [
          Validators.required,
          Validators.maxLength(18),
          Validators.pattern(REGEX_SOLO_NUMEROS),
        ],
      ],
      descInversion: [
        { value: this.solicitud31101State.descInversion, disabled: false },
        [Validators.required, Validators.maxLength(700)],
      ],
      '3521': [{ value: this.solicitud31101State['3521'], disabled: false }],
      '3522': [{ value: this.solicitud31101State['3522'], disabled: false }],
      claveEnumeracionD0: [
        { value: this.solicitud31101State.claveEnumeracionD0, disabled: false },
      ],
      claveEnumeracionD1: [
        { value: this.solicitud31101State.claveEnumeracionD1, disabled: false },
      ],
      claveEnumeracionD2: [
        { value: this.solicitud31101State.claveEnumeracionD2, disabled: false },
      ],
      claveEnumeracionD3: [
        { value: this.solicitud31101State.claveEnumeracionD3, disabled: false },
      ],
      claveEnumeracionH: [
        this.solicitud31101State.claveEnumeracionH,
        Validators.required,
      ],
      textoGenerico4: [
        { value: this.solicitud31101State.textoGenerico4, disabled: false },
        [Validators.required, Validators.maxLength(30)],
      ],
      textoGenerico5: [
        { value: this.solicitud31101State.textoGenerico5, disabled: false },
        [Validators.required, Validators.maxLength(30)],
      ],
      '3523': [{ value: this.solicitud31101State['3523'], disabled: false }],
      '3528': [{ value: this.solicitud31101State['3528'], disabled: false }],
      '3529': [{ value: this.solicitud31101State['3529'], disabled: false }],
      textoGenerico6: [
        { value: this.solicitud31101State.textoGenerico6, disabled: false },
        [Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS)],
      ],
      textoGenerico7: [
        { value: this.solicitud31101State.textoGenerico7, disabled: false },
        [Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS)],
      ],
      '3530': [{ value: this.solicitud31101State['3530'], disabled: false }],
      '3531': [{ value: this.solicitud31101State['3531'], disabled: false }],
      textoGenerico9: [
        { value: this.solicitud31101State.textoGenerico9, disabled: false },
        [Validators.required, Validators.maxLength(700)],
      ],
      textoGenerico10: [
        { value: this.solicitud31101State.textoGenerico10, disabled: false },
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(REG_X.SOLO_NUMEROS),
        ],
      ],
      textoGenerico11: [
        { value: this.solicitud31101State.textoGenerico11, disabled: false },
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(REG_X.SOLO_NUMEROS),
        ],
      ],
      textoGenerico12: [
        { value: this.solicitud31101State.textoGenerico12, disabled: false },
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(REG_X.SOLO_NUMEROS),
        ],
      ],
      textoGenerico13: [
        { value: this.solicitud31101State.textoGenerico13, disabled: false },
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(REG_X.SOLO_NUMEROS),
        ],
      ],
      textoGenerico14: [
        { value: this.solicitud31101State.textoGenerico14, disabled: false },
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(REG_X.SOLO_NUMEROS),
        ],
      ],
      textoGenerico15: [
        { value: this.solicitud31101State.textoGenerico15, disabled: false },
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(REG_X.SOLO_NUMEROS),
        ],
      ],
      textoGenerico16: [
        { value: this.solicitud31101State.textoGenerico16, disabled: false },
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(REG_X.SOLO_NUMEROS),
        ],
      ],
      textoGenerico17: [
        { value: this.solicitud31101State.textoGenerico17, disabled: false },
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(REG_X.SOLO_NUMEROS),
        ],
      ],
      textoGenerico18: [
        { value: this.solicitud31101State.textoGenerico18, disabled: false },
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(REG_X.SOLO_NUMEROS),
        ],
      ],
      textoGenerico19: [
        { value: this.solicitud31101State.textoGenerico19, disabled: false },
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(REG_X.SOLO_NUMEROS),
        ],
      ],
      textoGenerico20: [
        { value: this.solicitud31101State.textoGenerico20, disabled: false },
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(REG_X.SOLO_NUMEROS),
        ],
      ],
      textoGenerico21: [
        { value: this.solicitud31101State.textoGenerico21, disabled: false },
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(REG_X.SOLO_NUMEROS),
        ],
      ],
      textoGenerico22: [
        { value: this.solicitud31101State.textoGenerico22, disabled: false },
      ],
      textoGenerico23: [
        { value: this.solicitud31101State.textoGenerico23, disabled: false },
      ],
      textoGenerico24: [
        { value: this.solicitud31101State.textoGenerico24, disabled: false },
      ],
      alerta1: [this.solicitud31101State.alerta1],
      alerta2: [this.solicitud31101State.alerta2],
    });

    /**
     * Suscripción al observable del estado:
     * - Actualiza el formulario con los nuevos valores del estado.
     * - Emite el valor actualizado de `tipoDeEndoso` para notificar cambios.
     */
    this.solicitud31101Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud31101State) => {
          this.solicitud31101State = respuesta;
          this.datosGeneralesForm.patchValue({
            // tipoDeEndoso: this.solicitud31101State.tipoDeEndoso,
            tipoDeGarantia: this.solicitud31101State.tipoDeGarantia,
            modalidadDeLaGarantia:
              this.solicitud31101State.modalidadDeLaGarantia,
            tipoSector: this.solicitud31101State.tipoSector,
            concepto: this.solicitud31101State.concepto,
            '3500': this.solicitud31101State['3500'],
            '3501': this.solicitud31101State['3501'],
            '3502': this.solicitud31101State['3502'],
            datosGeneralesRFC: this.solicitud31101State.datosGeneralesRFC,
            '3503': this.solicitud31101State['3503'],
            '3504': this.solicitud31101State['3504'],
            '3505': this.solicitud31101State['3505'],
            '3506': this.solicitud31101State['3506'],
            '3507': this.solicitud31101State['3507'],
            '3508': this.solicitud31101State['3508'],
            '3509': this.solicitud31101State['3509'],
            '3511': this.solicitud31101State['3511'],
            '3512': this.solicitud31101State['3512'],
            '3513': this.solicitud31101State['3513'],
            textoGenerico1: this.solicitud31101State.textoGenerico1,
            textoGenerico2: this.solicitud31101State.textoGenerico2,
            '3514': this.solicitud31101State['3514'],
            '3515': this.solicitud31101State['3515'],
            '3516': this.solicitud31101State['3516'],
            textoGenerico3: this.solicitud31101State.textoGenerico3,
            '3517': this.solicitud31101State['3517'],
            '3518': this.solicitud31101State['3518'],
            '3519': this.solicitud31101State['3519'],
            '3520': this.solicitud31101State['3520'],
            tipoInversion: this.solicitud31101State.tipoInversion,
            cantidadInversion: this.solicitud31101State.cantidadInversion,
            descInversion: this.solicitud31101State.descInversion,
            '3521': this.solicitud31101State['3521'],
            '3522': this.solicitud31101State['3522'],
            claveEnumeracionD0: this.solicitud31101State.claveEnumeracionD0,
            claveEnumeracionD1: this.solicitud31101State.claveEnumeracionD1,
            claveEnumeracionD2: this.solicitud31101State.claveEnumeracionD2,
            claveEnumeracionD3: this.solicitud31101State.claveEnumeracionD3,
            claveEnumeracionH: this.solicitud31101State.claveEnumeracionH,
            textoGenerico4: this.solicitud31101State.textoGenerico4,
            textoGenerico5: this.solicitud31101State.textoGenerico5,
            '3523': this.solicitud31101State['3523'],
            '3528': this.solicitud31101State['3528'],
            '3529': this.solicitud31101State['3529'],
            textoGenerico6: this.solicitud31101State.textoGenerico6,
            textoGenerico7: this.solicitud31101State.textoGenerico7,
            '3530': this.solicitud31101State['3530'],
            '3531': this.solicitud31101State['3531'],
            textoGenerico9: this.solicitud31101State.textoGenerico9,
            textoGenerico10: this.solicitud31101State.textoGenerico10,
            textoGenerico11: this.solicitud31101State.textoGenerico11,
            textoGenerico12: this.solicitud31101State.textoGenerico12,
            textoGenerico13: this.solicitud31101State.textoGenerico13,
            textoGenerico14: this.solicitud31101State.textoGenerico14,
            textoGenerico15: this.solicitud31101State.textoGenerico15,
            textoGenerico16: this.solicitud31101State.textoGenerico16,
            textoGenerico17: this.solicitud31101State.textoGenerico17,
            textoGenerico18: this.solicitud31101State.textoGenerico18,
            textoGenerico19: this.solicitud31101State.textoGenerico19,
            textoGenerico20: this.solicitud31101State.textoGenerico20,
            textoGenerico21: this.solicitud31101State.textoGenerico21,
            textoGenerico22: this.solicitud31101State.textoGenerico22,
            textoGenerico23: this.solicitud31101State.textoGenerico23,
            textoGenerico24: this.solicitud31101State.textoGenerico24,
            alerta1: this.solicitud31101State.alerta1,
            alerta2: this.solicitud31101State.alerta2,
          });
        })
      )
      .subscribe();
  }

  /**
   * Obtiene los datos generales correspondientes a las opciones de tipo de radio.
   * Asigna los valores recibidos a las propiedades correspondientes del componente.
   */
  conseguirDatosGeneralesOpcionDeRadio(): void {
    this.solicitudService
      .conseguirDatosGeneralesOpcionDeRadio()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: DatosGeneralesDeLaSolicitudRadioLista) => {
          // this.tipoDeEndosoOpcion = respuesta.tipoDeEndoso;
          this.tipoDeGarantiaOpcion = respuesta.tipoDeGarantia;
          this.modalidadDeLaGarantiaOpcion = respuesta.modalidadDeLaGarantia;
          this.tipoSectorOpcion = respuesta.tipoSector;
          this.sinoOpcion = respuesta.requisitos;
        },
      });
  }

  /**
   * Obtiene los datos generales desde el catálogo.
   * Asigna los valores de concepto y tipo de inversión al componente.
   */
  conseguirDatosGeneralesCatologo(): void {
    this.solicitudService
      .conseguirDatosGeneralesCatologo()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: DatosGeneralesDeLaSolicitudCatologo) => {
          this.conceptoLista = respuesta.concepto;
          this.tipoDeInversionLista = respuesta.tipoDeInversion;
          this.modalidadDelProgramaIMMEX = respuesta.modalidadDelProgramaIMMEX;
        },
      });
  }

  /**
   * Obtiene la lista de subcontratistas.
   * Asigna la respuesta al listado de subcontratistas del componente.
   */
  conseguirListaDeSubcontratistas(): void {
    this.solicitudService
      .conseguirListaDeSubcontratistas()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: SubContratistas[]) => {
          this.listaDeSubcontratistas = respuesta;
        },
      });
  }

  /**
   * Obtiene los datos del régimen aduanero.
   * Asigna la respuesta al listado de régimen aduanero del componente.
   */
  conseguirRegimenAduanero(): void {
    this.solicitudService
      .conseguirRegimenAduanero()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: string[]) => {
          this.listaRegimenAduanero = respuesta;
        },
      });
  }

  /**
   * Obtiene la información de los miembros de la empresa.
   * Asigna los datos recibidos a la lista de socios del componente.
   */
  conseguirMiembrosDeLaEmpresa(): void {
    this.solicitudService
      .conseguirMiembrosDeLaEmpresa()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: SeccionSociosIC[]) => {
          this.listaSeccionSociosIC = respuesta;
        },
      });
  }

  /**
   * Obtiene los datos relacionados con el tipo de inversión.
   * Asigna la respuesta a la propiedad tipoDeInversionDatos del componente.
   */
  conseguirTipoDeInversionDatos(): void {
    this.solicitudService
      .conseguirTipoDeInversionDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: TipoDeInversion[]) => {
          this.tipoDeInversionDatos = respuesta;
        },
      });
  }

  /**
   * Obtiene la lista de domicilios disponibles.
   * Asigna la respuesta a la propiedad domiciliosDatos del componente.
   */
  conseguirDomicilios(): void {
    this.solicitudService
      .conseguirDomicilios()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: Domicilios[]) => {
          this.domiciliosDatos = respuesta;
        },
      });
  }
  /**
   * Obtiene los datos generales de la solicitud desde el servicio.
   * Luego, actualiza el store `solicitud31101Store` con todos los valores obtenidos.
   * Esta función centraliza y distribuye una gran cantidad de información
   * relacionada con la solicitud 31101.
   */
  conseguirDatosGeneralesDeLaSolicitudDatos(): void {
    this.solicitudService
      .conseguirDatosGeneralesDeLaSolicitudDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: DatosGeneralesDeLaSolicitudDatos) => {
          // Se actualizan múltiples propiedades en el store a partir de la respuesta del servicio
          this.solicitud31101Store.actualizarTipoDeGarantia(
            respuesta.tipoDeGarantia
          );
          this.solicitud31101Store.actualizarModalidadDeLaGarantia(
            respuesta.modalidadDeLaGarantia
          );
          this.solicitud31101Store.actualizarTipoSector(respuesta.tipoSector);
          this.solicitud31101Store.actualizarConcepto(respuesta.concepto);
          this.solicitud31101Store.actualizar3500(respuesta['3500']);
          this.solicitud31101Store.actualizar3501(respuesta['3501']);
          this.solicitud31101Store.actualizar3502(respuesta['3502']);
          this.solicitud31101Store.actualizarDatosGeneralesRFC(
            respuesta.datosGeneralesRFC
          );
          this.solicitud31101Store.actualizar3503(respuesta['3503']);
          this.solicitud31101Store.actualizar3504(respuesta['3504']);
          this.solicitud31101Store.actualizar3505(respuesta['3505']);
          this.solicitud31101Store.actualizar3506(respuesta['3506']);
          this.solicitud31101Store.actualizar3507(respuesta['3507']);
          this.solicitud31101Store.actualizar3508(respuesta['3508']);
          this.solicitud31101Store.actualizar3509(respuesta['3509']);
          this.solicitud31101Store.actualizar3511(respuesta['3511']);
          this.solicitud31101Store.actualizar3512(respuesta['3512']);
          this.solicitud31101Store.actualizar3513(respuesta['3513']);
          this.solicitud31101Store.actualizarTextoGenerico1(
            respuesta.textoGenerico1
          );
          this.solicitud31101Store.actualizarTextoGenerico2(
            respuesta.textoGenerico2
          );
          this.solicitud31101Store.actualizar3514(respuesta['3514']);
          this.solicitud31101Store.actualizar3515(respuesta['3515']);
          this.solicitud31101Store.actualizar3516(respuesta['3516']);
          this.solicitud31101Store.actualizarTextoGenerico3(
            respuesta.textoGenerico3
          );
          this.solicitud31101Store.actualizar3517(respuesta['3517']);
          this.solicitud31101Store.actualizar3518(respuesta['3518']);
          this.solicitud31101Store.actualizar3519(respuesta['3519']);
          this.solicitud31101Store.actualizar3520(respuesta['3520']);
          this.solicitud31101Store.actualizarTipoInversion(
            respuesta.tipoInversion
          );
          this.solicitud31101Store.actualizarCantidadInversion(
            respuesta.cantidadInversion
          );
          this.solicitud31101Store.actualizarDescInversion(
            respuesta.descInversion
          );
          this.solicitud31101Store.actualizar3521(respuesta['3521']);
          this.solicitud31101Store.actualizar3522(respuesta['3522']);
          this.solicitud31101Store.actualizarClaveEnumeracionD0(
            respuesta.claveEnumeracionD0
          );
          this.solicitud31101Store.actualizarClaveEnumeracionD1(
            respuesta.claveEnumeracionD1
          );
          this.solicitud31101Store.actualizarClaveEnumeracionD2(
            respuesta.claveEnumeracionD2
          );
          this.solicitud31101Store.actualizarClaveEnumeracionD3(
            respuesta.claveEnumeracionD3
          );
          this.solicitud31101Store.actualizarClaveEnumeracionH(
            respuesta.claveEnumeracionH
          );
          this.solicitud31101Store.actualizarTextoGenerico4(
            respuesta.textoGenerico4
          );
          this.solicitud31101Store.actualizarTextoGenerico5(
            respuesta.textoGenerico5
          );
          this.solicitud31101Store.actualizar3523(respuesta['3523']);
          this.solicitud31101Store.actualizar3528(respuesta['3528']);
          this.solicitud31101Store.actualizar3529(respuesta['3529']);
          this.solicitud31101Store.actualizarTextoGenerico6(
            respuesta.textoGenerico6
          );
          this.solicitud31101Store.actualizarTextoGenerico7(
            respuesta.textoGenerico7
          );
          this.solicitud31101Store.actualizar3530(respuesta['3530']);
          this.solicitud31101Store.actualizar3531(respuesta['3531']);
          this.solicitud31101Store.actualizarTextoGenerico9(
            respuesta.textoGenerico9
          );
          this.solicitud31101Store.actualizarTextoGenerico10(
            respuesta.textoGenerico10
          );
          this.solicitud31101Store.actualizarTextoGenerico11(
            respuesta.textoGenerico11
          );
          this.solicitud31101Store.actualizarTextoGenerico12(
            respuesta.textoGenerico12
          );
          this.solicitud31101Store.actualizarTextoGenerico13(
            respuesta.textoGenerico13
          );
          this.solicitud31101Store.actualizarTextoGenerico14(
            respuesta.textoGenerico14
          );
          this.solicitud31101Store.actualizarTextoGenerico15(
            respuesta.textoGenerico15
          );
          this.solicitud31101Store.actualizarTextoGenerico16(
            respuesta.textoGenerico16
          );
          this.solicitud31101Store.actualizarTextoGenerico17(
            respuesta.textoGenerico17
          );
          this.solicitud31101Store.actualizarTextoGenerico18(
            respuesta.textoGenerico18
          );
          this.solicitud31101Store.actualizarTextoGenerico19(
            respuesta.textoGenerico19
          );
          this.solicitud31101Store.actualizarTextoGenerico20(
            respuesta.textoGenerico20
          );
          this.solicitud31101Store.actualizarTextoGenerico21(
            respuesta.textoGenerico21
          );
          this.solicitud31101Store.actualizarTextoGenerico22(
            respuesta.textoGenerico22
          );
          this.solicitud31101Store.actualizarTextoGenerico23(
            respuesta.textoGenerico23
          );
          this.solicitud31101Store.actualizarTextoGenerico24(
            respuesta.textoGenerico24
          );
          this.solicitud31101Store.actualizarAlerta1(respuesta.alerta1);
          this.solicitud31101Store.actualizarAlerta2(respuesta.alerta2);
        },
      });
  }

  /**
   * Maneja el cambio del tipo de endoso desde el formulario.
   * Emite el nuevo valor y lo actualiza en el store.
   *
   * @param evento Valor seleccionado de tipo de endoso.
   */
  // getTipoDeEndoso(evento: string | number): void {
  //   this.solicitud31101Store.actualizarTipoDeEndoso(evento);
  // }

  seleccionarTipoSector(evento: string | number): void {
    this.solicitud31101Store.actualizarTipoSector(evento);
  }

  agregarRFCDatos(): void {
    if (this.datosGeneralesForm.get('datosGeneralesRFC')?.value) {
      this.listaDeSubcontratistas.push({
        rfc: this.datosGeneralesForm.get('datosGeneralesRFC')?.value,
        razonSocial: 'EUROFOODS DE MEXICO GONZALEZ PINAL',
      });
      this.datosGeneralesForm.patchValue({ datosGeneralesRFC: '' });
    }
  }

  seleccionarSubContratistasDatos(evento: SubContratistas[]): void {
    this.subContratistasDatos = evento;
  }

  eliminarRFCDatos(): void {
    const PEDIMENTO = {
      patente: 0,
      pedimento: 0,
      aduana: 0,
      idTipoPedimento: 0,
      descTipoPedimento: 'Por evaluar',
      numero: '',
      comprobanteValor: '',
      pedimentoValidado: false,
    };

    if (this.subContratistasDatos.length > 0) {
      if (this.listaDeSubcontratistas.length > 0) {
        const RFC_PARA_ELIMINAR = this.subContratistasDatos[0].rfc;

        this.listaDeSubcontratistas = this.listaDeSubcontratistas.filter(
          (subcontratista) => subcontratista.rfc !== RFC_PARA_ELIMINAR
        );

        this.subContratistasDatos = [];
        this.abrirModal('El registro seleccionado fue eliminado correctamente');
        this.pedimentos.push(PEDIMENTO);
      }
    }
  }

  /**
   * Elimina un elemento de la lista de pedimentos en la posición especificada.
   *
   * @param {number} i - El índice del elemento a eliminar.
   *
   * @remarks
   * Después de eliminar el elemento, se actualiza el título y mensaje del modal,
   * y se abre el modal para mostrar un aviso al usuario.
   */
  abrirModal(mensaje: string, i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: mensaje,
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };

    this.elementoParaEliminar = i;
  }

  /**
   * Elimina un elemento de la tabla de pedimento, si se confirma la acción.
   * @param borrar Indica si se debe proceder con la eliminación.
   * @returns {void}
   */
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  agregarMiembrosEmpresa(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  modificarImmexProgram(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(
        this.modificarImmexProgramElement.nativeElement
      );
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Finaliza todas las suscripciones observables usando el subject destroy$.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
