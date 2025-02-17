/**
 * @component ConstanciaDelRegistroComponent
 * @description Este componente es responsable de manejar el formulario del certificado de registro.
 * Incluye un formulario para capturar los datos del certificado de registro y funcionalidades adicionales.
 * 
 * @import { Component } from '@angular/core';
 * @import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 */
import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ConstanciaDelRegistroService } from '../../../../core/services/120301/constancia-del-registro/constancia-del-registro.service';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
@Component({
  selector: 'app-constancia-del-registro',
  templateUrl: './constancia-del-registro.component.html',
  styleUrl: './constancia-del-registro.component.scss',
  standalone: true,
  imports: [
    TableComponent,
    TituloComponent,
    ReactiveFormsModule
  ]
})
export class ConstanciaDelRegistroComponent implements OnInit {
  /**
   * @property {FormGroup} forma - El grupo de formularios para capturar los datos del certificado de registro.
   */
  fitosanitarioForm!: FormGroup;

  /**
   * @property {string[]} selectRangoDias - Array de rangos de días seleccionables.
   */
  selectRangoDias: string[] = [];

  /**
   * @property {boolean} colapsable - Booleano para controlar el estado colapsable.
   */
  colapsable: boolean = false;

  /**
   * @property {FormGroup} ConstanciaDelRegistro - El grupo de formularios para los datos del certificado de registro.
   */
  ConstanciaDelRegistro!: FormGroup;

  /**
   * @property {string[]} tableColumns - Array de encabezados de columnas de la tabla.
   */
  tableColumns = [
    'Número de constancia de registro',
    'Fracción arancelaria',
    'Clasificación del regimen',
    'País destino/origen',
    'Fecha inicio vigencia',
    'Fecha fin vigencia',
  ];

  /**
   * @property {Array} federal - Array de datos de federal para mostrar en la tabla.
   */
  federal: any[] = [];
  constructor(
    private fb: FormBuilder,
    private constanciaDelRegistroService: ConstanciaDelRegistroService
  ) { }

  ngOnInit(): void {
    this.fetchData();
    this.fitosanitarioForm = this.fb.group({
      flexRadioRegistro: ['Datos'],
      estado: [''],
      representacionFederal: [''],
      fraccionArancelaria: [''],
      descripcionProducto: [''],
      tratado: [''],
      subproducto: [''],
      mecanismo: [''],
      typoCategoria: [''],
      typoRegimen: [''],
      descripcionCategoriaTextil: [''],
      pais: [''],
      unidadMedidaCategoriaTextil: [''],
      factorConversionCategoriaTextil: [''],
      fechaInicioVigencia: [''],
      fechaFinVigencia: ['']
    });
  }
  fetchData(): void {
    this.constanciaDelRegistroService.getfederal().subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.federal)) {

          this.federal = response.federal.map((item) => {
            var data = {
              tbodyData: item.tbodyData
            }
            return data;
          }
          );

          this.federal = [...this.federal]

        } else {
          console.error('La respuesta de la API no tiene el formato esperado:', response);
          this.federal = [];
        }
      },
      error: (error: any) => {
        console.error('Error while fetching the data:', error);
        this.federal = [];
      }
    });
  }
}
