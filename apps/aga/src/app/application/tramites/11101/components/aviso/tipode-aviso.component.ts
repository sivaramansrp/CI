import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import mockData from '@libs/shared/theme/assets/json/11101/aviso-mockdata.json';
import { MercanciaComponent } from '../mercancia/mercancia.component';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-tipode-aviso',
    templateUrl: './tipode-aviso.component.html',
    styleUrls: ['./tipode-aviso.component.scss'],
    standalone: true,
    imports: [TituloComponent, FormsModule, ReactiveFormsModule, MercanciaComponent, CommonModule]
})
export class TipodeAvisoComponent implements OnInit {
    isManualSelected: boolean = false;
    CargaMasiva: boolean = false;
    avisoForm!: FormGroup;
    constructor(private fb: FormBuilder) { }
    ngOnInit(): void {
        this.avisoForm = this.fb.group({
            numeroderegistro: [''],
            NobmreDenominationRazonSocial: [''],
            rfctaxid: [''],
            Telefono: [''],
            correoelectronico: [''],
            entidadadfederativa: [''],
            alcadilamunicipio: [''],
            colonia: [''],
            codigopostal: [''],
            calle: [''],
            numeroletraexterior: [''],
            numeroletrainterior: [''],
            entrecalle: [''],
            ycalle: [''],
        });
        this.setFormValues();
    }

    setFormValues(): void {
        this.avisoForm.get('numeroderegistro')?.setValue(mockData.numeroderegistro);
        this.avisoForm.get('NobmreDenominationRazonSocial')?.setValue(mockData.NobmreDenominationRazonSocial);
        this.avisoForm.get('rfctaxid')?.setValue(mockData.rfctaxid);
        this.avisoForm.get('Telefono')?.setValue(mockData.Telefono);
        this.avisoForm.get('correoelectronico')?.setValue(mockData.correoelectronico);
        this.avisoForm.get('entidadadfederativa')?.setValue(mockData.entidadadfederativa);
        this.avisoForm.get('alcadilamunicipio')?.setValue(mockData.alcadilamunicipio);
        this.avisoForm.get('colonia')?.setValue(mockData.colonia);
        this.avisoForm.get('codigopostal')?.setValue(mockData.codigopostal);
        this.avisoForm.get('calle')?.setValue(mockData.calle);
        this.avisoForm.get('numeroletraexterior')?.setValue(mockData.numeroletraexterior);
        this.avisoForm.get('numeroletrainterior')?.setValue(mockData.numeroletrainterior);
        this.avisoForm.get('entrecalle')?.setValue(mockData.entrecalle);
        this.avisoForm.get('ycalle')?.setValue(mockData.ycalle);
    }

    setManual(value: boolean): void {
        if (this.isManualSelected) {
            this.CargaMasiva = false;
            this.isManualSelected = value;
        } else {
            this.CargaMasiva = true;
            this.isManualSelected = value;
        }
        console.log('Manual selected:', this.isManualSelected);
    }


}