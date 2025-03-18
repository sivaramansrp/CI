import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlDar, AlertComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { DomicilloComponent } from '../domicillo/domicillo.component';
import { ManifiestosComponent } from '../manifiestos/manifiestos.component';
import { RepresentanteLegalComponent } from '../representanteLegal/representanteLegal.component';
import { Solicitud216001State, Tramite216001Store } from '../../../../estados/tramites/tramite261001.store';
import { Tramite216001Query } from '../../../../estados/queries/tramite261001.query';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-datos-de-la',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlertComponent,
    TituloComponent,
    DomicilloComponent,
    ManifiestosComponent,
    RepresentanteLegalComponent
  ],
  templateUrl: './datosDeLa.component.html',
  styleUrl: './datosDeLa.component.css',
})
export class DatosDeLaComponent implements OnInit{

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
   * @property {FormGroup} forma
   */
  forma!: FormGroup;
  
  /**
   * Indica si la sección es colapsable.
   * @property {boolean} colapsable
   */
  colapsable: boolean = true;

  /**
   * Constantes importadas desde el archivo de enumeración que contienen textos importantes y de advertencia.
   * 
   * @type {Importante}
   * @memberof RegistroParaLaComponent
   */
  public TEXTOS = AlDar;

  /**
   * Alterna el estado colapsable de la sección del formulario.
   * @method mostrar_colapsable
   */
  mostrar_colapsable() {
    this.colapsable = !this.colapsable;
  }

  ngOnInit(){
    this.tramite216001Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.forma = this.fb.group({
      rfcDel: [{ value: this.solicitudState?.rfcDel, disabled: true }],
      denominacion: [{ value: this.solicitudState?.denominacion, disabled: true }, Validators.required],
      correo: [{ value: this.solicitudState?.correo, disabled: true }, Validators.required],
    });
  }
  toggleFormControls() {
    Object.keys(this.forma.controls).forEach(controlName => {
      const control = this.forma.get(controlName);
      if (control?.disabled) {
        control.enable();
      }
    });
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
