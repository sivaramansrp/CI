import { AlertComponent, CatalogoSelectComponent, InputCheckComponent, InputRadioComponent, REGEX_POSTAL, REGEX_TELEFONO_DIGITOS, TableBodyData, TableComponent, TituloComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { Catalogo, Solicitud103State, Tramite103Store } from '../estados/tramite103.store';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, merge, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosDelMercancia } from '../models/exencion-impuestos.model';
import { ExencionImpuestosService } from '../services/exencion-impuestos.service';
import { Modal } from 'bootstrap';
import { RADIO_OPCIONS } from '../constants/exencion-impuestos.enum';
import { Subject } from 'rxjs';
import { Tramite103Query } from '../estados/tramite103.query';
import mercanciaTable from '@libs/shared/theme/assets/json/103/mercancia-table.json';

/**
 * @componente
 * @description
 * Componente para la gestión de exención de impuestos.
 * Maneja formularios, catálogos, tablas de mercancías y modales relacionados con el trámite.
 */
@Component({
  selector: 'app-exencion-impuestos',
  standalone: true,
  imports: [
    AlertComponent,
    CatalogoSelectComponent,
    CommonModule,
    FormsModule,
    InputCheckComponent,
    InputRadioComponent,
    ReactiveFormsModule,
    TableComponent,
    TituloComponent
  ],
  templateUrl: './exencion-impuestos.component.html',
  styleUrls: ['./exencion-impuestos.component.scss']
})
export class ExencionImpuestosComponent implements OnInit, OnDestroy {
  /**
   * Formulario principal para el trámite de exención de impuestos.
   */
  tramiteForm!: FormGroup;

  /**
   * Formulario para agregar mercancías al trámite.
   */
  agregarMercanciasForm!: FormGroup;

  /**
   * Sujeto para manejar la finalización de observables al destruir el componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual de la solicitud del trámite.
   */
  public solicitudState!: Solicitud103State;

  /**
   * Encabezados de la tabla de mercancías.
   */
  public mercanciaHeaderData: string[] = [];

  /**
   * Datos del cuerpo de la tabla de mercancías.
   */
  public mercanciaBodyData: TableBodyData[] = [];

  /**
   * Datos de la tabla de mercancías obtenidos desde un archivo JSON.
   */
  public getMercanciaTableData = mercanciaTable;

  /**
   * Catálogos de fechas seleccionadas.
   */
  fechasSeleccionadas: Catalogo[] = [];

  /**
   * Lista de condiciones disponibles para la mercancía.
   */
  condicionMercancia!: Catalogo[];

  /**
   * Lista de unidades de medida disponibles.
   */
  unidadMedida!: Catalogo[];

  /**
   * Lista de años disponibles.
   */
  ano!: Catalogo[];

  /**
   * Lista de países disponibles.
   */
  pais!: Catalogo[];

  /**
   * Lista de aduanas disponibles.
   */
  aduana!: Catalogo[];

  /**
   * Lista de destinos disponibles para la mercancía.
   */
  destinoMercancia!: Catalogo[];

  /**
   * Referencia al elemento modal para agregar mercancías.
   */
  @ViewChild('modalAgregarMercancias') modalElement!: ElementRef;

  /**
   * Referencia al elemento modal de confirmación.
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
   * Datos de las mercancías registradas.
   */
  public datosDelMercancia: DatosDelMercancia[] = [];

  /**
   * Valor seleccionado en el grupo de opciones de radio.
   */
  valorSeleccionado!: string;

  /**
   * Opciones disponibles para el grupo de radio.
   */
  radioOpcions = RADIO_OPCIONS;

  /**
   * Estado actual de la consulta relacionada con el trámite.
   */
  consultaDatos!: ConsultaioState;

  /**
   * Indica si el formulario está en modo de solo lectura.
   */
  soloLectura: boolean = false;

