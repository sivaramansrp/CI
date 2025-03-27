import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ListaPasosWizard } from '../../../core/models/shared/datos-generales.model';
import { CommonModule } from '@angular/common';
import { WizardService } from '../../../core/services/shared/wizard/wizard.service';

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.scss',
  host: {}
})
export class WizardComponent {
  @Input() listaPasos: Array<ListaPasosWizard> = [];
  @Output() indice = new EventEmitter<any>();

  indiceActual: number = 0;
  estadoInicial: boolean = false;
  lista: Array<ListaPasosWizard> = [];
  maximo: number = 0;

  wizardService = inject(WizardService);



  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['listaPasos'].currentValue !== undefined &&
      changes['listaPasos'].currentValue !== null
    ) {
      this.listaPasos = changes['listaPasos'].currentValue;

      this.listaPasos.forEach((element, index) => {
        this.estadoInicial = index == 0 ? true : false;
        this.lista.push({
          indice: index,
          titulo: element.titulo,
          activo: element.activo,
          completado: element.completado,
        });
      });

      this.maximo = this.lista.length - 1;
    }
  }

  siguiente(activo: boolean = true) {

    this.indiceActual = this.indiceActual === this.maximo ? this.indiceActual : this.indiceActual + 1;
    this.lista[this.indiceActual].activo = activo;

    if (this.indiceActual === (this.maximo)) {
      this.lista[this.indiceActual].completado = activo;
    }
  }

  atras() {
    this.lista[this.indiceActual].activo = false;
    this.lista[this.indiceActual].completado = false;
    this.indiceActual = this.indiceActual == 0 ? 0 : this.indiceActual - 1;
  }
}
