import { Component } from '@angular/core';
import { PASOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { ServiciosExtraordinariosService } from '../../../../core/services/5701/servicios-extraordinarios/servicios-extraordinarios.service';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``
})
export class SolicitudPageComponent {
  pasos: Array<string> = PASOS;
  indice: number = 1;

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

  getValorIndice(e: number) {
    this.indice = e;
    console.log(this.indice);

  }


}
