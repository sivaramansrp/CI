import { AVISO } from '@libs/shared/data-access-user/src/tramites/constantes/aviso-privacidad.enum';
import { AlertComponent } from '@ng-mf/data-access-user';
import { Catalogo } from '../../estados/tramite11102.store';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { DatosDelMercancia } from '../../models/modificacion-donaciones-immex.model';
import { ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputCheckComponent } from '@ng-mf/data-access-user';
import { Modal } from 'bootstrap';
import { ModificacionDonacionesImmexService } from '../../services/modificacion-donaciones-immex.service';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { REGEX_POSTAL } from '@ng-mf/data-access-user';
import { REGEX_TELEFONO_DIGITOS } from '@ng-mf/data-access-user';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud11102State } from '../../estados/tramite11102.store';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { TableBodyData } from '@ng-mf/data-access-user';
import { TableComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite11102Query } from '../../estados/tramite11102.query';
import { Tramite11102Store } from '../../estados/tramite11102.store';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { map } from 'rxjs';
import mercanciaTable from '@libs/shared/theme/assets/json/11102/mercancia-table.json';
import { merge } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente que representa la funcionalidad de datos del trámite.
 */
@Component({
  selector: 'app-datos-del-tramite',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
    AlertComponent,
    TableComponent,
    InputCheckComponent,
  ],
  templateUrl: './datos-del-tramite.component.html',
  styleUrls: ['./datos-del-tramite.component.scss'],
})
export class DatosDelTramiteComponent implements OnInit, OnDestroy {
  /**
   * Suscripciones a observables.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Suscripción para obtener el catálogo de aduanas.
   */
  getAduanaIngresaraSubscription!: Subscription;

  /**
   * Suscripción para obtener el catálogo de años.
   */
  getAnoSubscription!: Subscription;

  /**
   * Suscripción para obtener el catálogo de condiciones.
   */
  getCondicionSubscription!: Subscription;

  /**
   * Suscripción para obtener el catálogo de países.
   */
  getPaisSubscription!: Subscription;

  /**
   * @var {typeof AVISO.Aviso} TEXTOS
   * @description Contiene los textos utilizados en el componente, provenientes de la constante `AVISO.Aviso`.
   * @see AVISO.Aviso
   */
  TEXTOS = AVISO.Aviso;

  /**
   * Indica si el campo de país está deshabilitado en el formulario.
   */
  isPaisDisabled: boolean = true;

  /**
   * Clase CSS utilizada para mostrar mensajes de alerta informativos en la interfaz.
   */
  infoAlert: string = 'info-alert';
  /**
   * Formulario principal del trámite.
   */
  tramiteForm!: FormGroup;

  /**
   * Formulario para agregar mercancías.
   */
  agregarMercanciasForm!: FormGroup;

  /**
   * Sujeto para manejar la destrucción de observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud11102State;

  /**
   * Encabezado de la tabla de mercancías.
   */
  public mercanciaHeaderData: string[] = [];

  /**
   * Cuerpo de la tabla de mercancías.
   */
  public mercanciaBodyData: TableBodyData[] = [{ tbodyData: [] }];

  /**
   * Datos de la tabla de mercancías.
   */
  public getMercanciaTableData = mercanciaTable;

  /**
   * Catálogos seleccionados.
   * @type {Catalogo[]}
   */
  fechasSeleccionadas: Catalogo[] = [];

  /**
   * Lista de tipos de mercancía disponibles.
   * @type {Catalogo[]}
   */
  tipoDeMercancia!: Catalogo[];

  /**
   * Lista de condiciones de mercancía disponibles.
   * @type {Catalogo[]}
   */
  condicionMercancia!: Catalogo[];

  /**
   * Lista de unidades de medida disponibles.
   * @type {Catalogo[]}
   */
  unidadMedida!: Catalogo[];

  /**
   * Lista de años disponibles.
   * @type {Catalogo[]}
   */
  ano!: Catalogo[];

  /**
   * Lista de países disponibles.
   * @type {Catalogo[]}
   */
  pais!: Catalogo[];

  /**
   * Lista de aduanas disponibles.
   * @type {Catalogo[]}
   */
  aduana!: Catalogo[];

  /**
   * Referencia al elemento del modal para agregar mercancías.
   */
  @ViewChild('modalAgregarMercancias') modalElement!: ElementRef;

  /**
   * Referencia al modal de confirmación.
   */
  @ViewChild('confirmarModal') confirmarModalElement!: ElementRef;

  /**
   * Referencia al botón para cerrar el modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * Referencia al botón para cerrar el modal de confirmación.
   */
  @ViewChild('closeConfirmarModal') closeConfirmarModal!: ElementRef;

