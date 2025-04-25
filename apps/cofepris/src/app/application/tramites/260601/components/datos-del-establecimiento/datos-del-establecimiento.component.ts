import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, map, merge, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

import { AvisoSanitarioState, Tramite260601Store } from '../../../../estados/tramites/tramite260601.store';
import { CATALOGOS_ID, OPCIONES_DE_BOTON_DE_RADIO } from '../../constantes/aviso-enum';
import { CatalogoSelectComponent, InputCheckComponent, InputRadioComponent, TableBodyData, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Manifiestos, ManifiestosRespuesta } from '../../models/aviso-model';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { Catalogo } from '@ng-mf/data-access-user';
import { DatosMercanciaComponent } from '../datos-mercancia/datos-mercancia.component';
import { Modal } from 'bootstrap';
import { RepresentanteLegalComponent } from '../representante-legal/representante-legal.component';
import { Tramite260601Query } from '../../../../estados/queries/tramite260601.query';
import productoTable from '@libs/shared/theme/assets/json/260601/producto-table.json';
import scianTable from '@libs/shared/theme/assets/json/260601/scian-table.json';

/**
 * Componente para gestionar el datos del establecimiento.
 */
@Component({
  selector: 'app-datos-del-establecimiento',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
    TableComponent,
    InputCheckComponent,
    DatosMercanciaComponent,
    InputRadioComponent,
    RepresentanteLegalComponent
  ],
  providers: [AvisoSanitarioService],
  templateUrl: './datos-del-establecimiento.component.html',
  styleUrl: './datos-del-establecimiento.component.css',
})
/*eslint class-methods-use-this: ["error", { "exceptMethods": ["enCambioDeValor", "abrirDialogoAgregarDatosSCIAN", "agregarAgente", "limpiarDatosSCIAN", "agregarDatosSCIAN"] }] */
export class DatosDelEstablecimientoComponent implements OnInit, OnDestroy {
  /**
   * Formulario principal para los datos del establecimiento.
   */
  datosDelEstablecimientoForm!: FormGroup;

  /**
   * Formulario para los datos del domicilio del establecimiento.
   */
  domicilloDelEstablecimientoForm!: FormGroup;

  /**
   * Formulario para los datos SCIAN.
   */
  scianForm!: FormGroup;

  /**
   * Formulario para los manifiestos relacionados con el establecimiento.
   */
  manifiestosForm!: FormGroup;

  /**
   * Subject para destruir las suscripciones.
   */
  private destruirNotificador$: Subject<void> = new Subject();

  /**
   * Catálogo de estados disponibles.
   */
  estado!: Catalogo[];

  /**
   * Catálogo de claves SCIAN.
   */
  claveScian!: Catalogo[];

  /**
   * Catálogo de descripciones SCIAN.
   */
  descripcionScian!: Catalogo[];

  /**
   * Catálogo de regímenes fiscales disponibles.
   */
  regimenes!: Catalogo[];

  /**
   * Catálogo de aduanas disponibles.
   */
  aduanas!: Catalogo[];

  /**
   * Estado actual del aviso sanitario.
   */
  public avisoSanitarioState!: AvisoSanitarioState;

  /**
   * Cabeceras de la tabla de SCIAN.
   */
  public scianHeaderData: string[] = [];

  /**
   * Cuerpo de datos de la tabla SCIAN.
   */
  public scianBodyData: TableBodyData[] = [];

  /**
   * Cabeceras de la tabla de productos.
   */
  public productoHeaderData: string[] = [];

  /**
   * Cuerpo de datos de la tabla de productos.
   */
  public productoBodyData: TableBodyData[] = [];

  /**
   * Datos de la tabla SCIAN desde un archivo JSON.
   */
  public getSCIANTableData = scianTable;

  /**
   * Datos de la tabla de productos desde un archivo JSON.
   */
  public getProductoTableData = productoTable;

