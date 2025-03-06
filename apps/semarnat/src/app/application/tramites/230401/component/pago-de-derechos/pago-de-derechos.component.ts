/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  map,
  takeUntil,
} from 'rxjs';
import { PagoDerechosState } from '../../models/tramies230401.models';
import { PantallasActionService } from '../../services/pantallas-action.service';
import { REGEX_FECHA_VALIDA } from '@libs/shared/data-access-user/src';
import { Solicitud230401Query } from '../../estados/queries/solicitud230401.query';
import { Subject } from 'rxjs';
import { Tramite230401Store } from '../../estados/tramite230401.store';
/**
 * Validador de fecha que verifica si el valor del control sigue el formato dd/mm/yyyy.
 * 
 * @returns {ValidatorFn} Una función de validador que toma un AbstractControl y devuelve un objeto de error o null.
 */
export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string] : any } | null => {
    const IS_VALID = REGEX_FECHA_VALIDA.test(control.value);
    return IS_VALID ? null : { 'invalidDate': { value: control.value } };
  };
}

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

  constructor(public pantallasService: PantallasActionService, private fb: FormBuilder,
    public tramite230401Store:Tramite230401Store, public solicitud230401Query: Solicitud230401Query
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
   * - fecha: Fecha del pago, requerido y validado con `dateValidator`.
   * - importePago: Importe del pago, deshabilitado y con valor predeterminado.
    */
  createPagoDerechos(): void {
    this.pagoDerechos = this.fb.group({
      clave: [{ value: this.pagoDerechosState.clave, disabled: true }],
      dependencia: [{ value: this.pagoDerechosState.dependencia, disabled: true }],
      banco: [this.pagoDerechosState.banco, [Validators.required]],
      llavePago: [{ value: this.pagoDerechosState.llavePago, disabled: true }],
      fecha: [this.pagoDerechosState.fecha, [Validators.required, dateValidator()]],
      importePago: [{ value: this.pagoDerechosState.importePago, disabled: true }],
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
