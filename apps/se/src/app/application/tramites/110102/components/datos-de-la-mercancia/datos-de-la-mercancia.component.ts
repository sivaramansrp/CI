/**
 * Este componente maneja los datos de la mercancía.
 */

import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite110102Query } from '../../estados/queries/tramite110102.query';
import { Tramite110102Store } from '../../estados/store/tramite110102.store';



/**
 * Este componente maneja los datos de la mercancía.
 */
@Component({
  selector: 'app-datos-de-la-mercancia',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './datos-de-la-mercancia.component.html',
  styleUrl: './datos-de-la-mercancia.component.scss',
})
export class DatosDeLaMercanciaComponent implements OnInit, OnDestroy {

  /**
   * Formulario para el registro de la mercancía del comercializador.
   * @type {FormGroup}
   */
  datosDeLamercanciaFrom: FormGroup;

  private destroyed$ = new Subject<void>();

  /**
   * Constructor del componente.
   * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
   */
  constructor(private fb: FormBuilder,private tramite110102Store:Tramite110102Store,private tramite110102Query:Tramite110102Query) {
    this.datosDeLamercanciaFrom = this.fb.group({
      cveRegistroProductor: ['', [Validators.required, Validators.maxLength(12)]],
      solicitud: this.fb.group({
        idSolicitud: [null],
        idSolicitudProductor: [''],
      })
    });
  }
  ngOnInit(): void {
    this.tramite110102Query.solicitudEntidadFederativaEntidadClave$
    .pipe(
      takeUntil(this.destroyed$),
      map((seccionState) => {
        this.datosDeLamercanciaFrom.patchValue(
          {
              cveRegistroProductor:seccionState.cveRegistroProductor
          } 
          )
      })
    )
    .subscribe();
  }


setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110102Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite110102Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }


  /**
   * Verifica si un control del formulario es inválido.
   * @param {string} nombreControl - Nombre del control del formulario.
   * @returns {boolean} - Retorna true si el control es inválido, de lo contrario false.
   */
  esInvalido(nombreControl: string): boolean {
    const CONTROL = this.datosDeLamercanciaFrom.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * Actualiza el estado del grid de comercializadores de productos.
   */
  actualizaGridComercializadoresProductos(): void {
    const IDSOLICITUD = this.datosDeLamercanciaFrom.get('solicitud.idSolicitud')?.value;
    if (IDSOLICITUD === null) {
      this.datosDeLamercanciaFrom.get('cveRegistroProductor')?.enable();
    } else {
      this.datosDeLamercanciaFrom.get('cveRegistroProductor')?.disable();
    }
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}