import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  ConfiguracionColumna,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  FormularioDatos,
  Plantas,
} from '../../modelos/registro-solicitud-immex.model';
import { Subject, takeUntil } from 'rxjs';
import {
  Tramite80210Store,
  Tramites80210State,
} from '../../estados/tramites80210.store';
import { CONFIGURACION_TABLA_PLANTAS } from '../../enums/registro-solicitud-immex.enum';
import { Tramite80210Query } from '../../estados/tramites80210.query';
import { registroSolicitudImmexService } from '../../services/registro-solicitud-immex.service';

@Component({
  selector: 'app-empresas-terciarizadas',
  templateUrl: './empresas-terciarizadas.component.html',
  styleUrl: './empresas-terciarizadas.component.css',
})
export class EmpresasTerciarizadasComponent implements OnInit, OnDestroy {
  empresasForm!: FormGroup;
  tramites80210State!: Tramites80210State;
  plantasDisponibles: Plantas[] = [];
  plantasSeleccionadas: Plantas[] = [];
  listaFilaDisponibles: Plantas[] = [];
  listaFilaSeleccionada: Plantas[] = [];
  showPlantas!: boolean;
  tablaConfiguration: ConfiguracionColumna<Plantas>[] =
    CONFIGURACION_TABLA_PLANTAS;
  /**
   * Tipo de selección para la tabla dinámica.
   */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  destoryNotification$: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    @Inject(registroSolicitudImmexService)
    public registroSolicitudService: registroSolicitudImmexService,
    private tramite80210Store: Tramite80210Store,
    private tramite80210Query: Tramite80210Query
  ) {}

  ngOnInit(): void {
    this.tramite80210Query.selectTramite80210$
      .pipe(takeUntil(this.destoryNotification$))
      .subscribe((datos) => {
        this.tramites80210State = datos;
      });
    this.showPlantas = this.tramites80210State.showPlantas;
    this.registroSolicitudService.obtenerPlantasDatos();
    this.registroSolicitudService.obtenerEstados();
    this.registroSolicitudService
      .obtenerFormularioDatos()
      .pipe(takeUntil(this.destoryNotification$))
      .subscribe((datos) => {
        this.updateFormControls(datos);
        if (this.showPlantas) {
          this.segregatePlantasDatos();
        } else {
          this.plantasDisponibles = [];
          this.plantasSeleccionadas = [];
        }
      });
    this.createEmpresasForm();
  }

  createEmpresasForm(): void {
    this.empresasForm = this.formBuilder.group({
      modalidad: [{ value: '', disabled: true }],
      folio: [{ value: '', disabled: true }],
      ano: [{ value: '', disabled: true }],
      rfc: [this.tramites80210State?.rfc, Validators.required],
      estado: [this.tramites80210State?.estados, Validators.required],
    });
  }

  updateFormControls(datos: FormularioDatos): void {
    this.empresasForm.get('modalidad')?.setValue(datos.modalidad);
    this.empresasForm.get('folio')?.setValue(datos.folio);
    this.empresasForm.get('ano')?.setValue(datos.ano);
  }

  buscarControladoras(): void {
    if (this.empresasForm.valid) {
      this.showPlantas = true;
      this.segregatePlantasDatos();
      this.tramite80210Store.setShowPlantas(this.showPlantas);
      this.empresasForm.get('rfc')?.setValue('');
      this.empresasForm.get('estado')?.setValue(0);
    }
  }

  segregatePlantasDatos(): void {
    if (this.tramites80210State.plantasDisponibles.length > 0) {
      this.plantasDisponibles = this.registroSolicitudService.plantas.filter(
        (plantas) =>
          this.tramites80210State.plantasDisponibles.includes(plantas.id)
      );
    } else {
      this.plantasDisponibles = this.registroSolicitudService.plantas;
    }

    if (this.tramites80210State.plantasSeleccionadas.length > 0) {
      this.plantasSeleccionadas = this.registroSolicitudService.plantas.filter(
        (plantas) =>
          this.tramites80210State.plantasSeleccionadas.includes(plantas.id)
      );
    } else {
      this.plantasSeleccionadas = [];
    }
  }

  manejarFilaDisponibles(fila: Plantas[]): void {
    this.listaFilaDisponibles = fila;
  }
  manejarFilaSeleccionada(fila: Plantas[]): void {
    this.listaFilaSeleccionada = fila;
  }

  agregarPlantas(): void {
    if (this.listaFilaDisponibles?.length === 0) {
      return;
    }

    this.plantasSeleccionadas.push(...this.listaFilaDisponibles);

    this.plantasDisponibles = this.plantasDisponibles.filter(
      (planta) => !this.listaFilaDisponibles.includes(planta)
    );
    this.updateStoreForPlantas();
    this.listaFilaDisponibles = [];
  }

  public updateStoreForPlantas(): void {
    const DISPONIBLES_PLANTAS_ID = this.plantasDisponibles.map(
      (planta) => planta.id
    );
    this.tramite80210Store.setPlantasDisponibles(DISPONIBLES_PLANTAS_ID);
    const SELECCIONADA_PLANTAS_ID = this.plantasSeleccionadas.map(
      (planta) => planta.id
    );
    this.tramite80210Store.setPlantasSeleccionada(SELECCIONADA_PLANTAS_ID);
  }

  eliminarPlantas(): void {
    if (this.listaFilaSeleccionada?.length === 0) {
      return;
    }

    this.plantasDisponibles.push(...this.listaFilaSeleccionada);

    this.plantasSeleccionadas = this.plantasSeleccionadas.filter(
      (planta) => !this.listaFilaSeleccionada.includes(planta)
    );
    this.updateStoreForPlantas();
    this.listaFilaSeleccionada = [];
  }

  setValoresStore(campo: string, metodoNombre: keyof Tramite80210Store): void {
    const VALOR = this.empresasForm.get(campo)?.value;
    (this.tramite80210Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  ngOnDestroy(): void {
    this.destoryNotification$.next();
    this.destoryNotification$.complete();
  }
}