  /**
   * Datos de las mercancías.
   */
  public datosDelMercancia: DatosDelMercancia[] = [];

  /**
   * Subject para destruir notificador.
   */
  consultaDatos!: ConsultaioState;

  /**
   * Indica si el formulario se encuentra en modo solo lectura.
   * Si es `true`, los controles del formulario estarán deshabilitados para evitar modificaciones.
   */
  esFormularioSoloLectura: boolean = false;
  /**
   * Constructor de la clase DatosDelTramiteComponent.
   *
   * @param service11102 Servicio para manejar las modificaciones de donaciones IMMEX.
   * @param store Almacén de estado específico para el trámite 11102.
   * @param query Consulta para obtener datos del estado del trámite 11102.
   * @param formBuilder Constructor de formularios reactivos.
   * @param validacionesService Servicio para realizar validaciones personalizadas en formularios.
   */
  constructor(
    private consultaioQuery: ConsultaioQuery,
    private service11102: ModificacionDonacionesImmexService,
    private store: Tramite11102Store,
    private query: Tramite11102Query,
    public formBuilder: FormBuilder,
    private validacionesService: ValidacionesFormularioService
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.esFormularioSoloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.inicializaCatalogos();

    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio();
    this.obtenerMercancia();
  }

  /**
   * Inicializa el estado del formulario según si es de solo lectura o no.
   * Si es de solo lectura, guarda los datos del formulario; de lo contrario, inicializa el formulario con los datos del donante y domicilio.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosDelFormulario();
    } else {
      this.datosDeAvisoForm();
    }
  }
  /**
   * Inicializa los catálogos necesarios para el formulario.
   */
  private inicializaCatalogos(): void {
    const ADUANA$ = this.service11102.getAduana().pipe(
      map((resp) => {
        this.aduana = resp.data;
      })
    );

    const TIPO_DE_MERCANCIA$ = this.service11102.getTipoDeMercancia().pipe(
      map((resp) => {
        this.tipoDeMercancia = resp.data;
      })
    );

    const CONDICION_MERCANCIA$ = this.service11102.getCondicionMercancia().pipe(
      map((resp) => {
        this.condicionMercancia = resp.data;
      })
    );

    const UNIDAD_MEDIDA$ = this.service11102.getUnidadMedida().pipe(
      map((resp) => {
        this.unidadMedida = resp.data;
      })
    );

    const ANO$ = this.service11102.getAno().pipe(
      map((resp) => {
        this.ano = resp.data;
      })
    );

    const PAIS$ = this.service11102.getPais().pipe(
      map((resp) => {
        this.pais = resp.data;
      })
    );

    merge(
      ADUANA$,
      TIPO_DE_MERCANCIA$,
      CONDICION_MERCANCIA$,
      UNIDAD_MEDIDA$,
      ANO$,
      PAIS$
    )
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe();
  }

