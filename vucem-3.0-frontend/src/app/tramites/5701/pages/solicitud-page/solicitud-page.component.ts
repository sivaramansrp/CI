import { Component } from '@angular/core';
import { PASOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { ServiciosExtraordinariosService } from '../../../../core/services/5701/servicios-extraordinarios/servicios-extraordinarios.service';

@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``
})
export class SolicitudPageComponent {
  pasos: Array<string> = PASOS;
  indice: number = 2;

  constructor( private sExtraordinariosService: ServiciosExtraordinariosService ) {}

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
