import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { OpcionesDeBotonDeRadio } from '../../enums/sagarpa.enum';
import { PagoDeDerechos } from '../../models/pago-de-derechos.model';
import { RevisionService } from '../../services/revision.service';
import { Solicitud220501Query } from '../../estados/tramites220501.query';
import { Solicitud220501State } from '../../estados/tramites220501.store';
import { Solicitud220501Store } from '../../estados/tramites220501.store';
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
   * Estado de la solicitud 220501. 
   * Se inicializa como un objeto vacío con la estructura de Solicitud220501State.
   */
  solicitud220501State: Solicitud220501State = {} as Solicitud220501State;

  /** 
   * Variable para almacenar el valor de la opción seleccionada en el botón de radio 
   * relacionado con "esSolicitudFerros".
   */
  esSolicitudFerrosValor!: string;

  /** 
   * Enumeración u objeto que contiene las opciones disponibles para el botón de radio.
   */
  opcionDeBotonDeRadio = OpcionesDeBotonDeRadio;

  /**
   * Constructor del componente.
   *
   * @param {FormBuilder} fb - El servicio FormBuilder de Angular para crear formularios.
   * @param {RevisionService} revisionService - El servicio de revisión para obtener datos relacionados con el pago.
   */
  constructor(
    private readonly fb: FormBuilder,
    revisionService: RevisionService,
    public solicitud220501Store : Solicitud220501Store,
    public solicitud220501Query : Solicitud220501Query
  ) {
    this.revisionService = revisionService;
  }

  /**
   * Inicializa el componente y configura el formulario de pago.
   * @returns {void}
   */
  ngOnInit(): void {
     this.pagoForm = this.fb.group({
      exentoPagoNo: [{ value: this.solicitud220501State.exentoPagoNo}],
      justificacion: [{ value: this.solicitud220501State.justificacion, disabled: true }],
      claveReferencia: [{ value: this.solicitud220501State.claveReferencia, disabled: true }],
      cadenaDependencia: [{ value: this.solicitud220501State.cadenaDependencia, disabled: true }],
      banco: [{ value: this.solicitud220501State.banco, disabled: true }],
      llavePago: [{ value: this.solicitud220501State.llavePago, disabled: true }],
      importePago: [{ value: this.solicitud220501State.importePago, disabled: true }],
      fetchapago: [{ value: this.solicitud220501State.fetchapago, disabled: true }],
    });

    this.solicitud220501Query.selectSolicitud$
    .pipe(
      takeUntil(this.destroyed$),
      map((data: Solicitud220501State) => {
        this.solicitud220501State = data;
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
  }

  /** 
 * Obtiene la información sobre el pago de derechos a través del servicio `revisionService` 
 * y actualiza el store con la respuesta recibida.
 */
  getPagoDeDerechos(): void {
    this.revisionService.getPagoDeDerechos().subscribe({
      next: (resp: PagoDeDerechos) => {
        this.solicitud220501Store.setJustificacion(resp.justificacion);
        this.solicitud220501Store.setClaveReferencia(resp.claveReferencia);
        this.solicitud220501Store.setCadenaDependencia(resp.cadenaDependencia);
        this.solicitud220501Store.setBanco(resp.banco);
        this.solicitud220501Store.setIlavePago(resp.llavePago);
        this.solicitud220501Store.setImportePago(resp.importePago);
        this.solicitud220501Store.setFetchaPago(resp.fetchapago);
      },
    });
  }

  /**
   * Obtiene la justificación del pago.
   * Este método llama al servicio de revisión para obtener la justificación.
   * @returns {void}
   */
  getJustificacion(): void {
    this.revisionService.getJustificacion().subscribe((resp) => {
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
    this.solicitud220501Store.setJustificacion(event.id);
  }

  /** 
   * Método para establecer la clave de referencia. 
   * Captura el valor ingresado en el campo de entrada y lo actualiza en el estado.
   * 
   * @param event - Evento del input HTML que contiene la clave de referencia.
   */
  setClaveReferencia(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud220501Store.setClaveReferencia(VALUE);
  }

  /** 
   * Método para establecer la cadena de dependencia. 
   * Captura el valor ingresado en el campo de entrada y lo actualiza en el estado.
   * 
   * @param event - Evento del input HTML que contiene la cadena de dependencia.
   */
  setCadenaDependencia(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud220501Store.setCadenaDependencia(VALUE);
  }

  /** 
   * Método para establecer si el pago está exento o no. 
   * Recibe un valor numérico o de tipo string y lo actualiza en el estado.
   * 
   * @param value - Valor que indica si el pago es exento (string o number).
   */
  setExentoPagoNo(value: string | number): void {
    this.solicitud220501Store.setExentoPagoNo(value);
  }


  /** 
   * Selecciona un banco desde el catálogo y actualiza el store con la información correspondiente.
   * @param event Objeto de tipo Catalogo que contiene la información del banco seleccionado.
   */
  selectBancoCatalogo(event: Catalogo): void {
    this.solicitud220501Store.setBanco(event.id);
  }

  /** 
   * Método para establecer la llave de pago. 
   * Captura el valor ingresado en el campo de entrada y lo actualiza en el estado.
   * 
   * @param event - Evento del input HTML que contiene el valor de la llave de pago.
   */
  setIlavePago(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud220501Store.setIlavePago(VALUE);
  }

  /** 
   * Método para establecer la fecha de pago. 
   * Captura el valor ingresado en el campo de entrada y lo actualiza en el estado.
   * 
   * @param event - Evento del input HTML que contiene la fecha de pago.
   */
  setFetchaPago(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud220501Store.setFetchaPago(VALUE);
  }

  /** 
   * Método para establecer el importe de pago. 
   * Captura el valor ingresado en el campo de entrada y lo actualiza en el estado.
   * 
   * @param event - Evento del input HTML que contiene el importe de pago.
   */
  setImportePago(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud220501Store.setImportePago(VALUE);
  }


  /**
   * Obtiene el banco para el pago.
   * Este método llama al servicio de revisión para obtener el banco.
   * @returns {void}
   */
  getBanco(): void {
    this.revisionService.getBanco().subscribe((resp) => {
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
