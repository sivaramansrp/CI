import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { MensajeDeAlerta } from '../../enum/permiso.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';
import { Solicitud260215State, Tramite260215Store } from '../../estados/tramites/tramite260215.store';
import { Tramite260215Query } from '../../estados/queries/tramite260215.query';

@Component({
  selector: 'app-manifiestos',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    AlertComponent,
    ReactiveFormsModule
  ],
  templateUrl: './manifiestos-declaraciones.component.html',
  styleUrl: './manifiestos-declaraciones.component.css',
})
export class ManifiestosComponent {

  public mensaje:string = MensajeDeAlerta
  
  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud260215State;

  /**
   * Notificador para destruir observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();

   constructor(private fb: FormBuilder,
    private tramite260215Store: Tramite260215Store,
    private tramite260215Query: Tramite260215Query
   ){}
  
    /**
     * Grupo de formularios principal.
     * @property {FormGroup} manifiestos
     */
    manifiestos!: FormGroup;

    ngOnInit(): void {
      this.tramite260215Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
      this.manifiestos = this.fb.group({
        cumplimiento: [this.solicitudState?.cumplimiento, Validators.required],
      });
    }
    /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite260215Store): void {
    const valor = form.get(campo)?.value;
    (this.tramite260215Store[metodoNombre] as (value: any) => void)(valor);
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
