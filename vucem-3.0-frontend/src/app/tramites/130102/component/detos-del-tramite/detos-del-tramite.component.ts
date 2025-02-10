/**
 * @fileoverview Este archivo contiene la clase DetosDelTramiteComponent, que es responsable de manejar la lógica del componente Detos Del Trámite.
 *
 * @module DetosDelTramiteComponent
 */
import { Component, OnInit } from '@angular/core';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputRadioComponent } from '../../../../shared/components/input-radio/input-radio.component';
import { HttpClient } from '@angular/common/http';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CommonModule } from '@angular/common';
/**
 * @class DetosDelTramiteComponent
 * @classdesc Esta clase representa el componente Detos Del Trámite.
 */
@Component({
  selector: 'app-detos-del-tramite',
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    InputRadioComponent,
    SelectCatalogosComponent,
  ],
  templateUrl: './detos-del-tramite.component.html',
  styleUrl: './detos-del-tramite.component.scss',
})
export class DetosDelTramiteComponent implements OnInit {
  /**
   * @property {any[]} solicitude - Array para almacenar las opciones de solicitud.
   */
  solicitude: any[] = [];
  /**
   * @property {CatalogosSelect[]} tiposDocumentosArray - Array para almacenar los tipos de documentos.
   */
  tiposDocumentosArray: CatalogosSelect[] = [];
  /**
   * @property {FormGroup} formGroup - El grupo de formularios reactivos.
   */
  formGroup!: FormGroup;
  /**
   * @property {string | number} selectedValue - El valor seleccionado.
   */
  selectedValue: string | number = 'Inicial'; // Update the type to string | number
  /**
   * @property {string} defaultSelect - El valor seleccionado por defecto.
   */
  defaultSelect: string = 'Inicial';
  /**
   * @constructor
   * @param {HttpClient} http - El cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) {}
  /**
   * @method ngOnInit
   * @description Inicializa el componente obteniendo los datos necesarios.
   */
  ngOnInit() {
    this.fetchSolicitudeOptions();
    this.fetchTiposDocumentos();
  }
  /**
   * @method onValueChange
   * @description Maneja el cambio del valor seleccionado.
   * @param {any} newValue - El nuevo valor.
   */
  onValueChange(newValue: any) {
    this.selectedValue = newValue;
  }
  /**
   * @method tipoTransporte
   * @description Método de marcador de posición para manejar el tipo de transporte.
   * @param {any} e - El parámetro del evento.
   */
  tipoTransporte(e: any) {}
  /**
   * @method fetchTiposDocumentos
   * @description Obtiene los tipos de documentos del servidor.
   */
  fetchTiposDocumentos() {
    this.http
      .get('/assets/json/130102/solicitude-select.json')
      .subscribe((data: any) => {
        this.tiposDocumentosArray = data.tiposDocumentosArray;
      });
  }
  /**
   * @method fetchSolicitudeOptions
   * @description Obtiene las opciones de solicitud del servidor.
   */
  fetchSolicitudeOptions() {
    this.http
      .get('/assets/json/130102/solicitude-options.json')
      .subscribe((data: any) => {
        this.solicitude = data.options;
        this.defaultSelect = data.defaultSelect;
      });
  }
}
