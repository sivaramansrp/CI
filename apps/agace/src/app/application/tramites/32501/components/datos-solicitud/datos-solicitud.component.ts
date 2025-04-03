import { AvisoCatalogo } from '../../models/aviso-catalogo.model';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { ElementRef } from '@angular/core';
import { FECHA_INGRESO } from '../../enums/solicitud32501.enum';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputFecha } from '@libs/shared/data-access-user/src';
import { MercDesmSinMonService } from '../../services/merc-desm-sin-mon.service';
import { Modal } from 'bootstrap';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { OperacionDeImportacion } from '../../models/aviso-catalogo.model';
import { REGEX_NICO_NUMEROS } from '../../enums/solicitud32501.enum';
import { REGEX_NUMEROS_USD } from '../../enums/solicitud32501.enum';
import { REGEX_REEMPLAZAR } from '@libs/shared/data-access-user/src';
import { Solicitud32501Query } from '../../estados/solicitud32501.query';
import { Solicitud32501State } from '../../estados/solicitud32501.store';
import { Solicitud32501Store } from '../../estados/solicitud32501.store';
import { Subject } from 'rxjs';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

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
  tipoAviso: string | number = 'por defecto';
  opcionFraccionArancelaria: CatalogosSelect = {} as CatalogosSelect;
  opcionEntidadFederativa: CatalogosSelect = {} as CatalogosSelect;
  opcionDelegacionMunicipio: CatalogosSelect = {} as CatalogosSelect;
  opcionColonia: CatalogosSelect = {} as CatalogosSelect;
  private destroyed$ = new Subject<void>();
  @ViewChild('modalAgregarMercancias') modalElement!: ElementRef;
  public fechaInicioInput: InputFecha = FECHA_INGRESO;
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;
  configuracionColumnas: ConfiguracionColumna<OperacionDeImportacion>[] = [
    {
      encabezado: 'Patente o autorizacion del agente aduanal',
      clave: (item: OperacionDeImportacion) => item.agenteAduanal,
      orden: 1,
    },
    {
      encabezado: 'RFC del agente aduanal',
      clave: (item: OperacionDeImportacion) => item.rfc,
      orden: 2,
    },
    {
      encabezado: 'Número de pedimento',
      clave: (item: OperacionDeImportacion) => item.numeroDePedimento,
      orden: 3,
    },
    {
      encabezado: 'Aduana de importación',
      clave: (item: OperacionDeImportacion) => item.aduanaDeImportacion,
      orden: 4,
    },
  ];
  operacionDeImportacionLista: OperacionDeImportacion[] =
    [] as OperacionDeImportacion[];
  solicitud32501State: Solicitud32501State = {} as Solicitud32501State;
  constructor(
    public fb: FormBuilder,
    public mercDesmSinMonService: MercDesmSinMonService,
    public solicitud32501Query: Solicitud32501Query,
    public solicitud32501Store: Solicitud32501Store
  ) {
    this.obtenerAvisoDelCatalogo();
    this.obtenerOperacionDeImportacion();
  }

  ngOnInit(): void {
    this.formAviso = this.fb.group({
      adace: [{ value: this.solicitud32501State.adace, disabled: true }],
      fechaIniExposicion: [
        { value: this.solicitud32501State.fechaIniExposicion, disabled: true },
        Validators.required,
      ],
      ideGenerica1: [
        this.solicitud32501State.ideGenerica1,
        [Validators.required],
      ],
      idTransaccionVU: [
        this.solicitud32501State.idTransaccionVU,
        [Validators.maxLength(25), Validators.minLength(25)],
      ],
      cveFraccionArancelaria: [
        this.solicitud32501State.cveFraccionArancelaria,
        Validators.required,
      ],
      nico: [
        this.solicitud32501State.nico,
        [Validators.required, Validators.pattern(REGEX_NICO_NUMEROS)],
      ],
      peso: [
        this.solicitud32501State.peso,
        [Validators.required, Validators.pattern(REGEX_NUMEROS_USD)],
      ],
      valorUSD: [
        this.solicitud32501State.valorUSD,
        [Validators.required, Validators.pattern(REGEX_NUMEROS_USD)],
      ],
      descripcionMercancia: [
        this.solicitud32501State.descripcionMercancia,
        Validators.required,
      ],
      nombreComercial: [this.solicitud32501State.nombreComercial],
      entidadFederativa: [
        this.solicitud32501State.entidadFederativa,
        Validators.required,
      ],
      delegacionMunicipio: [
        this.solicitud32501State.delegacionMunicipio,
        Validators.required,
      ],
      colonia: [this.solicitud32501State.colonia, Validators.required],
      calle: [this.solicitud32501State.calle, Validators.required],
      numeroExterior: [
        this.solicitud32501State.numeroExterior,
        Validators.required,
      ],
      numeroInterior: [this.solicitud32501State.numeroInterior],
      codigoPostal: [
        this.solicitud32501State.codigoPostal,
        [Validators.required, Validators.pattern(REGEX_NICO_NUMEROS)],
      ],
    });

    this.solicitud32501Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((respuesta: Solicitud32501State) => {
          this.solicitud32501State = respuesta;
          this.formAviso.patchValue({
            adace: this.solicitud32501State.adace,
            fechaIniExposicion: this.solicitud32501State.fechaIniExposicion,
            ideGenerica1: this.solicitud32501State.ideGenerica1,
            idTransaccionVU: this.solicitud32501State.idTransaccionVU,
            cveFraccionArancelaria:
              this.solicitud32501State.cveFraccionArancelaria,
            nico: this.solicitud32501State.nico,
            peso: this.solicitud32501State.peso,
            valorUSD: this.solicitud32501State.valorUSD,
            descripcionMercancia: this.solicitud32501State.descripcionMercancia,
            nombreComercial: this.solicitud32501State.nombreComercial,
            entidadFederativa: this.solicitud32501State.entidadFederativa,
            delegacionMunicipio: this.solicitud32501State.delegacionMunicipio,
            colonia: this.solicitud32501State.colonia,
            calle: this.solicitud32501State.calle,
            numeroExterior: this.solicitud32501State.numeroExterior,
            numeroInterior: this.solicitud32501State.numeroInterior,
            codigoPostal: this.solicitud32501State.codigoPostal,
          });
        })
      )
      .subscribe();
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

  obtenerOperacionDeImportacion(): void {
    this.mercDesmSinMonService
      .obtenerOperacionDeImportacion()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (respuesta: OperacionDeImportacion[]) => {
          this.operacionDeImportacionLista = respuesta;
        },
      });
  }

  setTipoDeAviso(evento: string | number): void {
    this.tipoAviso = evento;
  }

  actualizarCveFraccionArancelaria(evento: Catalogo): void {
    this.solicitud32501Store.actualizarCveFraccionArancelaria(evento.id);
  }

  actualizarEntidadFederativa(evento: Catalogo): void {
    this.solicitud32501Store.actualizarEntidadFederativa(evento.id);
  }

  actualizarDelegacionMunicipio(evento: Catalogo): void {
    this.solicitud32501Store.actualizarDelegacionMunicipio(evento.id);
  }

  actualizarColonia(evento: Catalogo): void {
    this.solicitud32501Store.actualizarColonia(evento.id);
  }

  actualizarIdTransaccionVU(evento: Event): void {
    const ELEMENTO_DE_ENTRADA = evento.target as HTMLInputElement;
    const VALOR = ELEMENTO_DE_ENTRADA.value.replace(REGEX_REEMPLAZAR, '');
    this.solicitud32501Store.actualizarIdTransaccionVU(VALOR);
  }

  actualizarNico(evento: Event): void {
    const ELEMENTO_DE_ENTRADA = evento.target as HTMLInputElement;
    const VALOR = ELEMENTO_DE_ENTRADA.value.replace(REGEX_REEMPLAZAR, '');
    this.solicitud32501Store.actualizarNico(VALOR);
  }

  actualizarPeso(evento: Event): void {
    const ELEMENTO_DE_ENTRADA = evento.target as HTMLInputElement;
    const VALOR = ELEMENTO_DE_ENTRADA.value.replace(REGEX_REEMPLAZAR, '');
    this.solicitud32501Store.actualizarPeso(VALOR);
  }

  actualizarValorUSD(evento: Event): void {
    const ELEMENTO_DE_ENTRADA = evento.target as HTMLInputElement;
    const VALOR = ELEMENTO_DE_ENTRADA.value.replace(REGEX_REEMPLAZAR, '');
    this.solicitud32501Store.actualizarValorUSD(VALOR);
  }

  actualizarDescripcionMercancia(evento: Event): void {
    const VALOR = evento.target as HTMLInputElement;
    this.solicitud32501Store.actualizarDescripcionMercancia(VALOR.value);
  }

  actualizarCodigoPostal(evento: Event): void {
    const VALOR = evento.target as HTMLInputElement;
    this.solicitud32501Store.actualizarCodigoPostal(VALOR.value);
  }

  actualizarNumeroInterior(evento: Event): void {
    const VALOR = evento.target as HTMLInputElement;
    this.solicitud32501Store.actualizarNumeroInterior(VALOR.value);
  }

  actualizarNumeroExterior(evento: Event): void {
    const VALOR = evento.target as HTMLInputElement;
    this.solicitud32501Store.actualizarNumeroExterior(VALOR.value);
  }

  actualizarCalle(evento: Event): void {
    const VALOR = evento.target as HTMLInputElement;
    this.solicitud32501Store.actualizarCalle(VALOR.value);
  }

  actualizarNombreComercial(evento: Event): void {
    const VALOR = evento.target as HTMLInputElement;
    this.solicitud32501Store.actualizarNombreComercial(VALOR.value);
  }

  modificarOperacionImp(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  agregarOperacionImp(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  noEsValido(id: string): boolean | undefined {
    const CONTROL = this.formAviso.get(id);
    return CONTROL?.invalid && CONTROL?.touched;
  }

  esValido(field: string): boolean {
    const CONTROL = this.formAviso.get(field);
    return CONTROL ? CONTROL.invalid && CONTROL.touched : false;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
