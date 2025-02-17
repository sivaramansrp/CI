import { Component, OnInit} from '@angular/core';
import { FormArray,FormBuilder ,FormGroup,Validators} from '@angular/forms';
import { CatalogosService } from '../../../../core/services/shared/catalogos/catalogos.service';
import {Catalogo} from '../../../../core/models/shared/catalogos.model';
import { CATALOGOS_ID } from '../../../../shared/constantes/constantes';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-datos-dela',
  templateUrl: './datos-dela.component.html',
  styleUrl: './datos-dela.component.scss'
})
export class DatosDelaComponent implements OnInit{

  datosForm: FormGroup;
  aduanas!: Catalogo[];
  selectedAduana: any;  

    constructor(
      private fb: FormBuilder,
      private catalogosServices:CatalogosService
    ) {}


    ngOnInit(): void {  
      this.datosForm = this.fb.group({
        aduanas: [null, Validators.required]
      });
      this.aduanasdata();

    }
    
    onAduanaSelect(): void {
      // Capture the selected value
     this.selectedAduana = this.datosForm.get('aduanas')?.value;
     console.log('selectedAduana',this.aduanas)
     const selectedAduana1 = this.aduanas.find(aduana => aduana.id === this.selectedAduana);
     console.log('selected', selectedAduana1.descripcion)
    }

    aduanasdata():void{
      console.log('ngoninit start')
      this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_ADUANAS)
       .subscribe({
        next: (resp) => {
       console.log('API Response:', resp);
            if (resp.length > 0) {
           this.aduanas = resp;
  
      }
    },
    error: (err) => console.error('API Error:', err),
    complete: () => console.log('API Call Completed')
  });
    }
    

}
