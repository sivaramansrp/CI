import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfiguracionColumna, InputRadioComponent, TablaDinamicaComponent, TituloComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { DatosArancelaria, SolicitudTablaDatos } from '../../models/modificacion-descripcion.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PRODUCTO_OPCION_RADIO, SOLICITUD_OPCION_RADIO } from '../../constants/modificacion-descripcion.enum';
import { Tramite130401State, Tramite130401Store } from '../../../../estados/tramites/tramite130401.store';
import { CommonModule } from '@angular/common';
import { ModificacionDescripcionService } from '../../services/modificacion-descripcion.service';
import { Subject } from 'rxjs';
import { Tramite130401Query } from '../../../../estados/queries/tramite130401.query';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
  standalone: true,
  imports: [CommonModule, TituloComponent, FormsModule, ReactiveFormsModule, InputRadioComponent, TablaDinamicaComponent],
})
export class SolicitudComponent implements OnInit, OnDestroy {

  destroyNotifier$: Subject<void> = new Subject();
  public tramiteState!: Tramite130401State;
  solicitudFormulario!: FormGroup;
  solicitudOpcionRadio = SOLICITUD_OPCION_RADIO;
  productoOpcionRadio = PRODUCTO_OPCION_RADIO;
  public solicitudTablaEncabezados: ConfiguracionColumna<SolicitudTablaDatos>[] = [
    {
      encabezado: '',
      clave: (ele: SolicitudTablaDatos) => ele.id,
      orden: 1,
    },
    {
      encabezado: 'Cantidad',
      clave: (ele: SolicitudTablaDatos) => ele.cantidad,
      orden: 2,
    },
    {
      encabezado: 'Descripción',
      clave: (ele: SolicitudTablaDatos) => ele.descripcionAutorizada,
      orden: 3,
    },
    {
      encabezado: 'Precio unitario USD',
      clave: (ele: SolicitudTablaDatos) => ele.precioUnitarioUSD,
      orden: 4,
    },
    {
      encabezado: 'Total USD',
      clave: (ele: SolicitudTablaDatos) => ele.totalUSD,
      orden: 5,
    }
  ];
  solicitudTablaDatos: SolicitudTablaDatos[] = [];
  public arancelariaTablaEncabezados: ConfiguracionColumna<DatosArancelaria>[] = [
    {
      encabezado: '',
      clave: (ele: DatosArancelaria) => ele.id,
      orden: 1,
    },
    {
      encabezado: 'Fracción arancelaria',
      clave: (ele: DatosArancelaria) => ele.fraccionArancelaria,
      orden: 2,
    },
    {
      encabezado: 'Descripción',
      clave: (ele: DatosArancelaria) => ele.descripcion,
      orden: 3,
    }
  ];
  arancelariaTablaDatos: DatosArancelaria[] = [];

  constructor(
    public store: Tramite130401Store,
    public tramiteQuery: Tramite130401Query,
    public fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private modificacionDescripcionService: ModificacionDescripcionService,
  ) {
    // Constructor del componente
  }
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
        })
      )
      .subscribe();
    this.inicializarFormulario();
    this.cargarPartidas();
    this.cargararancelaria();
    if (!this.tramiteState?.datosSolicitud?.numeroFolioTramiteOriginal) {
      this.cargarSolicitud();
    }
  }
  inicializarFormulario(): void {
    this.solicitudFormulario = this.fb.group({
      numeroFolioTramiteOriginal: [{ value: this.tramiteState?.datosSolicitud?.numeroFolioTramiteOriginal, disabled: true }, []],
      solicitud: [{ value: this.tramiteState?.datosSolicitud?.solicitud, disabled: true }, []],
      regimen: [{ value: this.tramiteState?.datosSolicitud?.regimen, disabled: true }, []],
      clasificacionRegimen: [{ value: this.tramiteState?.datosSolicitud?.clasificacionRegimen, disabled: true }, []],
      condicionMercancia: [{ value: this.tramiteState?.datosSolicitud?.condicionMercancia, disabled: true }, []],
      mercanciaDescripcion: [{ value: this.tramiteState?.datosSolicitud?.mercanciaDescripcion, disabled: true }, []],
      fraccionArancelaria: [{ value: this.tramiteState?.datosSolicitud?.fraccionArancelaria, disabled: true }, []],
      unidadMedidaComercial: [{ value: this.tramiteState?.datosSolicitud?.unidadMedidaComercial, disabled: true }, []],
      unidadesAutorizadas: [{ value: this.tramiteState?.datosSolicitud?.unidadesAutorizadas, disabled: true }, []],
      importeFacturaAutorizadoUSD: [{ value: this.tramiteState?.datosSolicitud?.importeFacturaAutorizadoUSD, disabled: true }, []],
    });
  }
  cargarPartidas(): void {
    this.modificacionDescripcionService.obtenerPartidas()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(respuesta => {
        this.solicitudTablaDatos = respuesta.datos;
      });
  }
  cargararancelaria(): void {
    this.modificacionDescripcionService.obtenerarancelaria()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(respuesta => {
        this.arancelariaTablaDatos = respuesta.datos;
      });
  }
  cargarSolicitud(): void {
    this.modificacionDescripcionService.obtenerSolicitud()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(respuesta => {
        this.store.setSolicitud(respuesta.datos);
        this.inicializarFormulario();
      });
  }

  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}