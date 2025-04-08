import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';

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
  datos: CompliMentaria[] = [];
  /**
   * Fila seleccionada en la tabla.
   * DatosCertificadoComponent
   *
   */
  filaSeleccionada: CompliMentaria | null = null;
  /**
   * Lista de filas seleccionadas en la tabla.
   * DatosCertificadoComponent
   *
   */
  filasSeleccionadas: CompliMentaria[] = [];
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
  tablaSeleccionadaDeLaTienda: CompliMentaria | null = null;

  /**
   * Índice utilizado para propósitos internos del componente.
   */
  indice: number = 5;

  /**
 * Evento de salida que emite un valor booleano cuando se modifica el certificado.
 */
  @Output() modificarEventCertificado: EventEmitter<boolean> = new EventEmitter<boolean>(false);
 /**
 * Constructor del componente.
 * 
 * Instancia de FormBuilder para crear grupos de formularios.
 * Servicio para manejar operaciones relacionadas con certificados.
 * Almacén para gestionar el estado relacionado con el Trámite 110218.
 * Consulta para recuperar datos relacionados con el Trámite 110218.
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
   * Crea y devuelve un FormGroup para los datos del certificado.
   * Contiene los controles 'lugar' y 'observaciones' con sus respectivas validaciones.
   * Retorna el formulario creado.
   */
  private crearFormularioDatosDelCertificado(): FormGroup {
    return this.fb.group({
      /**
       * El lugar donde se emite el certificado.
       * Este campo es obligatorio.
       */
      lugar: ['', Validators.required],
  
      /**
       * Observaciones o comentarios relacionados con el certificado.
       * Este campo es obligatorio.
       */
      observaciones: ['', Validators.required]
    });
  }
  /**
   * Método de inicialización del componente.
   * Obtiene los datos de la tabla y se suscribe a los cambios en el store.
   * También inicializa los datos seleccionados previamente desde el store.
   */
  ngOnInit(): void {
    this.obtenerDatosDeTabla();
    this.suscribirseACambiosEnLaTienda();

    this.tramite110218Query.tableDataDatos$.pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      this.tablaSeleccionadaDeLaTienda = data.length > 0 ? data[0] : null;
    }
    )


  }
  /**
   * Obtiene los datos de la tabla desde el servicio.
   * Actualiza la propiedad `datos` con los datos obtenidos.
   */
  obtenerDatosDeTabla(): void {
    this.service.getDatosCertificado().pipe(takeUntil(this.destroyed$)).subscribe((data: { [key: string]: string | number | boolean }) => {
      this.datos = Array.isArray(data) ? data as CompliMentaria[] : [];
    });
  }
  /**
   * Maneja la selección de una fila en la tabla.
   * Actualiza la propiedad `filaSeleccionada` con la fila seleccionada.
   * filaSeleccionada es la fila seleccionada en la tabla.
   */
  manejarFilaSeleccionada(fila: CompliMentaria): void {
    this.filaSeleccionada = fila;
  }
  /**
   * Navega a la sección de mercancías seleccionadas del formulario.
   * Almacena los valores de la fila seleccionada en el store y emite un evento para modificar el certificado.
   */
  enModificarFormulario(): void {
    if (this.filaSeleccionada) {
      this.tramite110218Store.almacenarValoresDeTabla(this.filaSeleccionada);
    }
    this.modificarEventCertificado.emit(false);

  }
  /**
   * Suscribe a los cambios en el store y actualiza los valores del formulario.
   * Se suscribe a los observables `lugar$` y `observaciones$` para actualizar los controles correspondientes.
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
   * Limpia las suscripciones activas para evitar fugas de memoria.
   */

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
      * Maneja los cambios en los controles del formulario y actualiza el store.
      * Actualiza el valor correspondiente en el store según el control modificado.
      * controlName es el nombre del control del formulario que cambió.
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
