/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Catalogo, CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';

import { Subject } from 'rxjs';
import { Tramite110218Query } from '../../estados/queries/tramite110218.query';

import { Router } from '@angular/router';

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
    private router: Router
  ) {
    this.modifydatosdelcertificado = this.fb.group({
      nombreComercial: [''],
      nombreIngles: [''],
      complementoDelaDescripcion: [''],
      marca: [''],
      valorMercancia: [''],
      cantidad: [''],
      unidaddeMedidadeComercializacion: [''],
      numerodeFactura: [''],
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
      console.log('Received data:', this.receivedData[0].nombreComercial);
    });

    this.tableDataValues();
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

  modificarSuccess(): void {
    this.router.navigate(['pago/certificado-tecnico-japon/validar-certificado-tecnico-japon']);
  }
}