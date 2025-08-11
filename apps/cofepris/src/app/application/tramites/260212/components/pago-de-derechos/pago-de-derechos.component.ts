/**
 * Importaciones necesarias para el funcionamiento del componente.
 */
import { CatalogoResponse, CatalogoSelectComponent, InputFecha, InputFechaComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Tramite260212State, Tramite260212Store } from '../../estados/tramite260212.store';

import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { PagoDeDerechosService } from '../../services/pago-de-derechos.service';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite260212Query } from '../../estados/tramite260212.query';

import { ESTADOS_DATA, FECHA_DE_PAGO } from '../../constantes/permiso-maquila.enum';
/**
 * Componente que gestiona el pago de derechos.
 * Utiliza un formulario reactivos para recopilar datos del usuario.
 */
@Component({
  selector: 'app-pago-de-derechos',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    InputFechaComponent
  ],
  templateUrl: './pago-de-derechos.component.html',
  styleUrls: ['./pago-de-derechos.component.scss',],
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy {
   /**
   * Estado de la solicitud 221601, que contiene los valores actuales de la solicitud.
   */
  public solicitudState!: Tramite260212State;
  /**
   * Indica si el formulario está en modo solo lectura.
   */
 public esFormularioSoloLectura: boolean = true;
/**
   * Subject para limpiar recursos y cancelar suscripciones al destruir el componente.
   */
  private destroy$ = new Subject<void>();

  /**
   * Observable para el banco seleccionado desde el store.
   */
  selectedBanco$: Observable<string> =
    this.tramite260212Query.selectedBanco$;

  /**
   * Formulario reactivo principal para el pago de derechos.
   */
  pagoDerechos!: FormGroup;

  /**
   * Observable para la clave de referencia seleccionada.
   */
  claveDeReferncia$ = this.tramite260212Query.selectedClaveDeReferncia$

  /**
   * Observable para la cadena de la dependencia seleccionada.
   */
  cadenaDeLaDependencia$ = this.tramite260212Query.selectedCadenaDeLaDependencia$

  /**
   * Observable para la llave de pago seleccionada.
   */
  llaveDePago$ = this.tramite260212Query.selectedLlaveDePago$

  /**
   * Observable para la fecha de pago seleccionada.
   */
  fechaDePago$ = this.tramite260212Query.selectedFechaDePago$

  /**
   * Observable para el importe de pago seleccionado.
   */
  importeDePago$ = this.tramite260212Query.selectedImporteDePago$

  /**
   * Configuración para el input de fecha de inicio.
   */
  fechaInicioInput: InputFecha = FECHA_DE_PAGO;
  /**
   * Subject utilizado para gestionar la destrucción del componente y evitar memory leaks.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Fecha de pago por defecto (ejemplo).
   */
  fechaPagoDate: string = '15/03/2025';

  /**
   * Datos para poblar el selector de bancos.
   */
  dropdownData: CatalogoResponse[] = ESTADOS_DATA;

  /**
   * Inicializa el formulario y el estado de solo lectura según el store global.
   */
  constructor(
    private fb: FormBuilder,
    private pagoDeDerechosService: PagoDeDerechosService,
    private tramite260212Store: Tramite260212Store,
    private tramite260212Query: Tramite260212Query,
    private consultaioQuery: ConsultaioQuery
  ) {
   
  }

  /**
   * Inicializa el formulario reactivo y el estado del componente.
   */
  ngOnInit(): void {
  
     this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          
        })
      )
      .subscribe()

    this.inicializarEstadoFormulario();
  }

  /**
   * Inicializa el estado del formulario según el modo de solo lectura.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      if (this.pagoDerechos) {
        this.guardarDatosFormulario();
      }
    } else {
      this.actualizarEstado();
    }
  }

  /**
   * Aplica el modo solo lectura o edición al formulario según corresponda.
   */
  guardarDatosFormulario(): void {
    this.actualizarEstado();
    if (this.pagoDerechos) {
      if (this.esFormularioSoloLectura) {
        this.pagoDerechos.disable();
      } else if (!this.esFormularioSoloLectura) {
        this.pagoDerechos.enable();
      }
    }
  }

  /**
   * Sincroniza el formulario con el estado global y carga los datos del selector.
   */
  actualizarEstado(): void {
      this.pagoDerechos = this.fb.group({
      claveDeReferncia: ['', [Validators.required]],
      cadenaDeLaDependencia: ['', [Validators.required]],
      banco: ['', [Validators.required]],
      llaveDePago: ['', [Validators.required]],
      fechaDePago: ['', [Validators.required]],
      importeDePago: ['', [Validators.required]],
    });
   
    this.selectedBanco$.subscribe((selectedBanco) => {
      if (selectedBanco) {
        this.pagoDerechos.get('banco')?.setValue(selectedBanco);
      }
    });
    this.claveDeReferncia$.pipe(takeUntil(this.destroy$)).subscribe((claveDeReferncia) => {
      if (claveDeReferncia) {       
        this.pagoDerechos.get('claveDeReferncia')?.setValue(claveDeReferncia);
      }
    });
    this.cadenaDeLaDependencia$.pipe(takeUntil(this.destroy$)).subscribe((cadenaDeLaDependencia) => {
      if (cadenaDeLaDependencia) {       
        this.pagoDerechos.get('cadenaDeLaDependencia')?.setValue(cadenaDeLaDependencia);
      }
    });
    this.llaveDePago$.pipe(takeUntil(this.destroy$)).subscribe((llaveDePago) => {
      if (llaveDePago) {
        this.pagoDerechos.get('llaveDePago')?.setValue(llaveDePago);
      }
    });
    this.fechaDePago$.pipe(takeUntil(this.destroy$)).subscribe((fechaDePago) => {
      if (fechaDePago) {
        this.pagoDerechos.get('fechaDePago')?.setValue(fechaDePago);
      }
    });
    this.importeDePago$.pipe(takeUntil(this.destroy$)).subscribe((importeDePago) => {
      if (importeDePago) {
        this.pagoDerechos.get('importeDePago')?.setValue(importeDePago);
      }
    });
  }

  /**
   * Actualiza el valor de claveDeReferncia en el store.
   */
  actualizarClaveDeReferncia(): void {
    const CORREO = this.pagoDerechos.get('claveDeReferncia')?.value;
    this.tramite260212Store.setClaveDeReferncia(CORREO);
  }

  /**
   * Actualiza el valor de cadenaDeLaDependencia en el store.
   */
  actualizarCadenaDeLaDependencia(): void {
    const CORREO = this.pagoDerechos.get('cadenaDeLaDependencia')?.value;
    this.tramite260212Store.setCadenaDeLaDependencia(CORREO);
  }

  /**
   * Actualiza el valor de llaveDePago en el store.
   */
  actualizarLlaveDePago(): void {
    const CORREO = this.pagoDerechos.get('llaveDePago')?.value;
    this.tramite260212Store.setLlaveDePago(CORREO);
  }

  /**
   * Actualiza el valor de fechaDePago en el store.
   */
  actualizarFechaDePago(event: string): void {
    if (event) {
      this.tramite260212Store.setFechaDePago(event);
    }
  }

  /**
   * Actualiza el valor de importeDePago en el store.
   */
  actualizarImporteDePago(): void {
    const CORREO = this.pagoDerechos.get('importeDePago')?.value;
    this.tramite260212Store.setImporteDePago(CORREO);
  }

  /**
   * Obtiene el banco seleccionado del formulario y lo guarda en el store.
   */
  obtenerBanco(): void {
    const BANCO_SELECCIONADO = this.pagoDerechos.get('banco')?.value;
    this.tramite260212Store.setBanco(BANCO_SELECCIONADO);
  }

  /**
 * Restablece el formulario de pago de derechos.
 *
 * @description
 * Este método reinicia todos los valores del formulario `pagoDeDerechosForm`,
 * eliminando cualquier dato ingresado previamente.
 */
  public borrarDatosDelPago(): void {
    this.pagoDerechos.reset();
  }

  /**
   * Limpia recursos y cancela suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
   
  }
}
