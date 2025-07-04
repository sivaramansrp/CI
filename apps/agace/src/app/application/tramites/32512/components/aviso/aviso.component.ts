import { AlertComponent } from '@libs/shared/data-access-user/src';
import { COLONIA } from '../../constantes/solicitud.enum';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ENTIDAD_FEDERATIVA } from '../../constantes/solicitud.enum';
import { FECHA_DESTRUCCION_MERCANCIA } from '../../constantes/solicitud.enum';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputFecha } from '@libs/shared/data-access-user/src';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';
import { MUNICIPIO_ALCALDIA } from '../../constantes/solicitud.enum';
import { NotificacionesComponent } from '@libs/shared/data-access-user/src';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud32512Query } from '../../estados/solicitud32512.query';
import { Solicitud32512State } from '../../estados/solicitud32512.store';
import { Solicitud32512Store } from '../../estados/solicitud32512.store';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-aviso',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    AlertComponent,
    InputFechaComponent,
    NotificacionesComponent,
  ],
  templateUrl: './aviso.component.html',
  styleUrl: './aviso.component.scss',
})
export class AvisoComponent implements OnInit, OnDestroy {
  aviosForm!: FormGroup;
  destroyNotifier$: Subject<void> = new Subject();
  entidadFederativa: CatalogosSelect = ENTIDAD_FEDERATIVA;
  municipioAlcaldia: CatalogosSelect = MUNICIPIO_ALCALDIA;
  colonia: CatalogosSelect = COLONIA;
  lugarMunicipioAlcaldia: CatalogosSelect = MUNICIPIO_ALCALDIA;
  lugarColonia: CatalogosSelect = COLONIA;
  fechaDestruccionMercancia: InputFecha = FECHA_DESTRUCCION_MERCANCIA;
  solicitud32512State: Solicitud32512State = {} as Solicitud32512State;
  constructor(
    private fb: FormBuilder,
    public solicitudService: SolicitudService,
    public solicitud32512Store: Solicitud32512Store,
    public solicitud32512Query: Solicitud32512Query
  ) {
    this.conseguirEntidadFederativa();
  }

