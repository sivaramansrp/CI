import { Catalogo, ConsultaioQuery, TituloComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent, InputRadioComponent} from '@libs/shared/data-access-user/src';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
import { SolicitudPantallasService } from '../../services/solicitud-pantallas.service';
import { OPCIONES_DE_BOTON_DE_RADIO } from '../../enums/sagarpa.enum';
import { Solicitud220502State, Solicitud220502Store } from '../../estados/tramites220502.store';
import { Solicitud220502Query } from '../../estados/tramites220502.query';

/**
 * Componente para gestionar el pago de derechos.
 */
@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrls: ['./pago-de-derechos.component.scss'],
  standalone: true,
  imports: [InputRadioComponent, TituloComponent, ReactiveFormsModule, CatalogoSelectComponent],
})

/**
 * Componente que permite gestionar el pago de derechos en una solicitud.
 */
export class PagoDeDerechosComponent implements OnDestroy {
  /**
   * Indica si el formulario está deshabilitado.
   * @type {boolean}
   */
  isDisabled: boolean = true;

  /**
   * Formulario de pago.
   * @type {FormGroup}
   */
  pagoForm!: FormGroup;

  /**
   * Justificación seleccionada.
   * @type {Catalogo}
   */
  justificacionde!: Catalogo;

  /**
   * Banco seleccionado.
   * @type {Catalogo}
   */
  bancode!: Catalogo;

  /**
   * Justificación del pago.
   * @type {CatalogosSelect}
   */
  justificacion: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Banco seleccionado.
   * @type {CatalogosSelect}
   */
  banco: CatalogosSelect = {} as CatalogosSelect;

  // /**
  //  * Servicio de revisión.
  //  * @type {solicitudPantallasService}
  //  */
  // private solicitudPantallasService: SolicitudPantallasService;

  /**
   * Subject para desuscribirse de los observables.
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();

  /** 
   * Estado de la solicitud 220502. 
   * Se inicializa como un objeto vacío con la estructura de Solicitud220502State.
   */
  solicitud220502State: Solicitud220502State = {} as Solicitud220502State;

  /** 
   * Variable para almacenar el valor de la opción seleccionada en el botón de radio 
   * relacionado con "esSolicitudFerros".
   */
  esSolicitudFerrosValor!: string;

  /** 
   * Enumeración u objeto que contiene las opciones disponibles para el botón de radio.
   */
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;

  /**
   * Indica si el formulario está deshabilitado.
   */
  formularioDeshabilitado: boolean = false;

