import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// import { ProductoOption } from '../constantes/vehiculos-adaptados.enum';
import { ProductoOption } from '../../constantes/vehiculos-adaptados.enum';

import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import {
  CatalogoSelectComponent,
  InputRadioComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
@Component({
  selector: 'app-detos-de-la-mercancia',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    InputRadioComponent,
    CatalogoSelectComponent,
  ],
  templateUrl: './detos-de-la-mercancia.component.html',
  styleUrl: './detos-de-la-mercancia.component.scss',
})
export class DetosDeLaMercanciaComponent {
  @Input() productoOptions: any[] = [];
  @Input() fraccionCatalog: Catalogo[] = [];
  @Input() unidadCatalog: Catalogo[] = [];

  @Input() mercanciaData: {
    defaultProducto: string;
    producto: string;
    descripcion: string;
    fraccion: string;
    cantidad: string;
    valorPartidaUSD: number;
    unidadMedida: string;
  } | null = {
    defaultProducto: 'Nuevo',
    producto: '',
    descripcion: '',
    fraccion: '',
    cantidad: '',
    valorPartidaUSD: 0,
    unidadMedida: '',
  };
  @Output() formValueChange = new EventEmitter<{
    producto: string;
    descripcion: string;
    fraccion: string;
    cantidad: string;
    valorFacturaUSD: string;
    unidadMedida: string;
  }>();

  formDelLa!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.updateFormValues();

    this.formDelLa.valueChanges.subscribe((values) => {
      this.formValueChange.emit({
        producto: values.producto || '',
        descripcion: values.descripcion || '',
        fraccion: values.fraccion || '',
        cantidad: values.cantidad || '',
        valorFacturaUSD: values.valorFacturaUSD || '',
        unidadMedida: values.unidadMedida || '',
      });
    });
  }

  ngOnChanges(): void {
    if (this.formDelLa) {
      this.updateFormValues();
    }
  }

  initializeForm(): void {
    const defaultProducto = this.mercanciaData?.defaultProducto || 'Nuevo';
    this.formDelLa = this.fb.group({
      producto: [defaultProducto],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      fraccion: ['', [Validators.required]],
      cantidad: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)]],
      valorFacturaUSD: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.min(0.01)]],
      unidadMedida: ['', [Validators.required]],
    });
  }

  private updateFormValues(): void {
    if (this.mercanciaData) {
      this.formDelLa.patchValue({
        producto: this.mercanciaData.producto || this.mercanciaData.defaultProducto || 'Nuevo',
        descripcion: this.mercanciaData.descripcion || '',
        fraccion: this.mercanciaData.fraccion || '',
        cantidad: this.mercanciaData.cantidad || '',
        valorFacturaUSD: this.mercanciaData.valorPartidaUSD ? this.mercanciaData.valorPartidaUSD.toString() : '',
        unidadMedida: this.mercanciaData.unidadMedida || '',
      });
    }
  }
}

