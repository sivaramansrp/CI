import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ConfiguracionColumna,
  InputFecha,
  InputFechaComponent,
} from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AcuseYResolucionesFolioTramite } from '../../../core/models/shared/acuse-y-resoluciones-folio-tramite.model';

import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
//import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { ReplaySubject, takeUntil } from 'rxjs';
import { AcuseYResolucionesFolioTramiteService } from '../../../core/services/shared/acuses-y-resolucions-folio-tramite/acuses-y-resoluciones-folio-tramite.service';
import { ToastrService } from 'ngx-toastr';

export const FECHA_INICIO = {
  labelNombre: 'Fecha inicial',
  required: true,
  habilitado: true,
};

export const FECHA_FINAL = {
  labelNombre: 'Fecha final',
  required: true,
  habilitado: true,
};

@Component({
  selector: 'acuses-y-resoluiones-folio-del-tramite-busqueda',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFechaComponent,
    RouterModule,
    TablaDinamicaComponent,
  ],
  templateUrl:
    './acuses-y-resoluiones-folio-del-tramite-busqueda.component.html',
  styleUrl: './acuses-y-resoluiones-folio-del-tramite-busqueda.component.scss',
})
export class AcusesYResoluionesFolioDelTramiteBusquedaComponent
  implements OnInit, OnDestroy
{
  public formBusqueda!: FormGroup;
  public fechaInicioInput: InputFecha = FECHA_INICIO;
  public fechaFinalInput: InputFecha = FECHA_FINAL;
  @Input() public procedureUrl!: string;
  //public configuracionTabla = [];
  public configuracionTablaDatos: AcuseYResolucionesFolioTramite[] = [];
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  public toasterService!: ToastrService;
  public espectaculoAcuseYResolucionesFolioTramiteDatos = false;

  public constructor(
    protected readonly formBuilder: FormBuilder,
    public acuseYResolucionesFolioTramiteService: AcuseYResolucionesFolioTramiteService,
    public router: Router
  ) {
    //this.formBusqueda = this.inicializaFormulario();
  }
  public ruta: string = '';

  ngOnInit(): void {
    //this.formBusqueda = this.inicializaFormulario();
    this.getAucesYResolucionesFolioTramiteDatos();

    this.formBusqueda = this.formBuilder.group({
      folio: [{ value: '', disabled: false }],
      fechaInicial: [{ value: '', disabled: false }],
      fechaFinal: [{ value: '', disabled: false }],
    });

    this.inicializaFormulario();
  }

  /**
   * Método para crear el formulario y sus campos
   * @returns Un form group con los campos necesarios
   */
  private inicializaFormulario() {
    this.formBusqueda.get('folio')?.setValue('0100001000320251005000002');
  }

  public cambioFechaInicio(nuevo_valor: string) {
    this.formBusqueda.get('fechaInicio')?.setValue(nuevo_valor);
    this.formBusqueda.get('fechaInicio')?.markAsUntouched();
  }

  public cambioFechaFinal(nuevo_valor: string) {
    this.formBusqueda.get('fechaFinal')?.setValue(nuevo_valor);
    this.formBusqueda.get('fechaFinal')?.markAsUntouched();
  }

  configuracionTabla: ConfiguracionColumna<AcuseYResolucionesFolioTramite>[] = [
    {
      encabezado: 'Folio tramite',
      clave: (artículo) => artículo.folioTramite,
      orden: 1,
    },
    {
      encabezado: 'Tipo de tramite',
      clave: (artículo) => artículo.tipoDeTramite,
      orden: 2,
    },
    {
      encabezado: 'Dependencia',
      clave: (artículo) => artículo.dependencia,
      orden: 3,
    },
    {
      encabezado: 'Fecha inicio tramite',
      clave: (artículo) => artículo.fechInicioTramite,
      orden: 4,
    },
  ];

  getAucesYResolucionesFolioTramiteDatos(): void {
    this.acuseYResolucionesFolioTramiteService
      .getAcuseYResolucionesFolioTramite()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((datos: AcuseYResolucionesFolioTramite[]) => {
        this.configuracionTablaDatos = datos;
      });
  }

  continuar(): void {
    this.router.navigate([this.procedureUrl]);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onFilaClic() {
    this.router.navigate([this.procedureUrl]);
  }

  folioTramite(): void {
    this.espectaculoAcuseYResolucionesFolioTramiteDatos = true;
  }
}
