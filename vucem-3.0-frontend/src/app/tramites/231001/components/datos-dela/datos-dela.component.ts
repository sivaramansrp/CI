import { Component, OnInit} from '@angular/core';
import { FormArray,FormBuilder ,FormGroup,Validator } from '@angular/forms';
import { CatalogosService } from '../../../../core/services/shared/catalogos/catalogos.service';
import {Catalogo, CatalogoPaises} from '../../../../core/models/shared/catalogos.model';
import { CATALOGOS_ID, TIPO_SOLICITUD } from '../../../../shared/constantes/constantes';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-datos-dela',
  templateUrl: './datos-dela.component.html',
  styleUrl: './datos-dela.component.scss'
})
export class DatosDelaComponent implements OnInit{

  //myForm: FormGroup;
    tiposSolicitud!: Catalogo[];
    paisesOrigen!: CatalogoPaises[];
    paisesProcedencia!: CatalogoPaises[];

    constructor(
      private fb: FormBuilder,
      private catalogosServices:CatalogosService
    ) {}


    ngOnInit(): void {  
      console.log('ngoninit start')
      this.catalogosServices
      .getCatalogoPaises(CATALOGOS_ID.CAT_PAISES)
       .subscribe({
        next: (resp) => {
       console.log('API Response:', resp);
       if (resp.length > 0) {
       this.paisesOrigen = resp;
        this.paisesProcedencia = resp;
      }
    },
    error: (err) => console.error('API Error:', err),
    complete: () => console.log('API Call Completed')
  });
    }
    
 
}
