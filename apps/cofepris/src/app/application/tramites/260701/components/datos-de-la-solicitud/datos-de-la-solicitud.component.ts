import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlDar, AlertComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { DomicilloDelComponent } from '../domicillo-del/domicillo-del.component';
import { ManifiestosComponent } from '../manifiestos/manifiestos.component';
import { RepresentanteLegalComponent } from '../representante-legal/representante-legal.component';

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlertComponent,
    TituloComponent,
    DomicilloDelComponent,
    ManifiestosComponent,
    RepresentanteLegalComponent
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit {
   
    /**
     * Grupo de formularios principal.
     * @type {FormGroup}
     */
    public forma!: FormGroup;
   
    /**
     * Indica si la sección es colapsable.
     * @type {boolean}
     * @default true
     */
    public colapsable: boolean = true;
   
    /**
     * Constantes importadas desde el archivo de enumeración que contienen textos importantes y advertencias.
     * @type {typeof AlDar}
     */
    public TEXTOS = AlDar;
 
  constructor(
    public readonly fb: FormBuilder,
  ) {
    // Dependencia inyectada para uso posterior
  }
    /**
     * Método del ciclo de vida de Angular que se llama al inicializar el componente.
     * Obtiene datos del estado de la solicitud y configura el formulario.
     * @returns {void}
     */
    ngOnInit(): void {
   
      this.forma = this.fb.group({
        denominacionORazonSocial: [{ value: '', disabled: true }],
        correoElectronico: [{ value: '', disabled: true }]
      });
    }
   
    /**
     * Alterna el estado colapsable de la sección del formulario.
     * @returns {void}
     */
    public mostrar_colapsable(): void {
      this.colapsable = !this.colapsable;
    }
   
    /**
     * Habilita todos los controles del formulario si están deshabilitados.
     * @returns {void}
     */
    public toggleFormControls(): void {
      Object.keys(this.forma.controls).forEach((controlName) => {
        const CONTROL = this.forma.get(controlName);
        if (CONTROL?.disabled) {
          CONTROL.enable();
        }
      });
    }

}
