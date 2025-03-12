/**
 * Este componente maneja el formulario de registro de mercancía.
 */

import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from "@ng-mf/data-access-user";
import { MercanciasService } from '../../services/mercancias/mercancias.service';

import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { Tramite110209Query } from '../../estados/queries/tramite110209.query';
/**
 * Este componente maneja el formulario de registro de mercancía.
 */
@Component({
  selector: 'app-registro-de-mercancia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CatalogoSelectComponent],
  templateUrl: './registro-de-mercancia.component.html',
  styleUrl: './registro-de-mercancia.component.scss',
})
export class RegistroDeMercanciaComponent implements OnInit, OnDestroy {

  /**
   * Formulario para el registro de mercancía.
   * @type {FormGroup}
   */
  mercanciaFrom!: FormGroup;

  /**
   * Opciones de tipo de factura.
   * @type {Catalogo[]}
   */
  tipoFacturaOptions!: Catalogo[];

  /**
   * Opciones de unidad de medida.
   * @type {Catalogo[]}
   */
  unidadOptions!: Catalogo[];

  /**
   * Subject que emite un evento cuando el componente es destruido,
   * permitiendo la desuscripción de observables.
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();

  /**
   * Constructor del componente.
   * Servicio para la creación de formularios reactivos y para obtener datos de mercancías.
   * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
   * @param {MercanciasService} service - Servicio para obtener datos de mercancías.
   * @param {Router} router - Servicio para la navegación.
   * @param {Tramite110209Query} tramite110209Query - Servicio para consultar el estado del trámite.
   */
  constructor(private fb: FormBuilder, private service: MercanciasService, private router: Router, private tramite110209Query: Tramite110209Query) {
    this.mercanciaFrom = this.fb.group({
      nombreComercial: [{ value: '', disabled: true }],
      nombreIngles: [{ value: '', disabled: true }],
      descripcion: ['', Validators.pattern(/^(?!\s)(.*\S)?$/)],
      marca: ['', Validators.pattern(/^(?!\s)(.*\S)?$/)],
      valorMercancia: ['', Validators.pattern(/^\d{0,15}(\.\d{1,4})?$/)],
      cantidad: [{ value: '', disabled: true }, Validators.pattern(/^\d{0,15}(\.\d{1,4})?$/)],
      unidadMedida: [''],
      numeroFactura: ['', Validators.pattern(/^[A-Za-z0-9Ññ]+$/)],
      tipoFactura: [''],
      fechaFactura: [{ value: '', disabled: true }]
    });
  }

  /**
   * Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   * Obtiene las opciones de tipo de factura, unidad de medida y los valores de las mercancías.
   */
  ngOnInit(): void {
    this.getMercanciasValor();
    this.getTipoFactura();
    this.getUnidadValor();
  }

  /**
   * Obtiene las opciones de tipo de factura desde el servicio.
   */
  getTipoFactura(): void {
    this.service.getTipoDeFactura().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data: Catalogo[]) => {
        this.tipoFacturaOptions = data;
      }
    );
  }

  /**
   * Obtiene las opciones de unidad de medida desde el servicio.
   */
  getUnidadValor(): void {
    this.service.getUnidad().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data: Catalogo[]) => {
        this.unidadOptions = data;
      }
    );
  }

  /**
   * Obtiene los valores de las mercancías desde el store y los asigna al formulario.
   */
  getMercanciasValor(): void {
    this.tramite110209Query.selectTramite110102$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data) => {
        this.mercanciaFrom.patchValue({
          nombreComercial: data.mercanciasSeleccionadas.nombreComercial,
          nombreIngles: data.mercanciasSeleccionadas.nombreIngles,
          cantidad: 21343,
          fechaFactura: '2025-02-25'
        });
      }
    );
  }

  /**
   * Navega a la ruta especificada.
   */
  onNavigate(): void {
    this.router.navigate(['/se/certificado-sgp/solicitud']);
  }

  /**
   * Hook del ciclo de vida que se llama cuando la directiva se destruye.
   * Completa el subject destroyed$ para desuscribirse de todos los observables.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}