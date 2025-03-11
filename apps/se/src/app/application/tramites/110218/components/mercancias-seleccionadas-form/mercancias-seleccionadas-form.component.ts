import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Catalogo, CatalogoSelectComponent } from '@libs/shared/data-access-user/src';

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
export class MercanciasSeleccionadasFormComponent {
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
   * Constructor del componente.
   *
   * Constructor de formularios.
   */
  constructor(private fb: FormBuilder) {
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
}