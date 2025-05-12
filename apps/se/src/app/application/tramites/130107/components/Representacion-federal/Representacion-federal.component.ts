import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { REPRESENTACION_FEDERAL } from '../../constantes/datos-de-la-solicitud.enum';
import { FormGroup , ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
@Component({
  selector: 'app-representacion-federal',
  standalone: true,
  imports: [CommonModule, FormasDinamicasComponent, ReactiveFormsModule],
  templateUrl: './Representacion-federal.component.html',
  styleUrl: './Representacion-federal.component.scss',
})
export class RepresentacionFederalComponent implements OnInit, OnDestroy {
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
    
      public datosRepresentacionFederal = REPRESENTACION_FEDERAL;
  
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