  /**
   * Método que inicializa los formularios `tramiteForm` y `agregarMercanciasForm`
   * con los datos del estado de la solicitud (`solicitudState`).
   *
   * - Establece los valores iniciales de los controles del formulario.
   * - Aplica validadores de Angular para garantizar la validez de los datos ingresados.
   * - Algunos campos se inicializan como deshabilitados para evitar su edición directa.
   * - Se aplica formato específico a los campos como correo electrónico, teléfono, código postal, etc.
   * - Al finalizar, se invoca `inicializarEstadoFormulario()` para configurar el estado general del formulario.
   */
  donanteDomicilio(): void {
    this.tramiteForm = this.formBuilder.group({
      modificacionDonacionesImmex: this.formBuilder.group({
        aduana: [this.solicitudState?.aduana, [Validators.required]],
        organismoPublico: [
          { value: true, disabled: true },
          [this.solicitudState?.organismoPublico],
        ],
        usoEspecifico: [
          this.solicitudState?.usoEspecifico,
          [Validators.required, Validators.maxLength(512)],
        ],
        pais: [this.solicitudState?.pais, Validators.required],
        rfc: [this.solicitudState?.rfc, Validators.required],
        numeroProgramaImmex: [
          this.solicitudState?.numeroProgramaImmex,
          Validators.required,
        ],
        razonSocial: [
          { value: '', disabled: true },
          [this.solicitudState?.razonSocial, Validators.required],
        ],
        correoElectronicoOpcional: [
          this.solicitudState?.correoElectronicoOpcional,
          [Validators.required, Validators.email, Validators.maxLength(50)],
        ],
        telefonoOpcional: [
          this.solicitudState?.telefonoOpcional,
          [Validators.required, Validators.maxLength(30)],
        ],
        calle: [
          { value: '', disabled: true },
          this.solicitudState?.calle,
          [Validators.required, Validators.maxLength(80)],
        ],
        numeroExterior: [
          { value: '', disabled: true },
          this.solicitudState?.numeroExterior,
          [Validators.required, Validators.maxLength(40)],
        ],
        numeroInterior: [
          { value: '', disabled: true },
          this.solicitudState?.numeroInterior,
          [Validators.maxLength(30)],
        ],
        telefono: [
          { value: '', disabled: true },
          this.solicitudState?.telefono,
          [Validators.required, Validators.pattern(REGEX_TELEFONO_DIGITOS)],
        ],
        correoElectronico: [
          { value: '', disabled: true },
          this.solicitudState?.correoElectronico,
          [Validators.required, Validators.email, Validators.maxLength(50)],
        ],
        codigoPostal: [
          { value: '', disabled: true },
          this.solicitudState?.codigoPostal,
          [
            Validators.required,
            Validators.pattern(REGEX_POSTAL),
            Validators.maxLength(8),
          ],
        ],
        estado: [
          { value: '', disabled: true },
          this.solicitudState?.estado,
          [Validators.required, Validators.maxLength(80)],
        ],
        colonia: [
          { value: '', disabled: true },
          this.solicitudState?.colonia,
          [Validators.required, Validators.maxLength(50)],
        ],
      }),
    });

    this.agregarMercanciasForm = this.formBuilder.group({
      datosMercancia: this.formBuilder.group({
        tipoDeMercancia: [
          this.solicitudState?.tipoDeMercancia,
          Validators.required,
        ],
        condicionMercancia: [
          this.solicitudState?.condicionMercancia,
          Validators.required,
        ],
        unidadMedida: [this.solicitudState?.unidadMedida, Validators.required],
        ano: [this.solicitudState?.ano, Validators.required],
        cantidad: [this.solicitudState?.ano, Validators.required],
        marca: [this.solicitudState?.ano],
        modelo: [this.solicitudState?.ano],
        serie: [this.solicitudState?.ano],
      }),
    });
    this.inicializarEstadoFormulario();
  }

