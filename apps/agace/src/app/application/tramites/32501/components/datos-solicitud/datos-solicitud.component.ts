import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Catalogo, CatalogosSelect } from '@libs/shared/data-access-user/src';
import { MercDesmSinMonService } from '../../services/merc-desm-sin-mon.service';
import { Subject, takeUntil } from 'rxjs';
import { AvisoCatalogo } from '../../models/aviso-catalogo.model';

@Component({
  selector: 'app-datos-solicitud',
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.scss',
})
export class DatosSolicitudComponent implements OnInit, OnDestroy {
  formAviso!: FormGroup;
  avisoOpcionesDeRadio = {
    radioOptions: [
      {
        label: 'Importación',
        value: 'TAV.IMP',
      },
      {
        label: 'Montaje',
        value: 'TAV.MON',
      },
    ],
    required: false,
  };
  tipoAviso: string | number = ""; //
  opcionFraccionArancelaria: CatalogosSelect = {} as CatalogosSelect;
  opcionEntidadFederativa: CatalogosSelect = {} as CatalogosSelect;
  opcionDelegacionMunicipio: CatalogosSelect = {} as CatalogosSelect;
  opcionColonia: CatalogosSelect = {} as CatalogosSelect;
  private destroyed$ = new Subject<void>();
  constructor(
    public fb: FormBuilder,
    public mercDesmSinMonService: MercDesmSinMonService
  ) {
    //
    this.obtenerAvisoDelCatalogo();
  }

  ngOnInit(): void {
    this.formAviso = this.fb.group({
      adace: [{ value: '', disabled: true }],
      fechaIniExposicion: [{ value: '', disabled: true }, Validators.required],
      ideGenerica1: ['', [Validators.required]],
      idTransaccionVU: ['',[Validators.maxLength(25),Validators.minLength(25)]],
      cveFraccionArancelaria: ['', Validators.required],
      nico: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      peso: ['', [Validators.required, Validators.pattern('^[0-9.]{1,}$')]],
      valorUSD: ['', [Validators.required, Validators.pattern('^[0-9.]{1,}$')]],
      descripcionMercancia: ['', Validators.required],

      nombreComercial: [''],
      entidadFederativa: ['', Validators.required],
      delegacionMunicipio: ['', Validators.required],
      colonia: ['', Validators.required],
      calle: ['', Validators.required],
      numeroExterior: ['', Validators.required],
      numeroInterior: [''],
      codigoPostal: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  obtenerAvisoDelCatalogo(): void {
    this.mercDesmSinMonService
      .obtenerAvisoDelCatalogo()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (respuesta: AvisoCatalogo) => {
          this.opcionFraccionArancelaria = respuesta.cveFraccionArancelaria;
          this.opcionEntidadFederativa = respuesta.entidadFederativa;
          this.opcionDelegacionMunicipio = respuesta.delegacionMunicipio;
          this.opcionColonia = respuesta.colonia;
        },
      });
  }

  setTipoDeAviso(evento: string | number): void{
    console.log(evento)

    this.tipoAviso = evento;
  }

  busquedaImportacionPorFolio(): void {
    console.log('test');
  }

  mostrarDescFraccArancelaria(evento: Catalogo): void {
    console.log('test');
  }

  onKeyUpIdTransaccionVU(evento: Event): void {
    // const value = evento.target.value.replace(/[^a-zA-Z0-9]/g, '');
  }

  onKeyUpNico(evento: Event): void {
    // const value = evento.target.value.replace(/[^0-9]/g, '');
  }

  onKeyUpPeso(evento: Event): void {
    // let value = event.target.value.replace(/[^0-9.]/g, '');
  }

  onKeyUpValorUSD(evento: Event): void {
    // let value = evento.target.value.replace(/[^0-9.]/g, '');
  }

  onKeyUpCodigoPostal(event: Event): void {
    //
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
