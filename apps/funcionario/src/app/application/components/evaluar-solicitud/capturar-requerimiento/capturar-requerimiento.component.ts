import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import data from '../../../../../../../../libs/shared/theme/assets/json/funcionario/cat-tipo-requerimiento.json';
import { Catalogo, CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SolicitudRequerimientoQuery } from '../../../estados/queries/requerimientos.query';
import { map, Subject, takeUntil } from 'rxjs';
import { RequerimientosStates, SolicitudRequerimientosState } from '../../../estados/evaluacion-solicitud/requerimientos.store';
import { FuncionarioService } from '../../../../../../../../libs/shared/data-access-user/src/core/services/shared/funcionario/funcionario.service';

@Component({
  selector: 'app-capturar-requerimiento',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent, ReactiveFormsModule],
  templateUrl: './capturar-requerimiento.component.html',
  styleUrl: './capturar-requerimiento.component.scss',
})
export class CapturarRequerimientoComponent {
  /**
   * Declaración de variable para el formulario
   */
  formRequerimiento!: FormGroup;
  /**
    * Catálogo de tipo de requerimiento
    */
  catTipoRequerimiento!: Catalogo[];
  /**
   * Notificador para destruir las suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();
 /**
   * Estado de la solicitud.
   */
  public solicitudRequerimientosState!: SolicitudRequerimientosState;
  constructor(
    private fb: FormBuilder,
    private requerimientosStates: RequerimientosStates,
    private solicitudRequerimientoQuery: SolicitudRequerimientoQuery,
    private estadoService: FuncionarioService,
  ) {  }
   /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.catTipoRequerimiento = data;
    this.solicitudRequerimientoQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudRequerimientosState = seccionState;
        })
      )
      .subscribe();
      this.crearFormRequerimiento();
  }
/**
   * Método para crear el formulario de la captura de requerimiento
   */
  crearFormRequerimiento(): void {
    this.formRequerimiento = this.fb.group({
      tipoRequerimiento: [this.solicitudRequerimientosState?.idTipoRequerimiento, [Validators.required]],
      justificacionRequerimiento: [this.solicitudRequerimientosState?.justificacionRequerimiento, [Validators.required]]
    });
  }
  /**
   * Método para establecer el tipo de requerimiento seleccionado 
   * De acuerdo al tipo de requerimiento el observable activa o desactiva el Tab para el requrimiento de documentación
   */
  tipoRequerimientoSeleccionado(form: FormGroup, campo: string, metodoNombre: keyof RequerimientosStates) {
    this.setValoresStore(form, campo, metodoNombre);
    const tipoRequerimientoId = this.formRequerimiento.get('tipoRequerimiento')?.value;
    switch (tipoRequerimientoId) {
      case "1":
        this.estadoService.setTabIndex(true);
        break;
      case "2":
        this.estadoService.setTabIndex(true);
        break;
      case "3":
        this.estadoService.setTabIndex(false);
        break;
      default:
        break;
    }
  }
  /**
    * Establece los valores en el store de tramite5701.
    *
    * @param {FormGroup} form - El formulario del cual se obtiene el valor.
    * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
    * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
    * @returns {void}
    */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof RequerimientosStates): void {
    const valor = form.get(campo)?.value;
    (this.requerimientosStates[metodoNombre] as (value: any) => void)(valor);
  }
}
