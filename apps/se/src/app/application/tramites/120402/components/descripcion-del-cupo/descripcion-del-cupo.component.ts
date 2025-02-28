/**
 * Componente que representa la descripción detallada de un cupo.
 * Se encarga de mostrar información específica sobre el cupo y su configuración.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DescripcionDelCupoService } from '@ng-mf/data-access-user';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

import { TituloComponent } from '@ng-mf/data-access-user';
/**
 * Componente que representa la descripción detallada de un cupo.
 * Se encarga de mostrar información específica sobre el cupo y su configuración.
 */
@Component({
  selector: 'app-descripcion-del-cupo',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './descripcion-del-cupo.component.html',
  styleUrl: './descripcion-del-cupo.component.scss',
})
export class DescripcionDelCupoComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo que contiene la información de la descripción del cupo.
   */
  form!: FormGroup;

  /**
   * Subject utilizado para manejar la destrucción del componente y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Constructor del componente.
   * @param fb FormBuilder para la creación del formulario.
   * @param service Servicio para obtener la información de la descripción del cupo.
   */
  constructor(
    private fb: FormBuilder,
    private service: DescripcionDelCupoService
  ) {
    // Constructor
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.crearFormulario();
    this.loadDescripcionDelCupo();
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Crea e inicializa el formulario con campos deshabilitados por defecto.
   */
  crearFormulario(): void {
    this.form = this.fb.group({
      claveDelCupo: [{ value: '', disabled: true }],
      mecanismoDeAsignacion: [{ value: '', disabled: true }],
      descripcionDelProducto: [{ value: '', disabled: true }],
      unidadDeMedida: [{ value: '', disabled: true }],
      regimenAduanero: [{ value: '', disabled: true }],
      fechaDeInicioDeVigenciaDelCupo: [{ value: '', disabled: true }],
      fechaDeFinDeVigenciaDelCupo: [{ value: '', disabled: true }],
      fraccionesArancelarias: [{ value: '', disabled: true }],
      tratadoAcuerdo: [{ value: '', disabled: true }],
      paises: [{ value: '', disabled: true }],
    });
  }

  /**
   * Carga la información de la descripción del cupo desde el servicio y la asigna al formulario.
   */
  loadDescripcionDelCupo(): void {
    this.service
      .getDescripcionDelCupo()
      .pipe(takeUntil(this.destroyed$))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .subscribe((data: any) => {
        this.form.patchValue({
          claveDelCupo: data.claveDelCupo,
          mecanismoDeAsignacion: data.mecanismoDeAsignacion,
          descripcionDelProducto: data.descripcionDelProducto,
          unidadDeMedida: data.unidadDeMedida,
          regimenAduanero: data.regimenAduanero,
          fechaDeInicioDeVigenciaDelCupo: data.fechaDeInicioDeVigenciaDelCupo,
          fechaDeFinDeVigenciaDelCupo: data.fechaDeFinDeVigenciaDelCupo,
          fraccionesArancelarias: data.fraccionesArancelarias,
          tratadoAcuerdo: data.tratadoAcuerdo,
          paises: data.paises,
        });
      });
  }
}
