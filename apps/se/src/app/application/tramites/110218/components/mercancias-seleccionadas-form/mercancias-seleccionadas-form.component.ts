/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Catalogo, CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';

import { Observable, Subject } from 'rxjs';
import { Tramite110218Query } from '../../estados/queries/tramite110218.query';

import { Router } from '@angular/router';
import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';

/**
 * Componente para el formulario de mercancías seleccionadas.
 *
 * Este componente permite a los usuarios ingresar y modificar los detalles de las mercancías seleccionadas,
 * incluyendo información como nombres, marcas, valores, cantidades y detalles de la factura.
 *
 */
@Component({
  selector: 'app-mercancias-seleccionadas-form',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent, ReactiveFormsModule],
  templateUrl: './mercancias-seleccionadas-form.component.html',
  styleUrl: './mercancias-seleccionadas-form.component.scss',
})
export class MercanciasSeleccionadasFormComponent implements OnInit, OnDestroy {
  /**
   * Opciones para la unidad de medida de comercialización.
   * MercanciasSeleccionadasFormComponent
   */
  unidaddeMedidadeComercializacionOptions: Catalogo[] = [];

  /**
   * Opciones para el tipo de factura.
   * MercanciasSeleccionadasFormComponent
   */
  tipodeFacturaOptions: Catalogo[] = [];

  /**
   * Formulario para modificar los datos del certificado.
   * MercanciasSeleccionadasFormComponent
   */
  modifydatosdelcertificado: FormGroup;

  /**
   * Subject para la destrucción del componente.
   * MercanciasSeleccionadasFormComponent
   */
  private destroyed$ = new Subject<void>();

  /**
   * Datos recibidos para la tabla.
   * MercanciasSeleccionadasFormComponent
   */
  receivedData: any;

  /**
   * Observable para la unidad de medida de comercialización.
   */
  unidaddeMedidadeComercializacion$: Observable<Catalogo | null> = this.tramite110218Query.unidaddeMedidadeComercializacion$;
  
  @Output() modificarSuccessBtn = new EventEmitter<boolean>();
  /**
   * Constructor del componente.
   *
   * Constructor de formularios.
   * Servicio para obtener datos del certificado técnico de Japón.
   * Query para el trámite 110218.
   */
  constructor(
    private fb: FormBuilder,
    private service: CertificadoTecnicoJaponService,
    private tramite110218Query: Tramite110218Query,
    private tramite110218Store: Tramite110218Store,
    private router: Router
  ) {
    this.modifydatosdelcertificado = this.fb.group({
      nombreComercial: [{ value: '', disabled: true }],
      nombreIngles: [{ value: '', disabled: true }],
      complementoDelaDescripcion: [''],
      marca: ['', Validators.pattern(/^(?!\s)(.*\S)?$/)],
      valorMercancia: ['', Validators.pattern(/^\d{0,15}(\.\d{1,4})?$/)],
      cantidad: [{ value: '', disabled: true }, Validators.pattern(/^\d{0,15}(\.\d{1,4})?$/)],
      unidaddeMedidadeComercializacion: [''],
      numerodeFactura:  ['', Validators.pattern(/^[A-Za-z0-9Ññ]+$/)],
      tipodeFactura: [''],
      fechadelaFactura: [''],
    });
  }

  /**
   * Método de inicialización del componente.
   * MercanciasSeleccionadasFormComponent
   */
  ngOnInit(): void {
    this.unidadMedidaData();
    this.tipoDeFactura();

    this.tramite110218Query.tableDataDatos$.subscribe((data) => {
      this.receivedData = data;
    });

    this.tableDataValues();

    this.unidaddeMedidadeComercializacion$.subscribe((unidaddeMedidadeComercializacion) => {
      if (unidaddeMedidadeComercializacion) {
        this.modifydatosdelcertificado.get('unidaddeMedidadeComercializacion')?.setValue(unidaddeMedidadeComercializacion);
      }
    });
  }

  /**
   * Obtiene los datos de la unidad de medida desde el servicio.
   * MercanciasSeleccionadasFormComponent
   */
  unidadMedidaData(): void {
    this.service.getUnidadMedida().subscribe((data: any) => {
      this.unidaddeMedidadeComercializacionOptions = data;
    });
  }

  /**
   * Obtiene los datos del tipo de factura desde el servicio.
   * MercanciasSeleccionadasFormComponent
   */
  tipoDeFactura(): void {
    this.service.getTipodeFctura().subscribe((data: any) => {
      this.tipodeFacturaOptions = data;
    });
  }

  /**
   * Establece los valores de los datos de la tabla en el formulario.
   * MercanciasSeleccionadasFormComponent
   */
  tableDataValues(): void {
    if (this.receivedData) {
      this.modifydatosdelcertificado.patchValue({
        nombreComercial: this.receivedData[0].nombreComercial,
        nombreIngles: this.receivedData[0].nombreIngles,
        cantidad: '100',
        fechadelaFactura: '2024-11-13',
      });
    }
  }

  /**
   * Método de destrucción del componente.
   * MercanciasSeleccionadasFormComponent
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

/**
 * Redirige al usuario a la pantalla de validación del certificado técnico de Japón.
 * 
 * Este método se ejecuta cuando la modificación del formulario se completa exitosamente.
 * Utiliza el servicio de enrutamiento (`Router`) para navegar a la página correspondiente.
 */

modificarSuccess() :void{
  this.modificarSuccessBtn.emit(true); 

}

  /**
   * Maneja el cambio en la unidad de medida y actualiza el store.
   */
  onChangeUnidadMedida(): void {
    const UNIDADDE_MEDIDA = this.modifydatosdelcertificado.get('unidaddeMedidadeComercializacion')?.value;
    this.tramite110218Store.setUnidadeMedida(UNIDADDE_MEDIDA);
  }
}
