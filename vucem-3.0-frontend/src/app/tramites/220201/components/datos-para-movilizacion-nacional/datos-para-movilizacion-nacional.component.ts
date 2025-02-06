import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';

import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { RespuestaCatalogos } from '../../../../core/models/shared/catalogos.model';

@Component({
  selector: 'app-datos-para-movilizacion-nacional',
  templateUrl: './datos-para-movilizacion-nacional.component.html',
  styleUrl: './datos-para-movilizacion-nacional.component.scss'
})

export class DatosParaMovilizacionNacionalComponent implements OnInit {
  movilizacionForm: FormGroup;
  medioTransporteList: CatalogosSelect = {
    labelNombre: 'Medio de transporte',
    required: true,
    primerOpcion: 'Selecciona un transporte',
    catalogos: [],
  }
  identificacionTransporteList: CatalogosSelect = {
    labelNombre: 'Identificación del transporte',
    required: true,
    primerOpcion: 'Selecciona un Identificación',
    catalogos: [],
  }
  nombreDeLaEmpresaTransportista: CatalogosSelect = {
    labelNombre: ' Nombre de la empresa transportista',
    required: true,
    primerOpcion: 'Selecciona un Nombre',
    catalogos: [],
  }
  puntoDeVerificacionFederal: CatalogosSelect = {
    labelNombre: ' Punto de verificación federal',
    required: true,
    primerOpcion: 'Selecciona un Punto',
    catalogos: [],
  }

  /**
   * Constructor de la clase DatosParaMovilizacionNacionalComponent.
   * 
   * @param fb - Inyección de dependencia del servicio FormBuilder para la creación de formularios reactivos.
   * 
   * Inicializa el formulario `movilizacionForm` con los siguientes controles:
   * - `coordenadas`: Campo requerido para las coordenadas.
   * - `nombre`: Campo requerido para el nombre.
   * - `medio`: Campo requerido para el medio de transporte, con valor predeterminado 'Aereo'.
   * - `transporte`: Campo requerido para el tipo de transporte.
   * - `punto`: Campo requerido para el punto de movilización. --220201
   */
  constructor(private readonly fb: FormBuilder, private readonly httpServicios: HttpClient) {
    this.movilizacionForm = this.fb.group({
      coordenadas: ['', Validators.required],
      nombre: ['', Validators.required],
      medio: ['Aereo', Validators.required],
      transporte: ['', [Validators.required]],
      punto: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.obtenerListasDesplegables();
  }
  obtenerListasDesplegables() {
    this.obtenerTransporteListList();
    this.obtenernombreDeLaEmpresaTransportistaList();
    this.obtenerPuntoDeVerificaciónList();
  }
  obtenerTransporteListList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/transporte.json').subscribe((data): void => {
      const datos = data?.data;
      this.medioTransporteList['catalogos'] = datos;
    });
  }
  obtenernombreDeLaEmpresaTransportistaList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/nombre.json').subscribe((data): void => {
      const datos = data?.data;
      this.nombreDeLaEmpresaTransportista['catalogos'] = datos;
    });
  }
  obtenerPuntoDeVerificaciónList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/punto.json').subscribe((data): void => {
      const datos = data?.data;
      this.puntoDeVerificacionFederal['catalogos'] = datos;
    });
  }
  obtenerIdentificacionTransporteList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/punto.json').subscribe((data): void => {
      const datos = data?.data;
      this.identificacionTransporteList['catalogos'] = datos;
    });
  }



}