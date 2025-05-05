/* eslint-disable no-console */
import { ActivatedRoute } from '@angular/router';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CatalogosService } from '../../servicios/catalogo.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HECHOS_SERVICIO } from '../../modelos/acta-de-hechos.model';
import { HechosInfo } from '../../modelos/acta-de-hechos.model';
import { HechosTablaServicios } from '../../servicios/hechos-tabla.service';
import { HttpClient } from '@angular/common/http';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';
// import { Tramite32516Query } from '../../estados/tramite32516Query.query';
// import { Tramite32516Store } from '../../estados/tramite32516Store.store';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'tipo-de-aviso',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // Ensure ReactiveFormsModule is included for FormGroup
    TituloComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent
  ],
  templateUrl: './tipo-de-aviso.component.html',
  styleUrls: ['./tipo-de-aviso.component.scss'],
})
export class TipoDeAvisoComponent implements OnInit, OnDestroy {
  solicitudForm!: FormGroup;

  /**
   * Subject utilizado para gestionar la desuscripción de observables.
   * Se completa en `ngOnDestroy()` para prevenir fugas de memoria.
   * @property {Subject<void>} unsubscribe$
   * @private
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * Configuración para el select de unidad de medida.
   * @property {CatalogosSelect} actaDeHechos
   */
  actaDeHechos: Catalogo[] = [];
  /**
   * Configuración para el select de unidad de medida.
   * @property {CatalogosSelect} levantarActa
   */
  levantarActa: Catalogo[] = [];

    /**
   * Tipo de selección de la tabla utilizando checkbox.
   * @type {TablaSeleccion}
   */
    tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

    /**
     * Configuración de las columnas de la tabla para la lista de regiones.
     * Define las propiedades y formato de las columnas en la tabla de regiones.
     * @type {ConfiguracionColumna<HechosInfo>[]}
     */
    hechosTabla: ConfiguracionColumna<HechosInfo>[] = HECHOS_SERVICIO;

      /**  
   * Datos procesados para la tabla de regiones.  
   * Contiene la información de las regiones asociadas al trámite,  
   * listos para su visualización en la interfaz de usuario.  
   * @type {HechosInfo[]}  
   */
  hechosTableDatos: HechosInfo[] = [];

  constructor(
    private fb: FormBuilder,
    private readonly httpServicios: HttpClient,
    private readonly catalogosService: CatalogosService,
    private readonly hechosTablaServicios: HechosTablaServicios,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    
    this.solicitudForm = this.fb.group({
      cantidadBienes: [''],
      descripcionGenerica3: [''],
    });
    
  }
  irAPaginaAgregar(): void {
    console.log('Navigating to mercancias-destruidas-forma');
    const CURRENT_URL = this.router.url;
    if (CURRENT_URL.includes('pago')) {
      this.router.navigate([
        '/pago/acta-de-hechos/mercancias-destruidas-forma',
      ]);
    }else{
      this.router.navigate([
        '/agace/acta-de-hechos/mercancias-destruidas-forma',
      ]);
    }
  }
  /**
   * Método que se ejecuta al inicializar el componente.
   * Se utiliza para inicializar el formulario y cargar los datos necesarios.
   */ 
  ngOnInit(): void {
    this.solicitudForm = this.fb.group({
      cantidadBienes: ['', Validators.required],
      descripcionGenerica1: ['', Validators.required],
      descripcionGenerica2: ['', Validators.required],
      descripcionGenerica3: ['', Validators.required],
      capacidadAlmacenamiento: ['', Validators.required]
    });

    this.handleConditionalValidation();
    this.obtenerListasDesplegables();
    this.obtenerLevantarActaDesplegables();
    this.buscarDatos();
  }
  
  private handleConditionalValidation(): void {
    this.solicitudForm.get('cantidadBienes')?.valueChanges.subscribe(value => {
      const DESCRIPCION_GENERICA_3 = this.solicitudForm.get('descripcionGenerica3');
      if (value === '1') {
        DESCRIPCION_GENERICA_3?.setValidators([Validators.required]);
      } else {
        DESCRIPCION_GENERICA_3?.clearValidators();
      }
      DESCRIPCION_GENERICA_3?.updateValueAndValidity();
    });
  }
  /**
   * Obtiene las listas desplegables.
   * @method obtenerListasDesplegables
   */
  obtenerListasDesplegables(): void {
    this.obtenerHechosSelectList();
  }

  /**
   * Obtiene la lista para el select de unidad de medida.
   * @method obtenerHechosSelectList
   */
  obtenerHechosSelectList(): void {
    this.catalogosService
      .obtenerMenuDesplegable('acta-de-hechos.json')
      .subscribe((data: Catalogo[]) => {
        this.actaDeHechos = data;
      });
  }

    /**
   * Obtiene las listas desplegables.
   * @method obtenerLevantarActaDesplegables
   */
    obtenerLevantarActaDesplegables(): void {
      this.obtenerLevantarActaSelectList();
    }
  
    /**
     * Obtiene la lista para el select de unidad de medida.
     * @method obtenerLevantarActaSelectList
     */
    obtenerLevantarActaSelectList(): void {
      this.catalogosService
        .obtenerLevantarActaDesplegable('levantar.json')
        .subscribe((data: Catalogo[]) => {
          this.levantarActa = data;
        });
    }
 

    /**
   * Método para buscar y cargar los datos de las tablas.
   * Realiza una llamada al servicio para obtener los datos de regiones, beneficios, bodegas y café de exportación.
   */
    buscarDatos(): void {
      this.hechosTablaServicios.obtenerDatos()
      .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (response: { hechosApiDatos: HechosInfo[]}) => {
            if (response && Array.isArray(response.hechosApiDatos)) {
              this.hechosTableDatos = response.hechosApiDatos;
            } else {
              console.error("La respuesta de la API no tiene el formato esperado: ", response);
            }
          },
          error: (error) => {
            console.error("Error al obtener datos: ", error);
          }
        });
    }
  
  /**
   * @method ngOnDestroy
   * @description Maneja la limpieza de recursos antes de destruir el componente.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
