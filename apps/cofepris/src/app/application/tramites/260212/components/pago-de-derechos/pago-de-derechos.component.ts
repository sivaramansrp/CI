
/**
 * Importaciones necesarias para el funcionamiento del componente.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CatalogoSelectComponent, catalogoResponse } from '@libs/shared/data-access-user/src';

import { TituloComponent } from '@libs/shared/data-access-user/src';

import { PagoDeDerechosService } from '../../services/pago-de-derechos.service';
import { Tramite260212Store } from '../../estados/tramite260212.store';

import { Tramite260212Query } from '../../estados/tramite260212.query';

import { Observable, Subject } from 'rxjs';
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
  ],
  templateUrl: './pago-de-derechos.component.html',
  styleUrls: ['./pago-de-derechos.component.scss',],
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy {

   /** Subject para destruir el componente */
    private destroy$ = new Subject<void>();
    /** Observable para el estado seleccionado */
    selectedBanco$: Observable<catalogoResponse | null> =
      this.tramite260212Query.selectedBanco$;
    /** Catálogo de estados cargado desde un archivo JSON */
    
  /**
   * Datos para el selector de opciones.
   */
  dropdownData: catalogoResponse[] = [];

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
        private tramite260212Query: Tramite260212Query
    // eslint-disable-next-line no-empty-function
  ) { }

  /**
   * Formulario reactivos para el pago de derechos.
   * Cada campo es obligatorio.
   */
  public pagoDerechos: FormGroup = this.fb.group({
    /**
     * Clave de referencia.
     */
    claveDeReferncia: ['', [Validators.required]],
    /**
     * Cadena de la dependencia.
     */
    cadenaDeLaDependencia: ['', [Validators.required]],
    /**
     * Banco seleccionado.
     */
    banco: ['', [Validators.required]],
    /**
     * Llave de pago.
     */
    llaveDePago: ['', [Validators.required]],
    /**
     * Fecha de pago.
     */
    fechaDePago: ['', [Validators.required]],
    /**
     * Importe del pago.
     */
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
    }
  


}
