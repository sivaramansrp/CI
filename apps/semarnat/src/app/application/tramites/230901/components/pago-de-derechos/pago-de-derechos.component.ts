import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { AutorizacionesDeVidaSilvestreService } from '../../services/autorizaciones-de-vida-silvestre.service';
import { Tramite230901Query } from '../../estados/tramite230901.query';
import { Tramite230901Store } from '../../estados/tramite230901.store';

@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.css',
})
export class PagoDeDerechosComponent implements OnInit {
  formPagoDerechos!: FormGroup;

  constructor(public autorizacionesDeVidaSilvestreService: AutorizacionesDeVidaSilvestreService, private tramite230901Store: Tramite230901Store, private tramite230901Query: Tramite230901Query,
  ) {
    // do nothing
  }

  ngOnInit(): void {
    this.autorizacionesDeVidaSilvestreService.inicializaPasoUnoDatosCatalogos();
    this.crateFormPagoDerechos();
  }

  crateFormPagoDerechos(): void {
    this.formPagoDerechos = new FormGroup({
      claveDeReferencia: new FormControl('', Validators.required),
      cadenaDeLaDependencia: new FormControl('', Validators.required),
      banco: new FormControl('', Validators.required),
      llaveDePago: new FormControl('', Validators.required),
      fechaDePago: new FormControl('', Validators.required),
      importeDePago: new FormControl('', Validators.required),
    });

    this.formPagoDerechos.get('claveDeReferencia')?.disable();
    this.formPagoDerechos.get('cadenaDeLaDependencia')?.disable();
    this.formPagoDerechos.get('importeDePago')?.disable();
  }

  bancoSeleccion(): void {
    this.tramite230901Store.setbancoseleccionado(this.formPagoDerechos.get('banco')?.value);
  }
}