  /**
   * Constructor del componente.
   * @param {FormBuilder} fb - El servicio FormBuilder de Angular para crear formularios.
   * @param {RevisionService} revisionService - El servicio de revisión para obtener datos relacionados con el pago.
   */
  constructor(
    private readonly fb: FormBuilder,
    private solicitudPantallasService: SolicitudPantallasService,
    public solicitud220502Store: Solicitud220502Store,
    public solicitud220502Query: Solicitud220502Query,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.solicitudPantallasService = solicitudPantallasService;
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.formularioDeshabilitado = seccionState.readonly;
          if(seccionState.readonly || seccionState.update){
             this.inicializarEstadoFormulario();

          }          
        })
      )
      .subscribe();

    this.inicializarFormulario();
  }

  /**
   * Determina si se debe cargar un formulario nuevo o uno existente.
   * Ejecuta la lógica correspondiente según el estado del componente.
   */
  inicializarEstadoFormulario(): void {
    if (this.formularioDeshabilitado) {
      this.pagoForm?.disable();
    } else if (!this.formularioDeshabilitado) {
      this.pagoForm?.enable();
    }
  }

  /**
   * Inicializa el formulario con los valores del estado de la solicitud 220501.
   */
  inicializarFormulario(): void {
    this.pagoForm = this.fb.group({
      exentoPagoNo: [{ value: this.solicitud220501State.exentoPagoNo }],
      justificacion: [{ value: this.solicitud220501State.justificacion, disabled: true }],
      claveReferencia: [{ value: this.solicitud220501State.claveReferencia, disabled: true }],
      cadenaDependencia: [{ value: this.solicitud220501State.cadenaDependencia, disabled: true }],
      banco: [{ value: this.solicitud220501State.banco, disabled: true }],
      llavePago: [{ value: this.solicitud220501State.llavePago, disabled: true }],
      importePago: [{ value: this.solicitud220501State.importePago, disabled: true }],
      fetchapago: [{ value: this.solicitud220501State.fetchapago, disabled: true }],
    });

    this.solicitud220502Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((data: Solicitud220502State) => {
          this.solicitud220502State = data;
          this.pagoForm.patchValue({
            exentoPagoNo: this.solicitud220501State.exentoPagoNo,
            justificacion: this.solicitud220501State.justificacion,
            claveReferencia: this.solicitud220501State.claveReferencia,
            cadenaDependencia: this.solicitud220501State.cadenaDependencia,
            banco: this.solicitud220501State.banco,
            llavePago: this.solicitud220501State.llavePago,
            importePago: this.solicitud220501State.importePago,
            fetchapago: this.solicitud220501State.fetchapago,
          });
        })
      )
      .subscribe();

    this.getJustificacion();
    this.getBanco();
    this.getPagoDeDerechos();

    this.inicializarEstadoFormulario();
  }

  /** 
   * Obtiene la información sobre el pago de derechos a través del servicio `revisionService` 
   * y actualiza el store con la respuesta recibida.
   */
  getPagoDeDerechos(): void {
    this.solicitudPantallasService.getPagoDeDerechos().pipe(takeUntil(this.destroyed$)).subscribe({
      next: (resp: PagoDeDerechos) => {
        this.solicitud220502Store.setJustificacion(resp.justificacion);
        this.solicitud220502Store.setClaveReferencia(resp.claveReferencia);
        this.solicitud220502Store.setCadenaDependencia(resp.cadenaDependencia);
        this.solicitud220502Store.setBanco(resp.banco);
        this.solicitud220502Store.setIlavePago(resp.llavePago);
        this.solicitud220502Store.setImportePago(resp.importePago);
        this.solicitud220502Store.setFetchaPago(resp.fetchapago);
      },
    });
  }

  /**
   * Obtiene la justificación del pago.
   * Este método llama al servicio de revisión para obtener la justificación.
   * @returns {void}
   */
  getJustificacion(): void {
    this.solicitudPantallasService.getJustificacion().pipe(takeUntil(this.destroyed$)).subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;

        this.justificacion = {
          labelNombre: 'Justificación',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  /** 
   * Selecciona una justificación desde el catálogo y actualiza el store con la información correspondiente.
   * @param event Objeto de tipo Catalogo que contiene la información de la justificación seleccionada.
   */
  selectJustificacionCatalogo(event: Catalogo): void {
    this.solicitud220502Store.setJustificacion(event.id);
  }

  /** 
   * Método para establecer la clave de referencia. 
   * Captura el valor ingresado en el campo de entrada y lo actualiza en el estado.
   * 
   * @param event - Evento del input HTML que contiene la clave de referencia.
   */
  setClaveReferencia(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud220502Store.setClaveReferencia(VALUE);
  }

  /** 
   * Método para establecer la cadena de dependencia. 
   * Captura el valor ingresado en el campo de entrada y lo actualiza en el estado.
   * 
   * @param event - Evento del input HTML que contiene la cadena de dependencia.
   */
  setCadenaDependencia(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud220502Store.setCadenaDependencia(VALUE);
  }

  /** 
   * Método para establecer si el pago está exento o no. 
   * Recibe un valor numérico o de tipo string y lo actualiza en el estado.
   * 
   * @param value - Valor que indica si el pago es exento (string o number).
   */
  setExentoPagoNo(value: string | number): void {
    this.solicitud220502Store.setExentoPagoNo(value);
  }

  /** 
   * Selecciona un banco desde el catálogo y actualiza el store con la información correspondiente.
   * @param event Objeto de tipo Catalogo que contiene la información del banco seleccionado.
   */
  selectBancoCatalogo(event: Catalogo): void {
    this.solicitud220502Store.setBanco(event.id);
  }

  /** 
   * Método para establecer la llave de pago. 
   * Captura el valor ingresado en el campo de entrada y lo actualiza en el estado.
   * 
   * @param event - Evento del input HTML que contiene el valor de la llave de pago.
   */
  setIlavePago(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud220502Store.setIlavePago(VALUE);
  }

  /** 
   * Método para establecer la fecha de pago. 
   * Captura el valor ingresado en el campo de entrada y lo actualiza en el estado.
   * 
   * @param event - Evento del input HTML que contiene la fecha de pago.
   */
  setFetchaPago(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud220502Store.setFetchaPago(VALUE);
  }

  /** 
   * Método para establecer el importe de pago. 
   * Captura el valor ingresado en el campo de entrada y lo actualiza en el estado.
   * 
   * @param event - Evento del input HTML que contiene el importe de pago.
   */
  setImportePago(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud220502Store.setImportePago(VALUE);
  }

  /**
   * Obtiene el banco para el pago.
   * Este método llama al servicio de revisión para obtener el banco.
   * @returns {void}
   */
  getBanco(): void {
    this.solicitudPantallasService.getBanco().pipe(takeUntil(this.destroyed$)).subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;

        this.banco = {
          labelNombre: 'Banco',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Desuscribe el componente de todos los observables.
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
