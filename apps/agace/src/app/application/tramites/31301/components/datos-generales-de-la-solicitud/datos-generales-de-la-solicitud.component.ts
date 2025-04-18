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
  Domicilios,
  InputRadio,
  SeccionSociosIC,
  SubContratistas,
  TipoDeInversion,
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
  seccionSociosICConfiguracionColumnas: ConfiguracionColumna<SeccionSociosIC>[] =
    [
      {
        encabezado: 'Tipo de Persona',
        clave: (item: SeccionSociosIC) => item.tipoPersonaMuestra,
        orden: 1,
      },
      {
        encabezado: 'Nombre',
        clave: (item: SeccionSociosIC) => item.nombreCompleto,
        orden: 1,
      },
      {
        encabezado: 'RFC',
        clave: (item: SeccionSociosIC) => item.rfc,
        orden: 1,
      },
      {
        encabezado: 'En su car\u00E1cter de',
        clave: (item: SeccionSociosIC) => item.caracterDe,
        orden: 1,
      },
      {
        encabezado: 'Obligado a tributar en M\u00E9xico',
        clave: (item: SeccionSociosIC) => item.tributarMexico,
        orden: 1,
      },
      {
        encabezado: 'Nombre de la empresa',
        clave: (item: SeccionSociosIC) => item.nombreEmpresa,
        orden: 1,
      },
    ];

  listaSeccionSociosIC: SeccionSociosIC[] = [] as SeccionSociosIC[];
  tipoDeInversionConfiguracionColumnas: ConfiguracionColumna<TipoDeInversion>[] =
    [
      {
        encabezado: 'Tipo de inversión',
        clave: (item: TipoDeInversion) => item.tipoInversion,
        orden: 1,
      },
      {
        encabezado: 'Descripción general',
        clave: (item: TipoDeInversion) => item.descripcion,
        orden: 1,
      },
      {
        encabezado: 'Valor en moneda nacional',
        clave: (item: TipoDeInversion) => item.valor,
        orden: 1,
      },
    ];
  tipoDeInversionDatos: TipoDeInversion[] = [] as TipoDeInversion[];
  domiciliosConfiguracionColumnas: ConfiguracionColumna<Domicilios>[] = [
    {
      encabezado: 'Instalaciones principales',
      clave: (item: Domicilios) => item.instalacionPrincipal,
      orden: 1,
    },
    {
      encabezado: 'Tipo de instalación',
      clave: (item: Domicilios) => item.tipoInstalacion,
      orden: 1,
    },
    {
      encabezado: 'Entidad federativa',
      clave: (item: Domicilios) => item.entidadFederativa,
      orden: 1,
    },
    {
      encabezado: 'Municipio o delegación',
      clave: (item: Domicilios) => item.municipioDelegacion,
      orden: 1,
    },
    {
      encabezado: 'Colonia, calle y número',
      clave: (item: Domicilios) => item.direccion,
      orden: 1,
    },
    {
      encabezado: 'Código postal',
      clave: (item: Domicilios) => item.codigoPostal,
      orden: 1,
    },
    {
      encabezado: 'Registro an SE/SAT',
      clave: (item: Domicilios) => item.registroSESAT,
      orden: 1,
    },
    {
      encabezado: 'Proceso Productivo',
      clave: (item: Domicilios) => item.procesoProductivo,
      orden: 1,
    },
    {
      encabezado: 'Estatus',
      clave: (item: Domicilios) => item.estatus,
      orden: 1,
    },
  ];
  domiciliosDatos: Domicilios[] = [] as Domicilios[];
  listaRegimenAduanero: string[] = [];
  constructor(
    public fb: FormBuilder,
    public solicitudService: SolicitudService
  ) {
    this.conseguirDatosGeneralesOpcionDeRadio();
    this.conseguirDatosGeneralesCatologo();
    this.conseguirListaDeSubcontratistas();
    this.conseguirRegimenAduanero();
    this.conseguirMiembrosDeLaEmpresa();
    this.conseguirTipoDeInversionDatos();
    this.conseguirDomicilios();
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

  conseguirMiembrosDeLaEmpresa(): void {
    this.solicitudService
      .conseguirMiembrosDeLaEmpresa()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: SeccionSociosIC[]) => {
          this.listaSeccionSociosIC = respuesta;
        },
      });
  }

  conseguirTipoDeInversionDatos(): void {
    this.solicitudService
      .conseguirTipoDeInversionDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: TipoDeInversion[]) => {
          this.tipoDeInversionDatos = respuesta;
        },
      });
  }

  conseguirDomicilios(): void {
    this.solicitudService
      .conseguirDomicilios()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: Domicilios[]) => {
          this.domiciliosDatos = respuesta;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
