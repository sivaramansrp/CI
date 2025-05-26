
/**
 * Importaciones necesarias para el funcionamiento del componente.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CatalogoResponse, CatalogoSelectComponent, InputFecha, InputFechaComponent } from '@libs/shared/data-access-user/src';

import { TituloComponent } from '@libs/shared/data-access-user/src';

import { PagoDeDerechosService } from '../../services/pago-de-derechos.service';
import { Tramite260212Store } from '../../estados/tramite260212.store';

import { FECHA_DE_PAGO } from '../../constantes/permiso-maquila.enum';

import { Tramite260212Query } from '../../estados/tramite260212.query';

import { map, Observable, Subject, Subscription, takeUntil } from 'rxjs';

import { ConsultaioQuery } from '@ng-mf/data-access-user';
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
 esFormularioSoloLectura: boolean = true;
   private subscription: Subscription = new Subscription();
  /** Subject para destruir el componente */
  private destroy$ = new Subject<void>();
  /** Observable para el estado seleccionado */
  selectedBanco$: Observable<string> =
    this.tramite260212Query.selectedBanco$;
  /** Catálogo de estados cargado desde un archivo JSON */
  pagoDerechos!: FormGroup;

  claveDeReferncia$ = this.tramite260212Query.selectedClaveDeReferncia$
  cadenaDeLaDependencia$ = this.tramite260212Query.selectedCadenaDeLaDependencia$
  llaveDePago$ = this.tramite260212Query.selectedLlaveDePago$
  fechaDePago$ = this.tramite260212Query.selectedFechaDePago$
  importeDePago$ = this.tramite260212Query.selectedImporteDePago$


  fechaInicioInput: InputFecha = FECHA_DE_PAGO;

  fechaPagoDate: string = '15/03/2025';

  /**
   * Datos para el selector de opciones.
   */
  dropdownData: CatalogoResponse[] = [];

  /**
 * Constructor del componente.
 * Inyecta el FormBuilder y el servicio de pago de derechos.
 * 
 * @param fb Constructor de formularios para crear el formulario reactivos.
 * @param pagoDeDerechosService Servicio que proporciona datos para el componente.
 */
  constructor(
    private fb: FormBuilder,
    private pagoDeDerechosService: PagoDeDerechosService,
    private tramite260212Store: Tramite260212Store,
    private tramite260212Query: Tramite260212Query,
    private consultaioQuery: ConsultaioQuery
    // eslint-disable-next-line no-empty-function
  ) {
      this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroy$),
      map((seccionState)=>{
        this.esFormularioSoloLectura = seccionState.readonly;
        // this.esFormularioSoloLectura = true;
        this.inicializarEstadoFormulario();
      })
    )
    .subscribe()
   }

 /**
   * Ciclo de vida que se ejecuta al iniciar el componente.
   * Obtiene los datos para el selector de opciones desde el servicio.
   */
  ngOnInit(): void {
    this.pagoDerechos= this.fb.group({
      claveDeReferncia: ['', [Validators.required]],
      cadenaDeLaDependencia: ['', [Validators.required]],
      banco: ['', [Validators.required]],
      llaveDePago: ['', [Validators.required]],
      fechaDePago: ['', [Validators.required]],
      importeDePago: ['', [Validators.required]],
    });
   
  this.inicializarEstadoFormulario();
  }

  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      //this.inicializarFormulario();
      this.actualizarEstado();
    }  
  }


  guardarDatosFormulario(): void {
    this.actualizarEstado();
      if (this.esFormularioSoloLectura) {
        this.pagoDerechos.disable();
      } else if (!this.esFormularioSoloLectura) {
        this.pagoDerechos.enable();
      } else {
        // No se requiere ninguna acción en el formulario
      }
  }


  actualizarEstado(): void {

 this.pagoDeDerechosService.getData().subscribe((data) => {
      this.dropdownData = data;
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
   * Actualiza el valor de claveDeReferncia en el tramite260212Store.
   * 
   * Este método obtiene el valor de 'claveDeReferncia' del control de formulario 
   * 'pagoDerechos' y lo establece en el 'tramite260212Store'.
   * 
   * @comdoc
   */
  actualizarClaveDeReferncia(): void {
    const CORREO = this.pagoDerechos.get('claveDeReferncia')?.value;
    this.tramite260212Store.setClaveDeReferncia(CORREO);
  }
  /**
   * Actualiza el valor de cadenaDeLaDependencia en el tramite260212Store.
   * 
   * Este método obtiene el valor de 'cadenaDeLaDependencia' del control de formulario 
   * 'pagoDerechos' y lo establece en el 'tramite260212Store'.
   * 
   * @comdoc
   */
  actualizarCadenaDeLaDependencia(): void {
    const CORREO = this.pagoDerechos.get('cadenaDeLaDependencia')?.value;
    this.tramite260212Store.setCadenaDeLaDependencia(CORREO);
  }
  /**
   * Actualiza el valor de llaveDePago en el tramite260212Store.
   * 
   * Este método obtiene el valor de 'llaveDePago' del control de formulario 
   * 'pagoDerechos' y lo establece en el 'tramite260212Store'.
   * 
   * @comdoc
   */
  actualizarLlaveDePago(): void {
    const CORREO = this.pagoDerechos.get('llaveDePago')?.value;
    this.tramite260212Store.setLlaveDePago(CORREO);
  }
  /**
   * Actualiza el valor de fechaDePago en el tramite260212Store.
   * 
   * Este método obtiene el valor de 'fechaDePago' del control de formulario 
   * 'pagoDerechos' y lo establece en el 'tramite260212Store'.
   * 
   * @comdoc
   */
  actualizarFechaDePago(): void {
    const CORREO = this.pagoDerechos.get('fechaDePago')?.value;
    this.tramite260212Store.setFechaDePago(CORREO);
  }
  /**
   * Actualiza el valor de importeDePago en el tramite260212Store.
   * 
   * Este método obtiene el valor de 'importeDePago' del control de formulario 
   * 'pagoDerechos' y lo establece en el 'tramite260212Store'.
   * 
   * @comdoc
   */
  actualizarImporteDePago(): void {
    const CORREO = this.pagoDerechos.get('importeDePago')?.value;
    this.tramite260212Store.setImporteDePago(CORREO);
  }
  /**
 * Obtiene el estado seleccionado del formulario y lo guarda en el store
 */
  getMunicipios(): void {
    const SELECTED_BANCO = this.pagoDerechos.get('banco')?.value;
    this.tramite260212Store.setBanco(SELECTED_BANCO);
  }

  /*
  * Método del ciclo de vida de Angular - destruye el componente
*/
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.subscription.unsubscribe();
  }
}
