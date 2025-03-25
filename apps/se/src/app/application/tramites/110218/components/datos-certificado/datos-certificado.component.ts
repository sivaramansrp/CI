import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';

import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';

import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';

import { Tramite110218Query } from '../../estados/queries/tramite110218.query';

import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

import { CERTIFICADO_TABLA } from '../../models/certificado-tecnico-japon.enum';
import { CompliMentaria } from '../../models/certificado-tecnico-japon.enum';

/**
 * Componente para mostrar y manejar los datos del certificado técnico de Japón.
 *
 * Este componente permite a los usuarios interactuar con los datos del certificado,
 * incluyendo la visualización de datos en una tabla dinámica, la selección de filas
 * y la navegación a otras secciones de la aplicación.
 *
 */
@Component({
  selector: 'app-datos-certificado',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, TablaDinamicaComponent, CatalogoSelectComponent],
  templateUrl: './datos-certificado.component.html',
  styleUrl: './datos-certificado.component.scss',
})
export class DatosCertificadoComponent implements OnInit, OnDestroy {
  /**
   * Formulario para los datos del certificado.
   * DatosCertificadoComponent
   * 
   */
  datosDelCertificado: FormGroup;
  /**
   * Configuración para la tabla de datos del certificado.
   * DatosCertificadoComponent
   * 
   */
  arregloConfiguracionTabla = CERTIFICADO_TABLA;
  /**
   * Tipo de selección de la tabla (radio).
   * DatosCertificadoComponent
   * 
   */
  radioDeMesa = TablaSeleccion.RADIO;
  /**
   * Datos para la tabla.
   * DatosCertificadoComponent
   * 
   */
  datos: any;
  /**
   * Fila seleccionada en la tabla.
   * DatosCertificadoComponent
   *
   */
  filaSeleccionada: any;
  /**
   * Lista de filas seleccionadas en la tabla.
   * DatosCertificadoComponent
   *
   */
  filasSeleccionadas: any[] = [];
  /**
   * Observable para el lugar del certificado.
   * DatosCertificadoComponent
   * 
   */
  lugar$: Observable<string | null> = this.tramite110218Query.lugar$;
  /**
   * Observable para las observaciones del certificado.
   * DatosCertificadoComponent
   * 
   */
  observaciones$: Observable<string | null> = this.tramite110218Query.observaciones$;
  /**
   * Catálogo para el tipo de factura.
   * DatosCertificadoComponent
   *
   */
  tipodeFactura: Catalogo[] = [];
  /**
   * Catálogo para la unidad de medida de comercialización.
   * DatosCertificadoComponent
   * 
   */
  unidaddeMedidadeComercializacion: Catalogo[] = [];

  /**
   * Subject para la destrucción del componente.
   * DatosCertificadoComponent
   *
   */
  private destroyed$ = new Subject<void>();

  /**
   * Datos seleccionados previamente en la tabla, obtenidos desde el store.
  */
  tablaSeleccionadaDeLaTienda: any;

  /**
 * Índice utilizado para propósitos internos del componente.
 */
  indice: number = 5;

  /**
 * Evento de salida que emite un valor booleano cuando se modifica el certificado.
 */
  @Output() modificarEventCertificado: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  /**
 * Constructor for the component.
 * 
 * FormBuilder instance for creating form groups.
 * Service for handling certificate-related operations.
 * Store for managing state related to Tramite 110218.
 * Query for retrieving data related to Tramite 110218.
 */
  constructor(
    private fb: FormBuilder,
    private service: CertificadoTecnicoJaponService,
    private tramite110218Store: Tramite110218Store,
    private tramite110218Query: Tramite110218Query
  ) {
    this.datosDelCertificado = this.crearFormularioDatosDelCertificado();
  }
  
  /**
   * Creates and returns a FormGroup for certificate data.
   * 
   * The form group containing 'lugar' and 'observaciones' controls.
   */
  private crearFormularioDatosDelCertificado(): FormGroup {
    return this.fb.group({
      /**
       * The place where the certificate is issued.
       * This field is required.
       */
      lugar: ['', Validators.required],
  
      /**
       * Observations or remarks related to the certificate.
       * This field is required.
       */
      observaciones: ['', Validators.required]
    });
  }
  /**
   * Método de inicialización del componente.
   * DatosCertificadoComponent
   */
  ngOnInit(): void {
    this.obtenerDatosDeTabla();
    this.suscribirseACambiosEnLaTienda();

    this.tramite110218Query.tableDataDatos$.pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      this.tablaSeleccionadaDeLaTienda = data;
    }
    )


  }
  /**
   * Obtiene los datos de la tabla desde el servicio.
   * DatosCertificadoComponent
   */
  obtenerDatosDeTabla(): void {
    this.service.getDatosCertificado().pipe(takeUntil(this.destroyed$)).subscribe((data: any) => {
      this.datos = data;
    });
  }
  /**
   * Maneja la selección de una fila en la tabla.
   * DatosCertificadoComponent
   * Fila seleccionada.
   */
  manejarFilaSeleccionada(fila: CompliMentaria): void {
    this.filaSeleccionada = fila;
  }
  /**
   * Navega a la sección de mercancías seleccionadas del formulario.
   * DatosCertificadoComponent
   */
  enModificarFormulario(): void {
    this.tramite110218Store.almacenarValoresDeTabla(this.filaSeleccionada);
    this.modificarEventCertificado.emit(false);

  }
  /**
   * Suscribe a los cambios en el store y actualiza el formulario.
   * DatosCertificadoComponent
   */
  suscribirseACambiosEnLaTienda(): void {
    const OBSERVABLES = {
      lugar: this.lugar$,
      observaciones: this.observaciones$,
    };
    Object.entries(OBSERVABLES).forEach(([controlName, OBSERVABLES$]) => {
      OBSERVABLES$.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
        if (value) {
          this.datosDelCertificado.get(controlName)?.setValue(value);
        }
      });
    });
  }
  /**
   * Método de destrucción del componente.
   * DatosCertificadoComponent
   */

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
      * Maneja los cambios en los controles del formulario y actualiza el store.
      * DatosCertificadoComponent
      * Nombre del control del formulario.
      */
  enCambioDeDatosDelCertificado(controlName: string): void {
    const VALUE = this.datosDelCertificado.get(controlName)?.value;

    switch (controlName) {
      case 'lugar':
        this.tramite110218Store.establecerLugar(VALUE);
        break;
      case 'observaciones':
        this.tramite110218Store.establecerObservaciones(VALUE);
        break;

      default:
        break;
    }

  }


}