  /**
   * Constructor del componente.
   * @param {ExencionImpuestosService} exencionImpuestoService Servicio para operaciones de exención de impuestos.
   * @param {Tramite103Store} store Almacén para el estado del trámite.
   * @param {Tramite103Query} query Consulta para el estado del trámite.
   * @param {FormBuilder} fb Constructor de formularios reactivos.
   * @param {ValidacionesFormularioService} validacionesService Servicio para validaciones de formulario.
   * @param {ConsultaioQuery} consultaioQuery Consulta para el estado de la consulta.
   */
  constructor(
    private exencionImpuestoService: ExencionImpuestosService,
    private store: Tramite103Store,
    private query: Tramite103Query,
    public fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery
  ) {}

  /**
   * Método de inicialización del componente.
   * Configura observables, inicializa catálogos y formularios.
   */
  ngOnInit(): void {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();

    this.inicializaCatalogos();
    this.obtenerEstadoSolicitud();
    this.donanteDomicilio();
    this.obtenerMercancia();
  }

  /**
   * Obtiene el estado actual de la solicitud desde el almacén.
   * @private
   */
  private obtenerEstadoSolicitud(): void {
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
  }

  /**
   * Inicializa los catálogos necesarios para el formulario.
   * @private
   */
  private inicializaCatalogos(): void {
    const ADUANA$ = this.exencionImpuestoService.getAduana().pipe(
      map((resp) => {
        this.aduana = resp.data;
      })
    );

    const DESTINO_MERCANCIA$ = this.exencionImpuestoService.getDestinoMercancia().pipe(
      map((resp) => {
        this.destinoMercancia = resp.data;
      })
    );

    const CONDICION_MERCANCIA$ = this.exencionImpuestoService.getCondicionMercancia().pipe(
      map((resp) => {
        this.condicionMercancia = resp.data;
      })
    );

    const UNIDAD_MEDIDA$ = this.exencionImpuestoService.getUnidadMedida().pipe(
      map((resp) => {
        this.unidadMedida = resp.data;
      })
    );

    const ANO$ = this.exencionImpuestoService.getAno().pipe(
      map((resp) => {
        this.ano = resp.data;
      })
    );

    const PAIS$ = this.exencionImpuestoService.getPais().pipe(
      map((resp) => {
        this.pais = resp.data;
      })
    );

    merge(ADUANA$, DESTINO_MERCANCIA$, CONDICION_MERCANCIA$, UNIDAD_MEDIDA$, ANO$, PAIS$)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe();
  }

  /**
   * Inicializa los formularios principales con valores y validaciones.
   * @private
   */
  private donanteDomicilio(): void {
    this.tramiteForm = this.fb.group({
      exencionImpuestos: this.fb.group({
        manifesto: [this.solicitudState?.manifesto, [Validators.required]],
        aduana: [this.solicitudState?.aduana, [Validators.required]],
        organismoPublico: [this.solicitudState?.organismoPublico, [Validators.required]],
        destinoMercancia: [this.solicitudState?.destinoMercancia, [Validators.required]]
      }),
      importadorExportador: this.fb.group({
        nombre: [this.solicitudState?.nombre, [Validators.required, Validators.maxLength(50)]],
        calle: [{ value: this.solicitudState?.calle, disabled: true }, [Validators.required, Validators.maxLength(80)]],
        numeroExterior: [{ value: this.solicitudState?.numeroExterior, disabled: true }, [Validators.required, Validators.maxLength(40)]],
        numeroInterior: [this.solicitudState?.numeroInterior, [Validators.maxLength(30)]],
        telefono: [this.solicitudState?.telefono, [Validators.required, Validators.pattern(REGEX_TELEFONO_DIGITOS)]],
        correoElectronico: [this.solicitudState?.correoElectronico, [Validators.required, Validators.email, Validators.maxLength(50)]],
        pais: [this.solicitudState?.pais, [Validators.required]],
        codigoPostal: [{ value: this.solicitudState?.codigoPostal, disabled: true }, [Validators.required, Validators.pattern(REGEX_POSTAL)]],
        estado: [{ value: this.solicitudState?.estado, disabled: true }, [Validators.required, Validators.maxLength(50)]],
        colonia: [{ value: this.solicitudState?.colonia, disabled: true }, [Validators.required, Validators.maxLength(50)]],
        opcion: [this.solicitudState?.opcion]
      })
    });

    this.agregarMercanciasForm = this.fb.group({
      datosMercancia: this.fb.group({
        tipoDeMercancia: [this.solicitudState?.tipoDeMercancia, [Validators.required]],
        usoEspecifico: [this.solicitudState?.usoEspecifico, [Validators.required]],
        condicionMercancia: [this.solicitudState?.condicionMercancia, [Validators.required]],
        unidadMedida: [this.solicitudState?.unidadMedida, [Validators.required]],
        vehiculo: [this.solicitudState?.vehiculo, [Validators.required]],
        ano: [this.solicitudState?.ano, [Validators.required]],
        cantidad: [this.solicitudState?.cantidad, [Validators.required]],
        marca: [this.solicitudState?.marca],
        modelo: [this.solicitudState?.modelo],
        serie: [this.solicitudState?.serie]
      })
    });
    this.inicializarEstadoFormulario();
  }

