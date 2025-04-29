import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { VALOR_FORMULARIO } from '@libs/shared/data-access-user/src/core/enums/260104/domicilo.enum';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-representante-legal',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    TituloComponent
  ],
  templateUrl: './representante-legal.component.html',
  styleUrl: './representante-legal.component.scss',
})
export class RepresentanteLegalComponent {
    
 
    /**
     * Notificador para destruir observables activos y evitar pérdidas de memoria.
     */
    private destroyNotifier$: Subject<void> = new Subject();
   
    /**
     * Grupo de formularios principal para el representante legal.
     */
    representante!: FormGroup;
   
    /**
     * Constructor del componente.
     * @param fb - FormBuilder para la creación de formularios reactivos.
     * @param tramite260211Store - Servicio para interactuar con el store de Tramite260211.
     * @param tramite260211Query - Servicio para consultar el estado de la solicitud.
     */
    constructor(
      private readonly fb: FormBuilder,
    ) {
      // Dependencia inyectada para uso posterior
    }
   
    /**
     * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
     * Obtiene el estado de la solicitud y crea el formulario del representante legal.
     */
    ngOnInit(): void {  
      this.crearFormulario();
    }

    crearFormulario():void{
      /**
       * Inicialización del formulario de representante legal.
       */
      this.representante = this.fb.group({
        rfc: ['', Validators.required],
        nombre: [{ value: '', disabled: true }, Validators.required],
        apellidoPaterno: [{ value: '', disabled: true }, Validators.required],
        apellidoMaterno: [{ value: '', disabled: true }],
      });
    }
   
    /**
     * Método para actualizar los valores del formulario de representante legal.
     * Este método simula la obtención de nuevos valores y actualiza el formulario.
     */
    obtenerValor(): void {
      this.representante.patchValue({
        nombre: VALOR_FORMULARIO.nombre, // Nota: Esto debería ser una cadena, considera ajustar si es necesario.
        apellidoPaterno: VALOR_FORMULARIO.apellidoPaterno,
        apellidoMaterno: VALOR_FORMULARIO.apellidoMaterno,
      });
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
