import { Component } from '@angular/core';
import { ServiciosExtraordinariosService } from '../../../core/services/5701/servicios-extraordinarios/servicios-extraordinarios.service';
import { PASOS } from '../../../shared/constantes/servicios-extraordinarios.enum';
import { DatosInput } from '../../../core/models/shared/components.model';

@Component({
  selector: 'app-servicios-extraordinarios',
  templateUrl: './servicios-extraordinarios.component.html',
  styleUrl: './servicios-extraordinarios.component.scss'
})
export class ServiciosExtraordinariosComponent {
  pasos: Array<string> = PASOS;
  indice: number = 1;

  in_curp: DatosInput = {
    lbl_name: 'CURP',
    id: 'curp',
    disabled: true,
    tooltip: true,
    title_tooltip: 'Clave Única de Registro de Población'

  }

  constructor (private sExtraordinariosService: ServiciosExtraordinariosService ) {
   
  }

  ngOnInit() {
    this.getDatosGenerales();
  }

  getDatosGenerales() {
    this.sExtraordinariosService.getDatosGenerales().subscribe( res => {
      console.log(res);
      
    })
  }

  seleccionaTab(i: number): void {
    this.indice = i;   
  }


}
