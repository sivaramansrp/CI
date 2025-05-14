import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { MercanciaComponent } from '../mercancia/mercancia.component';
import mockData from '@libs/shared/theme/assets/json/11101/aviso-mockdata.json';


@Component({
    selector: 'app-tipode-aviso',
    templateUrl: './tipode-aviso.component.html',
    styleUrls: ['./tipode-aviso.component.scss'],
    standalone: true,
    imports: [TituloComponent, FormsModule, ReactiveFormsModule, MercanciaComponent, CommonModule, TableComponent]
})
export class TipodeAvisoComponent implements OnInit {
    /**
     * Indica si el modo manual está seleccionado.
     * @type {boolean}
     */
    isManualSelected: boolean = false;

    /**
     * Indica si la carga masiva está habilitada.
     * @type {boolean}
     */
    cargaMasiva: boolean = false;

    /**
     * Formulario reactivo para capturar los datos del aviso.
     * @type {FormGroup}
     */
    avisoForm!: FormGroup;

    /**
     * Constructor de la clase. Inicializa el FormBuilder.
     * @param {FormBuilder} formBuilder - Servicio para construir formularios reactivos.
     */
    constructor(private formBuilder: FormBuilder) {}

    /**
     * Método de inicialización del componente.
     * Configura el formulario reactivo con los campos necesarios.
     */
    ngOnInit(): void {
        this.avisoForm = this.formBuilder.group({
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
    }

    /**
     * Establece los valores del formulario utilizando datos simulados.
     */
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

    /**
     * Cambia el modo entre manual y carga masiva.
     * @param {boolean} isManual - Indica si el modo manual debe ser seleccionado.
     */
    setManual(isManual: boolean): void {
        this.isManualSelected = isManual;
        this.cargaMasiva = !isManual;
    }
}