import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ListaPasosWizard } from '../../../core/models/5701/servicios-extraordinarios.model';

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [],
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.scss'
})
export class WizardComponent {
  @Input() listaPasos: Array<string> = [];
  @Output() indice = new EventEmitter<any>();

  iActual: number = 0;
  edo_inicial: boolean = false;
  lista: Array<ListaPasosWizard> = [];
  maximo: number = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['listaPasos'].currentValue !== undefined && changes['listaPasos'].currentValue !== undefined) {
      this.listaPasos = changes['listaPasos'].currentValue;

      this.listaPasos.forEach((element, index) => {
        this.edo_inicial = index == 0 ? true : false;
        this.lista.push({
          indice: index,
          titulo: element,
          activo: this.edo_inicial,
          completado: false,
          validado: false,
          final: false,

        })
      })


    }

  }



}
