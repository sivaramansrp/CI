
/**
 * Importaciones necesarias para el funcionamiento del componente.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CatalogoSelectComponent, FECHA_SALIDA, InputFecha, InputFechaComponent, catalogoResponse } from '@libs/shared/data-access-user/src';

import { TituloComponent } from '@libs/shared/data-access-user/src';

import { PagoDeDerechos260402Service } from '../../services/pago-de-derechos-260402.service';
import { Tramite260402Store } from '../../estados/tramite260402.store';

import { Tramite260402Query } from '../../estados/tramite260402.query';

import { Observable, Subject, takeUntil } from 'rxjs';
import { FECHA_PAGO } from '../../constantes/permiso-maquila-260402.enum';
/**
 * Componente que gestiona el pago de derechos.
 * Utiliza un formulario reactivos para recopilar datos del usuario.
 */
@Component({
  selector: 'app-pago-de-derechos-260402',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    InputFechaComponent
  ],
  templateUrl: './pago-de-derechos-260402.component.html',
  styleUrls: ['./pago-de-derechos-260402.component.scss',],
})
export class PagoDeDerechos260402Component implements OnInit, OnDestroy {

  /** Subject para destruir el componente */
  private destroy$ = new Subject<void>();
  /** Observable para el estado seleccionado */
  selectedBanco$: Observable<catalogoResponse | null> =
    this.tramite260402Query.selectedBanco$;
  /** Catálogo de estados cargado desde un archivo JSON */

  claveDeReferncia$ = this.tramite260402Query.selectedClaveDeReferncia$
  cadenaDeLaDependencia$ = this.tramite260402Query.selectedCadenaDeLaDependencia$
  llaveDePago$ = this.tramite260402Query.selectedLlaveDePago$
  fechaDePago$ = this.tramite260402Query.selectedFechaDePago$
  importeDePago$ = this.tramite260402Query.selectedImporteDePago$
  /**
   * Datos para el selector de opciones.
   */
  dropdownData: catalogoResponse[] = [];

  fechaFinalInput: InputFecha = FECHA_PAGO;

  /**
 * Constructor del componente.
 * Inyecta el FormBuilder y el servicio de pago de derechos.
 * 
 * @param fb Constructor de formularios para crear el formulario reactivos.
 * @param pagoDeDerechos260402Service Servicio que proporciona datos para el componente.
 */
  constructor(
    private fb: FormBuilder,
    private pagoDeDerechosService: PagoDeDerechos260402Service,
    private tramite260402Store: Tramite260402Store,
    private tramite260402Query: Tramite260402Query

  ) { 
     // Constructor logic can be added here if needed
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
