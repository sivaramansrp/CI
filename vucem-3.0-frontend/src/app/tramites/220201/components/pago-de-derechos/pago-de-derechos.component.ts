import { Component, OnInit } from '@angular/core';
import { FECHA_DE_PAGO } from '../../../../shared/constantes/módulodemodificacióndeextensióndeemisión.enum';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';

import { CatalogosSelect, InputFecha } from '../../../../core/models/shared/components.model';

import { HttpClient } from '@angular/common/http';

import { Catalogo, RespuestaCatalogos } from '../../../../core/models/shared/catalogos.model';

@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.scss'
})
export class PagoDeDerechosComponent implements OnInit {
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
    justificacion: [{ value: '', disabled: false }],
    claveReferencia: [{ value: '', disabled: true }],
    cadenaDependencia: [{ value: '', disabled: true }],
    banco: [{ value: '', disabled: true }],
    llavePago: [{ value: '', disabled: true }],
    importePago: [{ value: '', disabled: true }]
  });
  constructor(private readonly fb: FormBuilder, private readonly httpServices: HttpClient) {
  }
  ngOnInit(): void {
    this.obtenerDetallesDeListaDeOpciones()
  }
  obtenerDetallesDeListaDeOpciones() {
    this.obtenerBancoSelectorList();
    this.obtenerListaDeJustificaciones();
  }
  obtenerBancoSelectorList() {
    this.httpServices.get<RespuestaCatalogos>('../../../../../assets/json/220201/banco.json').subscribe((data): void => {
      const datos = data?.data;
      this.bancoSelector['catalogos'] = datos as Catalogo[];
    });
  }
  obtenerListaDeJustificaciones() {
    this.httpServices.get<RespuestaCatalogos>('../../../../../assets/json/220201/Justificación.json').subscribe((data): void => {
      const datos = data?.data;
      this.justificacionSelector['catalogos'] = datos as Catalogo[];
    });
  }
} 
