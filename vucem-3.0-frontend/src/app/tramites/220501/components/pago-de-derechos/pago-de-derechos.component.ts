import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  CatalogosSelect,
  InputFecha,
} from '../../../../core/models/shared/components.model';
import { FECHA_DE_PAGO } from '../../../../shared/constantes/issuance-extension-modification.enum';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { RevisionService } from '../../../../core/services/220501/revision.service';

/**
 * Componente para gestionar el pago de derechos.
 */
@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrls: ['./pago-de-derechos.component.scss'],
})
export class PagoDeDerechosComponent implements OnInit {
  /**
   * Fecha de inicio del pago.
   * @type {InputFecha}
   */
  fechaInicioInput: InputFecha = FECHA_DE_PAGO;

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
   * Constructor del componente.
   * 
   * @param {FormBuilder} fb - El servicio FormBuilder de Angular para crear formularios.
   * @param {RevisionService} revisionService - El servicio de revisión para obtener datos relacionados con el pago.
   */
  constructor(
    private readonly fb: FormBuilder,
    revisionService: RevisionService
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

    this.getJustificacion();
    this.getBanco();
  }

  /**
   * Establece la justificación seleccionada.
   * @param {Catalogo} e - La justificación seleccionada.
   * @returns {void}
   */
  justificacionDe(e: Catalogo): void {
    this.justificacionde = e;
  }

  /**
   * Establece el banco seleccionado.
   * @param {Catalogo} e - El banco seleccionado.
   * @returns {void}
   */
  bancoDe(e: Catalogo): void {
    this.bancode = e;
  }

  /**
   * Obtiene la justificación del pago.
   * Este método llama al servicio de revisión para obtener la justificación.
   * @returns {void}
   */
  getJustificacion(): void {
    this.revisionService.getJustificacion().subscribe((resp) => {
      if (resp.code == 200) {
        const response = resp.data;

        this.justificacion = {
          labelNombre: 'Justificación',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: response,
        };
      }
    });
  }

  /**
   * Obtiene el banco para el pago.
   * Este método llama al servicio de revisión para obtener el banco.
   * @returns {void}
   */
  getBanco(): void {
    this.revisionService.getBanco().subscribe((resp) => {
      if (resp.code == 200) {
        const response = resp.data;

        this.banco = {
          labelNombre: 'Banco',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: response,
        };
      }
    });
  }
}
