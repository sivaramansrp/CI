import { Component, OnInit } from '@angular/core';
import { ESREQUIREDTABLESMENSAJE } from '../../../../shared/constantes/220202/fitosanitario.enums';

import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-terceros-relacionados',
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss'
})
export class TercerosRelacionadosComponent implements OnInit {
  esRequiredTablesMensaje: string = ESREQUIREDTABLESMENSAJE;
  miFormulario: FormGroup;
  pairsList: CatalogosSelect = {
    labelNombre: 'País',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: []
  }
  constructor(private readonly fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.miFormulario = this.fb.group({
      exportadores: this.fb.array([])
    });
  }

}
