/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';

import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';

import { Tramite110218Query } from '../../estados/queries/tramite110218.query';

import { Observable, Subject, takeUntil } from 'rxjs';

import { Router } from '@angular/router';

import { CERTIFICADO_TABLA, CompliMentaria } from '../../models/certificado-tecnico-japon.enum';


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
export class DatosCertificadoComponent implements OnInit {
  /**
   * Formulario para los datos del certificado.
   * DatosCertificadoComponent
   * 
   */
  datosdelcertificado: FormGroup;
  /**
   * Configuración para la tabla de datos del certificado.
   * DatosCertificadoComponent
   * 
   */
  configTableArray = CERTIFICADO_TABLA;
  /**
   * Tipo de selección de la tabla (radio).
   * DatosCertificadoComponent
   * 
   */
  tableradio = TablaSeleccion.RADIO;
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
  selectedRow: any;
  /**
   * Lista de filas seleccionadas en la tabla.
   * DatosCertificadoComponent
   *
   */
  selectedRows: any[] = [];
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
   * Constructor del componente.
   *
   * Constructor de formularios.
   * Servicio para obtener datos del certificado.
   * Store para el trámite 110218.
   * Query para el trámite 110218.
   * Servicio de enrutamiento.
   */
  constructor(
    private fb: FormBuilder,
    private service: CertificadoTecnicoJaponService,
    private tramite110218Store: Tramite110218Store,
    private tramite110218Query: Tramite110218Query,
    private router: Router
  ) {
    this.datosdelcertificado = this.fb.group({
      lugar: ['', Validators.required],
      observaciones: ['', Validators.required]
    });
  }
  /**
   * Método de inicialización del componente.
   * DatosCertificadoComponent
   */
  ngOnInit(): void {
    this.getTabledatas();
    this.subscribeToStoreChanges();

    this.tramite110218Query.tableDataDatos$.subscribe((data) =>

      console.log("table datas.", data)
    )
  }
  /**
   * Obtiene los datos de la tabla desde el servicio.
   * DatosCertificadoComponent
   */
  getTabledatas(): void {
    this.service.getDatosCertificado().subscribe((data: any) => {
      this.datos = data;
    });
  }
  /**
   * Maneja la selección de una fila en la tabla.
   * DatosCertificadoComponent
   * Fila seleccionada.
   */
  handleFilaSeleccionada(fila: CompliMentaria): void {
    this.selectedRow = fila;
    console.log("selected row data", this.selectedRow)
  }
  /**
   * Maneja la selección de múltiples filas en la tabla.
   * DatosCertificadoComponent
   * Lista de filas seleccionadas.
   */
  handleListaDeFilaSeleccionada(filasSeleccionadas: any[]): void {
    this.selectedRows = filasSeleccionadas;
  }
  /**
   * Navega a la sección de mercancías seleccionadas del formulario.
   * DatosCertificadoComponent
   */
  onModifyForm(): void {
    this.tramite110218Store.storeTableValues(this.selectedRow)
    this.router.navigate(['se/certificado-tecnico-japon/mercancias-seleccionadas-form']);
    // this.router.navigate(['pago/certificado-tecnico-japon/mercancias-seleccionadas-form']);


  }
  /**
   * Suscribe a los cambios en el store y actualiza el formulario.
   * DatosCertificadoComponent
   */
  subscribeToStoreChanges(): void {
    const OBSERVABLES = {
      lugar: this.lugar$,
      observaciones: this.observaciones$,
    };
    Object.entries(OBSERVABLES).forEach(([controlName, OBSERVABLES$]) => {
      OBSERVABLES$.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
        if (value) {
          this.datosdelcertificado.get(controlName)?.setValue(value);
        }
      });
    });
  }
  /**
   * Método de destrucción del componente.
   * DatosCertificadoComponent
   */
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
      * Maneja los cambios en los controles del formulario y actualiza el store.
      * DatosCertificadoComponent
      * Nombre del control del formulario.
      */
  onDatosdelcertificadoChange(controlName: string): void {
    const VALUE = this.datosdelcertificado.get(controlName)?.value;

    switch (controlName) {
      case 'lugar':
        this.tramite110218Store.setlugar(VALUE);
        break;
      case 'observaciones':
        this.tramite110218Store.setobservaciones(VALUE);
        break;

      default:
        console.warn(`Nombre de control no manejado: ${controlName}`);
        break;
    }

  }
}