/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Catalogo, CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';

import { Subject, takeUntil } from 'rxjs';

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

  ngOnInit(): void {
    this.unidadMedidaData();
    this.tipoDeFactura();
    this.tableDataValues()
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
      }
    );
  }

  tableDataValues():void{
    this.service.getDatosCertificado().pipe(takeUntil(this.destroyed$)).subscribe(
      (data:any[])=>{
        this.modifydatosdelcertificado.patchValue({
          nombreComercial:data[0].nombreComercial,
          nombreIngles: data[0].nombreIngles,
          cantidad:'100',
          fechadelaFactura: '2024-11-13'        
        }
       
        )
      }
    )
  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}