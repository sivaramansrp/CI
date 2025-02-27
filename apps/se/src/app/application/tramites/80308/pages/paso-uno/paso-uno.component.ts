import { AfterViewInit, Component } from '@angular/core';
import {
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL,
  PERSONA_MORAL_NACIONAL,
} from 'libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { AltaPlantaComponent } from '../../components/alta-planta/alta-planta.component';
import { BitacoraComponent } from '../../components/bitacora/bitacora.component';
import { CommonModule } from '@angular/common';
import { DatosModificacionesComponent } from '../../components/datos-modificaciones/datos-modificaciones.component';
import { FormularioDinamico } from 'libs/shared/data-access-user/src/core/models/shared/forms-model';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SolicitanteComponent,
    BitacoraComponent,
    AltaPlantaComponent,
    DatosModificacionesComponent,
  ],
  host: { hostID: crypto.randomUUID().toString() },
})
export class PasoUnoComponent implements AfterViewInit {
  /**
   * Representa el tipo de persona (por ejemplo, persona moral o física).
   * @type {number}
   */
  tipoPersona!: number;

  /**
   * Arreglo que contiene los datos dinámicos relacionados con la persona.
   * @type {FormularioDinamico[]}
   */
  persona: FormularioDinamico[] = [];

  /**
   * Arreglo que contiene los datos dinámicos relacionados con el domicilio fiscal.
   * @type {FormularioDinamico[]}
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice que controla la selección de las pestañas en la interfaz.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Se ejecuta después de que la vista del componente se haya inicializado.
   * En este método se asignan los valores de los arreglos `persona` y `domicilioFiscal`
   * a partir de las constantes definidas.
   *
   */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
  }

  /**
   * Cambia el índice de la pestaña seleccionada.
   * Se utiliza para cambiar la pestaña activa en la interfaz.
   *
   * @param {number} i - El índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
