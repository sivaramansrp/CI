import { Component } from '@angular/core';

@Component({
  selector: 'app-sanitario',
  templateUrl: './sanitario.component.html',
})
export class SanitarioComponent {
  pasos: ListaPasosWizard[] = PASOS;
  indice: number = 1;
}
