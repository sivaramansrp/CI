import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-representante-legal',
  standalone: true,
  imports: [CommonModule,TituloComponent,ReactiveFormsModule],
  templateUrl: './representante-legal.component.html',
  styleUrl: './representante-legal.component.scss',
})
export class RepresentanteLegalComponent implements OnInit {

   /**
     * Grupo de formularios principal para el representante legal.
     */
    representante!: FormGroup;
   
    /**
     * Constructor del componente.
     * @param fb - FormBuilder para la creación de formularios reactivos.
     */
    constructor(
      private readonly fb: FormBuilder
    ) {
      // Dependencia inyectada para uso posterior
    }
   
    /**
     * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
     * Obtiene el estado de la solicitud y crea el formulario del representante legal.
     */
    ngOnInit(): void {
      this.representante = this.fb.group({
        rfc: [''],
        nombre: [''],
        apellidoPaterno: [''],
        apellidoMaterno: [''],
      });
    }
   
    /**
     * Método para actualizar los valores del formulario de representante legal.
     * Este método simula la obtención de nuevos valores y actualiza el formulario.
     */
    obtenerValor(): void {
      this.representante.patchValue({
        nombre: 47875, // Nota: Esto debería ser una cadena, considera ajustar si es necesario.
        apellidoPaterno: 'Paterno',
        apellidoMaterno: 'Materno',
      });
    }
}