  /**
   * Estado del modal.
   */
  modal: string = 'modal';

  /**
   * Referencia al elemento del modal.
   */
  @ViewChild('modalAlerta') modalElement!: ElementRef;

  /**
   * Referencia al botón de cerrar el modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * Indica si el estado del formulario está habilitado.
   */
  habilitarEstado: boolean = true;

  /**
    * Lista de manifiestos obtenidos desde el servicio.
    */
  manifiestos: Manifiestos[] = [];

  /**
   * Opciones de botón de radio.
   */
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;

  /**
   * Constructor del componente. Utilizado para inyectar servicios necesarios.
   * 
   * @param fb FormBuilder para construir formularios reactivos.
   * @param avisoSanitarioService Servicio para gestionar datos del aviso sanitario.
   * @param tramite260601Store Store para manejar el estado del trámite.
   * @param tramite260601Query Query para observar cambios en el estado del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private avisoSanitarioService: AvisoSanitarioService,
    private tramite260601Store: Tramite260601Store,
    private tramite260601Query: Tramite260601Query
  ) {
    // El constructor se utiliza para la inyección de dependencias.    
  }

  /**
   * Método de inicialización que configura formularios, catálogos y suscripciones.
   */
  ngOnInit(): void {
    this.inicializaCatalogos();

    this.obtenerManifiestos();

    this.tramite260601Query.selectSeccionState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.avisoSanitarioState = seccionState;
        })
      )
      .subscribe();

    // Inicializar el formulario principal
    this.crearFormulario();

    this.obtenerSCIAN();
    this.obtenerProducto();

    this.estadoSeleccion();
    this.claveScianSeleccion();
    this.regimenesSeleccion();
    this.aduanaSeleccion();
  }

  /**
   * Crea y configura los formularios principales y sus validaciones.
   */
  crearFormulario(): void {
    this.datosDelEstablecimientoForm = this.fb.group({
      RFCResponsableSanitario: [
        { value: this.avisoSanitarioState?.RFCResponsableSanitario, disabled: true }
      ],
      razonSocial: [
        { value: this.avisoSanitarioState?.razonSocial, disabled: true },
        Validators.required
      ],
      correoElectronico: [
        { value: this.avisoSanitarioState?.correoElectronico, disabled: true },
        [
          Validators.maxLength(320)
        ]
      ]
    });
    this.domicilloDelEstablecimientoForm = this.fb.group({
      codigoPostal: [
        { value: this.avisoSanitarioState?.codigoPostal, disabled: true },
        [
          Validators.required,
          Validators.maxLength(12)
        ]
      ],
      cveEstado: [
        { value: this.avisoSanitarioState?.cveEstado, disabled: true }
      ],
      descripcionMunicipio: [
        { value: this.avisoSanitarioState?.descripcionMunicipio, disabled: true },
        [
          Validators.required,
          Validators.maxLength(120)
        ]
      ],
      informacionExtra: [
        { value: this.avisoSanitarioState?.informacionExtra, disabled: true },
        [
          Validators.required,
          Validators.maxLength(120)
        ]
      ],
      descripcionColonia: [
        { value: this.avisoSanitarioState?.descripcionColonia, disabled: true },
        [
          Validators.required,
          Validators.maxLength(120)
        ]
      ],
      calle: [
        { value: this.avisoSanitarioState?.calle, disabled: true },
        [
          Validators.required,
          Validators.maxLength(90)
        ]
      ],
      lada: [
        { value: this.avisoSanitarioState?.lada, disabled: true }
      ],
      telefono: [
        { value: this.avisoSanitarioState?.telefono, disabled: true },
        [
          Validators.required,
          Validators.maxLength(30)
        ]
      ],
      avisoFuncionamiento: [
        this.avisoSanitarioState?.avisoFuncionamiento
      ],
      cveRegimenes: [
        this.avisoSanitarioState?.cveRegimenes,
        [Validators.required]
      ],
      cveAduanas: [
        this.avisoSanitarioState?.cveAduanas,
        [Validators.required]
      ]
    });
    this.scianForm = this.fb.group({
      cveSCIAN: [
        this.avisoSanitarioState?.cveSCIAN,
        [Validators.required]
      ],
      cveSCIANDescripcion: [
        { value: this.avisoSanitarioState?.cveSCIANDescripcion, disabled: true }
      ],
    });
    this.manifiestosForm = this.fb.group({
      seleccionadaManifiesto:
        this.fb.array(this.avisoSanitarioState?.seleccionadaManifiesto),
      informacionConfidencial: [
        this.avisoSanitarioState?.informacionConfidencial,
        Validators.required
      ]
    });
  }

  /**
   * Obtiene el FormArray correspondiente a 'seleccionadaManifiesto' dentro del formulario de registro de donación.
   * 
   * @returns {FormArray} El FormArray de 'seleccionadaManifiesto'.
   */
  get seleccionadaManifiesto(): FormArray {
    return this.manifiestosForm.get('seleccionadaManifiesto') as FormArray;
  }

  /**
   * Inicializa los catálogos necesarios para el formulario.
   */
  private inicializaCatalogos(): void {
    const ESTADO$: Observable<void> = this.avisoSanitarioService
      .getEstado(CATALOGOS_ID.CAT_ESTADO)
      .pipe(
        map((resp) => {
          this.estado = resp.data;
        })
      );

    const CLAVE_SCIAN$: Observable<void> = this.avisoSanitarioService
      .getClaveScian(CATALOGOS_ID.CAT_CLAVE_SCIAN)
      .pipe(
        map((resp) => {
          this.claveScian = resp.data;
        })
      );

    const DESCRIPCION_SCIAN$: Observable<void> = this.avisoSanitarioService
      .getDescripcionScian()
      .pipe(
        map((resp) => {
          this.descripcionScian = resp.data;
        })
      );

    const REGIMENES$: Observable<void> = this.avisoSanitarioService
      .getRegimenes(CATALOGOS_ID.CAT_REGIMENES)
      .pipe(
        map((resp) => {
          this.regimenes = resp.data;
        })
      );

    const ADUANAS$: Observable<void> = this.avisoSanitarioService
      .getAduanas(CATALOGOS_ID.CAT_ADUANAS)
      .pipe(
        map((resp) => {
          this.aduanas = resp.data;
        })
      );

    merge(
      ESTADO$,
      CLAVE_SCIAN$,
      DESCRIPCION_SCIAN$,
      REGIMENES$,
      ADUANAS$
    )
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe();
  }

  /**
   * Maneja la selección del estado y lo actualiza en el store.
   */
  estadoSeleccion(): void {
    const ESTADO = this.domicilloDelEstablecimientoForm.get('cveEstado')?.value;
    this.tramite260601Store.setEstado(ESTADO);
  }

  /**
   * Maneja la selección de la clave SCIAN y obtiene su descripción.
   */
  claveScianSeleccion(): void {
    const CLAVE_SCIAN = this.scianForm.get('cveSCIAN')?.value;
    this.avisoSanitarioService.getDescripcionScian()
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe({
        next: (result) => {
          const SCIAN_DESCRIPCION = result.data[0].descripcion;
          this.scianForm.get('cveSCIANDescripcion')?.setValue(SCIAN_DESCRIPCION);
          this.tramite260601Store.setDescripcionScian(SCIAN_DESCRIPCION);
        }
      })
    this.tramite260601Store.setClaveScian(CLAVE_SCIAN);
  }

  /**
   * Maneja la selección de la descripción SCIAN.
   */
  descripcionScianSeleccion(): void {
    const DESCRIPCION_SCIAN = this.scianForm.get('cveSCIANDescripcion')?.value;
    this.tramite260601Store.setDescripcionScian(DESCRIPCION_SCIAN);
  }

  /**
   * Maneja la selección del régimen fiscal y lo actualiza en el store.
   */
  regimenesSeleccion(): void {
    const REGIMENES = this.domicilloDelEstablecimientoForm.get('cveRegimenes')?.value;
    this.tramite260601Store.setCveRegimenes(REGIMENES);
  }

  /**
   * Maneja la selección de la aduana y lo actualiza en el store.
   */
  aduanaSeleccion(): void {
    const ADUANAS = this.domicilloDelEstablecimientoForm.get('cveAduanas')?.value;
    this.tramite260601Store.setCveAduanas(ADUANAS);
  }

  /**
   * Obtiene los datos para la tabla SCIAN.
   */
  public obtenerSCIAN(): void {
    this.scianHeaderData = this.getSCIANTableData.tableHeader;
    this.scianBodyData = this.getSCIANTableData.tableBody;
  }

  /**
   * Obtiene los datos para la tabla de productos.
   */
  public obtenerProducto(): void {
    this.productoHeaderData = this.getProductoTableData.tableHeader;
    this.productoBodyData = this.getProductoTableData.tableBody;
  }

  /**
   * Muestra el modal para la selección del establecimiento.
   */
  seleccionarEstablecimiento(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Habilita todos los campos en los formularios del establecimiento y domicilio.
   */
  aceptar(): void {
    this.datosDelEstablecimientoForm.enable();

    // Habilitar todos los campos en el formulario Domicilio del Establecimiento
    this.domicilloDelEstablecimientoForm.enable();
    this.habilitarEstado = false;
  }

  /**
   * Obtiene los manifiestos y los guarda en `manifiestos`.
   * Inicializa `manifiestosSeleccionados` con valores `false`.
   */
  obtenerManifiestos(): void {
    this.avisoSanitarioService.getManifiestos()
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe({
        next: (result: ManifiestosRespuesta) => {
          this.manifiestos = result?.data;
        }
      });
  }

  /**
   * Cambia el estado de la casilla de verificación según el índice.
   * 
   * @param event - El evento que se dispara al cambiar el estado del checkbox.
   * @param {number} index - Índice de la casilla de verificación.
   * 
   * @returns {void}
   */
  onManifiestoCheckboxCambiar(event: Event, index: number): void {
    const VALOR_ENTRADA = event.target as HTMLInputElement;
    this.seleccionadaManifiesto.controls[index].setValue(VALOR_ENTRADA.checked);
    this.setValoresStore(this.manifiestosForm, 'seleccionadaManifiesto', 'setSeleccionadaManifiesto');
  }

  /**
   * Maneja el evento de cambio de valor.
   */
  enCambioDeValor(): void {
    // Implementar la lógica para evento de cambio de valor.
  }

  /**
   * Abre el diálogo para agregar datos SCIAN.
   */
  abrirDialogoAgregarDatosSCIAN(): void {
    // Implementar la lógica para abrir dialogo agregar datos SCIAN.
  }

  /**
   * Agrega un agente relacionado con el establecimiento.
   */
  agregarAgente(): void {
    // Implementar la lógica para agregar agente.
  }

  /**
   * Limpia los datos SCIAN del formulario.
   */
  limpiarDatosSCIAN(): void {
    // Implementar la lógica para limpiar datos SCIAN.
  }

  /**
   * Agrega los datos SCIAN al formulario.
   */
  agregarDatosSCIAN(): void {
    // Implementar la lógica para agregar datos SCIAN.
  }

  /**
   * Método para abrir dialogo mercancías.
   * 
   * @returns {void}
   */
  agregarMercanciaGrid2606(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
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
    * Establece los valores en el store de tramite260601.
    *
    * @param {FormGroup} form - El formulario del cual se obtiene el valor.
    * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
    * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
    * @returns {void}
    */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite260601Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite260601Store[metodoNombre] as (value: unknown) => void)(VALOR);
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
