import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { PagoDeDerechos } from '../../models/pago-de-derechos.model';
import { RevisionService } from '../../services/revision.service';
import { SagarpaQuery } from '../../estados/sagarpa.query';
import { SagarpaStore } from '../../estados/sagarpa.store';
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
  justificacion!: CatalogosSelect;

  /**
   * Banco seleccionado.
   * @type {CatalogosSelect}
   */
  banco!: CatalogosSelect;

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
   * Constructor del componente.
   *
   * @param {FormBuilder} fb - El servicio FormBuilder de Angular para crear formularios.
   * @param {RevisionService} revisionService - El servicio de revisión para obtener datos relacionados con el pago.
   */
  constructor(
    private readonly fb: FormBuilder,
    revisionService: RevisionService,
    public store : SagarpaStore,
    public query : SagarpaQuery
  ) {
    this.revisionService = revisionService;
  }

  /**
   * Inicializa el componente y configura el formulario de pago.
   * @returns {void}
   */
  ngOnInit(): void {
    this.pagoForm = this.fb.group({
      exentoPagoNo: [{ value: '', disabled: true }],
      exentoPagoSi: [{ value: '', disabled: true }],
      justificacion: [{ value: '', disabled: true }],
      claveReferencia: [{ value: '454000554', disabled: true }],
      cadenaDependencia: [{ value: '0003008010CEZI', disabled: true }],
      banco: [{ value: '', disabled: true }],
      llavePago: [{ value: 'A94FA47497834FBD', disabled: true }],
      importePago: [{ value: '2562', disabled: true }],
      fetchapago: [{ value: '01/08/24', disabled: true }],
    });

    this.query.seleccionarPagoDeDerechos$
    .pipe(
      takeUntil(this.destroyed$),
      map((data: PagoDeDerechos) => {
        this.pagoForm.patchValue({
          exentoPagoNo: data.exentoPagoNo,
          exentoPagoSi: data.exentoPagoSi,
          justificacion: data.justificacion,
          claveReferencia: data.claveReferencia,
          cadenaDependencia: data.cadenaDependencia,
          banco: data.banco,
          llavePago: data.llavePago,
          importePago: data.importePago,
          fetchapago: data.fetchapago,
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
        this.store.actualizarPagoDeDerechos(resp);
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
    this.store.actualizarJustificacionCatalogo(event);
  }

  /** 
   * Selecciona un banco desde el catálogo y actualiza el store con la información correspondiente.
   * @param event Objeto de tipo Catalogo que contiene la información del banco seleccionado.
   */
  selectBancoCatalogo(event: Catalogo): void {
    this.store.actualizarBancoCatalogo(event);
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