  ngOnInit(): void {
    this.aviosForm = this.fb.group({
      nombreComercial: [
        { value: this.solicitud32512State.nombreComercial, disbled: false },
        [Validators.required],
      ],
      entidadFederativa: [
        { value: this.solicitud32512State.entidadFederativa, disbled: false },
        [Validators.required],
      ],
      municipio: [
        { value: this.solicitud32512State.municipio, disbled: false },
        [Validators.required],
      ],
      colonia: [
        { value: this.solicitud32512State.colonia, disbled: false },
        [Validators.required],
      ],
      calle: [
        { value: this.solicitud32512State.calle, disbled: false },
        [Validators.required],
      ],
      numeroExterior: [
        { value: this.solicitud32512State.numeroExterior, disbled: false },
        [Validators.required],
      ],
      numeroInterior: [
        { value: this.solicitud32512State.numeroInterior, disbled: false },
        [],
      ],
      codigoPostal: [
        { value: this.solicitud32512State.codigoPostal, disbled: false },
        [Validators.required],
      ],
      lugarEntidadFederativa: [
        {
          value: this.solicitud32512State.lugarEntidadFederativa,
          disbled: false,
        },
        [Validators.required],
      ],
      lugarMunicipioAlcaldia: [
        {
          value: this.solicitud32512State.lugarMunicipioAlcaldia,
          disbled: false,
        },
        [Validators.required],
      ],
      lugarColonia: [
        { value: this.solicitud32512State.lugarColonia, disbled: false },
        [Validators.required],
      ],
      lugarCalle: [
        { value: this.solicitud32512State.lugarCalle, disbled: false },
        [Validators.required],
      ],
      lugarNumeroExterior: [
        { value: this.solicitud32512State.lugarNumeroExterior, disbled: false },
        [Validators.required],
      ],
      lugarNumeroInterior: [
        { value: this.solicitud32512State.lugarNumeroInterior, disbled: false },
        [],
      ],
      lugarCodigoPostal: [
        { value: this.solicitud32512State.lugarCodigoPostal, disbled: false },
        [Validators.required],
      ],
      generico1: [
        { value: this.solicitud32512State.generico1, disbled: false },
        [Validators.required],
      ],
      generico2: [
        { value: this.solicitud32512State.generico2, disbled: false },
        [Validators.required],
      ],
      archivoDestruccion: [
        { value: this.solicitud32512State.archivoDestruccion, disbled: false },
        [Validators.required],
      ],
    });

    this.solicitud32512Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((respuesta: Solicitud32512State) => {
          this.solicitud32512State = respuesta;
          this.aviosForm.patchValue({
            nombreComercial: this.solicitud32512State.nombreComercial,
            entidadFederativa: this.solicitud32512State.entidadFederativa,
            municipio: this.solicitud32512State.municipio,
            colonia: this.solicitud32512State.colonia,
            calle: this.solicitud32512State.calle,
            numeroExterior: this.solicitud32512State.numeroExterior,
            numeroInterior: this.solicitud32512State.numeroInterior,
            codigoPostal: this.solicitud32512State.codigoPostal,
            lugarEntidadFederativa:
              this.solicitud32512State.lugarEntidadFederativa,
            lugarMunicipioAlcaldia:
              this.solicitud32512State.lugarMunicipioAlcaldia,
            lugarColonia: this.solicitud32512State.lugarColonia,
            lugarCalle: this.solicitud32512State.lugarCalle,
            lugarNumeroExterior: this.solicitud32512State.lugarNumeroExterior,
            lugarNumeroInterior: this.solicitud32512State.lugarNumeroInterior,
            lugarCodigoPostal: this.solicitud32512State.lugarCodigoPostal,
            generico1: this.solicitud32512State.generico1,
            generico2: this.solicitud32512State.generico2,
            archivoDestruccion: this.solicitud32512State.archivoDestruccion,
          });
        })
      )
      .subscribe();
  }

  conseguirEntidadFederativa(): void {
    this.solicitudService
      .conseguirEntidadFederativa()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: Catalogo[]) => {
          this.entidadFederativa.catalogos = respuesta;
        },
      });
  }

  conseguirMunicipioAlcaldia(): void {
    this.solicitudService
      .conseguirMunicipioAlcaldia()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: Catalogo[]) => {
          this.municipioAlcaldia.catalogos = respuesta;
        },
      });
  }

  conseguirColonia(): void {
    this.solicitudService
      .conseguirColonia()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: Catalogo[]) => {
          this.colonia.catalogos = respuesta;
        },
      });
  }

  conseguirLugarMunicipioAlcaldia(): void {
    this.solicitudService
      .conseguirMunicipioAlcaldia()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: Catalogo[]) => {
          this.lugarMunicipioAlcaldia.catalogos = respuesta;
        },
      });
  }

  conseguirLugarColonia(): void {
    this.solicitudService
      .conseguirColonia()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: Catalogo[]) => {
          this.lugarColonia.catalogos = respuesta;
        },
      });
  }

  actualizarEntidadFederativa(evento: Catalogo): void {
    if (evento.id > 0) {
      this.conseguirMunicipioAlcaldia();
      this.solicitud32512Store.actualizarEntidadFederativa(evento.id);
    }
  }

  actualizarMunicipioAlcaldia(evento: Catalogo): void {
    if (evento.id > 0) {
      this.conseguirColonia();
      this.solicitud32512Store.actualizarMunicipio(evento.id);
    }
  }

  actualizarColonia(evento: Catalogo): void {
    this.solicitud32512Store.actualizarColonia(evento.id);
  }

  actualizarLugarEntidadFederativa(evento: Catalogo): void {
    if (evento.id > 0) {
      this.conseguirLugarMunicipioAlcaldia();
      this.solicitud32512Store.actualizarLugarEntidadFederativa(evento.id);
    }
  }

  actualizarLugarMunicipioAlcaldia(evento: Catalogo): void {
    if (evento.id > 0) {
      this.conseguirLugarColonia();
      this.solicitud32512Store.actualizarLugarMunicipioAlcaldia(evento.id);
    }
  }

  actualizarLugarColonia(evento: Catalogo): void {
    this.solicitud32512Store.actualizarLugarColonia(evento.id);
  }

  actualizarNombreComercial(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32512Store.actualizarNombreComercial(VALOR);
  }

  actualizarCalle(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32512Store.actualizarCalle(VALOR);
  }

  actualizarNumeroExterior(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32512Store.actualizarNumeroExterior(VALOR);
  }

  actualizarNumeroInterior(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32512Store.actualizarNumeroInterior(VALOR);
  }

  actualizarCodigoPostal(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32512Store.actualizarCodigoPostal(VALOR);
  }

  actualizarLugarCalle(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32512Store.actualizarLugarCalle(VALOR);
  }

  actualizarLugarNumeroExterior(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32512Store.actualizarLugarNumeroExterior(VALOR);
  }

  actualizarLugarNumeroInterior(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32512Store.actualizarLugarNumeroInterior(VALOR);
  }

  actualizarLugarCodigoPostal(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32512Store.actualizarLugarCodigoPostal(VALOR);
  }

  actualizarGenerico1(evento: string): void {
    this.solicitud32512Store.actualizarGenerico1(evento);
  }

  actualizarGenerico2(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32512Store.actualizarGenerico2(VALOR);
  }

  actualizarArchivoDestruccion(evento: Event): void {
    const INPUT = evento.target as HTMLInputElement;
    if (INPUT.files && INPUT.files.length > 0) {
      const FILE = INPUT.files[0];
      this.solicitud32512Store.actualizarArchivoDestruccion(FILE);
    }
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
