import { Component, OnDestroy, OnInit } from '@angular/core';
import { CertificadosOrigenService } from '../services/certificadosOrigen.service';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HistoricoColumnas } from '../models/certificado-origen.model';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite110216Query } from '../../../estados/queries/tramite110216.query';
import { Tramite110216State } from '../../../estados/tramites/tramite110216.store';
import { Tramite110216Store } from '../../../estados/tramites/tramite110216.store';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';


@Component({
  selector: 'app-historico-productores',
  standalone: true,
  imports: [CommonModule, TituloComponent, FormsModule, ReactiveFormsModule, TablaDinamicaComponent],
  templateUrl: './historico-productores.component.html',
  styleUrl: './historico-productores.component.scss',
})
export class HistoricoProductoresComponent implements OnInit, OnDestroy {
  formulario!: FormGroup;
  TablaSeleccion = TablaSeleccion;
  tableColumns: ConfiguracionColumna<HistoricoColumnas>[] = [
    {
      encabezado: 'Nombre del productor',
      clave: (elementos) => elementos.nombreProductor,
      orden: 1
    },
    {
      encabezado: 'Número de registro fiscal',
      clave: (elementos) => elementos.numeroRegistroFiscal,
      orden: 2,
    },
    {
      encabezado: 'Dirección',
      clave: (elementos) => elementos.direccion,
      orden: 3,
    },
    {
      encabezado: 'Correo Electrónico',
      clave: (elementos) => elementos.correoElectronico,
      orden: 4,
    },
    {
      encabezado: 'Teléfono',
      clave: (elementos) => elementos.telefono,
      orden: 5,
    },
    {
      encabezado: 'Fax',
      clave: (elementos) => elementos.fax,
      orden: 5,
    },
  ];
  productoresExportador: HistoricoColumnas[] = [];
  seleccionadoProductoresExportador: HistoricoColumnas[] = [];
  agregarProductoresExportador: HistoricoColumnas[] = [];
  seleccionadoAgregarProductoresExportador: HistoricoColumnas[] = [];
  destroyNotifier$: Subject<void> = new Subject();
  public tramiteState!: Tramite110216State;

  constructor(
    private fb: FormBuilder,
    private certificadosOrigenService: CertificadosOrigenService,
    public store: Tramite110216Store,
    public tramiteQuery: Tramite110216Query,
    // eslint-disable-next-line no-empty-function
  ) { }
  ngOnInit(): void {
    this.cargarProductorPorExportador();
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
        })
      )
      .subscribe();
    this.initActionFormBuild();
  }
  initActionFormBuild(): void {
    this.formulario = this.fb.group({
      datosConfidencialesProductor: [this.tramiteState?.datosConfidencialesProductor, []],
      productorMismoExportador: [this.tramiteState?.productorMismoExportador, []],
    });
  }
  cargarProductorPorExportador(): void {
    this.certificadosOrigenService.obtenerProductorPorExportador()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(respuesta => {
        this.productoresExportador = respuesta.datos;
      });
  }
  obtenerSeleccionadoProductores(evento: HistoricoColumnas[]): void {
    this.seleccionadoProductoresExportador = evento;
  }
  obtenerAnadirProductosSeleccionados(evento: HistoricoColumnas[]): void {
    this.seleccionadoAgregarProductoresExportador = evento;
  }
  productoresSeleccionados(): void {
    this.agregarProductoresExportador = [...this.agregarProductoresExportador, ...this.seleccionadoProductoresExportador];
    this.productoresExportador = this.productoresExportador.filter(elementos => !this.seleccionadoProductoresExportador.some(elementosSecundarios => elementosSecundarios.id === elementos.id));
    this.seleccionadoProductoresExportador = [];
  }
  eliminarProductoresSeleccionados(): void {
    this.productoresExportador = [...this.productoresExportador, ...this.seleccionadoAgregarProductoresExportador];
    this.agregarProductoresExportador = this.agregarProductoresExportador.filter(elementos => !this.seleccionadoAgregarProductoresExportador.some(elementosSecundarios => elementosSecundarios.id === elementos.id));
    this.seleccionadoAgregarProductoresExportador = [];

  }
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110216Store): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
