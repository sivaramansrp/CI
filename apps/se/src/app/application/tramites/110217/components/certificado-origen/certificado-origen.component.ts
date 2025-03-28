import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Catalogo, CatalogoSelectComponent, InputFecha, InputFechaComponent, TablaDinamicaComponent, TituloComponent, ValidacionesFormularioService } from "@libs/shared/data-access-user/src";
import { MercanciasModalComponent } from "../../../110204/components/mercancias-modal/mercancias-modal.component";
import { ToastrService } from "ngx-toastr";
import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { Tramite110217State, Tramite110217Store } from "../../../../estados/tramites/tramite110217.store";
import { CertificadosOrigenService } from "../../services/certificadosOrigen.service";
import { Tramite110217Query } from "../../../../estados/queries/tramite110217.query";
import { map, ReplaySubject, Subject, takeUntil } from "rxjs";
import { CatalogoLista, FECHAFACTURA, FECHAFINAL, FECHAINICIAL } from "../../models/certificado-origen.model";


/**
 * Constante que representa la configuración de la fecha final en el componente de certificado de origen.
 * 
 * @constant
 * @type {Object}
 * @property {string} labelNombre - El nombre de la etiqueta para la fecha final.
 * @property {boolean} required - Indica si el campo de fecha final es obligatorio.
 * @property {boolean} habilitado - Indica si el campo de fecha final está habilitado.
*/
export const FECHA_INICIO = {
  labelNombre: 'Fecha inicio',
  required: true,
  habilitado: true,
};

/**
 * Constante que representa la configuración de la fecha final en el componente de certificado de origen.
 * 
 * @constant
 * @type {Object}
 * @property {string} labelNombre - El nombre de la etiqueta para la fecha final.
 * @property {boolean} required - Indica si el campo de fecha final es obligatorio.
 * @property {boolean} habilitado - Indica si el campo de fecha final está habilitado.
 */
export const FECHA_FINAL = {
  labelNombre: 'Fecha fin',
  required: true,
  habilitado: true,
};

/**
 * Componente para gestionar los certificados de origen.
 * Se encarga de manejar los formularios, la carga de catálogos, la validación y la interacción con el store.
 */
@Component({
  selector: 'app-certificado-origen',
  standalone: true,
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    CommonModule,
    TablaDinamicaComponent,
    InputFechaComponent,
    CatalogoSelectComponent,
    MercanciasModalComponent
],
  providers: [ToastrService],
  templateUrl: './certificado-origen.component.html',
  styleUrl: './certificado-origen.component.scss',
})
export class CertificadoOrigenComponent  {
 
    /**
   * Formulario reactivo utilizado para la gestión de los datos del certificado.
   * @type {FormGroup}
   */
    formCertificado!: FormGroup;

    public solicitudState!: Tramite110217State;

    destroyNotifier$: Subject<void> = new Subject();
    registroFormulario!: FormGroup;
  estaDeshabilitado: boolean=false;
  /**
 * Opciones del catálogo de tratados.
 * Contiene una lista de objetos del catálogo de tratados obtenidos desde el servicio.
 */
optionsTratado!: Catalogo[];

/**
 * Opciones del catálogo de países.
 * Contiene una lista de objetos del catálogo de países obtenidos desde el servicio.
 */
optionsPais!: Catalogo[];

    /**
 * Notificador para destruir observables al destruir el componente.
 * Se utiliza para gestionar la cancelación de suscripciones activas y evitar fugas de memoria.
 */
private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

 /**
   * Configuración de la fecha inicial.
   * Representa la configuración del campo de entrada para la fecha inicial en el formulario.
   */
 fechaInicialInput: InputFecha = FECHAINICIAL;

 /**
   * Configuración de la fecha final.
   * Representa la configuración del campo de entrada para la fecha final en el formulario.
   */
 fechaFinalInput: InputFecha = FECHAFINAL;

