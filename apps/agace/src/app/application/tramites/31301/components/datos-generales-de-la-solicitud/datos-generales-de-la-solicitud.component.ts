import {
  CatalogoSelectComponent,
  CatalogosSelect,
  ConfiguracionColumna,
  InputRadioComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Subject, takeUntil } from 'rxjs';
import {
  DatosGeneralesDeLaSolicitud,
  DatosGeneralesDeLaSolicitudCatologo,
  InputRadio,
  SeccionSociosIC,
  SubContratistas,
} from '../../models/solicitud.model';
@Component({
  selector: 'app-datos-generales-de-la-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
    InputRadioComponent,
    TablaDinamicaComponent,
  ],
  providers: [SolicitudService],
  templateUrl: './datos-generales-de-la-solicitud.component.html',
  styleUrl: './datos-generales-de-la-solicitud.component.scss',
})
export class DatosGeneralesDeLaSolicitudComponent implements OnInit, OnDestroy {
  datosGeneralesForm!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();

  tipoDeEndosoOpcion: InputRadio = {} as InputRadio;
  tipoDeGarantiaOpcion: InputRadio = {} as InputRadio;
  modalidadDeLaGarantiaOpcion: InputRadio = {} as InputRadio;
  tipoSectorOpcion: InputRadio = {} as InputRadio;
  sinoOpcion: InputRadio = {} as InputRadio;

  conceptoLista: CatalogosSelect = {} as CatalogosSelect;
  tipoDeInversionLista: CatalogosSelect = {} as CatalogosSelect;

  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;
  configuracionColumnas: ConfiguracionColumna<SubContratistas>[] = [
    {
      encabezado: 'RFC',
      clave: (item: SubContratistas) => item.rfc,
      orden: 1,
    },
    {
      encabezado: 'Nombre / Razón social',
      clave: (item: SubContratistas) => item.razonSocial,
      orden: 2,
    },
  ];
  listaDeSubcontratistas: SubContratistas[] = [] as SubContratistas[];
  seccionSociosICConfiguracionColumnas: ConfiguracionColumna<SubContratistas>[] =
    [
      {
        encabezado: 'RFC',
        clave: (item: SubContratistas) => item.rfc,
        orden: 1,
      },
    ];
  // listaSeccionSociosIC: SeccionSociosIC[] = [] as SeccionSociosIC[];
  listaRegimenAduanero: string[] = [];
  constructor(
    public fb: FormBuilder,
    public solicitudService: SolicitudService
  ) {
    this.conseguirDatosGeneralesOpcionDeRadio();
    this.conseguirDatosGeneralesCatologo();
    this.conseguirListaDeSubcontratistas();
    this.conseguirRegimenAduanero();
  }

  ngOnInit(): void {
    this.datosGeneralesForm = this.fb.group({
      '3500': [{ value: '', disabled: true }, Validators.required],
      '3501': [{ value: '', disabled: true }, Validators.required],
      '3502': [{ value: '', disabled: true }, Validators.required],
      rfc: [{ value: '', disabled: true }, Validators.required],
      '3503': [{ value: '', disabled: true }, Validators.required],
      '3504': [{ value: '', disabled: true }, Validators.required],
      '3505': [{ value: '', disabled: true }, Validators.required],
      '3506': [{ value: '', disabled: true }, Validators.required],
      '3507': [{ value: '', disabled: true }, Validators.required],
      '3508': [{ value: '', disabled: true }, Validators.required],
      '3509': [{ value: '', disabled: true }, Validators.required],
    });
  }

  conseguirDatosGeneralesOpcionDeRadio(): void {
    this.solicitudService
      .conseguirDatosGeneralesOpcionDeRadio()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: DatosGeneralesDeLaSolicitud) => {
          this.tipoDeEndosoOpcion = respuesta.tipoDeEndoso;
          this.tipoDeGarantiaOpcion = respuesta.tipoDeGarantia;
          this.modalidadDeLaGarantiaOpcion = respuesta.modalidadDeLaGarantia;
          this.tipoSectorOpcion = respuesta.tipoSector;
          this.sinoOpcion = respuesta.requisitos;
        },
      });
  }

  conseguirDatosGeneralesCatologo(): void {
    this.solicitudService
      .conseguirDatosGeneralesCatologo()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: DatosGeneralesDeLaSolicitudCatologo) => {
          this.conceptoLista = respuesta.concepto;
          this.tipoDeInversionLista = respuesta.tipoDeInversion;
        },
      });
  }

  conseguirListaDeSubcontratistas(): void {
    this.solicitudService
      .conseguirListaDeSubcontratistas()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: SubContratistas[]) => {
          this.listaDeSubcontratistas = respuesta;
        },
      });
  }

  conseguirRegimenAduanero(): void {
    this.solicitudService
    .conseguirRegimenAduanero()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (respuesta: string[]) => {
        this.listaRegimenAduanero = respuesta;
      },
    });
  }

  // onFileSelected(event: Event): void {
  //   const INPUT = event.target as HTMLInputElement;
  //   const FILE = INPUT?.files?.[0];

  //   if (FILE) {
  //     // this.proveedorXtranjForm.patchValue({ archivoExtranjero: FILE });
  //     // this.proveedorXtranjForm.get('archivoExtranjero')?.updateValueAndValidity();
  //   } else {
  //     // this.openCargaExtranjeroModel();
  //   }
  // }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
