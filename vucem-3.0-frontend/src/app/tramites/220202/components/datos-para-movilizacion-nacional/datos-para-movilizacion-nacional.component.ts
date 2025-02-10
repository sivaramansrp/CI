import { Component, OnInit } from '@angular/core';

import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  constructor() {

  }
  ngOnInit(): void {
    this.forma = new FormGroup({
      transporte: new FormControl('', Validators.required),  // for transporteList
      guiaIdentificacion: new FormControl('', Validators.required),  // for Guia
      empresaTransportista: new FormControl('', Validators.required),  // for Empresa Transportista
      punto: new FormControl('', Validators.required)  // for puntoList
    });
  }

}
