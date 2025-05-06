import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Domicilios } from '../../models/solicitud.model';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputRadio } from '../../models/solicitud.model';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud32605Query } from '../../estados/solicitud32605.query';
import { Solicitud32605State } from '../../estados/solicitud32605.store';
import { Solicitud32605Store } from '../../estados/solicitud32605.store';
import { SolicitudCatologoSelectLista } from '../../models/solicitud.model';
import { SolicitudRadioLista } from '../../models/solicitud.model';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-instalaciones-principales',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
    InputRadioComponent,
  ],
  providers: [SolicitudService],
  templateUrl: './instalaciones-principales.component.html',
  styleUrl: './instalaciones-principales.component.scss',
})
export class InstalacionesPrincipalesComponent implements OnInit, OnDestroy {
  instalacionesPrincipalesForm!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();
  sinoOpcion: InputRadio = {} as InputRadio;
  tipoDeInstalacion: CatalogosSelect = {} as CatalogosSelect;
  solicitud32605State: Solicitud32605State = {} as Solicitud32605State;
  @Output() instalacionesPrincipales = new EventEmitter<Domicilios>();
  constructor(
    public fb: FormBuilder,
    public solicitudService: SolicitudService,
    public solicitud32605Store: Solicitud32605Store,
    public solicitud32605Query: Solicitud32605Query
  ) {
    this.conseguirOpcionDeRadio();
    this.conseguirSolicitudCatologoSelectLista();
  }

  ngOnInit(): void {
    this.instalacionesPrincipalesForm = this.fb.group({
      principales: [
        this.solicitud32605State.principales,
        [Validators.required],
      ],
      municipio: [this.solicitud32605State.municipio],
      tipoDeInstalacion: [
        this.solicitud32605State.tipoDeInstalacion,
        [Validators.required],
      ],
      entidadFederativa: [this.solicitud32605State.entidadFederativa],
      registroSESAT: [this.solicitud32605State.entidadFederativa],
      descripcion: [this.solicitud32605State.descripcion],
      codigoPostal: [this.solicitud32605State.codigoPostal],
      procesoProductivo: [
        this.solicitud32605State.procesoProductivo,
        [Validators.required],
      ],
      goceDelInmueble: [
        this.solicitud32605State.goceDelInmueble,
        [Validators.required],
      ],
      empresa: [this.solicitud32605State.empresa],
      comercioExterior: [
        this.solicitud32605State.comercioExterior,
        [Validators.required],
      ],
      mutuo: [this.solicitud32605State.mutuo, [Validators.required]],
    });

    this.solicitud32605Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud32605State) => {
          this.solicitud32605State = respuesta;
          this.instalacionesPrincipalesForm.patchValue({
            principales: this.solicitud32605State.principales,
            municipio: this.solicitud32605State.municipio,
            tipoDeInstalacion: this.solicitud32605State.tipoDeInstalacion,
            entidadFederativa: this.solicitud32605State.entidadFederativa,
            registroSESAT: this.solicitud32605State.registroSESAT,
            descripcion: this.solicitud32605State.descripcion,
            codigoPostal: this.solicitud32605State.codigoPostal,
            procesoProductivo: this.solicitud32605State.procesoProductivo,
            goceDelInmueble: this.solicitud32605State.goceDelInmueble,
            empresa: this.solicitud32605State.empresa,
            comercioExterior: this.solicitud32605State.comercioExterior,
            mutuo: this.solicitud32605State.mutuo,
          });
        })
      )
      .subscribe();
  }

  conseguirOpcionDeRadio(): void {
    this.solicitudService
      .conseguirOpcionDeRadio()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: SolicitudRadioLista) => {
          this.sinoOpcion = respuesta.requisitos;
        },
      });
  }

  conseguirSolicitudCatologoSelectLista(): void {
    this.solicitudService
      .conseguirSolicitudCatologoSelectLista()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: SolicitudCatologoSelectLista) => {
          this.tipoDeInstalacion = respuesta.tipoDeInstalacion;
        },
      });
  }

  actualizarPrincipales(valor: string | number): void {
    this.solicitud32605Store.actualizarPrincipales(valor);
  }

  actualizarMunicipio(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarMunicipio(VALOR);
  }

  actualizarTipoDeInstalacion(evento: Catalogo): void {
    this.solicitud32605Store.actualizarTipoDeInstalacion(evento.id);
  }

  actualizarEntidadFederativa(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarEntidadFederativa(VALOR);
  }

  actualizarRegistroSESAT(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarRegistroSESAT(VALOR);
  }

  actualizarDescripcion(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarDescripcion(VALOR);
  }

  actualizarCodigoPostal(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarCodigoPostal(VALOR);
  }

  actualizarProcesoProductivo(valor: string | number): void {
    this.solicitud32605Store.actualizarProcesoProductivo(valor);
  }

  actualizarGoceDelInmueble(valor: string | number): void {
    this.solicitud32605Store.actualizarGoceDelInmueble(valor);
  }

  actualizarEmpresa(valor: string | number): void {
    this.solicitud32605Store.actualizarEmpresa(valor);
  }

  actualizarComercioExterior(valor: string | number): void {
    this.solicitud32605Store.actualizarComercioExterior(valor);
  }

  actualizarMutuo(valor: string | number): void {
    this.solicitud32605Store.actualizarMutuo(valor);
  }

  aceptarInstalacionesPrincipales(): void {
    const OBJETO_JSON: Domicilios = {
      instalacionPrincipal:
        this.instalacionesPrincipalesForm.get('principales')?.value,
      tipoInstalacion:
        this.instalacionesPrincipalesForm.get('tipoDeInstalacion')?.value,
      entidadFederativa:
        this.instalacionesPrincipalesForm.get('entidadFederativa')?.value,
      municipioDelegacion:
        this.instalacionesPrincipalesForm.get('municipio')?.value,
      direccion: this.instalacionesPrincipalesForm.get('descripcion')?.value,
      codigoPostal:
        this.instalacionesPrincipalesForm.get('codigoPostal')?.value,
      registroSESAT:
        this.instalacionesPrincipalesForm.get('registroSESAT')?.value,
      procesoProductivo:
        this.instalacionesPrincipalesForm.get('procesoProductivo')?.value,
      acreditaInmueble:
        this.instalacionesPrincipalesForm.get('goceDelInmueble')?.value,
      operacionesCExt:
        this.instalacionesPrincipalesForm.get('comercioExterior')?.value,
      instalacionCtpat: '',
      instalacionPerfil: '',
      instalacionPerfilRFE: '',
      instalacionPerfilAuto: '',
      instalacionPerfilFerro: '',
      instalacionPerfilRf: '',
      instalacionPerfilMensajeria: '',
    };

    this.instalacionesPrincipales.emit(OBJETO_JSON);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
