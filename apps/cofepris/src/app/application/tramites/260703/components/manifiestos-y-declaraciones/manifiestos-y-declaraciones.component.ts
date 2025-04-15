import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Manifiestos,
  ManifiestosRespuesta,
} from '../../model/solicitud-permiso.model';
import {
  SolicitudPermisoState,
  Tramite260703Store,
} from '../../estados/store/tramite260703.store';
import { Subject, takeUntil } from 'rxjs';
import { OPCIONES_DE_BOTON_DE_RADIO } from '../../enum/solicitud-permiso.enum';
import { SolicitudPermisoService } from '../../services/solicitud-permiso.service';
import { Tramite260703Query } from '../../estados/query/tramite260703.query';

@Component({
  selector: 'app-manifiestos-y-declaraciones',
  templateUrl: './manifiestos-y-declaraciones.component.html',
  styleUrl: './manifiestos-y-declaraciones.component.css',
})
export class ManifiestosYDeclaracionesComponent implements OnInit, OnDestroy {
  manifiestosForm!: FormGroup;
  manifiestos!: Manifiestos[];
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;

  solicitudPermisioState!: SolicitudPermisoState;

  destruirNotificador$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private tramite260703Store: Tramite260703Store,
    private tramite260703Query: Tramite260703Query,
    private SolicitudPermisoService: SolicitudPermisoService
  ) {
    //
  }

  ngOnInit(): void {
    this.tramite260703Query.selectSolicitudPermiso$
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe((state) => {
        this.solicitudPermisioState = state;
      });

    this.createManifiestosForm();
  }

  /**
     * Obtiene el FormArray correspondiente a 'seleccionadaManifiesto' dentro del formulario de registro de donación.
     * 
     * @returns {FormArray} El FormArray de 'seleccionadaManifiesto'.
     */
    get seleccionadaManifiesto(): FormArray {
      return this.manifiestosForm.get('seleccionadaManifiesto') as FormArray;
    }

  createManifiestosForm(): void {
    this.obtenerManifiestos();
    this.manifiestosForm = this.formBuilder.group({
      seleccionadaManifiesto: this.formBuilder.array(
        this.solicitudPermisioState?.manifiestosFormState.seleccionadaManifiesto
      ),
      informacionConfidencial: [
        this.solicitudPermisioState?.manifiestosFormState
          .informacionConfidencial,
        Validators.required,
      ],
    });
  }

  obtenerManifiestos(): void {
    this.SolicitudPermisoService.getManifiestos()
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe({
        next: (result: ManifiestosRespuesta) => {
          this.manifiestos = result?.data;
        },
      });
  }

  /**
   * Cambia el estado de la casilla de verificación según el índice.
   *
   * @param event - El evento que se dispara al cambiar el estado del checkbox.
   * @param {number} index - Índice de la casilla de verificación.
   *
   * @returns {void}
   */
  onManifiestoCheckboxCambiar(event: Event, index: number): void {
    const VALOR_ENTRADA = event.target as HTMLInputElement;
    this.seleccionadaManifiesto.controls[index].setValue(VALOR_ENTRADA.checked);
    this.setValoresStore(
      'seleccionadaManifiesto',
    );
  }

    /**
   * Maneja el evento de cambio de valor.
   */
    // enCambioDeValor(): void {
    //   // Implementar la lógica para evento de cambio de valor.
    // }

  setValoresStore(campo:string):void{
    this.tramite260703Store.updateManifiestosFormState({
      [campo]: this.manifiestosForm.get(campo)?.value,
    });
  }

  ngOnDestroy(): void {
    this.destruirNotificador$.next();
    this.destruirNotificador$.complete();
  }
}
