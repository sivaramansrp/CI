import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Catalogo } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.css',
})
export class PagoDeDerechosComponent implements OnInit {
  formPagoDerechos!: FormGroup;
  bancoList: Catalogo[] = [];

  ngOnInit(): void {
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
    this.bancoList = [];
  }
}
