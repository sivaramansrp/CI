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
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

import { InputFecha } from '@libs/shared/data-access-user/src';

import { map } from 'rxjs';

import { takeUntil } from 'rxjs';

import { FECHA } from '../../enum/fetcha.enum';

import { PermisoCitesService } from '../../services/permiso-cites.service';
import { Subject } from 'rxjs';

import { Solicitud230902State } from '../../estados/tramite230902.store';
import { Subscription } from 'rxjs';
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

  esFormularioSoloLectura: boolean = false; 
  private subscription: Subscription = new Subscription();
 

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
    private formBuilder: FormBuilder,
    private consultaioQuery: ConsultaioQuery,
  ) {
     this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyed$),
      map((seccionState) => {
       this.esFormularioSoloLectura = seccionState.readonly;
       this.inicializarEstadoFormulario();
      })
    )
    .subscribe()
  }

 inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario(); // Llama al método para cargar los datos del formulario
    } else {
      this.crearFormularioPagoDerechos();
    }
  }
 guardarDatosFormulario(): void {
    this.crearFormularioPagoDerechos();
    if (this.esFormularioSoloLectura) {
      this.formPagoDerechos.disable();
       this.fechaFinalInput.habilitado = false
       this.fechaFinalInput.required = false
    } else if (!this.esFormularioSoloLectura) {
      this.formPagoDerechos.enable();
      this.fechaFinalInput.habilitado = true
      this.fechaFinalInput.required = true
    } else {
      // No se requiere ninguna acción en el formulario
    }
 }

 
  /**
   * Inicializa el componente.
   * Configura las suscripciones necesarias y prepara el formulario.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
    this.permisoCitesService.inicializaPagoDeDerechosDatosCatalogos();
   

    /**
     * Crea el formulario de pago de derechos.
     */
   
    
  }

  /**
   * Crea el formulario para el pago de derechos.
   * Configura los campos del formulario con validaciones y valores iniciales.
   */
  crearFormularioPagoDerechos(): void {
  this.tramite230902Query.selectSolicitud$
  .pipe(takeUntil(this.destroyed$))
  .subscribe(state => { this.solicitud230902State = state });
   this.subscription.add(
        this.tramite230902Query.selectSolicitud$
          .pipe(
            takeUntil(this.destroyed$),
            map((seccionState) => {
              this. solicitud230902State = seccionState;
            })
          )
          .subscribe()
      );

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
   * Maneja la selección de un banco en el formulario.
   * Actualiza el banco seleccionado en el almacén.
   */

  onBancoSeleccion(): void {
    this.tramite230902Store.setbancoseleccionado(
      this.formPagoDerechos.get('banco')?.value
    );
  }
  /**
   * Maneja el cambio de la llave de pago en el formulario.
   * Actualiza la llave de pago en el almacén.
   */
  onllavaDePagoChange(event: Event): void {
    const INPUT_ELEMENT = event.target as HTMLInputElement;
    const CAPITALIZED_VALUE = INPUT_ELEMENT.value.toUpperCase();
    INPUT_ELEMENT.value = CAPITALIZED_VALUE; // Update the input field value to uppercase
    this.tramite230902Store.setllaveDePago(CAPITALIZED_VALUE); // Update the store with the uppercase value
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