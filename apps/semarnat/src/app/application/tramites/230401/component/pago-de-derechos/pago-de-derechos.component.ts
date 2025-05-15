/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PagoDerechosState, dateLessThanOrEqualToday } from '../../models/tramies230401.models';
import { REGEX_IMPORTE_PAGO, REGEX_LLAVE_DE_PAGO, SeccionLibQuery } from '@libs/shared/data-access-user/src';
import {
  delay,
  map,
  takeUntil,
  tap,
} from 'rxjs';
import { PantallasActionService } from '../../services/pantallas-action.service';
import { SeccionLibState } from '@libs/shared/data-access-user/src/core/estados/seccion.store';
import { SeccionLibStore } from '@libs/shared/data-access-user/src/core/estados/seccion.store';
import { Solicitud230401Query } from '../../estados/queries/solicitud230401.query';
import { Subject } from 'rxjs';
import { Tramite230401Store } from '../../estados/tramite230401.store';

@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.scss'
})
export class PagoDeDerechosComponent implements OnInit {
  public pagoDerechos!: FormGroup;
  public clasificacion: string = '';
  private destroyNotifier$: Subject<void> = new Subject();
  public pagoDerechosState!: PagoDerechosState;
  private seccion!: SeccionLibState;

  constructor(public pantallasService: PantallasActionService, private fb: FormBuilder,
    public tramite230401Store:Tramite230401Store, public solicitud230401Query: Solicitud230401Query,
    private seccionQuery: SeccionLibQuery,private seccionStore: SeccionLibStore
  ) {
    this.pantallasService.inicializaPagoDerechosCatalogo();
  }

  /**
   * Crea y configura el formulario de pago de derechos.
   * Los campos 'clave', 'dependencia', 'llavePago' e 'importePago' están deshabilitados por defecto.
   * Los campos 'banco' y 'fecha' son obligatorios.
   */
  ngOnInit(): void {
     this.solicitud230401Query.seletPagoDerechosState$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.pagoDerechosState = seccionState;
          })
        ).subscribe();
    this.createPagoDerechos();
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();
    this.pagoDerechos.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap((_value) => {
          const SECCION: number = 2;
          const FORMAS_VALIDADAS = this.seccion.formaValida;
          const ES_VALIDO_EL_BANCO = this.pagoDerechos.get('banco')?.status;
          const ES_VALIDO_EL_FECHO = this.pagoDerechos.get('fecha')?.status;
          if (this.pagoDerechos.valid ||
            (ES_VALIDO_EL_BANCO === 'VALID' && ES_VALIDO_EL_FECHO === 'VALID')) {
            FORMAS_VALIDADAS[SECCION] = true;
            this.seccionStore.establecerFormaValida(FORMAS_VALIDADAS);
          } else {
            FORMAS_VALIDADAS[SECCION] = false;
            this.seccionStore.establecerFormaValida(FORMAS_VALIDADAS);
          }
        })
      )
      .subscribe();
  }
  /**
   * Este método inicializa el formulario `pagoDerechos` con varios campos predefinidos
   * y sus respectivas validaciones. Algunos campos están deshabilitados y tienen valores
   * predeterminados.
   * Campos del formulario:
   * - clave: Clave del trámite, deshabilitado y con valor predeterminado.
   * - dependencia: Dependencia correspondiente, deshabilitado y con valor predeterminado.
   * - banco: Banco donde se realizará el pago, requerido.
   * - llavePago: Llave de pago, deshabilitado y con valor predeterminado.
   * - importePago: Importe del pago, deshabilitado y con valor predeterminado.
    */
  createPagoDerechos(): void {
    this.pagoDerechos = this.fb.group({
      clave:  [this.pagoDerechosState.clave, [Validators.required, Validators.maxLength(50)]],
      dependencia: [this.pagoDerechosState.dependencia, [Validators.required, Validators.maxLength(50)]],
      banco: [this.pagoDerechosState.banco, [Validators.required]],
      llavePago: [ this.pagoDerechosState.llavePago, [Validators.required, Validators.pattern(REGEX_LLAVE_DE_PAGO)]],
      fecha: [this.pagoDerechosState.fecha, [Validators.required, dateLessThanOrEqualToday]],
      importePago: [ this.pagoDerechosState.importePago, [Validators.required, Validators.maxLength(16), Validators.pattern(REGEX_IMPORTE_PAGO)]],
    });
    const FETCHA_CONTROL = this.pagoDerechos.get('fecha');
    if (FETCHA_CONTROL) {
      FETCHA_CONTROL.valueChanges.subscribe((value) => {
        this.tramite230401Store.setPagoDerechosStateProperty('fecha', value);
      });
    }
  }

  
  /**
   * Método para manejar la selección de clasificación.
   */
  clasificacionSeleccione(): void {
    this.clasificacion = this.pagoDerechos.get('banco')?.value;
    this.tramite230401Store.setPagoDerechosStateProperty('banco', this.clasificacion);
  }

}
