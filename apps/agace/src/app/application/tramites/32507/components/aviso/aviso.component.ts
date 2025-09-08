import { AvisoTabla,AvisoTablaDatos,Catalogo,CatalogoLista } from '../../models/aviso-traslado.model';
import { CatalogoSelectComponent, REGEX_IMPORTE_PAGO, REGEX_NUMEROS,REGEX_NUMEROS_USD, REGEX_REEMPLAZAR, TablaDinamicaComponent, TablaSeleccion, TituloComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery, ConsultaioState,InputRadioComponent } from '@libs/shared/data-access-user/src';
import { RADIO_OPCIONS, TABLA_DE_DATOS_AVISO } from '../../constants/avios-procesos.enum';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { EntregaActaService } from '../../services/entrega-acta.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';
import { Notificacion } from '@libs/shared/data-access-user/src';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { Subject } from 'rxjs';
import { Tramite32507Query } from '../../../../estados/queries/tramite32507.query';
import { Tramite32507State } from '../../../../estados/tramites/tramite32507.store';
import { Tramite32507Store } from '../../../../estados/tramites/tramite32507.store';
import { Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * @component
 * @name AvisoComponent
 * @description Componente encargado de gestionar la lógica y la interacción del usuario para el manejo de avisos en el trámite 32507.
 * Este componente utiliza formularios reactivos para capturar y validar datos, y se comunica con servicios y estados para manejar la información.
 */
@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrl: './aviso.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    TablaDinamicaComponent,
    InputRadioComponent,
    CatalogoSelectComponent,
  ],
  standalone: true,
})
export class AvisoComponent implements OnInit, OnDestroy {
  /**
   * Subject para destruir notificador.
   */
  consultaDatos!: ConsultaioState;
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  soloLectura: boolean = false;

  /**
   * @property {ReplaySubject<boolean>} destroyed$
   *  @description Sujeto que emite un valor cuando el componente se destruye.
   * Se utiliza para limpiar las suscripciones y evitar fugas de memoria.
   *  @type {ReplaySubject<boolean>}
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * @property {Array} radioOpcions
   * @description Opciones de radio para seleccionar "Sí" o "No".
   */
  radioOpcions = RADIO_OPCIONS;

  /**
   * @property {boolean} esPopupAbierto
   * Indica si el popup está abierto.
   */
  esPopupAbierto: boolean = false;

  /**
   * @property {boolean} abrirPopup
   * Indica si el popup está abierto.
   * */
  abrirPopup(): void {
    this.esPopupAbierto = true;
  }

  /**
   * Referencia al elemento del modal para buscar mercancías.
   *
   * Se utiliza para abrir o cerrar el modal de búsqueda.
   */
  @ViewChild('datosAviso') datosAviso!: ElementRef;

