import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud216001State, Tramite216001Store } from '../../../../estados/tramites/tramite261001.store';
import { Tramite216001Query } from '../../../../estados/queries/tramite261001.query';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-representante-legal',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule
  ],
  templateUrl: './representanteLegal.component.html',
  styleUrl: './representanteLegal.component.css',
})
export class RepresentanteLegalComponent implements OnInit{
  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud216001State;

  /**
   * Notificador para destruir observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(private readonly fb: FormBuilder,
    private tramite216001Store: Tramite216001Store,
    private tramite216001Query: Tramite216001Query
  ){}
    
      /**
       * Grupo de formularios principal.
       * @property {FormGroup} representante
       */
      representante!: FormGroup;

    ngOnInit(): void {
      this.tramite216001Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
      this.representante = this.fb.group({
        rfc:[this.solicitudState?.rfc,Validators.required],
        nombre:[{value:this.solicitudState?.nombre,disabled:true}, Validators.required],
        apellidoPaterno:[{value:this.solicitudState?.apellidoPaterno,disabled:true}, Validators.required],
        apellidoMaterno:[{value:this.solicitudState?.apellidoMaterno,disabled:true}],
      });
    }

    obtenerValor(){
      this.representante.patchValue({
        nombre:47875,
        apellidoPaterno:'Paterno',
        apellidoMaterno:'Materno'
      })
    }
    /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite216001Store): void {
    const valor = form.get(campo)?.value;
    (this.tramite216001Store[metodoNombre] as (value: any) => void)(valor);
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
