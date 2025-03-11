/* eslint-disable sort-imports */
/* eslint-disable no-empty-function */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { Tramite31601Store, Solicitud31601State } from '../../../../estados/tramites/tramite31601.store';
import { Tramite31601Query } from '../../../../estados/queries/tramite31601.query';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

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
export class ReprestantanteComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para los datos del representante.
   */
  represtantante!: FormGroup;

  /**
   * Datos predefinidos del representante.
   */
  datosRepresentativos = representanteDatos;

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud31601State;

  /**
   * Notificador para destruir las suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * @param {FormBuilder} fb - Instancia de FormBuilder para la creación de formularios.
   * @param {Tramite31601Store} tramite31601Store - Store para gestionar el estado del trámite.
   * @param {Tramite31601Query} tramite31601Query - Query para obtener el estado del trámite.
   */
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
      resigtro: [this.solicitudState?.resigtro && this.solicitudState?.resigtro !='' ? this.solicitudState?.resigtro : this.datosRepresentativos.resigtro, Validators.required],
      rfc: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      telefono: [this.solicitudState?.telefono && this.solicitudState?.telefono !='' ? this.solicitudState?.telefono : this.datosRepresentativos.telefono, Validators.required],
      correo: [this.solicitudState?.correo && this.solicitudState?.correo !='' ? this.solicitudState?.correo : this.datosRepresentativos.correo, Validators.required],
    });

    // Deshabilita los campos que no deben ser modificados
    this.represtantante.get('rfc')?.disable();
    this.represtantante.get('nombre')?.disable();
    this.represtantante.get('apellidoPaterno')?.disable();
    this.represtantante.get('apellidoMaterno')?.disable();

    // Rellena el formulario con los datos del representante
    this.represtantante.patchValue({
      rfc: this.datosRepresentativos.rfc,
      nombre: this.datosRepresentativos.nombre,
      apellidoPaterno: this.datosRepresentativos.apellidoPaterno,
      apellidoMaterno: this.datosRepresentativos.apellidoMaterno,
    });
  }

  /**
   * Establece el valor de un campo en el store de Tramite31601.
   *
   * @param {FormGroup} form - El grupo de formularios que contiene el campo.
   * @param {string} campo - El nombre del campo cuyo valor se va a establecer.
   * @param {keyof Tramite31601Store} metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite31601Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite31601Store[metodoNombre] as (value: string) => void)(VALOR);
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}