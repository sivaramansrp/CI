import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
    selector: 'app-mercancia',
    templateUrl: './mercancia.component.html',
    standalone: true,
    imports: [TituloComponent, ReactiveFormsModule], 
})
export class MercanciaComponent implements OnInit {
    mercanciaForm!:FormGroup 
    constructor(private fb:FormBuilder) { }
    ngOnInit(): void {
        this.mercanciaForm = this.fb.group({
            estado: [''],
            cantidad: [''],
            formapartadepatrimonia: [''],
            descripcion: [''],
            valor: [''],
            unidadmedida: [''],
            fraccionarancelaria: [''],
            nico: [''],
            marca: [''],
            modelo: [''],
            numerodeserie: [''],
            moneda: [''],
            fin: [''],
            especifique: [''],
        });
        this.setFormValues();
    }
    setFormValues(): void {
        this.mercanciaForm.get('estado')?.setValue('Nuevo');
        this.mercanciaForm.get('cantidad')?.setValue(1);
        this.mercanciaForm.get('formapartadepatrimonia')?.setValue('SI');
        this.mercanciaForm.get('descripcion')?.setValue('asd');
        this.mercanciaForm.get('valor')?.setValue(1);
        this.mercanciaForm.get('unidadmedida')?.setValue("Amperiso");
        this.mercanciaForm.get('fraccionarancelaria')?.setValue(123456);
        this.mercanciaForm.get('nico')?.setValue(0);    
        this.mercanciaForm.get('marca')?.setValue('adsfsdg');
        this.mercanciaForm.get('modelo')?.setValue('rewte');
        this.mercanciaForm.get('numerodeserie')?.setValue(134);
        this.mercanciaForm.get('moneda')?.setValue('fronca de africa ');
        this.mercanciaForm.get('fin')?.setValue('seleccion van valor');
        this.mercanciaForm.get('especifique')?.setValue('textarea');
    }
}