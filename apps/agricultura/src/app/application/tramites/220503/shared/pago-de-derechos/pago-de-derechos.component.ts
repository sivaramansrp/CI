import { Catalogo, CatalogoSelectComponent, CatalogosSelect, ConsultaioQuery, InputRadioComponent, TituloComponent } from '@ng-mf/data-access-user';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OPCIONES_DE_BOTON_DE_RADIO } from '../../enums/sagarpa.enum';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { PagoDeDerechos } from '../../models/pago-de-derechos.model';
import { RevisionService } from '../../services/revision.service';
import { Solicitud220503Query } from '../../estados/tramites220503.query';
import { Solicitud220503State } from '../../estados/tramites220503.store';
import { Solicitud220503Store } from '../../estados/tramites220503.store';
import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';


/**
 * Componente para gestionar el pago de derechos.
 */
@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrls: ['./pago-de-derechos.component.scss'],
  standalone: true,
  imports:[CommonModule, CatalogoSelectComponent, ReactiveFormsModule, InputRadioComponent,TituloComponent ]

})
export class PagoDeDerechosComponent implements OnInit , OnDestroy{
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

  /**
   * Servicio de revisión.
   * @type {RevisionService}
   */
  private revisionService: RevisionService;

    /**
   * Subject para desuscribirse de los observables.
   * @type {Subject<void>}
   */
    private destroyed$ = new Subject<void>();

