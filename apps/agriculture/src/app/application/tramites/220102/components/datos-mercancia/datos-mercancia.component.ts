import { Component, OnInit } from '@angular/core';
import { IMPORTANTE } from '../../constantes/fitosanitario.enum';
import { ConfiguracionColumna, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MercanciaForm } from '../../models/fitosanitario.model';

@Component({
  selector: 'app-datos-mercancia',
  templateUrl: './datos-mercancia.component.html',
  styleUrl: './datos-mercancia.component.css',
})
export class DatosMercanciaComponent implements OnInit {
  /**
    * @description Tipo de selección para la tabla de solicitudes.
    * @type {TablaSeleccion}
    */
  tipoSeleccionsoli: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * @description Configuración de columnas para la tabla principal.
   * @type {ConfiguracionColumna<Fila>[]}
   */
  configuracionColumnasoli: ConfiguracionColumna<MercanciaForm>[] = [
    { encabezado: 'Fracción arancelaria', clave: (fila) => fila.fraccionArancelaria, orden: 1 },
    { encabezado: 'Descripción de la fracción', clave: (fila) => fila.descripcionFraccionArancelaria, orden: 2 },
    { encabezado: 'Descripción de la mercancía', clave: (fila) => fila.descripcion, orden: 3 }, // Usando "descripcion" aquí
    { encabezado: 'Unidad de medida de tarifa (UMT)', clave: (fila) => fila.umt, orden: 4 }, // Usando "umt" aquí
    { encabezado: 'Cantidad UMT', clave: (fila) => fila.cantidadUMT, orden: 5 },
    { encabezado: 'Unidad de medida de comercialización (UMC)', clave: (fila) => fila.umc, orden: 6 }, // Usando "umc" aquí
    { encabezado: 'Cantidad UMC', clave: (fila) => fila.cantidadUMC, orden: 7 },
    { encabezado: 'Nombre común', clave: (fila) => fila.nombreComun, orden: 8 }, // Usando "nombreComun" aquí
    { encabezado: 'Nombre científico', clave: (fila) => fila.nombreCientifico, orden: 9 },
    { encabezado: 'Uso', clave: (fila) => fila.uso, orden: 10 },
    { encabezado: 'País de origen', clave: (fila) => fila.paisOrigen, orden: 11 },
    { encabezado: 'País de procedencia', clave: (fila) => fila.paisProcedencia, orden: 12 },
    { encabezado: 'Tipo de producto', clave: (fila) => fila.tipoProducto, orden: 13 },
  ];

  IMPORTANTES: string = IMPORTANTE.Importante;
  cuerpoTabla: any[] = [];

  formMercancia?: FormGroup;
  constructor(private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.formMercancia = this.fb.group({
      nombreComun: ['', Validators.required],
      nombreCientifico: ['', Validators.required],
      uso: ['', Validators.required],
      paisOrigen: ['', Validators.required],
      paisProcedencia: ['', Validators.required],
      tipoProducto: ['', Validators.required],
      fraccionArancelaria: ['', Validators.required],
      descripcionFraccionArancelaria: [''],
      cantidadUMT: [''],
      umt: [''],
      cantidadUMC: ['', Validators.required],
      umc: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

}