  /**
   * Muestra el modal para cargar un archivo.
   *
   * Este método utiliza el modal de Bootstrap para mostrar el modal de carga de archivos.
   */
  datosDelAviso(): void {
    this.esPopupAbierto = true;
    if (this.datosAviso) {
      const MODAL_INSTANCE = new Modal(this.datosAviso.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * @property {FormGroup} avisoFormulario
   * @description Formulario reactivo que contiene los datos del aviso en el trámite.
   */
  avisoFormulario!: FormGroup;
  /**
   * @property {Subject<void>} destroyNotifier$
   * @description Sujeto utilizado para manejar la destrucción de suscripciones y evitar fugas de memoria.
   */
  public destroyNotifier$: Subject<void> = new Subject();
  /**
   * @property {Tramite32503State} tramiteState
   * @description Estado actual del trámite 32503, que contiene toda la información relevante del proceso.
   */
  public tramiteState!: Tramite32507State;

  /**
   * @property {Catalogo[]} optionAdace
   * @description Lista de entidades federativas cargadas desde un catálogo.
   */
  optoinAdace: Catalogo[] = [];

  /**
   * @property {TablaSeleccion} tablaSeleccion
   * @description Propiedad que representa la tabla de selección utilizada en el componente.
   */
  tablaSeleccion = TablaSeleccion;

  /**
   * @property {object} tablaDeDatos
   * @description Configuración de la tabla de datos utilizada en el componente.
   * Contiene las definiciones de las columnas (encabezados) y los datos que se mostrarán en la tabla.
   */
  tablaDeDatos: {
    encabezadas: {
      encabezado: string;
      clave: (ele: AvisoTabla) => string;
      orden: number;
    }[];
    datos: AvisoTabla[];
  } = TABLA_DE_DATOS_AVISO;

  /**
   * @property {AvisoTabla[]} filaSeleccionadaLista
   * @description Lista de filas seleccionadas en la tabla de avisos.
   * Contiene los datos de las filas seleccionadas por el usuario.
   */
  filaSeleccionadaLista: AvisoTabla[] = [];

  /**
   * @property {ElementRef} closeMercancia
   * @description Referencia al botón o elemento que cierra el modal de mercancía.
   * Utilizado para cerrar el modal de manera programática.
   */
  @ViewChild('closeMercancia') public closeMercancia!: ElementRef;

  /**
   * @property {FormGroup} mercanciaFormulario
   * @description Formulario reactivo que contiene los datos relacionados con la mercancía.
   */
  mercanciaFormulario!: FormGroup;

  avisoComponent: typeof AvisoComponent = AvisoComponent;
  /**
   * @property {Catalogo[]} fraccionArancelaria
   * @description Lista de fracciones arancelarias cargadas desde un catálogo.
   * Utilizadas para seleccionar la fracción arancelaria correspondiente a la mercancía.
   */
  fraccionArancelaria: Catalogo[] = [];

  /**
   * @property {Catalogo[]} unidadMedida
   * @description Lista de unidades de medida cargadas desde un catálogo.
   */
  unidadMedida: Catalogo[] = [];

  /**
   * @property {Notificacion} nuevaNotificacion
   * @description Notificación que se genera en el componente.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * @constructor
   * @description Constructor del componente. Se utiliza para la inyección de dependencias.
   */
  constructor(
    private fb: FormBuilder,
    public store: Tramite32507Store,
    public tramiteQuery: Tramite32507Query,
    public entregaActaService: EntregaActaService,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }
  /**
   * @method ngOnInit
   * @description Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
        })
      )
      .subscribe();
    this.inicializarFormulario();
    this.cargarLevantaActa();
    this.cargarUnidadMedida();

    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarAvisoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * @method ngOnDestroy
   * @description Método que se ejecuta al destruir el componente.
   * Se utiliza para limpiar las suscripciones y evitar fugas de memoria.
   */
  inicializarAvisoFormulario(): void {
    if (this.soloLectura) {
      this.avisoFormulario.disable();
    } else {
      this.avisoFormulario.enable();
    }
  }

  /**
   * @method setValoresStore
   * @description Método para establecer valores en el store.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite32507Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * @method inicializarFormulario
   * @description Método para inicializar los formularios reactivos del componente.
   */
  inicializarFormulario(): void {
    this.avisoFormulario = this.fb.group({
      adaceFormulario: this.fb.group({
        adace: [
          this.tramiteState?.avisoFormulario?.adace,
          [Validators.required],
        ],
      }),
      datosEmpresa: this.fb.group({
        valorProgramaImmex: [
          this.tramiteState?.avisoFormulario?.valorProgramaImmex,
          [
            Validators.required,
            Validators.maxLength(9),
            Validators.pattern(REGEX_IMPORTE_PAGO),
          ],
        ],
        valorAnioProgramaImmex: [
          this.tramiteState?.avisoFormulario?.valorAnioProgramaImmex,
          [
            Validators.required,
            Validators.maxLength(4),
            Validators.pattern(REGEX_IMPORTE_PAGO),
          ],
        ],
      }),
      datosAdace: this.fb.group({
        tipoBusqueda: [this.tramiteState?.avisoFormulario?.tipoBusqueda],
        levantaActa: [
          this.tramiteState?.avisoFormulario?.levantaActa,
          [Validators.required],
        ],
      }),

      adaceForm: this.fb.group({
        transaccionId: [this.tramiteState.avisoFormulario?.transaccionId],
        cantidad: [
          this.tramiteState.avisoFormulario?.cantidad,
          [Validators.required, Validators.pattern(REGEX_NUMEROS_USD)],
        ],
        peso: [
          this.tramiteState.avisoFormulario?.peso,
          [Validators.required, Validators.pattern(REGEX_NUMEROS)],
        ],
        unidadMedida: [
          this.tramiteState.avisoFormulario?.unidadMedida,
          [Validators.required],
        ],
        descripcion: [
          this.tramiteState.avisoFormulario?.descripcion,
          [Validators.required],
        ],
      }),
    });
    this.inicializarAvisoFormulario();
  }

  /**
   *  @method get adaceForm
   * @description
   */
  get adaceForm(): FormGroup {
    return this.avisoFormulario.get('adaceForm') as FormGroup;
  }

  /**
   *  @method get adaceFormulario
   * @description Método para obtener el formulario `adaceFormulario` del formulario principal `avisoFormulario`.
   */
  get adaceFormulario(): FormGroup {
    return this.avisoFormulario.get('adaceFormulario') as FormGroup;
  }

  /**
   * @method get datosEmpresa
   *  @description Método para obtener el formulario `datosEmpresa` del formulario principal `avisoFormulario`.
   */
  get datosEmpresa(): FormGroup {
    return this.avisoFormulario.get('datosEmpresa') as FormGroup;
  }

  /**
   * @method get datosAdace
   * @description Método para obtener el formulario `datosAdace` del formulario principal `avisoFormulario`.
   */
  get datosAdace(): FormGroup {
    return this.avisoFormulario.get('datosAdace') as FormGroup;
  }

  /**
   * @method abrirModalMercancia
   * @description Método para abrir el modal de mercancía.
   */
  static sanitizeAlphanumeric(form: FormGroup, control: string, event: Event): void {
    const INPUT = event?.target as HTMLInputElement;
    const REEMPLAZAR = INPUT?.value.replace(REGEX_REEMPLAZAR, '');
    form.get(control)?.setValue(REEMPLAZAR, { emitEvent: false });
  }

  /**
   *
   * @param form
   * @param field
   * @returns
   */
  isValid(form: FormGroup, field: string): boolean | null {
    return this.validacionesService.isValid(form, field);
  }

  /**
   *
   * @param evento
   */
  filaSeleccionada(evento: AvisoTabla[]): void {
    this.filaSeleccionadaLista = evento;
  }

  /**
   * @method cargarFederativa
   * @description Método para cargar la lista de entidades federativas desde el servicio `avisoTrasladoService`.
   * Los datos obtenidos se asignan a la propiedad `entidadFederativa`.
   *
   * @returns {void}
   */
  public cargarLevantaActa(): void {
    this.entregaActaService
      .obtenerLevantaActa()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.optoinAdace = datos.datos;
      });
  }

  /**
   * @method cargarUnidadMedida
   * @description Método para cargar la lista de unidades de medida desde el servicio `avisoTrasladoService`.
   * Los datos obtenidos se asignan a la propiedad `unidadMedida`.
   *
   * @returns {void}
   */
  public cargarUnidadMedida(): void {
    this.entregaActaService
      .obtenerUnidadMedida()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.unidadMedida = datos.datos;
      });
  }

  /**
   * @method eliminarDomicilio
   * @description Método para eliminar las filas seleccionadas de la tabla de datos.
   */
  eliminarDomicilio(): void {
    this.tablaDeDatos.datos = this.tablaDeDatos.datos.filter(
      (ele) => !this.filaSeleccionadaLista.includes(ele)
    );
    this.filaSeleccionadaLista = [];
  }

  /**
   * @method ngOnDestroy
   * @description Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   *
   * - Completa el `Subject` `destroyNotifier$` para cancelar todas las suscripciones activas y evitar fugas de memoria.
   *
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * @method agregarMercancia
   * @description Método para agregar mercancías a la tabla de mercancías.
   *
   * - Valida el formulario de mercancías y agrega los datos a la tabla si es válido.
   * - Cierra el modal de mercancía.
   *
   * @returns {void}
   */
  agregarMercancia(): void {
    if (this.adaceForm.valid) {
      const FORM_VALUES = this.adaceForm.value;
      
      // Obtener la descripción de la unidad de medida desde el catálogo
      const UNIDAD_SELECCIONADA = this.unidadMedida.find(
        unidad => unidad.id === parseInt(FORM_VALUES.unidadMedida, 10)
      );
      
      // Crear nuevo registro para la tabla
      const NUEVO_REGISTRO: AvisoTabla = {
        idTransaccionVUCEM: FORM_VALUES.transaccionId || '',
        cantidad: FORM_VALUES.cantidad || '',
        pesoKg: FORM_VALUES.peso || '',
        descripcionUnidadMedida: UNIDAD_SELECCIONADA?.descripcion || '',
        descripcion: FORM_VALUES.descripcion || ''
      };
      
      // Agregar el nuevo registro a la tabla creando una nueva referencia del array
      this.tablaDeDatos.datos = [...this.tablaDeDatos.datos, NUEVO_REGISTRO];
      
      // Limpiar el formulario
      this.adaceForm.reset();
      
      // Cerrar el modal
      this.closeMercancia.nativeElement.click();
      this.esPopupAbierto = false;
    } else {
      // Marcar todos los campos como tocados para mostrar errores de validación
      Object.keys(this.adaceForm.controls).forEach(key => {
        this.adaceForm.get(key)?.markAsTouched();
      });
    }
  }

  /**
   * @method eliminarMercancia
   * @description Método para eliminar las filas seleccionadas de la tabla de mercancías.
   */
  eliminarMercancia(): void {
    // Crear una nueva referencia del array filtrado para que el componente detecte el cambio
    this.tablaDeDatos.datos = this.tablaDeDatos.datos.filter(
      (ele) => !this.filaSeleccionadaLista.includes(ele)
    );
    this.filaSeleccionadaLista = [];
  }

  /**
   * @method cargarMercanciaTabla
   * @description Método para cargar los datos de la tabla de mercancías desde el servicio `avisoTrasladoService`.
   * Los datos obtenidos se asignan a la propiedad `tablaDeMercancia.datos`.
   *
   * @returns {void}
   */
  public cargarMercanciaTabla(): void {
    this.entregaActaService
      .obtenerAvisoTabla()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: AvisoTablaDatos) => {
        this.tablaDeDatos.datos = datos.datos;
      });
  }
}
