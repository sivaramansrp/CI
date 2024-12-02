import { Component } from '@angular/core';
import { ServiciosExtraordinariosService } from '../../../core/services/5701/servicios-extraordinarios/servicios-extraordinarios.service';

@Component({
  selector: 'app-servicios-extraordinarios',
  templateUrl: './servicios-extraordinarios.component.html',
  styleUrl: './servicios-extraordinarios.component.scss'
})
export class ServiciosExtraordinariosComponent {
  constructor (private sExtraordinariosService: ServiciosExtraordinariosService ) {
    this.getDatosGenerales();
    
  }

  getDatosGenerales() {
    this.sExtraordinariosService.getDatosGenerales().subscribe( res => {
      console.log(res);
      
    })
  }


}
