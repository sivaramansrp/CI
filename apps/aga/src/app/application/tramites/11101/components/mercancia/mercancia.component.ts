import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TablaDinamicaComponent, TablaSeleccion, TableComponent, TablePaginationComponent, TituloComponent, } from '@libs/shared/data-access-user/src';
import { DiscripccionDeLaMercanciaForm } from '../../models/transportacion-maritima.model';

@Component({
    selector: 'app-mercancia',
    templateUrl: './mercancia.component.html',
    standalone: true,
    imports: [TituloComponent, ReactiveFormsModule, TablePaginationComponent, TablaDinamicaComponent, TableComponent], 
})
export class MercanciaComponent implements OnInit {
    /**
     * Enumeración para la selección de tablas.
     * @type {typeof TablaSeleccion}
     */
    TablaSeleccion = TablaSeleccion;

    /**
     * Formulario reactivo para capturar los datos de la mercancía.
     * @type {FormGroup}
     */
    mercanciaForm!: FormGroup;

    /**
     * Lista de descripciones de la mercancía.
     * @type {DiscripccionDeLaMercanciaForm[]}
     */
    DiscripccionDeLaMercanciaForm: DiscripccionDeLaMercanciaForm[] = [];
    
    /**
     * Constructor de la clase. Inicializa el FormBuilder.
     * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
     */
    constructor(private fb: FormBuilder) { }

    /**
     * Método de inicialización del componente.
     * Configura el formulario reactivo con los campos necesarios y establece valores iniciales.
     */
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

    /**
     * Establece los valores iniciales del formulario de mercancía.
     */
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