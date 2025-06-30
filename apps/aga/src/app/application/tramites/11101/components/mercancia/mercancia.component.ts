import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TablaDinamicaComponent, TablaSeleccion, TituloComponent, } from '@libs/shared/data-access-user/src';
import { map, takeUntil } from 'rxjs/operators';
import { CONFIGURACION_PARA_PFE_ENCABEZADO_DE_TABLA } from '../../constants/mercancia.enum';
import { CommonModule } from '@angular/common';
import { DiscripccionDeLaMercanciaForm } from '../../models/transportacion-maritima.model';
import { Subject } from 'rxjs';
import { Tramite11101Query } from '../../estados/tramite11101.query';

@Component({
    selector: 'app-mercancia',
    templateUrl: './mercancia.component.html',
    standalone: true,
    imports: [TituloComponent, ReactiveFormsModule, TablaDinamicaComponent, CommonModule],
})
export class MercanciaComponent implements OnInit {
    /**
     * Enumeración para la selección de tablas.
     * @type {typeof TablaSeleccion}
     */
    tablaSeleccion = TablaSeleccion;

    /**
     * Formulario reactivo para capturar los datos de la mercancía.
     * @type {FormGroup}
     */
    mercanciaForm!: FormGroup;

    /**
     * Lista de descripciones de la mercancía.
     * @type {discripccionDeLaMercanciaForm[]}
     */
    discripccionDeLaMercanciaForm: DiscripccionDeLaMercanciaForm[] = [];

    /**
     * Subject para destruir notificador.
     */
    private destruirNotificador$: Subject<void> = new Subject();

    /**
     * Configuración para el persona moral nacional encabezado de la tabla.
     */
    configuracionParaPFEEncabezadoDeTabla = CONFIGURACION_PARA_PFE_ENCABEZADO_DE_TABLA;

    /**
     * Constructor de la clase. Inicializa el FormBuilder.
     * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
     */
    constructor(private fb: FormBuilder,
        private tramite11101Query: Tramite11101Query,
    ) { }

    /**
     * Método de inicialización del componente.
     * Configura el formulario reactivo con los campos necesarios, establece valores iniciales
     * y suscribe a los cambios en el estado del trámite.
     */
    ngOnInit(): void {
       
        this.setFormValues();
        this.tramite11101Query.selectSeccionState$
            .pipe(
                takeUntil(this.destruirNotificador$),
                map((seccionState) => {
                    const SESSION_STATE_MOCK : DiscripccionDeLaMercanciaForm[] =[
                        {
                            consecutivo: "1",
                            estado: "Nuevo",
                            cantidad: "1",
                            formaParteDePatrimonio: "SI",
                            numeroderegistro: '',
                            NobmreDenominationRazonSocial: '',
                            rfctaxid: '',
                            Telefono: '',
                            correoelectronico: '',
                            entidadadfederativa: '',
                            alcadilamunicipio: '',
                            colonia: '',
                            codigopostal: '',
                            calle: '',
                            numeroletraexterior: '',
                            numeroletrainterior: '',
                            entrecalle: '',
                            ycalle: ''
                        }
                    ]
                       this.discripccionDeLaMercanciaForm = seccionState.discripccionDeLaMercanciaTabla || SESSION_STATE_MOCK;
                })
            )
            .subscribe();
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