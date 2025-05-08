import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DATOS_DE_LA_MERCANCIA } from '../../constantes/datos-de-la-solicitud.enum';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-datos-de-la-mercancia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormasDinamicasComponent],
  templateUrl: './Datos-de-la-mercancia.component.html',
  styleUrl: './Datos-de-la-mercancia.component.scss',
})
export class DatosDeLaMercanciaComponent implements OnInit,OnDestroy{
    /**
     * Sujeto utilizado para destruir las suscripciones y evitar fugas de memoria.
     */
     private destroy$ = new Subject<void>();
    /**
     * Formulario principal del componente.
     * Incluye un grupo de formularios para manejar los datos de los insumos.
     */
    public forma: FormGroup = new FormGroup({
      ninoFormGroup: new FormGroup({}),
    });
  
    /**
     * Getter para acceder al grupo de formularios de insumos.
     * Retorna el grupo de formularios correspondiente.
     */
    get ninoFormGroup(): FormGroup {
      return this.forma.get('ninoFormGroup') as FormGroup;
    }
  
    public datosDelMercancia = DATOS_DE_LA_MERCANCIA;
    
    constructor
    () {
      // Lógica de inicialización si es necesario
    }
    ngOnInit(): void {
      // Lógica de inicialización si es necesario
    }
      /**
     * Método que destruye las suscripciones para evitar fugas de memoria.
     */
      ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
      }
}
