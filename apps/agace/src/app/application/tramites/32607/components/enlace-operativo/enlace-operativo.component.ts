import {
  Catalogo,
  CatalogoSelectComponent,
  CatalogosSelect,
  ConfiguracionColumna,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ENTIDAD_FEDERATIVE,
  INSTALACIONS_CONFIGURACION_COLUMNAS,
} from '../../constants/solicitud.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  Solicitud32607State,
  Solicitud32607Store,
} from '../../estados/solicitud32607.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Instalacions } from '../../models/solicitud.model';
import { Solicitud32607Query } from '../../estados/solicitud32607.query';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-enlace-operativo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './enlace-operativo.component.html',
  styleUrl: './enlace-operativo.component.scss',
})
export class EnlaceOperativoComponent implements OnInit, OnDestroy {
  enlaceOperativoForm!: FormGroup;
  instalacions: Instalacions[] = [] as Instalacions[];
  entidadFederative: CatalogosSelect = ENTIDAD_FEDERATIVE;
  numeroDeEmpleadosTabla = TablaSeleccion.CHECKBOX;
  instalacionsConfiguracionColumnas: ConfiguracionColumna<Instalacions>[] =
    INSTALACIONS_CONFIGURACION_COLUMNAS;
  instalacionsDatos: Instalacions[] = [] as Instalacions[];
  private destroy$: Subject<void> = new Subject<void>();
  solicitud32607State: Solicitud32607State = {} as Solicitud32607State;
  constructor(
    public fb: FormBuilder,
    public solicitudService: SolicitudService,
    public solicitud32607Store: Solicitud32607Store,
    public solicitud32607Query: Solicitud32607Query
  ) {
    this.guardarEntidadFederative();
  }

  ngOnInit(): void {
    this.enlaceOperativoForm = this.fb.group({
      entidad: [this.solicitud32607State.entidad],
    });
    this.solicitud32607Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud32607State) => {
          this.solicitud32607State = respuesta;
          this.enlaceOperativoForm.patchValue({
            entidad: this.solicitud32607State.entidad,
          });
        })
      )
      .subscribe();
  }

  guardarEntidadFederative(): void {
    this.solicitudService
      .guardarEntidadFederative()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: Catalogo[]) => {
          this.entidadFederative.catalogos = respuesta;
        },
      });
  }

  guardarInstalacions(): void {
    this.solicitudService
      .guardarInstalacions()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: Instalacions[]) => {
          this.instalacionsDatos = respuesta;
        },
      });
  }

  actualizarEntidadFederative(evento: Catalogo): void {
    this.solicitud32607Store.actualizarEntidad(evento.id);
    this.guardarInstalacions();
  }

  seleccionarInstalacionsDato(evento: Instalacions[]): void {
    this.instalacions = evento;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
