import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AlertComponent,
  CATALOGOS_ID,
  CatalogoSelectComponent,
  CatalogosSelect,
  TableComponent,
  TEXTOS,
  TituloComponent,
  ValidacionesFormularioService,
} from '@libs/shared/data-access-user/src';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Catalogo,
  Solicitud10302State,
  Tramite10302Store,
} from '../estados/tramite10302.store';
import { Tramite10302Query } from '../estados/tramite10302.query';
import { ExencionImpuestosService } from '../services/exencion-impuestos.service';
import { map, merge, Subject, Subscription, takeUntil } from 'rxjs';
import { Modal } from 'bootstrap';
import mercanciaTable from 'libs/shared/theme/assets/json/10302/mercancia-table.json';

@Component({
  selector: 'app-datos-tramite',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    TituloComponent,
    CatalogoSelectComponent,
    FormsModule,
    ReactiveFormsModule,
    AlertComponent
  ],
  templateUrl: './datosTramite.component.html',
  styleUrl: './datosTramite.component.scss',
})
export class DatosTramiteComponent {

  /**
   * Formulario de trámite.
   */
  tramiteForm!: FormGroup;

  /**
   * Formulario reactivo para agregar mercancías.
   */

  agregarMercanciasForm!: FormGroup;
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud10302State;
  /**
   * Suscripciones a observables.
   */
  private subscriptions: Subscription[] = [];
  showTabla = true;
  
  /**
   * Encabezado de la tabla de mercancías.
   */
  public mercanciaHeaderData: string[] = [];

  /**
   * Cuerpo de la tabla de mercancías.
   */
  public mercanciaBodyData: unknown = [];

  /**
   * Datos de la tabla de mercancía.
   */
  public getMercanciaTableData = mercanciaTable;
  /**
   * Catálogo de aduanas.
   */
  aduana!: CatalogosSelect;
  /**
   * Suscripción para obtener el catálogo de aduanas.
   */
  getAduanaIngresaraSubscription!: Subscription;
  fechasSeleccionadas: Catalogo[] = [];
  tipoDeMercancia!: Catalogo[];
  condicionMercancia!: Catalogo[];
  unidadMedida!: Catalogo[];
  ano!: Catalogo[];

  /**
   * Referencia al elemento del modal.
   */
  @ViewChild('modalAgregarMercancias') modalElement!: ElementRef;

  /**
   * Referencia al botón de cerrar el modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;
  // /**
  //  * Textos utilizados en el componente.
  //  */
  // TEXTOS = TEXTOS;

