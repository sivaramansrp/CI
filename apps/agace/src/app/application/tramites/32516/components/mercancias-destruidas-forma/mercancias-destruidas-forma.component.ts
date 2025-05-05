import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CatalogosService } from '../../servicios/catalogo.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-mercancias-destruidas-forma',
  standalone: true,
  imports: [TituloComponent, CatalogoSelectComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './mercancias-destruidas-forma.component.html',
  styleUrl: './mercancias-destruidas-forma.component.scss'
})
export class MercanciasDestruidasFormaComponent implements OnInit, OnDestroy {

  mercanciaForm!: FormGroup;
  /**
   * Configuración para el select de unidad de medida.
   * @property {CatalogosSelect} unidadMedida
   */
  unidadMedida: Catalogo[] = [];

    /**
   * Subject para notificar la destrucción del componente.
   * Utilizado para gestionar la limpieza de recursos.
   * @type {Subject<void>}
   */
    private destroyNotifier$: Subject<void> = new Subject();
    
    constructor(
       private fb: FormBuilder,
       private router: Router,
      private readonly catalogosService: CatalogosService,
    ) {}
  ngOnInit(): void {
    this.mercanciaForm = this.fb.group({
      consecutivo: ['', [Validators.required, Validators.maxLength(3)]],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]],
      cantidad: ['', [Validators.required, Validators.maxLength(16)]],
      peso: ['', [Validators.required, Validators.maxLength(16)]],
      unidadMedida: ['', Validators.required]
      
      
    });
    this.obtenerUnidadDesplegable();
  }
  /**
   * Obtiene las listas desplegables.
   * @method obtenerUnidadDesplegable
   */
  obtenerUnidadDesplegable(): void {
    this.obtenerUnidadMedidaSelectList();
  }

  /**
   * Obtiene la lista para el select de unidad de medida.
   * @method obtenerUnidadMedidaSelectList
   */
  obtenerUnidadMedidaSelectList(): void {
    this.catalogosService
      .obtenerUnidadDesplegable('unidad-de-medida.json')
      .subscribe((data: Catalogo[]) => {
        this.unidadMedida = data;
      });
  }
  /**
   * Cambia la pestaña activa en la interfaz.
   * @param {number} index - Índice de la pestaña a seleccionar.
   */
  seleccionaTab(index: number): void {
    const CURRENT_URL = this.router.url;
    if (CURRENT_URL.includes('pago')) {
      this.router.navigate([
        '/pago/acta-de-hechos/acta-de-hechos',
      ], { queryParams: { tab: index } });
    }else{
      this.router.navigate([
        '/agace/acta-de-hechos/acta-de-hechos',
      ], { queryParams: { tab: index } });
    }
  }
  /**
   * Resetea el formulario de mercancias destruidas forma.
   */
  cancelarMercancia(): void {
    this.mercanciaForm.reset();
  }

    /**
   * Método de limpieza al destruir el componente.
   * Libera los recursos y cancela las suscripciones.
   */
    ngOnDestroy(): void {
      this.destroyNotifier$.next();
      this.destroyNotifier$.complete();
    }
}
