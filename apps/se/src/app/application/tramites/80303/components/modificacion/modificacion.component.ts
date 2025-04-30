import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  EMPRESA_SUBMANUFACTURERA_ENCABEZADO_DE_TABLA,
  EmpresaSubmanufacturera,
} from '../../models/modificacion-programa-immex-baja-submanufacturera.model';
import { Tramite80303Query } from '../../estados/tramite80303Query.query';
import { ModificacionProgramaImmexBajaSubmanufactureraService } from '../../services/modificacion-programa-immex-baja-submanufacturera.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-modificacion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './modificacion.component.html',
  styleUrl: './modificacion.component.scss',
})
export class ModificacionComponent implements OnInit, OnDestroy {
  /**
   * Notificador utilizado para gestionar la destrucción de suscripciones en el componente.
   * Este Subject emite un valor cuando el componente se destruye, permitiendo cancelar
   * suscripciones activas y prevenir fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  modificacionForm!: FormGroup;
  submanufacturerasTablaConfiguracion = {
    tipoSeleccionTabla: TablaSeleccion.BUTTON,
    configuracionTabla: EMPRESA_SUBMANUFACTURERA_ENCABEZADO_DE_TABLA,
  };

  submanufacturerasTablaDatos: EmpresaSubmanufacturera[] = [];

  constructor(
    private fb: FormBuilder,
    public modificacionProgramaImmexBajaSubmanufactureraService: ModificacionProgramaImmexBajaSubmanufactureraService,
    public tramite80303Querry: Tramite80303Query
  ) {}

  ngOnInit(): void {
    this.crearFormaulario();
    this.modificacionProgramaImmexBajaSubmanufactureraService.obtenerRespuestaPorUrl(
      this,
      'submanufacturerasTablaDatos',
      '/80303/subManufacturerasTablaDatos.json'
    );

    this.tramite80303Querry.selectTramiteState$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((state) => {
        this.submanufacturerasTablaDatos = state.submanufacturerasTablaDatos;
      });
  }

  crearFormaulario(): void {
    this.modificacionForm = this.fb.group({
      rfc: [{ value: 'AAL0409235E6', disabled: true }],
      representacionFederal: [{ value: 'CULIACAN', disabled: true }],
      tipoModificacion: [{ value: 'Baja', disabled: true }],
      modificacionPrograma: [
        { value: 'Empresa submanufacturera', disabled: true },
      ],
    });
  }

  /**
   * Método que se ejecuta cuando el componente es destruido.
   * Notifica a todos los observables que deben completarse y limpia las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next(); // Notifica a todos los observables que deben completar.
    this.destroyNotifier$.unsubscribe(); // Cancela cualquier suscripción activa.
  }
}