  /** 
   * Estado de la solicitud 220503. 
   * Se inicializa como un objeto vacío con la estructura de Solicitud220503State.
   */
  Solicitud220503State: Solicitud220503State = {} as Solicitud220503State;

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
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  esFormularioSoloLectura: boolean = false;
  /**
   * Constructor del componente.
   *
   * @param {FormBuilder} fb - El servicio FormBuilder de Angular para crear formularios.
   * @param {RevisionService} revisionService - El servicio de revisión para obtener datos relacionados con el pago.
   */
  constructor(
    private readonly fb: FormBuilder,
    revisionService: RevisionService,
    public Solicitud220503Store : Solicitud220503Store,
    public Solicitud220503Query : Solicitud220503Query,
    public consultaioQuery: ConsultaioQuery
  ) {
    this.revisionService = revisionService;
     /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyed$),
      map((seccionState)=>{
        this.esFormularioSoloLectura = seccionState.readonly; 
        this.inicializarEstadoFormulario();
      })
    )
    .subscribe()
  }

  /**
   * Inicializa el componente y configura el formulario de pago.
   * @returns {void}
   */
  ngOnInit(): void {
      this.inicializarEstadoFormulario();
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }  
  }

   /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
      this.inicializarFormulario();
      if (this.esFormularioSoloLectura) {
        this.pagoForm.disable();
      } else if (!this.esFormularioSoloLectura) {
        this.pagoForm.enable();
      } else {
        // No se requiere ninguna acción en el formulario
      }
  }

   /**
   * Inicializa el formulario reactivo para capturar el valor de 'registro'.
   * Suscribe al estado almacenado en el store mediante el query `tramite301Query.selectSolicitud$`
   * y lo asigna a la variable local `solicitudState`. Luego, crea el formulario
   * con el valor inicial obtenido del store.
   */

  inicializarFormulario(): void {
this.pagoForm = this.fb.group({
      exentoPagoNo: [{ value: this.Solicitud220503State.exentoPagoNo}],
      justificacion: [{ value: this.Solicitud220503State.justificacion, disabled: true }],
      claveReferencia: [{ value: this.Solicitud220503State.claveReferencia, disabled: true }],
      cadenaDependencia: [{ value: this.Solicitud220503State.cadenaDependencia, disabled: true }],
      banco: [{ value: this.Solicitud220503State.banco, disabled: true }],
      llavePago: [{ value: this.Solicitud220503State.llavePago, disabled: true }],
      importePago: [{ value: this.Solicitud220503State.importePago, disabled: true }],
      fetchapago: [{ value: this.Solicitud220503State.fetchapago, disabled: true }],
    });

    this.Solicitud220503Query.selectSolicitud$
    .pipe(
      takeUntil(this.destroyed$),
      map((data: Solicitud220503State) => {
        this.Solicitud220503State = data;
        this.pagoForm.patchValue({
          exentoPagoNo: this.Solicitud220503State.exentoPagoNo,
          justificacion: this.Solicitud220503State.justificacion,
          claveReferencia: this.Solicitud220503State.claveReferencia,
          cadenaDependencia: this.Solicitud220503State.cadenaDependencia,
          banco: this.Solicitud220503State.banco,
          llavePago: this.Solicitud220503State.llavePago,
          importePago: this.Solicitud220503State.importePago,
          fetchapago: this.Solicitud220503State.fetchapago,
        });
      })
    )
    .subscribe();

    this.getJustificacion();
    this.getBanco();
    this.getPagoDeDerechos();
  }

  /** 
 * Obtiene la información sobre el pago de derechos a través del servicio `revisionService` 
 * y actualiza el store con la respuesta recibida.
 */
  getPagoDeDerechos(): void {
    this.revisionService.getPagoDeDerechos().pipe(takeUntil(this.destroyed$)).subscribe({
      next: (resp: PagoDeDerechos) => {
        this.Solicitud220503Store.setJustificacion(resp.justificacion);
        this.Solicitud220503Store.setClaveReferencia(resp.claveReferencia);
        this.Solicitud220503Store.setCadenaDependencia(resp.cadenaDependencia);
        this.Solicitud220503Store.setBanco(resp.banco);
        this.Solicitud220503Store.setIlavePago(resp.llavePago);
        this.Solicitud220503Store.setImportePago(resp.importePago);
        this.Solicitud220503Store.setFetchaPago(resp.fetchapago);
      },
    });
  }

  /**
   * Obtiene la justificación del pago.
   * Este método llama al servicio de revisión para obtener la justificación.
   * @returns {void}
   */
  getJustificacion(): void {
    this.revisionService.getJustificacion().pipe(takeUntil(this.destroyed$)).subscribe((resp) => {
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
    this.Solicitud220503Store.setJustificacion(event.id);
  }

  /** 
   * Método para establecer la clave de referencia. 
   * Captura el valor ingresado en el campo de entrada y lo actualiza en el estado.
   * 
   * @param event - Evento del input HTML que contiene la clave de referencia.
   */
  setClaveReferencia(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.Solicitud220503Store.setClaveReferencia(VALUE);
  }

  /** 
   * Método para establecer la cadena de dependencia. 
   * Captura el valor ingresado en el campo de entrada y lo actualiza en el estado.
   * 
   * @param event - Evento del input HTML que contiene la cadena de dependencia.
   */
  setCadenaDependencia(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.Solicitud220503Store.setCadenaDependencia(VALUE);
  }

  /** 
   * Método para establecer si el pago está exento o no. 
   * Recibe un valor numérico o de tipo string y lo actualiza en el estado.
   * 
   * @param value - Valor que indica si el pago es exento (string o number).
   */
  setExentoPagoNo(value: string | number): void {
    this.Solicitud220503Store.setExentoPagoNo(value);
  }


  /** 
   * Selecciona un banco desde el catálogo y actualiza el store con la información correspondiente.
   * @param event Objeto de tipo Catalogo que contiene la información del banco seleccionado.
   */
  selectBancoCatalogo(event: Catalogo): void {
    this.Solicitud220503Store.setBanco(event.id);
  }

  /** 
   * Método para establecer la llave de pago. 
   * Captura el valor ingresado en el campo de entrada y lo actualiza en el estado.
   * 
   * @param event - Evento del input HTML que contiene el valor de la llave de pago.
   */
  setIlavePago(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.Solicitud220503Store.setIlavePago(VALUE);
  }

  /** 
   * Método para establecer la fecha de pago. 
   * Captura el valor ingresado en el campo de entrada y lo actualiza en el estado.
   * 
   * @param event - Evento del input HTML que contiene la fecha de pago.
   */
  setFetchaPago(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.Solicitud220503Store.setFetchaPago(VALUE);
  }

  /** 
   * Método para establecer el importe de pago. 
   * Captura el valor ingresado en el campo de entrada y lo actualiza en el estado.
   * 
   * @param event - Evento del input HTML que contiene el importe de pago.
   */
  setImportePago(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.Solicitud220503Store.setImportePago(VALUE);
  }


  /**
   * Obtiene el banco para el pago.
   * Este método llama al servicio de revisión para obtener el banco.
   * @returns {void}
   */
  getBanco(): void {
    this.revisionService.getBanco().pipe(takeUntil(this.destroyed$)).subscribe((resp) => {
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
   * */
    ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
    }
}
