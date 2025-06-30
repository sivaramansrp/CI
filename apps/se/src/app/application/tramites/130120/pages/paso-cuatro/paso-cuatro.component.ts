import { Component } from '@angular/core';
import { FirmaElectronicaComponent } from "@ng-mf/data-access-user";

/**
 * Componente para el paso cuatro del trámite.
 *
 * Este componente representa el cuarto paso del flujo del trámite,
 * integrando el componente de Firma Electrónica para la validación y envío de la información.
 *
 * @componente
 * @selector app-paso-cuatro
 * @template ./paso-cuatro.component.html
 * @estilo ./paso-cuatro.component.scss
 * @standalone
 * @importa FirmaElectronicaComponent
 *
 * @notas
 * Este paso es fundamental para la validación final mediante firma electrónica.
 */
@Component({
  selector: 'app-paso-cuatro',
  templateUrl: './paso-cuatro.component.html',
  styleUrl: './paso-cuatro.component.scss',
  standalone: true,
  imports: [FirmaElectronicaComponent],
})
export class PasoCuatroComponent {

}