/**
 * Este componente maneja los datos de la mercancía.
 */

import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TituloComponent } from '@ng-mf/data-access-user';
import { DatosDeLaMercanciaStore } from '../../estados/store/datos-de-la-mercancia.store';
import { DatosDeLaMercanciaQuery } from '../../estados/queries/datos-de-la-mercancia.query';

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
export class DatosDeLaMercanciaComponent implements OnInit{

  /**
   * Formulario para el registro de la mercancía del comercializador.
   * @type {FormGroup}
   */
  datosDeLamercanciaFrom: FormGroup;

  /**
   * Constructor del componente.
   * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
   */
  constructor(private fb: FormBuilder,private store:DatosDeLaMercanciaStore,private query:DatosDeLaMercanciaQuery) {
    this.datosDeLamercanciaFrom = this.fb.group({
      cveRegistroProductor: ['', [Validators.required, Validators.maxLength(12)]],
      solicitud: this.fb.group({
        idSolicitud: [null],
        idSolicitudProductor: [''],
      })
    });
  }
  ngOnInit(): void {
    this.query.selectCveRegistroProductor$.subscribe(
      (data)=>{
      this.datosDeLamercanciaFrom.patchValue(
      {
          cveRegistroProductor:data
      } 
      )
    }
    )
  }

update()
{
  this.store.setCveRegistroProductor(this.datosDeLamercanciaFrom.get('solicitud.idSolicitud')?.value)
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
}