  /**
   * Obtiene el grupo de formulario de exención de impuestos.
   */
  get modificacionDonacionesImmex(): FormGroup {
    return this.tramiteForm.get('modificacionDonacionesImmex') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario de datos de mercancía.
   */
  get datosMercancia(): FormGroup {
    return this.tramiteForm.get('datosMercancia') as FormGroup;
  }

  /**
   * Maneja la selección de aduana.
   */
  aduanaSeleccion(): void {
    const ADUANA = this.tramiteForm.get(
      'modificacionDonacionesImmex.aduana'
    )?.value;
    this.store.setAduana(ADUANA);
  }

  /**
   * Maneja la selección del tipo de mercancía.
   */
  tipoDeMercanciaSeleccion(): void {
    const TIPO_DE_MERCANCIA = this.agregarMercanciasForm.get(
      'datosMercancia.tipoDeMercancia'
    )?.value;
    this.store.setTipoDeMercancia(TIPO_DE_MERCANCIA);
  }

  /**
   * Maneja la selección de la condición de mercancía.
   */
  condicionMercanciaSeleccion(): void {
    const CONDICION_MERCANCIA = this.agregarMercanciasForm.get(
      'datosMercancia.condicionMercancia'
    )?.value;
    this.store.setCondicionMercancia(CONDICION_MERCANCIA);
  }

  /**
   * Maneja la selección de la unidad de medida.
   */
  unidadMedidaSeleccion(): void {
    const UNIDAD_MEDIDA = this.agregarMercanciasForm.get(
      'datosMercancia.unidadMedida'
    )?.value;
    this.store.setUnidadMedida(UNIDAD_MEDIDA);
  }

  /**
   * Maneja la selección del año.
   */
  anoSeleccion(): void {
    const ANO = this.agregarMercanciasForm.get('datosMercancia.ano')?.value;
    this.store.setAno(ANO);
  }

  /**
   * Maneja la selección del país.
   */
  paisSeleccion(): void {
    const PAIS = this.tramiteForm.get(
      'modificacionDonacionesImmex.pais'
    )?.value;
    this.store.setPais(PAIS);
  }

  /**
   * Actualiza el indicador de aviso de funcionamiento en el Store.
   * @param evento - Evento que contiene el valor del indicador.
   */
  organismoPublico(): void {
    const ORGANISMOPUBLICO = this.tramiteForm.get(
      'modificacionDonacionesImmex.organismoPublico'
    )?.value;
    this.store.setOrganismoPublico(ORGANISMOPUBLICO);
  }
  /**
   * Valida el formulario de destinatario.
   */
  validarDestinatarioFormulario(): void {
    if (this.tramiteForm.invalid) {
      this.tramiteForm.markAllAsTouched();
    }
  }

  /**
   * Establece valores en el store del trámite.
   * @param form Formulario del cual se obtiene el valor.
   * @param campo Nombre del campo del formulario.
   * @param metodoNombre Nombre del método en el store.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite11102Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Cierra el modal actual.
   */
  cerrarModal(): void {
    if (this.closeModal) {
      this.closeModal.nativeElement.click();
    }
  }

  /**
   * Abre el modal de confirmación si el formulario es válido.
   */
  modificarConfirmarModal(): void {
    this.cerrarModal();
  }

  /**
   * @method modifySeleccionada
   * @description Muestra un modal utilizando la instancia de `Modal` si el elemento del modal está disponible.
   *
   * @example
   * // Supongamos que `modalElement` está definido:
   * this.modifySeleccionada();
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  modifySeleccionada(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Obtiene los datos de mercancías.
   */
  public obtenerMercancia(): void {
    this.mercanciaHeaderData =
      this.getMercanciaTableData?.mercanciaTable?.tableHeader;
    this.mercanciaBodyData =
      this.getMercanciaTableData?.mercanciaTable?.tableBody;
  }

  /**
   * Habilita o deshabilita el formulario según el modo de solo lectura.
   *
   * Si el formulario está en modo solo lectura (`esFormularioSoloLectura` es `true`),
   * deshabilita todos los controles del formulario para evitar modificaciones.
   * Si no está en modo solo lectura, habilita todos los controles del formulario para permitir la edición.
   */
  guardarDatosDelFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.tramiteForm.disable();
    } else {
      this.tramiteForm.enable();
    }
  }

  /**
   * Método que configura el formulario en modo solo lectura si la propiedad `esFormularioSoloLectura` es verdadera.
   * Se deshabilitan los campos del formulario `tramiteForm` y `agregarMercanciasForm` relacionados con el aviso de modificación de donaciones IMMEX.
   * Esto se utiliza para evitar modificaciones en un formulario que solo debe visualizarse.
   */
  datosDeAvisoForm(): void {
    if (
      this.esFormularioSoloLectura &&
      this.tramiteForm &&
      this.agregarMercanciasForm
    ) {
      this.tramiteForm.get('modificacionDonacionesImmex.aduana')?.disable();
      this.tramiteForm.get('modificacionDonacionesImmex.pais')?.disable();
      this.tramiteForm.get('modificacionDonacionesImmex.rfc')?.disable();
      this.tramiteForm
        .get('modificacionDonacionesImmex.pnumeroProgramaImmex')
        ?.disable();
      this.tramiteForm
        .get('modificacionDonacionesImmex.correoElectronicoOpcional')
        ?.disable();
      this.tramiteForm
        .get('modificacionDonacionesImmex.telefonoOpcional')
        ?.disable();
      this.tramiteForm.get('modificacionDonacionesImmex.calle')?.disable();
      this.tramiteForm
        .get('modificacionDonacionesImmex.numeroExterior')
        ?.disable();
      this.tramiteForm
        .get('modificacionDonacionesImmex.numeroInterior')
        ?.disable();
      this.tramiteForm
        .get('modificacionDonacionesImmex.correoElectronico')
        ?.disable();
      this.tramiteForm.get('modificacionDonacionesImmex.telefono')?.disable();
      this.tramiteForm.get('modificacionDonacionesImmex.estado')?.disable();
      this.tramiteForm
        .get('modificacionDonacionesImmex.codigoPostal')
        ?.disable();
      this.tramiteForm.get('modificacionDonacionesImmex.colonia')?.disable();
      this.agregarMercanciasForm
        .get('modificacionDonacionesImmex.datosMercancia.tipoDeMercancia')
        ?.disable();
      this.agregarMercanciasForm
        .get('modificacionDonacionesImmex.datosMercancia.cantidad')
        ?.disable();
      this.agregarMercanciasForm
        .get('modificacionDonacionesImmex.datosMercancia.unidadMedida')
        ?.disable();
      this.agregarMercanciasForm
        .get('modificacionDonacionesImmex.datosMercancia.ano')
        ?.disable();
      this.agregarMercanciasForm
        .get('modificacionDonacionesImmex.datosMercancia.modelo')
        ?.disable();
      this.agregarMercanciasForm
        .get('modificacionDonacionesImmex.datosMercancia.marca')
        ?.disable();
      this.agregarMercanciasForm
        .get('modificacionDonacionesImmex.datosMercancia.serie')
        ?.disable();
      this.agregarMercanciasForm
        .get('modificacionDonacionesImmex.datosMercancia.condicionMercancia')
        ?.disable();
    }
  }
  /**
   * Método que se ejecuta al destruir el componente.
   * Se utiliza para limpiar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
