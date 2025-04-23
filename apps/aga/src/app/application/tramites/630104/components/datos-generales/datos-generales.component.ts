import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';

import { FORMULARIO_DATOS_GENERALES } from '../../enums/retorno-importacion-temporal.enum';

import { ModeloDeFormaDinamica, TituloComponent} from '@ng-mf/data-access-user';

import { Tramite630104Query } from '../../estados/queries/tramite630104.query';

import { Tramite630104State, Tramite630104Store } from '../../estados/tramites/tramite630104.store';
import { EquipoEInstrumentosMusicalesService } from '../../services/equipo-e-instrumentos-musicales.service';

@Component({
  selector: 'app-datos-generales',
  standalone: true,
  imports: [CommonModule, FormasDinamicasComponent, TituloComponent],
  templateUrl: './datos-generales.component.html',
  styleUrl: './datos-generales.component.scss',
})
export class DatosGeneralesComponent {
  datosGeneralesFormulario!: FormGroup;

  /**
   * Estado seleccionado del trámite 630303.
   */
  estadoSeleccionado!: Tramite630104State;

  formularioDatosGenerales: ModeloDeFormaDinamica[] = FORMULARIO_DATOS_GENERALES;


  constructor(private fb: FormBuilder, private tramite630104Store: Tramite630104Store,
      private tramite630104Query: Tramite630104Query, private equipoEInstrumentosMusicalesService: EquipoEInstrumentosMusicalesService) {
      //
    }


    inicializarFormulario(): void {
      this.datosGeneralesFormulario = this.fb.group({
        });
    }

  /**
   * Actualiza un valor específico en el store del trámite.
   * 
   * @param $event - Evento que contiene el campo y el valor a actualizar.
   */
  establecerCambioDeValor($event: { campo: string; valor: unknown }): void {
    if (typeof $event.valor === 'object' && $event.valor !== null && 'id' in $event.valor) {
      this.tramite630104Store.setTramite630104State($event.campo, ($event.valor as { id: unknown }).id);
    } else {
      this.tramite630104Store.setTramite630104State($event.campo, $event.valor);
    }
  }
 
}
