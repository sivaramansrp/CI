import { Component, Input, OnInit } from '@angular/core';

import { Datos_De_Tabla, Datos_de_fila } from '../../../../core/models/220202/fitosanitario.model';

import { INSTRUCCION_DOBLE_CLIC } from '../../../../shared/constantes/220202/fitosanitario.enums';

import { HttpClient } from '@angular/common/http';

import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { CatalogosSelect } from '../../../../core/models/shared/components.model';




@Component({
  selector: 'app-datos-de-la-solicitud',
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss'
})
export class DatosDeLaSolicitudComponent implements OnInit {
  colapsable: boolean = false;
  selectRangoDias: string[] = [];
  instruccionDobleClic: string = INSTRUCCION_DOBLE_CLIC;
  tablaDeDatosDeCelda: Datos_de_fila[] = []
  procedureData: FormGroup;
  aduanaList: CatalogosSelect = {
    labelNombre: 'Aduana de ingreso',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [],
  };
  agropecuariaList: CatalogosSelect = {
    labelNombre: 'Oficina de inspección de Sanidad Agropecuaria',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [],
  };
  puntoList: CatalogosSelect = {
    labelNombre: 'Punto de inspección',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: []
  }
  regimeList: CatalogosSelect = {
    labelNombre: 'Régimen',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: []
  }
  productoList: CatalogosSelect = {
    labelNombre: 'Tipo de producto',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: []
  }
  usoList: CatalogosSelect = {
    labelNombre: 'Uso',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: []
  }
  umcList: CatalogosSelect = {
    labelNombre: 'Umc',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: []
  }
  nicoList: CatalogosSelect = {
    labelNombre: 'Nico',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: []
  }
  arancelariaList: CatalogosSelect = {
    labelNombre: 'Fracción arancelaria',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: []
  }
  forma: FormGroup;
  mercanciaForma: FormGroup;
  formularioDeTransporte: FormGroup;

  constructor(private readonly httpServicios: HttpClient,
    private readonly fb: FormBuilder
  ) {

  }
  ngOnInit(): void {
    this.obtenerTablaCelulaValor();
  }
  createFromFields() {
    this.forma = this.fb.group({
      aduana: [''],
      agropecuaria: [''],
      punto: [''],
      guia: [''],
      regimen: [''],
      ferrocarril: [''],
      mercancias: this.fb.array([]),
      aduanaMercancia: [''],
      requisito: [''],
      numCertificadoInternacional: [''],
      arancelaria: [''],
      descFraccionArancelaria: [{ value: '', disabled: true }],
      nico: [''],
      descNico: [{ value: '', disabled: true }],
      descripcion: [''],
      cantidadUMT: [''],
      umt: [{ value: '', disabled: true }],
      cantidadUMC: [''],
      umc: [''],
      uso: [''],
      producto: [''],
    });
    const mercanciasArray = this.forma.get('mercancias') as FormArray;
    mercanciasArray.push(this.fb.group({
      seleccionado: [''], // Checkbox
      noPartida: [''],
      tipoRequisito: [''],
      requisito: [''],
      numCertificadoInternacional: [''],
      fraccionArancelaria: [''],
      descFraccion: [''],
      nico: ['']
    }));
  }

  obtenerTablaCelulaValor() {
    this.httpServicios.get<Datos_De_Tabla>('../../../../../assets/json/220202/solicitud.json').subscribe((data) => {
      this.tablaDeDatosDeCelda = data?.data;
    });
  }

  mostrar_colapsable() {
    this.colapsable = !this.colapsable;
  }
}
