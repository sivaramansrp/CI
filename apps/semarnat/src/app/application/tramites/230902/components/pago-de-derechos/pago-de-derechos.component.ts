/**
 * Componente para gestionar el pago de derechos.
 * 
 * {OnInit, OnDestroy}
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Subject, takeUntil } from 'rxjs';
import { Solicitud230902State, Tramite230902Store } from '../../estados/tramite230902.store';
import { Tramite230902Query } from '../../estados/tramite230902.query';
import { PermisoCitesService } from '../../services/permiso-cites.service';
import { InputFecha } from '@libs/shared/data-access-user/src';
import { FECHA } from '../../enum/fetcha.enum';

@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrls: ['./pago-de-derechos.component.css'],
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
   * 
   */
  ngOnInit(): void {
    this.permisoCitesService.inicializaPagoDeDerechosDatosCatalogos();
    this.tramite230902Query.selectSolicitud$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(state => { this.solicitud230902State = state });

    this.createFormPagoDerechos();
  }

  /**
   * Crea el formulario para el pago de derechos.
   * 
   */
  createFormPagoDerechos(): void {
    this.formPagoDerechos = this.formBuilder.group({
      claveDeReferencia: new FormControl(this.solicitud230902State.claveDeReferencia),
      cadenaDeLaDependencia: new FormControl(this.solicitud230902State.cadenaDeLaDependencia),
      banco: new FormControl(this.solicitud230902State.bancoseleccionado, Validators.required),
      llaveDePago: new FormControl(this.solicitud230902State.llaveDePago, Validators.required),
      fechaDePago: new FormControl(this.solicitud230902State.fechaDePago, Validators.required),
      importeDePago: new FormControl({ value: this.solicitud230902State.importeDePago, disabled: true }),
    });
   
    this.formPagoDerechos.get('claveDeReferencia')?.disable();
    this.formPagoDerechos.get('cadenaDeLaDependencia')?.disable();
    this.formPagoDerechos.get('importeDePago')?.disable();
  }

  /**
   * Maneja el cambio de fecha final.
   * {string} nuevo_valor - El nuevo valor de la fecha.
   * 
   */
  cambioFechaFinal(nuevo_valor: string): void {
    this.formPagoDerechos.patchValue({
      fechaDePago: nuevo_valor,
    });
    this.tramite230902Store.setFechaDePago(
      this.formPagoDerechos.get('fechaDePago')?.value
    );
  }

  /**
   * Maneja la selección de banco.
   * 
   */
  onBancoSeleccion(): void {
    this.tramite230902Store.setbancoseleccionado(
      this.formPagoDerechos.get('banco')?.value
    );
  }

  /**
   * Maneja el cambio de llave de pago.
   * 
   */
  onllavaDePagoChange(): void {
    this.tramite230902Store.setLlaveDePago(
      this.formPagoDerechos.get('llaveDePago')?.value
    );
  }

  /**
   * Destruye las suscripciones cuando el componente se destruye.
   * 
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}