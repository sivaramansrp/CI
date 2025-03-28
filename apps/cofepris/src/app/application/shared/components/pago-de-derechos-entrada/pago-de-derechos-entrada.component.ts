
/**
 * Importaciones necesarias para el funcionamiento del componente.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CatalogoSelectComponent, InputFecha, InputFechaComponent, catalogoResponse } from '@libs/shared/data-access-user/src';

import { TituloComponent } from '@libs/shared/data-access-user/src';

import { PagoDeDerechosEntradaService } from '../../services/pago-de-derechos-entrada.service';
import { Tramite260402Store } from '../../estados/tramite260402.store';

import { Tramite260402Query } from '../../estados/tramite260402.query';

import { Observable, Subject, takeUntil } from 'rxjs';
import { FECHA_PAGO } from '../../constantes/permiso-maquila-260402.enum';
/**
 * Componente que gestiona el pago de derechos.
 * Utiliza un formulario reactivos para recopilar datos del usuario.
 */
@Component({
  selector: 'app-pago-de-derechos-entrada',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    InputFechaComponent
  ],
  templateUrl: './pago-de-derechos-entrada.component.html',
  styleUrls: ['./pago-de-derechos-entrada.component.scss',],
})
export class PagoDeDerechosEntradaComponent implements OnInit, OnDestroy {

  /** Subject para destruir el componente */
  private destroy$ = new Subject<void>();


  /**
   * @observable selectedBanco$
   * @description Observable que representa el banco seleccionado en el contexto del componente.
   * @type {Observable<catalogoResponse | null>}
   * @remarks Este observable se suscribe al estado del query `tramite260402Query` 
   * para obtener el banco seleccionado. Puede emitir un valor de tipo `catalogoResponse` 
   * o `null` si no hay un banco seleccionado.
   */
  selectedBanco$: Observable<catalogoResponse | null> =
    this.tramite260402Query.selectedBanco$;
  
  /**
   * @observable claveDeReferncia$
   * @description Representa un observable que emite la clave de referencia seleccionada
   * en el contexto del trámite 260402.
   */
  claveDeReferncia$ = this.tramite260402Query.selectedClaveDeReferncia$

  /**
   * @observable cadenaDeLaDependencia$
   * @description Representa un observable que emite la cadena de la dependencia seleccionada
   * en el contexto del trámite 260402.
   */
  cadenaDeLaDependencia$ = this.tramite260402Query.selectedCadenaDeLaDependencia$

  /**
   * @observable llaveDePago$
   * @description Observable que representa la llave de pago seleccionada 
   * en el contexto del trámite 260402. Este flujo de datos se utiliza 
   * para rastrear y reaccionar a los cambios en la llave de pago seleccionada.
   */
  llaveDePago$ = this.tramite260402Query.selectedLlaveDePago$

  /**
   * @descripcion Un observable que emite la fecha de pago seleccionada
   * desde el estado del query `tramite260402Query`.
   */
  fechaDePago$ = this.tramite260402Query.selectedFechaDePago$

  /**
   * @observable importeDePago$
   * @description Observable que representa el importe de pago seleccionado
   * en el contexto del trámite 260402. Este observable se utiliza para
   * rastrear y reaccionar a los cambios en el importe de pago asociado.
   */
  importeDePago$ = this.tramite260402Query.selectedImporteDePago$


  /**
   * @descripcion Arreglo que contiene los datos del catálogo para el componente.
   * @tipo {catalogoResponse[]}
   */
  dropdownData: catalogoResponse[] = [];

  /**
   * @observable fechaFinalInput
   * @description Representa un objeto de tipo InputFecha que contiene la fecha final
   * utilizada en el contexto del trámite 260402.
   */
  fechaFinalInput: InputFecha = FECHA_PAGO;

  /**
 * Constructor del componente.
 * Inyecta el FormBuilder y el servicio de pago de derechos.
 * 
 * @param fb Constructor de formularios para crear el formulario reactivos.
 * @param pagoDeDerechosEntradaService Servicio que proporciona datos para el componente.
 */
  constructor(
    private fb: FormBuilder,
    private pagoDeDerechosService: PagoDeDerechosEntradaService,
    private tramite260402Store: Tramite260402Store,
    private tramite260402Query: Tramite260402Query

  ) { 
     //La lógica del constructor se puede agregar aquí si es necesario
  }

