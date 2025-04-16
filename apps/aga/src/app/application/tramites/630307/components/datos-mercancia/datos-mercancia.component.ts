import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { REGEX_ALFANUMERICO_CON_ESPACIOS, REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, REGEX_SOLO_NUMEROS, TituloComponent } from "@ng-mf/data-access-user";

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tramite630307State, Tramite630307Store } from '../../estados/tramite630307.store';
import { Tramite630307Query } from '../../estados/tramite630307.query';

import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-datos-mercancia',
  standalone: true,
  imports: [CommonModule, TituloComponent,ReactiveFormsModule],
  templateUrl: './datos-mercancia.component.html',
  styleUrl: './datos-mercancia.component.scss',
})
export class DatosMercanciaComponent implements OnInit, OnDestroy {
    private destroyed$ = new Subject<void>();
  estadoSeleccionado!:Tramite630307State;
  datosMercancia!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private tramite630307Store:Tramite630307Store,
    private tramite630307Query:Tramite630307Query) {
      // Constructor vacío
}
  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene el estado actual del store y configura el formulario reactivo.
   */
  ngOnInit(): void {
    this.getValorStore();
    this.inicializarFormulario();
  }

  /**
   * Inicializa el formulario reactivo con los valores del estado actual.
   * Configura las validaciones necesarias para cada campo del formulario.
   */
  inicializarFormulario() : void {  
    this.datosMercancia = this.formBuilder.group({
      marca: [this.estadoSeleccionado?.marca, [Validators.required,Validators.pattern(REGEX_ALFANUMERICO_CON_ESPACIOS)]],
      modelo: [this.estadoSeleccionado?.modelo, [Validators.required,Validators.pattern(REGEX_ALFANUMERICO_CON_ESPACIOS)]],
      numeroDeSerie: [this.estadoSeleccionado?.numeroDeSerie, [Validators.required,Validators.pattern(REGEX_SOLO_NUMEROS)]],
      numeroDeMotor: [this.estadoSeleccionado?.numeroDeMotor, [Validators.required,Validators.pattern(REGEX_SOLO_NUMEROS)]],
      descripcionMercancia: [this.estadoSeleccionado?.descripcionMercancia, [Validators.required,Validators.pattern(REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL)]],
      motivo: [this.estadoSeleccionado?.motivo, [Validators.required,Validators.pattern(REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL)]],
      });
  }

  /**
   * Actualiza el estado global del store con el valor de un control del formulario.
   * Recibe el formulario y el nombre del control a actualizar.
   */
  setValorStore(FormGroup: FormGroup, control: string): void {
    const VALOR = FormGroup.get(control)?.value;
    this.tramite630307Store.setTramite630307State({
      [control]: VALOR,
    });
  }

  /**
   * Obtiene el estado actual del store y lo asigna a la propiedad `estadoSeleccionado`.
   * Se suscribe al observable del store para recibir actualizaciones.
   */
    getValorStore(): void {
      this.tramite630307Query.selectTramite630307State$
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          this.estadoSeleccionado = data;
        });
    }

  /**
   * Método que se ejecuta al destruir el componente.
   * Completa el observable `destroyed$` para evitar fugas de memoria.
   */
    ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
    }
  
}