  /**
   * Obtiene el grupo de formulario para exención de impuestos.
   * @returns {FormGroup} Grupo de formulario.
   */
  get exencionImpuestos(): FormGroup {
    return this.tramiteForm.get('exencionImpuestos') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario para importador/exportador.
   * @returns {FormGroup} Grupo de formulario.
   */
  get importadorExportador(): FormGroup {
    return this.tramiteForm.get('importadorExportador') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario para datos de mercancía.
   * @returns {FormGroup} Grupo de formulario.
   */
  get datosMercancia(): FormGroup {
    return this.agregarMercanciasForm.get('datosMercancia') as FormGroup;
  }

  /**
   * Maneja la selección de aduana y actualiza el almacén.
   */
  aduanaSeleccion(): void {
    const ADUANA = this.tramiteForm.get('exencionImpuestos.aduana')?.value;
    this.store.setAduana(ADUANA);
  }

  /**
   * Maneja la selección de destino de mercancía y actualiza el almacén.
   */
  destinoMercanciaSeleccion(): void {
    const DESTINO_MERCANCIA = this.tramiteForm.get('exencionImpuestos.destinoMercancia')?.value;
    this.store.setDestinoMercancia(DESTINO_MERCANCIA);
  }

  /**
   * Maneja la selección de condición de mercancía y actualiza el almacén.
   */
  condicionMercanciaSeleccion(): void {
    const CONDICION_MERCANCIA = this.agregarMercanciasForm.get('datosMercancia.condicionMercancia')?.value;
    this.store.setCondicionMercancia(CONDICION_MERCANCIA);
  }

  /**
   * Maneja la selección de unidad de medida y actualiza el almacén.
   */
  unidadMedidaSeleccion(): void {
    const UNIDAD_MEDIDA = this.agregarMercanciasForm.get('datosMercancia.unidadMedida')?.value;
    this.store.setUnidadMedida(UNIDAD_MEDIDA);
  }

  /**
   * Maneja la selección de año y actualiza el almacén.
   */
  anoSeleccion(): void {
    const ANO = this.agregarMercanciasForm.get('datosMercancia.ano')?.value;
    this.store.setAno(ANO);
  }

  /**
   * Maneja la selección de país y actualiza el almacén.
   */
  paisSeleccion(): void {
    const PAIS = this.tramiteForm.get('importadorExportador.pais')?.value;
    this.store.setPais(PAIS);
  }

  /**
   * Maneja la selección de organismo público y actualiza el almacén.
   */
  organismoPublico(): void {
    const ORGANISMOPUBLICO = this.tramiteForm.get('exencionImpuestos.organismoPublico')?.value;
    this.store.setOrganismoPublico(ORGANISMOPUBLICO);
  }

  /**
   * Maneja la selección de vehículo y actualiza el almacén.
   */
  vehiculo(): void {
    const VEHICULO = this.agregarMercanciasForm.get('datosMercancia.vehiculo')?.value;
    this.store.setVehiculo(VEHICULO);
  }

  /**
   * Valida el formulario de destinatario marcando todos los controles como tocados si es inválido.
   */
  validarDestinatarioFormulario(): void {
    if (this.tramiteForm.invalid) {
      this.tramiteForm.markAllAsTouched();
    }
  }

  /**
   * Establece un valor en el almacén a partir de un campo de formulario.
   * @param {FormGroup} form Grupo de formulario.
   * @param {string} campo Nombre del campo.
   * @param {keyof Tramite103Store} metodoNombre Nombre del método en el almacén.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite103Store): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Abre el modal para agregar mercancías.
   */
  abrirDialogoMercancias(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Cierra el modal actualmente abierto.
   */
  cerrarModal(): void {
    if (this.closeModal) {
      this.closeModal.nativeElement.click();
    }
  }

  /**
   * Agrega mercancías al trámite si el formulario es válido.
   * Actualiza la tabla y cierra el modal.
   */
  agregarMercancias(): void {
    if (!this.agregarMercanciasForm.valid) {
      this.agregarMercanciasForm.markAllAsTouched();
    } else {
      this.exencionImpuestoService.agregarMercancias()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((respuesta) => {
          if (respuesta?.success) {
            respuesta.datos.id = this.datosDelMercancia.length + 1;
            this.datosDelMercancia.push(respuesta.datos);
            (this.store.setDelMercancia as (valor: DatosDelMercancia[]) => void)(this.datosDelMercancia);
            const DATOS = {
              tbodyData: [
                respuesta.datos.tipoDeMercancia.toString(),
                respuesta.datos.usoEspecifico.toString(),
                respuesta.datos.cantidad.toString(),
                respuesta.datos.unidadMedida,
                respuesta.datos.ano.toString(),
                respuesta.datos.modelo,
                respuesta.datos.marca,
                respuesta.datos.serie,
                respuesta.datos.condicionMercancia
              ]
            };
            this.getMercanciaTableData.mercanciaTable.tableBody.push(DATOS);
          }
          this.agregarMercanciasForm.reset();
          this.agregarMercanciasForm.markAsUntouched();
          this.agregarMercanciasForm.markAsPristine();
          this.cerrarModal();
        });
    }
  }

  /**
   * Abre el modal de confirmación si el formulario de mercancías es válido.
   */
  agregarConfirmarModal(): void {
    if (this.agregarMercanciasForm.valid === true) {
      if (this.confirmarModalElement) {
        const MODAL_INSTANCE = new Modal(this.confirmarModalElement.nativeElement);
        this.cerrarModal();
        MODAL_INSTANCE.show();
      }
    } else {
      this.agregarMercanciasForm.markAllAsTouched();
    }
  }

  /**
   * Inicializa los datos de la tabla de mercancías.
   */
  public obtenerMercancia(): void {
    this.mercanciaHeaderData = this.getMercanciaTableData?.mercanciaTable?.tableHeader;
    this.mercanciaBodyData = this.getMercanciaTableData?.mercanciaTable?.tableBody;
  }

  /**
   * Cambia el valor seleccionado en el grupo de radio y actualiza el almacén.
   * @param {string | number} value Nuevo valor seleccionado.
   */
  cambiarRadio(value: string | number): void {
    this.valorSeleccionado = value as string;
    this.store.setValorSeleccionado(this.valorSeleccionado);
  }

  /**
   * Método de limpieza al destruir el componente.
   * Finaliza observables y libera recursos.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Inicializa el estado de los formularios según el modo de solo lectura.
   * @private
   */
  private inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.tramiteForm?.disable();
      this.agregarMercanciasForm?.disable();
    } else {
      this.tramiteForm?.enable();
      this.agregarMercanciasForm?.enable();
    }
  }
}