import { HttpClient } from '@angular/common/http';

import { Component } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

import { CatalogosSelect, InputFecha } from '../../../../core/models/shared/components.model';
import { FECHA_DE_PAGO } from '../../../../shared/constantes/220202/fitosanitario.enums';

@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.scss'
})
export class PagoDeDerechosComponent {
  fechaInicioInput: InputFecha = FECHA_DE_PAGO;
  justificacionSelector: CatalogosSelect = {
    labelNombre: 'Justificación',
    required: true,
    primerOpcion: 'Selecciona un Justificación',
    catalogos: [],
  }


  bancoSelector: CatalogosSelect = {
    labelNombre: 'Banco',
    required: true,
    primerOpcion: 'Selecciona un banco',
    catalogos: [],
  }
    ;
  pagoForm: FormGroup = this.fb.group({
    exentoPagoNo: [''],
    exentoPagoSi: [''],
    justificacion: [{ value: '', disabled: true }],
    claveReferencia: [{ value: '', disabled: true }],
    cadenaDependencia: [{ value: '', disabled: true }],
    banco: [{ value: '', disabled: false }],
    llavePago: [{ value: '', disabled: false }],
    importePago: [{ value: '', disabled: true }]
  });
  constructor(private readonly fb: FormBuilder, private readonly httpServicios: HttpClient) {
  }
  ngOnInit(): void {
    console.log('vijay')
    // this.obtenerDetallesDeListaDeOpciones()
  }
  // obtenerDetallesDeListaDeOpciones() {
  //   this.obtenerBancoSelectorList();
  //   this.obtenerListaDeJustificaciones();
  // }
  // obtenerBancoSelectorList() {
  //   this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/banco.json').subscribe((data): void => {
  //     const datos = data?.data;
  //     this.bancoSelector['catalogos'] = datos as Catalogo[];
  //   });
  // }
  // obtenerListaDeJustificaciones() {
  //   this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/Justificación.json').subscribe((data): void => {
  //     const datos = data?.data;
  //     this.justificacionSelector['catalogos'] = datos as Catalogo[];
  //   });
  // }
}
