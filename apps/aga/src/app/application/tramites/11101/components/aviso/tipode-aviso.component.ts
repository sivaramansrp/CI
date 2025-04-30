import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
    selector: 'app-tipode-aviso',
    templateUrl: './tipode-aviso.component.html',
    styleUrls: ['./tipode-aviso.component.scss'],
    standalone:true,
    imports:[TituloComponent, ReactiveFormsModule]
})
export class TipodeAvisoComponent implements OnInit {
    avisoForm!: FormGroup;
    constructor(private fb: FormBuilder) { }
    ngOnInit(): void {
        this.avisoForm = this.fb.group({
 
        });
        this.setFormValues();
    }
  
   setFormValues() {
  this.avisoForm.get('numero de registro')?.setValue('1234');
    
}
}