  constructor(
    private exencionImpuestoService: ExencionImpuestosService,
    private store: Tramite10302Store,
    private query: Tramite10302Query,
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  ngOnInit(): void {
    this.getAduanaIngresara();
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

    this.subscriptions.push(
      this.query.selectFechasSeleccionadas$.subscribe((fechas) => {
        this.fechasSeleccionadas = fechas ?? [];
      })
    );
    this.subscriptions.push(
      this.query.selectAduana$.subscribe((aduana) => {
        this.aduana = {
          labelNombre: 'Aduana por la que ingresará la mercancía',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: aduana ?? [],
        };
      })
    );
    this.obtenerMercancia();
  }

  /**
   * Inicializa el formulario de donante y domicilio con los valores del estado de la solicitud.
   */
  donanteDomicilio(): void {
    this.tramiteForm = this.fb.group({
      exencionImpuestos: this.fb.group({
        aduana: [this.solicitudState?.aduana, [Validators.required]],
        organismoPublico: [this.solicitudState?.organismoPublico, Validators.required],
        // nombre: [
        //   this.solicitudState?.nombre,
        //   [Validators.required, Validators.maxLength(50)],
        // ],
        // tipoMercancia: [
        //   this.solicitudState?.tipoMercancia,
        //   [Validators.required, Validators.maxLength(100)],
        // ],
        usoEspecifico: [
          this.solicitudState?.usoEspecifico,
          [Validators.required, Validators.maxLength(512)],
        ],
        // condicion: [this.solicitudState?.condicion, Validators.required],
        // marca: [
        //   this.solicitudState?.marca,
        //   [Validators.required, Validators.maxLength(50)],
        // ],
        // ano: [this.solicitudState?.ano, [Validators.required]],
        // modelo: [
        //   this.solicitudState?.modelo,
        //   [Validators.required, Validators.maxLength(50)],
        // ],
        // serie: [
        //   this.solicitudState?.serie,
        //   [Validators.required, Validators.maxLength(50)],
        // ],
        // calle: [
        //   this.solicitudState?.calle,
        //   [Validators.required, Validators.maxLength(100)],
        // ],
        // numeroExterior: [
        //   this.solicitudState?.numeroExterior,
        //   [Validators.required, Validators.maxLength(10)],
        // ],
        // numeroInterior: [
        //   this.solicitudState?.numeroInterior,
        //   [Validators.maxLength(10)],
        // ],
        // telefono: [
        //   this.solicitudState?.telefono,
        //   [Validators.required, Validators.pattern(/^\d{10}$/)],
        // ],
        // correoElectronico: [
        //   this.solicitudState?.correoElectronico,
        //   [Validators.required, Validators.email],
        // ],
        // pais: [this.solicitudState?.pais, Validators.required],
        // codigoPostal: [
        //   this.solicitudState?.codigoPostal,
        //   [Validators.required, Validators.pattern(/^\d{5}$/)],
        // ],
        // estado: [
        //   this.solicitudState?.estado,
        //   [Validators.required, Validators.maxLength(50)],
        // ],
        // colonia: [
        //   this.solicitudState?.colonia,
        //   [Validators.required, Validators.maxLength(50)],
        // ],
        // opcion: [this.solicitudState?.opcion],
      }),
    });
    
    this.agregarMercanciasForm = this.fb.group({
      datosMercancia: this.fb.group({
        tipoDeMercancia: [
          this.solicitudState?.tipoDeMercancia,
          Validators.required
        ],
        condicionMercancia: [
          this.solicitudState?.condicionMercancia,
          Validators.required
        ],
        unidadMedida: [
          this.solicitudState?.unidadMedida,
          Validators.required
        ],
        ano: [
          this.solicitudState?.ano,
          Validators.required
        ]
      }),
    });
  }

  private inicializaCatalogos(): void {
    const TIPO_DE_MERCANCIA$ = this.exencionImpuestoService
      .getTipoDeMercancia()
      .pipe(
        map((resp) => {
          this.tipoDeMercancia = resp.data;
        })
      );

      const CONDICION_MERCANCIA$ = this.exencionImpuestoService
      .getCondicionMercancia()
      .pipe(
        map((resp) => {
          this.condicionMercancia = resp.data;
        })
      );

      const UNIDAD_MEDIDA$ = this.exencionImpuestoService
      .getUnidadMedida()
      .pipe(
        map((resp) => {
          this.unidadMedida = resp.data;
        })
      );

      const ANO$ = this.exencionImpuestoService
      .getAno()
      .pipe(
        map((resp) => {
          this.ano = resp.data;
        })
      );

      merge(
        TIPO_DE_MERCANCIA$,
        CONDICION_MERCANCIA$,
        UNIDAD_MEDIDA$,
        ANO$
      )
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe();
  }

  getAduanaIngresara(): void {
    this.getAduanaIngresaraSubscription = this.exencionImpuestoService
      .getAduanaIngresara()
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.store.setAduana(RESPONSE);
        }
      });
  }

  /**
   * Obtiene el grupo de formulario de importador/exportador.
   *
   * @returns {FormGroup} - El grupo de formulario de importador/exportador.
   */
  get exencionImpuestos(): FormGroup {
    return this.tramiteForm.get('exencionImpuestos') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'datosMercancia' del formulario principal 'RegistroDonacionForm'.
   */
  get datosMercancia(): FormGroup {
    return this.tramiteForm.get('datosMercancia') as FormGroup;
  }

  tipoDeMercanciaSeleccion(): void {
    const TIPO_DE_MERCANCIA = this.agregarMercanciasForm.get('datosMercancia.tipoDeMercancia')?.value;
    this.store.setTipoDeMercancia(TIPO_DE_MERCANCIA);
  }
  
  condicionMercanciaSeleccion(): void {
    const CONDICION_MERCANCIA = this.agregarMercanciasForm.get('datosMercancia.condicionMercancia')?.value;
    this.store.setCondicionMercancia(CONDICION_MERCANCIA);
  }

  unidadMedidaSeleccion(): void {
    const UNIDAD_MEDIDA = this.agregarMercanciasForm.get('datosMercancia.unidadMedida')?.value;
    this.store.setUnidadMedida(UNIDAD_MEDIDA);
  }

  anoSeleccion(): void {
    const ANO = this.agregarMercanciasForm.get('datosMercancia.ano')?.value;
    this.store.setAno(ANO);
  }

  /**
   * Este método se utiliza para marcar los controles del formulario como tocados. - 10301
   */
  validarDestinatarioFormulario(): void {
    if (this.tramiteForm.invalid) {
      this.tramiteForm.markAllAsTouched();
    }
  }

  /**
   * Muestra la siguiente tabla.
   */
  nextTabla() {
    this.showTabla = false;
    this.store.setShowTabla(this.showTabla);
  }

  /**
   * Establece los valores en el store de tramite5701.
   *
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
   * @returns {void}
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite10302Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método para abrir dialogo mercancías.
   * 
   * @returns {void}
   */
  abrirDialogoMercancias(): void {
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
   * Agrega mercancías al formulario y cierra el modal.
   * @returns {void}
   */
  agregarMercancias(): void {
    if (!this.agregarMercanciasForm.valid) {
      return;
    }
    const MERCANCIA = this.agregarMercanciasForm.value;
    this.getMercanciaTableData.mercanciaTable.tableBody.push(MERCANCIA);
    this.agregarMercanciasForm.reset();
    this.cerrarModal();
  }

  limpiarMercancias(): void {
    // Implementar la lógica para limpiar las mercancías.
  }

  public obtenerMercancia(): void {
    this.mercanciaHeaderData = this.getMercanciaTableData.mercanciaTable.tableHeader;
    this.mercanciaBodyData = this.getMercanciaTableData.mercanciaTable.tableBody;
  }

  /**
   * Método de limpieza que se ejecuta cuando el componente se destruye.
   */
  ngOnDestroy(): void {
    if (this.getAduanaIngresaraSubscription) {
      this.getAduanaIngresaraSubscription.unsubscribe();
    }

    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
