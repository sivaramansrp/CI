import { Component, OnInit } from '@angular/core';

import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Catalogo, RespuestaCatalogos } from '../../../../core/models/shared/catalogos.model';

@Component({
  selector: 'app-datos-para-movilizacion-nacional',
  templateUrl: './datos-para-movilizacion-nacional.component.html',
  styleUrl: './datos-para-movilizacion-nacional.component.scss'
})
export class DatosParaMovilizacionNacionalComponent implements OnInit {
  forma: FormGroup;
  transporteList: CatalogosSelect = {
    labelNombre: 'Medio de transporte',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: []
  }
  puntoList: CatalogosSelect = {
    labelNombre: 'Punto de verificación federal',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: []
  }
  constructor(private readonly httpServicios: HttpClient) {

  }
  ngOnInit(): void {
    this.forma = new FormGroup({
      transporte: new FormControl('', Validators.required),  // for transporteList
      guiaIdentificacion: new FormControl('', Validators.required),  // for Guia
      empresaTransportista: new FormControl('', Validators.required),  // for Empresa Transportista
      punto: new FormControl('', Validators.required)  // for puntoList
    });
    this.obtenerTodosLosDatosDeOpciones();
  }

  obtenerTodosLosDatosDeOpciones() {
    this.obtenerListaDeJustificaciones();
    this.obtenerListaDePunto();
  }
  obtenerListaDeJustificaciones() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220202/transporte.json').subscribe((data): void => {
      const datos = data?.data;
      this.transporteList['catalogos'] = datos as Catalogo[];
    });
  }
  obtenerListaDePunto() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220202/punto.json').subscribe((data): void => {
      const datos = data?.data;
      this.puntoList['catalogos'] = datos as Catalogo[];
    });
  }

}
