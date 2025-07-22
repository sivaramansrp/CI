import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Subject,map,takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-protesto-decir-verdad',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './protesto-decir-verdad.component.html',
  styleUrl: './protesto-decir-verdad.component.scss',
})
export class ProtestoDecirVerdadComponent implements OnInit, OnDestroy {
/**
  * **Subject utilizado para manejar la destrucción de suscripciones**
  * 
  * Este `Subject` se emite en `ngOnDestroy` para notificar y completar todas las
  * suscripciones activas, evitando posibles fugas de memoria en el componente.
  */
  private destroy$ = new Subject<void>();
    /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  public esFormularioSoloLectura: boolean = false;
  public protestoForm!: FormGroup;
  
  constructor(private consultaioQuery: ConsultaioQuery,
              private fb: FormBuilder) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => { 
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe(); 
  }

  ngOnInit(): void {
    this.protestoForm = this.fb.group({
      manifiesto: [{ value: false, disabled: this.esFormularioSoloLectura }]
    });
  }

  /**
   * **Ciclo de vida: OnDestroy**
   * 
   * Este método se ejecuta cuando el componente se destruye. 
   * Se utiliza para limpiar las suscripciones y evitar fugas de memoria.
   * 
   * - Envía un valor a `destroy$` para notificar a los observables que deben completarse.
   * - Completa `destroy$` para liberar los recursos asociados.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