  /**
   * Formulario reactivos para el pago de derechos.
   * Cada campo es obligatorio.
   */
  public pagoDerechos: FormGroup = this.fb.group({

    claveDeReferncia: ['', [Validators.required]],

    cadenaDeLaDependencia: ['', [Validators.required]],

    banco: ['', [Validators.required]],

    llaveDePago: ['', [Validators.required]],

    fechaDePago: ['', [Validators.required]],

    importeDePago: ['', [Validators.required]],
  });

  /**
   * Ciclo de vida que se ejecuta al iniciar el componente.
   * Obtiene los datos para el selector de opciones desde el servicio.
   */
  ngOnInit(): void {
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
   * Actualiza el valor de claveDeReferncia en el tramite260402Store.
   * 
   * Este método obtiene el valor de 'claveDeReferncia' del control de formulario 
   * 'pagoDerechos' y lo establece en el 'tramite260402Store'.
   * 
   * @comdoc
   */
  updateClaveDeReferncia(): void {
    const CORREO = this.pagoDerechos.get('claveDeReferncia')?.value;
    this.tramite260402Store.setClaveDeReferncia(CORREO);
  }

  /**
   * Actualiza el valor de cadenaDeLaDependencia en el tramite260402Store.
   * 
   * Este método obtiene el valor de 'cadenaDeLaDependencia' del control de formulario 
   * 'pagoDerechos' y lo establece en el 'tramite260402Store'.
   * 
   * @comdoc
   */
  updateCadenaDeLaDependencia(): void {
    const CORREO = this.pagoDerechos.get('cadenaDeLaDependencia')?.value;
    this.tramite260402Store.setCadenaDeLaDependencia(CORREO);
  }

  /**
   * Actualiza el valor de llaveDePago en el tramite260402Store.
   * 
   * Este método obtiene el valor de 'llaveDePago' del control de formulario 
   * 'pagoDerechos' y lo establece en el 'tramite260402Store'.
   * 
   * @comdoc
   */
  updateLlaveDePago(): void {
    const CORREO = this.pagoDerechos.get('llaveDePago')?.value;
    this.tramite260402Store.setLlaveDePago(CORREO);
  }

  /**
   * Actualiza el valor de fechaDePago en el tramite260402Store.
   * 
   * Este método obtiene el valor de 'fechaDePago' del control de formulario 
   * 'pagoDerechos' y lo establece en el 'tramite260402Store'.
   * 
   * @comdoc
   */
  updateFechaDePago(): void {
    const CORREO = this.pagoDerechos.get('fechaDePago')?.value;
    this.tramite260402Store.setFechaDePago(CORREO);
  }
  
  /**
   * Actualiza el valor de importeDePago en el tramite260402Store.
   * 
   * Este método obtiene el valor de 'importeDePago' del control de formulario 
   * 'pagoDerechos' y lo establece en el 'tramite260402Store'.
   * 
   * @comdoc
   */
  updateImporteDePago(): void {
    const CORREO = this.pagoDerechos.get('importeDePago')?.value;
    this.tramite260402Store.setImporteDePago(CORREO);
  }

  /**
 * Obtiene el estado seleccionado del formulario y lo guarda en el store
 */
  getMunicipios(): void {
    const SELECTED_BANCO = this.pagoDerechos.get('banco')?.value;
    this.tramite260402Store.setBanco(SELECTED_BANCO);
  }

    /**

   * Método para cambiar la fecha final.

   * @param nuevo_valor Nuevo valor de la fecha final.

   */
    cambioFechaDePago(nuevo_valor: string): void {
      this.pagoDerechos.patchValue({
        fechaDePago: nuevo_valor,
      });
      this.tramite260402Store.setFechaDePago(nuevo_valor);
    }

  /*
  * Método del ciclo de vida de Angular - destruye el componente
  */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }



}
