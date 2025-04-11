import { ActivatedRoute } from '@angular/router';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { AutoridadService } from '../../services/autoridad.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { DatosDeLaTabla } from '../../models/datos-tramite.model';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Solicitud32401State } from '../../estados/tramite32401.store';
import { Subject } from 'rxjs';
import { TEXTOS } from '@libs/shared/data-access-user/src';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { Tramite32401Query } from '../../estados/tramite32401.query';
import { Tramite32401Store } from '../../estados/tramite32401.store';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-solicitar-requerimiento',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AlertComponent,
    FormsModule,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    InputRadioComponent,
  ],
  providers: [BsModalService],
  templateUrl: './solicitar-requerimiento.component.html',
  styleUrl: './solicitar-requerimiento.component.scss',
})
export class SolicitarRequerimientoComponent implements OnInit {
  TEXTOS = TEXTOS;
  infoAlert = 'alert-info';
  solicitarForm!: FormGroup;
  public solicitud32401State!: Solicitud32401State;
  mostrarSeccionAduanaaFecha: boolean = false;
  mostrarSeccionNoManifiesto: boolean = false;
  requerimientoOpcions = [
    {
      label: 'Requerimiento por parte de la autoridad',
      value: 1,
    },
    {
      label: 'Inicio de cancelación',
      value: 2,
    },
  ];
  tramiteList: CatalogosSelect = {} as CatalogosSelect;
  public encabezadoDeTabla: ConfiguracionColumna<DatosDeLaTabla>[] = [
    { encabezado: '', clave: (artículo) => artículo.id, orden: 0 },
    {
      encabezado: 'Folio trámite: ',
      clave: (artículo) => artículo.folioTramite,
      orden: 1,
      hiperenlace: true,
    },
    {
      encabezado: 'Tipo trámite',
      clave: (artículo) => artículo.tipoTramite,
      orden: 2,
    },
    { encabezado: 'RFC', clave: (artículo) => artículo.rfc, orden: 3 },
    {
      encabezado: 'Razón social',
      clave: (artículo) => artículo.razonSocial,
      orden: 4,
    },
    {
      encabezado: 'Estado del trámite',
      clave: (artículo) => artículo.estadoDelTramite,
      orden: 5,
    },
  ];

  public datosDelContenedor: DatosDeLaTabla[] = [];

  public destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    public tramite32401Store: Tramite32401Store,
    private tramite32401Query: Tramite32401Query,
    private validacionesService: ValidacionesFormularioService,
    private autoridadService: AutoridadService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    //
  }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.obtenerAduanaLista();
    this.tramite32401Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState: Solicitud32401State) => {
          this.solicitud32401State = {
            ...this.solicitud32401State,
            ...seccionState,
          };
          this.solicitarForm.patchValue({
            tipoBusqueda: this.solicitud32401State.tipoBusqueda,
            rfc: this.solicitud32401State.rfc,
            tipoDeTramite: this.solicitud32401State.tipoDeTramite,
            folioDeTramite: this.solicitud32401State.folioDeTramite,
          });
        })
      )
      .subscribe();
  }

  inicializarFormulario(): void {
    this.solicitarForm = this.fb.group({
      tipoBusqueda: [
        this.solicitud32401State?.tipoBusqueda,
        Validators.required,
      ],
      rfc: [this.solicitud32401State?.rfc],
      tipoDeTramite: [
        this.solicitud32401State?.tipoDeTramite,
        Validators.required,
      ],
      folioDeTramite: [
        this.solicitud32401State?.folioDeTramite,
        Validators.required,
      ],
    });
  }

  cambiarRequerimiento(evento: string | number): void {
    this.tramite32401Store.setTipoBusqueda(evento);
    const TIPO_BUSQUEDA = evento;
    this.mostrarSeccionAduanaaFecha = false;
    this.mostrarSeccionNoManifiesto = false;
    switch (TIPO_BUSQUEDA) {
      case 'Requerimiento':
        this.mostrarSeccionAduanaaFecha = true;
        break;
      case 'Inicio':
        this.mostrarSeccionNoManifiesto = true;
        break;
      default:
        break;
    }
  }

  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite32401Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite32401Store[metodoNombre] as (valor: unknown) => void)(VALOR);
  }

  isValid(form: FormGroup, field: string): boolean | null {
    return this.validacionesService.isValid(form, field);
  }

  public obtenerAduanaLista(): void {
    this.autoridadService
      .obtenerTramiteLista()
      .pipe()
      .subscribe((respuesta: CatalogosSelect) => {
        this.tramiteList = respuesta;
      });
  }

  obtenerTablaPoblada(): void {
    this.autoridadService.agregarSolicitud().subscribe((respuesta) => {
      if (respuesta?.success) {
        respuesta.datos.id = this.datosDelContenedor.length + 1;
        this.datosDelContenedor.push(respuesta.datos);
        (
          this.tramite32401Store.setDelContenedor as (
            valor: DatosDeLaTabla[]
          ) => void
        )(this.datosDelContenedor);
        this.solicitarForm.markAsUntouched();
        this.solicitarForm.markAsPristine();
      }
    });
  }

  limpiarFormulario(): void {
    const TIPO_BUSQUEDA_VALUE = this.solicitarForm.get('tipoBusqueda')?.value;
    this.solicitarForm.reset({
      tipoBusqueda: TIPO_BUSQUEDA_VALUE,
      rfc: '',
      tipoDeTramite: '',
      folioDeTramite: '',
    });
    this.datosDelContenedor = [];
    this.tramiteList.catalogos = [];
  }

  valorDeAlternancia(row: any): void {
    if (row.folioTramite) {
      this.router.navigate(['pago/manifiesto-aereo/requiremento'], {
        state: { data: row },
      });
    }
  }
}
