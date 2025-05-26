/**
 * Componente para gestionar el pago de derechos.
 * 
 * Métodos:
 * - ngOnInit: Inicializa el componente y configura las suscripciones necesarias.
 * - crearFormularioPagoDerechos: Crea y configura el formulario para el pago de derechos.
 * - cambioFechaFinal: Maneja el cambio de la fecha final en el formulario.
 * - onBancoSeleccion: Maneja la selección de un banco en el formulario.
 * - onllavaDePagoChange: Maneja el cambio de la llave de pago en el formulario.
 * - ngOnDestroy: Limpia las suscripciones cuando el componente se destruye.
 */
import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

import { InputFecha } from '@libs/shared/data-access-user/src';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

import { FECHA } from '../../enum/fetcha.enum';

import { PermisoCitesService } from '../../services/permiso-cites.service';

import { Solicitud230902State } from '../../estados/tramite230902.store';
import { Tramite230902Query } from '../../estados/tramite230902.query';
import { Tramite230902Store } from '../../estados/tramite230902.store';

@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrls: ['./pago-de-derechos.component.scss'],
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy {

  /**
   * Formulario para el pago de derechos.
   * {FormGroup}
   */
  formPagoDerechos!: FormGroup;

  /**
   * Entrada de fecha final.
   * {InputFecha}
   */
  fechaFinalInput: InputFecha = FECHA;

  /**
   * Estado de la solicitud 230902.
   * {Solicitud230902State}
   */
  solicitud230902State!: Solicitud230902State;

  /**
   * Notificador para destruir las suscripciones.
   * {Subject<void>}
   */
  private destroyed$: Subject<void> = new Subject();

  /**
   * Crea una instancia de PagoDeDerechosComponent.
   * {PermisoCitesService} permisoCitesService - Servicio de permisos CITES.
   * {Tramite230902Store} tramite230902Store - Almacén de trámites 230902.
   * {Tramite230902Query} tramite230902Query - Consulta de trámites 230902.
   * {FormBuilder} formBuilder - Constructor de formularios.
   */
  constructor(
    public permisoCitesService: PermisoCitesService,
    private tramite230902Store: Tramite230902Store,
    private tramite230902Query: Tramite230902Query,
    private formBuilder: FormBuilder
  ) {
    // No hacer nada
  }

  /**
   * Inicializa el componente.
   * Configura las suscripciones necesarias y prepara el formulario.
   */
  ngOnInit(): void {
    this.permisoCitesService.inicializaPagoDeDerechosDatosCatalogos();
    this.tramite230902Query.selectSolicitud$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(state => { this.solicitud230902State = state });

    /**
     * Crea el formulario de pago de derechos.
     */
    this.crearFormularioPagoDerechos();
  }

  /**
   * Crea el formulario para el pago de derechos.
   * Configura los campos del formulario con validaciones y valores iniciales.
   */
  crearFormularioPagoDerechos(): void {
    this.formPagoDerechos = this.formBuilder.group({
      claveDeReferencia: new FormControl(this.solicitud230902State.claveDeReferencia),
      cadenaPagoDependencia: new FormControl(this.solicitud230902State.cadenaPagoDependencia),
      banco: new FormControl(this.solicitud230902State.banco, Validators.required),
      llaveDePago: new FormControl(this.solicitud230902State.llaveDePago, Validators.required),
      fecPago: new FormControl(this.solicitud230902State.fecPago, Validators.required),
      impPago: new FormControl({ value: this.solicitud230902State.impPago, disabled: true }),
    });
   
    this.formPagoDerechos.get('claveDeReferencia')?.disable();
    this.formPagoDerechos.get('cadenaPagoDependencia')?.disable();
    this.formPagoDerechos.get('impPago')?.disable();
  }

  /**
   * Maneja el cambio de la fecha final en el formulario.
   * Actualiza el valor de la fecha en el estado del formulario y en el almacén.
   * 
   * @param nuevo_valor El nuevo valor de la fecha final.
   */
  cambioFechaFinal(nuevo_valor: string): void {
    this.formPagoDerechos.patchValue({
      fecPago: nuevo_valor,
    });
    this.tramite230902Store.setfecPago(
      this.formPagoDerechos.get('fecPago')?.value
    );
  }

  /**
   * Maneja el cambio de la llave de pago en el formulario.
   * Actualiza la llave de pago en el almacén.
   */
   onllavaDePagoChange(): void {
    const CAPITALIZED_VALUE = this.formPagoDerechos
    .get('llaveDePago')
    ?.value.toUpperCase();
    this.formPagoDerechos.get('llaveDePago')?.setValue(CAPITALIZED_VALUE);
  }

  /**
   * Método setValoresStore
   * Descripción: Actualiza un valor específico en el store utilizando el método correspondiente.
   * Parámetros:
   *   - form: Formulario reactivo que contiene los datos.
   *   - campo: Nombre del campo cuyo valor se actualizará en el store.
   *   - metodoNombre: Nombre del método del store que se utilizará para actualizar el valor.
   */
    setValoresStore(form: FormGroup, campo: string): void {
      const VALOR = form.get(campo)?.value;
      this.tramite230902Store.establecerDatos({ [campo]: VALOR });
    }

  /**
   * Limpia las suscripciones cuando el componente se destruye.
   * Evita fugas de memoria al completar el Subject.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}