  /**
   * Configuración de la fecha de la factura.
   * Representa la configuración del campo de entrada para la fecha de la factura en el formulario.
   */
  fechaFacturaInput: InputFecha = FECHAFACTURA;

  /**
 * Opciones del catálogo de tipos de factura.
 * Contiene una lista de objetos del catálogo de tipos de factura obtenidos desde el servicio.
 */
optionsTipoFactura!: Catalogo[];

   /**
   * Formulario reactivo para los datos de la mercancía.
   */
   mercanciaForm!: FormGroup;


  constructor(
    public fb: FormBuilder,
    private certificadosOrigenService: CertificadosOrigenService,
    public store: Tramite110217Store,
    public tramiteQuery: Tramite110217Query,
    private validacionesService: ValidacionesFormularioService
    // eslint-disable-next-line no-empty-function
  ) { }

  ngOnInit(): void {
    
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.initFormulario();
    
  }
 
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110217Store): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  get grupoOperador(): FormGroup {
    return this.registroFormulario.get('grupoOperador') as FormGroup;
  }
 
  get grupoDeDomicilio(): FormGroup {
    return this.registroFormulario.get('grupoDeDomicilio') as FormGroup;
  }

  get grupoTratado(): FormGroup {
    return this.registroFormulario.get('grupoTratado') as FormGroup;
  }
 /**
   * Obtiene el formulario de validación de mercancías.
   */
 get validacionMercanciaForm(): FormGroup {
  return this.mercanciaForm.get('validacionMercanciaForm') as FormGroup;
}
  initFormulario(): void {
    this.mercanciaForm = this.fb.group({
      validacionMercanciaForm: this.fb.group({
        fraccionMercanciaArancelaria: [this.solicitudState?.fraccionMercanciaArancelaria, [Validators.required]],
        nombreTecnico: [this.solicitudState?.nombreTecnico, [Validators.required]],
        nombreComercialDelaMercancia: [this.solicitudState?.nombreComercialDelaMercancia, [Validators.required]],
        criterioParaConferir: [this.solicitudState?.criterioParaConferir, [Validators.required]],
        nombreEnIngles: [this.solicitudState?.nombreEnIngles, [Validators.required]],
        otrasInstancias: [this.solicitudState?.otrasInstancias, [Validators.required]],
        marca: [this.solicitudState?.marca, [Validators.required]],
        cantidad: [
          this.solicitudState?.cantidad,
          [Validators.required, Validators.pattern(/^\d+$/)],
        ],
        umc: [this.solicitudState?.umc, [Validators.required]],
        valorDelaMercancia: [
          this.solicitudState?.valorDelaMercancia,
          [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
        ],
        complementoDelaDescripcion: [
          this.solicitudState?.complementoDelaDescripcion,
          [Validators.required],
        ],
        masaBruta: [
          this.solicitudState?.masaBruta,
          [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
        ],
        unidadMedida: [
          this.solicitudState?.unidadMedida,
          [Validators.required],
        ],
        tipoFactura: [this.solicitudState?.tipoFactura, [Validators.required]],
        fecha: [this.solicitudState?.fecha, [Validators.required]],
        numeroFactura: [
          this.solicitudState?.numeroFactura,
          [Validators.required],
        ],
      }),
    });

    this.formCertificado = this.fb.group({
      tercerOperador: [this.solicitudState?.tercerOperador],
      grupoOperador: this.fb.group({
        nombre: [this.solicitudState?.grupoOperador?.nombre],
        apellidoPrimer: [this.solicitudState?.grupoOperador?.apellidoPrimer],
        apellidoSegundo: [this.solicitudState?.grupoOperador?.apellidoSegundo],
        numeroFiscal: [this.solicitudState?.grupoOperador?.numeroFiscal, Validators.required],
        razonSocial: [this.solicitudState?.grupoOperador?.razonSocial, ],
      }),
      grupoDeDomicilio: this.fb.group({
        ciudad: [this.solicitudState?.grupoDeDomicilio?.ciudad, [Validators.required]],
        calle: [this.solicitudState?.grupoDeDomicilio?.calle, [Validators.required]],
        numeroLetra: [this.solicitudState?.grupoDeDomicilio?.numeroLetra, [Validators.required]],
        lada: [this.solicitudState?.grupoDeDomicilio?.lada, [Validators.required]],
        telefono: [this.solicitudState?.grupoDeDomicilio?.telefono, [Validators.required, Validators.pattern(/^\d+$/)]],
        fax: [this.solicitudState?.grupoDeDomicilio?.fax, [Validators.pattern(/^\d+$/)]],
        correoElectronico: [this.solicitudState?.grupoDeDomicilio?.correoElectronico, [Validators.required, Validators.email]],
    
      }),

      grupoTratado:this.fb.group({
        tratado: [this.solicitudState?.grupoTratado?.tratado, [Validators.required]], 
        pais: [this.solicitudState?.grupoTratado?.pais, [Validators.required]],
        fraccionArancelaria: [this.solicitudState?.grupoTratado?.fraccionArancelaria, [Validators.required]],
        numeroRegistro: [this.solicitudState?.grupoTratado?.numeroRegistro, [Validators.required]],
        nombreComercial: [this.solicitudState?.grupoTratado?.nombreComercial, [Validators.required]],
     tfechaFinalInput: [this.solicitudState?.grupoTratado?.fechaFinalInput, [Validators.required]],
        tfechaInicialInput: [this.solicitudState?.grupoTratado?.fechaInicialInput, [Validators.required]],
      }),
      
    });
  }

  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  onClick(): void {
    this.estaDeshabilitado = true;
  }

    /**
   * Obtiene el catálogo de tratados desde el servicio.
   */
    getTratado(): void {
      this.certificadosOrigenService
        .getTratado()
        .pipe(takeUntil(this.destroyed$))
        .subscribe(
          (datos: CatalogoLista) => {
            this.optionsTratado = datos.datos;
          }
        );
    }
    /**
     * Obtiene el catálogo de países desde el servicio.
     */
    getPais(): void {
      this.certificadosOrigenService
        .getPais()
        .pipe(takeUntil(this.destroyed$))
        .subscribe(
          (datos: CatalogoLista) => {
            this.optionsPais = datos.datos;
          }
        );
    }
 

    /**
 * Actualiza la fecha inicial en el formulario reactivo y en el estado de la tienda.
 * @param nuevo_fechaIncial Nueva fecha inicial seleccionada.
 */
  cambioFechaInicial(nuevo_fechaIncial: string): void {
    this.formCertificado.patchValue({
      validacionForm: {
        fechaInicial: nuevo_fechaIncial,
      },
    });
    this.setValoresStore(this.formCertificado, 'fechaInicial', 'setGrupoTratadoFechaFinalInput');
  }
/**
 * Actualiza la fecha final en el formulario reactivo y en el estado de la tienda.
 * @param nuevo_fechaFinal Nueva fecha final seleccionada.
 */
  cambioFechaFinal(nuevo_fechaFinal: string): void {
    this.formCertificado.patchValue({
      validacionForm: {
        fechaFinal: nuevo_fechaFinal,
      },
    });

    this.setValoresStore(this.formCertificado, 'fechaFinal', 'setGrupoTratadoFechaInicialInput');
  }


  /**
 * Actualiza la fecha de la factura en el formulario reactivo y en el estado de la tienda.
 * @param nuevo_fechaFin Nueva fecha de la factura seleccionada.
 */
  cambioFechaFactura(nuevo_fechaFin: string): void {
    this.mercanciaForm.patchValue({
      validacionMercanciaForm: {
        fecha: nuevo_fechaFin,
      },
    });
    this.setValoresStore(this.validacionMercanciaForm, 'fecha', 'setFecha');
  }
}
