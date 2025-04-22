import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Solicitud31616TercerosState,Tramite31616TercerosStore } from '../../../../estados/tramites/tramite31616_terceros.store';
import { map,takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite31616TercerosQuery } from '../../../../estados/queries/tramite31616_terceros.query';
import representanteDatos from '@libs/shared/theme/assets/json/31601/represtantante-data.json';

@Component({
  selector: 'app-represtantante',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent, 
    ReactiveFormsModule, 
    FormsModule
  ],
  templateUrl: './represtantante.component.html',
  styleUrl: './represtantante.component.css',
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
    public solicitudState!: Solicitud31616TercerosState;
  
    /**
     * Notificador para destruir las suscripciones.
     */
    private destroyNotifier$: Subject<void> = new Subject();
  
    /**
     * Constructor del componente.
     * @param {FormBuilder} fb - Instancia de FormBuilder para la creación de formularios.
     * @param {Tramite31616TercerosStore} tramite31616TercerosStore - Store para gestionar el estado del trámite.
     * @param {Tramite31616TercerosQuery} tramite31616TercerosQuery - Query para obtener el estado del trámite.
     */
    constructor(
      private fb: FormBuilder,
      private tramite31616Store: Tramite31616TercerosStore,
      private tramite31616Query: Tramite31616TercerosQuery
    ) {
      //Añade lógica aquí
    }
  
    /**
     * Método que se ejecuta al inicializar el componente.
     * Configura el formulario reactivo y carga los datos predefinidos del representante.
     */
    ngOnInit(): void {
      // Inicializa el formulario con las validaciones
      this.tramite31616Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.solicitudState = seccionState;
          })
        )
        .subscribe();
  
      this.represtantante = this.fb.group({
        resigtro: [this.solicitudState?.resigtro && this.solicitudState?.resigtro !=='' ? this.solicitudState?.resigtro : this.datosRepresentativos.resigtro, Validators.required],
        rfc: ['', Validators.required],
        nombre: ['', Validators.required],
        apellidoPaterno: ['', Validators.required],
        apellidoMaterno: ['', Validators.required],
        telefono: [this.solicitudState?.telefono && this.solicitudState?.telefono !=='' ? this.solicitudState?.telefono : this.datosRepresentativos.telefono, Validators.required],
        correo: [this.solicitudState?.correo && this.solicitudState?.correo !=='' ? this.solicitudState?.correo : this.datosRepresentativos.correo, Validators.required],
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
    setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite31616TercerosStore): void {
      const VALOR = form.get(campo)?.value;
      (this.tramite31616Store[metodoNombre] as (value: string) => void)(VALOR);
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
