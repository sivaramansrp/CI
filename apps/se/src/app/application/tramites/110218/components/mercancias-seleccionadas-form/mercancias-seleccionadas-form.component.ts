/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Catalogo, CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';

import { Subject } from 'rxjs';

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
export class MercanciasSeleccionadasFormComponent implements OnInit, OnDestroy{
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

  private destroyed$ = new Subject<void>();

  /**
   * Constructor del componente.
   *
   * Constructor de formularios.
   */
  constructor(private fb: FormBuilder, private service: CertificadoTecnicoJaponService) {
    this.modifydatosdelcertificado = this.fb.group({
      nombreComercial: [''],
      nombreenIngles: [''],
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

  ngOnInit(): void {
    this.unidadMedidaData();
    this.tipoDeFactura();
  }

  unidadMedidaData():void{
    this.service.getUnidadMedida().subscribe(
      (data:any) => {
        this.unidaddeMedidadeComercializacionOptions = data;
      }
    );
  }

  tipoDeFactura():void{
    this.service.getTipodeFctura().subscribe(
      (data:any) => {
        this.tipodeFacturaOptions = data;
        console.log("tipodeFacturaOptions",this.tipodeFacturaOptions)
      }
    );
  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}