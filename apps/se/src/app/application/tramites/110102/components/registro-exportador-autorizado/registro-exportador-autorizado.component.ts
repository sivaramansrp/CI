import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ConsultaioQuery, ExportadorAutorizadoService } from "@ng-mf/data-access-user";
import { InputRadioComponent } from "@ng-mf/data-access-user";
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite110102Query } from '../../estados/queries/tramite110102.query';
import { Tramite110102Store } from '../../estados/store/tramite110102.store';

import { Subject, takeUntil } from 'rxjs';
import { map } from 'rxjs/operators';


/**
 * Este componente maneja el registro de exportadores autorizados.
 */
@Component({
  selector: 'app-registro-exportador-autorizado',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, InputRadioComponent],
  templateUrl: './registro-exportador-autorizado.component.html',
  styleUrl: './registro-exportador-autorizado.component.scss',
})
export class RegistroExportadorAutorizadoComponent implements OnInit, OnDestroy {


   procedureState!: boolean;
  /**
   * Subject que emite un evento cuando el componente es destruido,
   * permitiendo la desuscripción de observables.
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();

  /**
   * Enumeración que representa las opciones de exportador autorizado.
   * @type {{ label: string; value: string | number }[]}
   */
  exportadorOptions!: { label: string; value: string | number }[];

  /**
   * Enumeración que representa las opciones de exportador autorizado para Japón.
   * @type {{ label: string; value: string | number }[]}
   */
  exportadorOptionsJPN!: { label: string; value: string | number }[];

  /**
   * FormGroup que contiene los datos del formulario de registro de exportador.
   * El signo de exclamación (!) indica que la propiedad será inicializada más tarde.
   * @type {FormGroup}
   */
  registroExportadorForm!: FormGroup;

  /**
   * Indica si se debe mostrar el div de opciones de exportador autorizado.
   * @type {boolean}
   */
  showDivExportador: boolean = false;

  /**
   * Indica si se debe mostrar el div de opciones de exportador autorizado para Japón.
   * @type {boolean}
   */
  showDivExportadorJPN: boolean = false;

  /**
   * Constructor del componente.
   * Servicio para la creación de formularios reactivos.
   * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
   * @param {ExportadorAutorizadoService} service - Servicio para obtener datos de exportadores autorizados.
   * @param {Tramite110102Store} tramite110102Store - Servicio para manejar el estado del trámite.
   * @param {Tramite110102Query} tramite110102Query - Servicio para consultar el estado del trámite.
   */
  constructor(private fb: FormBuilder,
    private consultaQuery: ConsultaioQuery,
     private service: ExportadorAutorizadoService, private tramite110102Store: Tramite110102Store, private tramite110102Query: Tramite110102Query) {
    // Lógica del constructor puede ser añadida aquí si es necesario
   
  }

  /**
   * Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   * Inicializa el formulario y establece los valores iniciales de los controles.
   */
  ngOnInit(): void {

     this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyed$)).subscribe((seccionState) => {
      this.procedureState = seccionState.readonly;
      this.initializarFormulario();
    });
    this.getExportadorAutorizado();
    this.getExportadorAutorizadoJPN();
    
  }

   initializarFormulario(): void {

    this.registroExportadorForm = this.fb.group({
      solicitaSeparacionContable: [false],
      solicitaExportadorAutorizado: [false],
      condicionExportador: [''],
      solicitaExportadorAutorizadoJPN: [false],
      condicionExportadorJPN: ['']
    });
    this.getValorsStore();
    this.enableDisableControl();
  }

  enableDisableControl(): void {
    if(this.procedureState) {
      this.registroExportadorForm.get('solicitaSeparacionContable')?.disable();
      this.registroExportadorForm.get('solicitaExportadorAutorizado')?.disable();
      this.registroExportadorForm.get('condicionExportador')?.disable();
      this.registroExportadorForm.get('solicitaExportadorAutorizadoJPN')?.disable();
      this.registroExportadorForm.get('condicionExportadorJPN')?.disable();
    }
    else {
      this.registroExportadorForm.get('solicitaSeparacionContable')?.enable();
      this.registroExportadorForm.get('solicitaExportadorAutorizado')?.enable();
      this.registroExportadorForm.get('condicionExportador')?.enable();
      this.registroExportadorForm.get('solicitaExportadorAutorizadoJPN')?.enable();
      this.registroExportadorForm.get('condicionExportadorJPN')?.enable();
    }
  }

  /**
   * Maneja el cambio del control `solicitaExportadorAutorizado`.
   * @param {Event} event - El evento de cambio.
   */
  onSolicitaExportadorAutorizadoChange(event: Event): void {
    const INPUT = event.target as HTMLInputElement;
    this.showDivExportador = INPUT.checked;
    this.setValoresStore(this.registroExportadorForm, 'solicitaExportadorAutorizado', 'setSolicitaExportadorAutorizado');
  }

  /**
   * Maneja el cambio del control `solicitaExportadorAutorizadoJPN`.
   * @param {Event} event - El evento de cambio.
   */
  onSolicitaExportadorAutorizadoJPNChange(event: Event): void {
    const INPUT = event.target as HTMLInputElement;
    this.showDivExportadorJPN = INPUT.checked;
    this.setValoresStore(this.registroExportadorForm, 'solicitaExportadorAutorizadoJPN', 'setSolicitaExportadorAutorizadoJPN');
  }

  /**
   * Obtiene las opciones de exportador autorizado desde el servicio.
   */
  getExportadorAutorizado(): void {
    this.service.getExportadorAutorizado().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data) => {
        this.exportadorOptions = data;
      }
    );
  }

  /**
   * Obtiene las opciones de exportador autorizado para Japón desde el servicio.
   */
  getExportadorAutorizadoJPN(): void {
    this.service.getExportadorAutorizadoJPN().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data) => {
        this.exportadorOptionsJPN = data;
      }
    );
  }

  /**
   * Establece los valores en el store.
   * @param {FormGroup} form - El formulario del cual se obtienen los valores.
   * @param {string} campo - El nombre del campo del formulario.
   * @param {keyof Tramite110102Store} metodoNombre - El nombre del método del store.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110102Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite110102Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Obtiene los valores del store y los asigna al formulario.
   */
  getValorsStore(): void {
    this.tramite110102Query.selectTramite110102$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.registroExportadorForm.patchValue({
            solicitaSeparacionContable: seccionState.solicitaSeparacionContable,
            solicitaExportadorAutorizado: seccionState.solicitaExportadorAutorizado,
            condicionExportador: seccionState.condicionExportador,
            solicitaExportadorAutorizadoJPN: seccionState.solicitaExportadorAutorizadoJPN,
            condicionExportadorJPN: seccionState.condicionExportadorJPN
          });
        })
      )
      .subscribe();

    this.showDivExportador = this.registroExportadorForm.get('solicitaExportadorAutorizado')?.value;
    this.showDivExportadorJPN = this.registroExportadorForm.get('solicitaExportadorAutorizadoJPN')?.value;
  }

  /**
   * Hook del ciclo de vida que se llama cuando la directiva se destruye.
   * Completa el subject destroyed$ para desuscribirse de todos los observables.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}