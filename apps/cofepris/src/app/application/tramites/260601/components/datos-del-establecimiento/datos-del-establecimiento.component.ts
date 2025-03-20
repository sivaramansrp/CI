import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatalogoSelectComponent, InputCheckComponent, InputRadioComponent, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { map, merge, Observable, Subject, takeUntil } from 'rxjs';
import { Catalogo } from '@ng-mf/data-access-user';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { AvisoSanitarioState, Tramite260601Store } from '../../estados/tramites/tramite260601.store';
import { Tramite260601Query } from '../../estados/queries/tramite260601.query';
import scianTable from 'libs/shared/theme/assets/json/260601/scian-table.json';
import productoTable from 'libs/shared/theme/assets/json/260601/producto-table.json';
import { CATALOGOS_ID, OPCIONES_DE_BOTON_DE_RADIO } from '../../constantes/aviso-enum';
import { DatosMercanciaComponent } from '../datos-mercancia/datos-mercancia.component';
import { Modal } from 'bootstrap';
import { Manifiestos, ManifiestosRespuesta } from '../../models/aviso-model';
import { RepresentanteLegalComponent } from '../representante-legal/representante-legal.component';

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
export class DatosDelEstablecimientoComponent implements OnInit {
  datosDelEstablecimientoForm!: FormGroup;

  domicilloDelEstablecimientoForm!: FormGroup;

  scianForm!: FormGroup;

  manifiestosForm!: FormGroup;

  /**
   * Subject para destruir las suscripciones.
   */
  private destruirNotificador$: Subject<void> = new Subject();

  estado!: Catalogo[];
  claveScian!: Catalogo[];
  descripcionScian!: Catalogo[];

  regimenes!: Catalogo[];

  aduanas!: Catalogo[];

  public avisoSanitarioState!: AvisoSanitarioState;

  public scianHeaderData: string[] = [];

  public scianBodyData: unknown = null;

  public productoHeaderData: string[] = [];

  public productoBodyData: unknown = null;

  public getSCIANTableData = scianTable;

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

  habilitarEstado: boolean = true;

  /**
    * Lista de manifiestos obtenidos desde el servicio.
    */
  manifiestos: Manifiestos[] = [];

  /**
   * Opciones de botón de radio.
   */
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;

  constructor(
    private fb: FormBuilder,
    private avisoSanitarioService: AvisoSanitarioService,
    private tramite260601Store: Tramite260601Store,
    private tramite260601Query: Tramite260601Query
  ) {
    // El constructor se utiliza para la inyección de dependencias.    
  }

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
      seleccionadaManifiesto: [
        this.fb.array(this.avisoSanitarioState?.seleccionadaManifiesto),
        [Validators.required]
      ],
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
      .getDescripcionScian(CATALOGOS_ID.CAT_DESCRIPCION_SCIAN)
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

  estadoSeleccion(): void {
    const ESTADO = this.domicilloDelEstablecimientoForm.get('cveEstado')?.value;
    this.tramite260601Store.setEstado(ESTADO);
  }

  claveScianSeleccion(): void {
    const CLAVE_SCIAN = this.scianForm.get('cveSCIAN')?.value;
    this.tramite260601Store.setClaveScian(CLAVE_SCIAN);
  }

  descripcionScianSeleccion(): void {
    const DESCRIPCION_SCIAN = this.scianForm.get('cveSCIANDescripcion')?.value;
    this.tramite260601Store.setDescripcionScian(DESCRIPCION_SCIAN);
  }

  regimenesSeleccion(): void {
    const REGIMENES = this.scianForm.get('cveRegimenes')?.value;
    this.tramite260601Store.setDescripcionScian(REGIMENES);
  }

  aduanaSeleccion(): void {
    const ADUANAS = this.scianForm.get('cveAduanas')?.value;
    this.tramite260601Store.setDescripcionScian(ADUANAS);
  }

  public obtenerSCIAN(): void {
    this.scianHeaderData = this.getSCIANTableData.tableHeader;
    this.scianBodyData = this.getSCIANTableData.tableBody;
  }

  public obtenerProducto(): void {
    this.productoHeaderData = this.getProductoTableData.tableHeader;
    this.productoBodyData = this.getProductoTableData.tableBody;
  }

  seleccionarEstablecimiento() {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  aceptar() {
    this.datosDelEstablecimientoForm.get('RFCResponsableSanitario')?.enable();
    this.datosDelEstablecimientoForm.get('razonSocial')?.enable();
    this.datosDelEstablecimientoForm.get('correoElectronico')?.enable();

    // Habilitar todos los campos en el formulario Domicilio del Establecimiento
    this.domicilloDelEstablecimientoForm.get('codigoPostal')?.enable();
    this.domicilloDelEstablecimientoForm.get('cveEstado')?.enable();
    this.domicilloDelEstablecimientoForm.get('descripcionMunicipio')?.enable();
    this.domicilloDelEstablecimientoForm.get('informacionExtra')?.enable();
    this.domicilloDelEstablecimientoForm.get('descripcionColonia')?.enable();
    this.domicilloDelEstablecimientoForm.get('calle')?.enable();
    this.domicilloDelEstablecimientoForm.get('lada')?.enable();
    this.domicilloDelEstablecimientoForm.get('telefono')?.enable();
    this.habilitarEstado = false;
  }

  /**
   * Obtiene los manifiestos y los guarda en `manifiestos`.
   * Inicializa `manifiestosSeleccionados` con valores `false`.
   */
  obtenerManifiestos(): void {
    this.avisoSanitarioService.getManifiestos().subscribe({
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

  abrirDialogoAgregarDatosSCIAN(): void {

  }

  agregarAgente() {

  }

  limpiarDatosSCIAN() {

  }

  agregarDatosSCIAN() {

  }

  agregarMercanciaGrid2606() {

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
