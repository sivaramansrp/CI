import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { DatosGeneralesDeLaSolicitudCatologo } from '../../models/solicitud.model';
import { DatosGeneralesDeLaSolicitudDatos } from '../../models/solicitud.model';
import { DatosGeneralesDeLaSolicitudRadioLista } from '../../models/solicitud.model';
import { Domicilios } from '../../models/solicitud.model';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputRadio } from '../../models/solicitud.model';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { REGEX_SOLO_NUMEROS } from '@libs/shared/data-access-user/src';
import { REG_X } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import { SeccionSociosIC } from '../../models/solicitud.model';
import { Solicitud31301Query } from '../../estados/solicitud31301.query';
import { Solicitud31301State } from '../../estados/solicitud31301.store';
import { Solicitud31301Store } from '../../estados/solicitud31301.store';
import { SolicitudService } from '../../services/solicitud.service';
import { SubContratistas } from '../../models/solicitud.model';
import { Subject } from 'rxjs';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TipoDeInversion } from '../../models/solicitud.model';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
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
  tipoDeEndosoOpcion: InputRadio = {} as InputRadio;
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

  /** Tipo de selección en tabla: checkbox */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /** Configuración de columnas para la tabla de subcontratistas */
  configuracionColumnas: ConfiguracionColumna<SubContratistas>[] = [
    {
      encabezado: 'RFC',
      clave: (item: SubContratistas) => item.rfc,
      orden: 1,
    },
    {
      encabezado: 'Nombre / Razón social',
      clave: (item: SubContratistas) => item.razonSocial,
      orden: 2,
    },
  ];

  /** Lista de subcontratistas */
  listaDeSubcontratistas: SubContratistas[] = [] as SubContratistas[];

  /** Configuración de columnas para la sección de socios IC */
  seccionSociosICConfiguracionColumnas: ConfiguracionColumna<SeccionSociosIC>[] =
    [
      {
        encabezado: 'Tipo de Persona',
        clave: (item: SeccionSociosIC) => item.tipoPersonaMuestra,
        orden: 1,
      },
      {
        encabezado: 'Nombre',
        clave: (item: SeccionSociosIC) => item.nombreCompleto,
        orden: 1,
      },
      {
        encabezado: 'RFC',
        clave: (item: SeccionSociosIC) => item.rfc,
        orden: 1,
      },
      {
        encabezado: 'En su carácter de',
        clave: (item: SeccionSociosIC) => item.caracterDe,
        orden: 1,
      },
      {
        encabezado: 'Obligado a tributar en México',
        clave: (item: SeccionSociosIC) => item.tributarMexico,
        orden: 1,
      },
      {
        encabezado: 'Nombre de la empresa',
        clave: (item: SeccionSociosIC) => item.nombreEmpresa,
        orden: 1,
      },
    ];

  /** Lista de socios IC */
  listaSeccionSociosIC: SeccionSociosIC[] = [] as SeccionSociosIC[];

  /** Configuración de columnas para tipo de inversión */
  tipoDeInversionConfiguracionColumnas: ConfiguracionColumna<TipoDeInversion>[] =
    [
      {
        encabezado: 'Tipo de inversión',
        clave: (item: TipoDeInversion) => item.tipoInversion,
        orden: 1,
      },
      {
        encabezado: 'Descripción general',
        clave: (item: TipoDeInversion) => item.descripcion,
        orden: 1,
      },
      {
        encabezado: 'Valor en moneda nacional',
        clave: (item: TipoDeInversion) => item.valor,
        orden: 1,
      },
    ];

  /** Datos del tipo de inversión */
  tipoDeInversionDatos: TipoDeInversion[] = [] as TipoDeInversion[];

  /** Configuración de columnas para domicilios */
  domiciliosConfiguracionColumnas: ConfiguracionColumna<Domicilios>[] = [
    {
      encabezado: 'Instalaciones principales',
      clave: (item: Domicilios) => item.instalacionPrincipal,
      orden: 1,
    },
    {
      encabezado: 'Tipo de instalación',
      clave: (item: Domicilios) => item.tipoInstalacion,
      orden: 1,
    },
    {
      encabezado: 'Entidad federativa',
      clave: (item: Domicilios) => item.entidadFederativa,
      orden: 1,
    },
    {
      encabezado: 'Municipio o delegación',
      clave: (item: Domicilios) => item.municipioDelegacion,
      orden: 1,
    },
    {
      encabezado: 'Colonia, calle y número',
      clave: (item: Domicilios) => item.direccion,
      orden: 1,
    },
    {
      encabezado: 'Código postal',
      clave: (item: Domicilios) => item.codigoPostal,
      orden: 1,
    },
    {
      encabezado: 'Registro an SE/SAT',
      clave: (item: Domicilios) => item.registroSESAT,
      orden: 1,
    },
    {
      encabezado: 'Proceso Productivo',
      clave: (item: Domicilios) => item.procesoProductivo,
      orden: 1,
    },
    {
      encabezado: 'Estatus',
      clave: (item: Domicilios) => item.estatus,
      orden: 1,
    },
  ];

  /** Datos de los domicilios */
  domiciliosDatos: Domicilios[] = [] as Domicilios[];

  /** Lista de régimen aduanero */
  listaRegimenAduanero: string[] = [];

  /** Estado actual de la solicitud 31301 */
  solicitud31301State: Solicitud31301State = {} as Solicitud31301State;

  /** Emisor del evento de cambio en el tipo de endoso */
  @Output() tipoDeEndosoChanges = new EventEmitter();

  /** Constructor del componente que inyecta dependencias y obtiene datos iniciales */
  constructor(
    public fb: FormBuilder,
    public solicitudService: SolicitudService,
    public solicitud31301Store: Solicitud31301Store,
    public solicitud31301Query: Solicitud31301Query
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
      // Campo editable con validación requerida
      tipoDeEndoso: [
        this.solicitud31301State.tipoDeEndoso,
        [Validators.required],
      ],

      // Campos deshabilitados, solamente de lectura
      tipoDeGarantia: [
        { value: this.solicitud31301State.tipoDeGarantia, disabled: true },
      ],
      modalidadDeLaGarantia: [
        {
          value: this.solicitud31301State.modalidadDeLaGarantia,
          disabled: true,
        },
      ],
      tipoSector: [
        { value: this.solicitud31301State.tipoSector, disabled: true },
      ],
      concepto: [{ value: this.solicitud31301State.concepto, disabled: true }],
      // ... (todos los demás campos siguen el mismo patrón)

      // Campos con validaciones específicas
      tipoInversion: [
        { value: this.solicitud31301State.tipoInversion, disabled: true },
        [Validators.required],
      ],
      cantidadInversion: [
        { value: this.solicitud31301State.cantidadInversion, disabled: true },
        [
          Validators.required,
          Validators.maxLength(18),
          Validators.pattern(REGEX_SOLO_NUMEROS),
        ],
      ],
      descInversion: [
        { value: this.solicitud31301State.descInversion, disabled: true },
        [Validators.required, Validators.maxLength(700)],
      ],

      // Campos con validaciones de texto numérico limitado
      textoGenerico4: [
        { value: this.solicitud31301State.textoGenerico4, disabled: true },
        [Validators.required, Validators.maxLength(30)],
      ],
      textoGenerico5: [
        { value: this.solicitud31301State.textoGenerico5, disabled: true },
        [Validators.required, Validators.maxLength(30)],
      ],
      textoGenerico6: [
        { value: this.solicitud31301State.textoGenerico6, disabled: true },
        [Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS)],
      ],
      // ... (continúa con los textoGenerico7 a textoGenerico21)

      // Campos sin validación
      textoGenerico22: [
        { value: this.solicitud31301State.textoGenerico22, disabled: true },
      ],
      textoGenerico23: [
        { value: this.solicitud31301State.textoGenerico23, disabled: true },
      ],
      textoGenerico24: [
        { value: this.solicitud31301State.textoGenerico24, disabled: true },
      ],

      // Campos de alerta sin validación
      alerta1: [this.solicitud31301State.alerta1],
      alerta2: [this.solicitud31301State.alerta2],
    });

    /**
     * Suscripción al observable del estado:
     * - Actualiza el formulario con los nuevos valores del estado.
     * - Emite el valor actualizado de `tipoDeEndoso` para notificar cambios.
     */
    this.solicitud31301Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud31301State) => {
          this.solicitud31301State = respuesta;
          this.datosGeneralesForm.patchValue({
            tipoDeEndoso: this.solicitud31301State.tipoDeEndoso,
            tipoDeGarantia: this.solicitud31301State.tipoDeGarantia,
            modalidadDeLaGarantia:
              this.solicitud31301State.modalidadDeLaGarantia,
            tipoSector: this.solicitud31301State.tipoSector,
            concepto: this.solicitud31301State.concepto,
            // ... (todos los demás campos también se actualizan aquí)

            alerta1: this.solicitud31301State.alerta1,
            alerta2: this.solicitud31301State.alerta2,
          });

          // Emitimos el nuevo tipo de endoso seleccionado
          this.tipoDeEndosoChanges.emit(this.solicitud31301State.tipoDeEndoso);
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
          this.tipoDeEndosoOpcion = respuesta.tipoDeEndoso;
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
   * Luego, actualiza el store `solicitud31301Store` con todos los valores obtenidos.
   * Esta función centraliza y distribuye una gran cantidad de información
   * relacionada con la solicitud 31301.
   */
  conseguirDatosGeneralesDeLaSolicitudDatos(): void {
    this.solicitudService
      .conseguirDatosGeneralesDeLaSolicitudDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: DatosGeneralesDeLaSolicitudDatos) => {
          // Se actualizan múltiples propiedades en el store a partir de la respuesta del servicio
          this.solicitud31301Store.actualizarTipoDeEndoso(
            respuesta.tipoDeEndoso
          );
          this.solicitud31301Store.actualizarTipoDeGarantia(
            respuesta.tipoDeGarantia
          );
          this.solicitud31301Store.actualizarModalidadDeLaGarantia(
            respuesta.modalidadDeLaGarantia
          );
          this.solicitud31301Store.actualizarTipoSector(respuesta.tipoSector);
          this.solicitud31301Store.actualizarConcepto(respuesta.concepto);
          this.solicitud31301Store.actualizar3500(respuesta['3500']);
          this.solicitud31301Store.actualizar3501(respuesta['3501']);
          this.solicitud31301Store.actualizar3502(respuesta['3502']);
          this.solicitud31301Store.actualizarDatosGeneralesRFC(
            respuesta.datosGeneralesRFC
          );
          this.solicitud31301Store.actualizar3503(respuesta['3503']);
          this.solicitud31301Store.actualizar3504(respuesta['3504']);
          this.solicitud31301Store.actualizar3505(respuesta['3505']);
          this.solicitud31301Store.actualizar3506(respuesta['3506']);
          this.solicitud31301Store.actualizar3507(respuesta['3507']);
          this.solicitud31301Store.actualizar3508(respuesta['3508']);
          this.solicitud31301Store.actualizar3509(respuesta['3509']);
          this.solicitud31301Store.actualizar3511(respuesta['3511']);
          this.solicitud31301Store.actualizar3512(respuesta['3512']);
          this.solicitud31301Store.actualizar3513(respuesta['3513']);
          this.solicitud31301Store.actualizarTextoGenerico1(
            respuesta.textoGenerico1
          );
          this.solicitud31301Store.actualizarTextoGenerico2(
            respuesta.textoGenerico2
          );
          this.solicitud31301Store.actualizar3514(respuesta['3514']);
          this.solicitud31301Store.actualizar3515(respuesta['3515']);
          this.solicitud31301Store.actualizar3516(respuesta['3516']);
          this.solicitud31301Store.actualizarTextoGenerico3(
            respuesta.textoGenerico3
          );
          this.solicitud31301Store.actualizar3517(respuesta['3517']);
          this.solicitud31301Store.actualizar3518(respuesta['3518']);
          this.solicitud31301Store.actualizar3519(respuesta['3519']);
          this.solicitud31301Store.actualizar3520(respuesta['3520']);
          this.solicitud31301Store.actualizarTipoInversion(
            respuesta.tipoInversion
          );
          this.solicitud31301Store.actualizarCantidadInversion(
            respuesta.cantidadInversion
          );
          this.solicitud31301Store.actualizarDescInversion(
            respuesta.descInversion
          );
          this.solicitud31301Store.actualizar3521(respuesta['3521']);
          this.solicitud31301Store.actualizar3522(respuesta['3522']);
          this.solicitud31301Store.actualizarClaveEnumeracionD0(
            respuesta.claveEnumeracionD0
          );
          this.solicitud31301Store.actualizarClaveEnumeracionD1(
            respuesta.claveEnumeracionD1
          );
          this.solicitud31301Store.actualizarClaveEnumeracionD2(
            respuesta.claveEnumeracionD2
          );
          this.solicitud31301Store.actualizarClaveEnumeracionD3(
            respuesta.claveEnumeracionD3
          );
          this.solicitud31301Store.actualizarClaveEnumeracionH(
            respuesta.claveEnumeracionH
          );
          this.solicitud31301Store.actualizarTextoGenerico4(
            respuesta.textoGenerico4
          );
          this.solicitud31301Store.actualizarTextoGenerico5(
            respuesta.textoGenerico5
          );
          this.solicitud31301Store.actualizar3523(respuesta['3523']);
          this.solicitud31301Store.actualizar3528(respuesta['3528']);
          this.solicitud31301Store.actualizar3529(respuesta['3529']);
          this.solicitud31301Store.actualizarTextoGenerico6(
            respuesta.textoGenerico6
          );
          this.solicitud31301Store.actualizarTextoGenerico7(
            respuesta.textoGenerico7
          );
          this.solicitud31301Store.actualizar3530(respuesta['3530']);
          this.solicitud31301Store.actualizar3531(respuesta['3531']);
          this.solicitud31301Store.actualizarTextoGenerico9(
            respuesta.textoGenerico9
          );
          this.solicitud31301Store.actualizarTextoGenerico10(
            respuesta.textoGenerico10
          );
          this.solicitud31301Store.actualizarTextoGenerico11(
            respuesta.textoGenerico11
          );
          this.solicitud31301Store.actualizarTextoGenerico12(
            respuesta.textoGenerico12
          );
          this.solicitud31301Store.actualizarTextoGenerico13(
            respuesta.textoGenerico13
          );
          this.solicitud31301Store.actualizarTextoGenerico14(
            respuesta.textoGenerico14
          );
          this.solicitud31301Store.actualizarTextoGenerico15(
            respuesta.textoGenerico15
          );
          this.solicitud31301Store.actualizarTextoGenerico16(
            respuesta.textoGenerico16
          );
          this.solicitud31301Store.actualizarTextoGenerico17(
            respuesta.textoGenerico17
          );
          this.solicitud31301Store.actualizarTextoGenerico18(
            respuesta.textoGenerico18
          );
          this.solicitud31301Store.actualizarTextoGenerico19(
            respuesta.textoGenerico19
          );
          this.solicitud31301Store.actualizarTextoGenerico20(
            respuesta.textoGenerico20
          );
          this.solicitud31301Store.actualizarTextoGenerico21(
            respuesta.textoGenerico21
          );
          this.solicitud31301Store.actualizarTextoGenerico22(
            respuesta.textoGenerico22
          );
          this.solicitud31301Store.actualizarTextoGenerico23(
            respuesta.textoGenerico23
          );
          this.solicitud31301Store.actualizarTextoGenerico24(
            respuesta.textoGenerico24
          );
          this.solicitud31301Store.actualizarAlerta1(respuesta.alerta1);
          this.solicitud31301Store.actualizarAlerta2(respuesta.alerta2);
        },
      });
  }

  /**
   * Maneja el cambio del tipo de endoso desde el formulario.
   * Emite el nuevo valor y lo actualiza en el store.
   *
   * @param evento Valor seleccionado de tipo de endoso.
   */
  getTipoDeEndoso(evento: string | number): void {
    this.tipoDeEndosoChanges.emit(evento);
    this.solicitud31301Store.actualizarTipoDeEndoso(evento);
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
