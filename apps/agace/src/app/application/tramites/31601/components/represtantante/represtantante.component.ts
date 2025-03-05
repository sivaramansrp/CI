/* eslint-disable sort-imports */
/* eslint-disable no-empty-function */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import representanteDatos from 'libs/shared/theme/assets/json/31601/represtantante-data.json';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite31601Store,Solicitud31601State } from '../../../../estados/tramites/tramite31601.store';
import { Tramite31601Query } from '../../../../estados/queries/tramite31601.query'
import { Subject, delay, map, merge, takeUntil, tap } from 'rxjs';

/**
 * Componente para gestionar la información del representante del importador/exportador.
 */
@Component({
  selector: 'app-represtantante', // Selector del componente en la plantilla HTML
  templateUrl: './represtantante.component.html', // Ruta a la plantilla HTML
  styleUrl: './represtantante.component.scss', // Ruta al archivo de estilos SCSS
  standalone: true, // Define que el componente puede funcionar de forma independiente (sin módulo específico)
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, FormsModule], // Módulos y componentes necesarios
})
export class ReprestantanteComponent implements OnInit {
  /**
   * Formulario reactivo para los datos del representante.
   */
  represtantante!: FormGroup;

  /**
   * Datos predefinidos del representante.
   */
  datosRepresentativos = representanteDatos;

  /**
   * Constructor del componente.
   * @param {FormBuilder} fb - Instancia de FormBuilder para la creación de formularios.
   */

  public solicitudState!: Solicitud31601State
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private tramite31601Store: Tramite31601Store,
    private tramite31601Query: Tramite31601Query
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Configura el formulario reactivo y carga los datos predefinidos del representante.
   */
  ngOnInit(): void {
    // Inicializa el formulario con las validaciones
    this.tramite31601Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.represtantante = this.fb.group({
      
        resigtro: [this.solicitudState?.resigtro, Validators.required],
        rfc: ['', Validators.required],
        nombre: ['', Validators.required],
        apellidoPaterno: ['', Validators.required],
        apellidoMaterno: ['', Validators.required],
        telefono: [this.solicitudState?.telefono, Validators.required],
        correo: [this.solicitudState?.correo, Validators.required],
      
    });

    // Deshabilita los campos que no deben ser modificados
    this.represtantante.get('rfc')?.disable();
    this.represtantante.get('nombre')?.disable();
    this.represtantante
      .get('apellidoPaterno')
      ?.disable();
    this.represtantante
      .get('apellidoMaterno')
      ?.disable();

    // Rellena el formulario con los datos del representante
    this.represtantante.patchValue({
        rfc: this.datosRepresentativos.rfc,
        nombre: this.datosRepresentativos.nombre,
        apellidoPaterno: this.datosRepresentativos.apellidoPaterno,
        apellidoMaterno: this.datosRepresentativos.apellidoMaterno,
      
    });
  }
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite31601Store): void {
    const valor = form.get(campo)?.value;
    (this.tramite31601Store[metodoNombre] as (value: any) => void)(valor);
  }
}
