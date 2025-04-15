import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, TituloComponent } from "@ng-mf/data-access-user";

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tramite630303State, Tramite630303Store } from '../../estados/tramite630303.store';
import { Tramite630303Query } from '../../estados/tramite630303.query';

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
  estadoSeleccionado!:Tramite630303State;
  datosMercancia!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private tramite630303Store:Tramite630303Store,
    private tramite630303Query:Tramite630303Query) {
      //
}
  ngOnInit(): void {
    this.getValorStore();
    this.inicializarFormulario();
  }

  inicializarFormulario() : void {  
    this.datosMercancia = this.formBuilder.group({
      descripcionMercancia: [this.estadoSeleccionado?.descripcionMercancia, [Validators.required,Validators.pattern(REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL)]],
      motivo: [this.estadoSeleccionado?.motivo, [Validators.required,Validators.pattern(REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL)]],
      listaMercancia: [this.estadoSeleccionado?.listaMercancia, [Validators.required,Validators.pattern(REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL)]]
    });
  }

  setValorStore(FormGroup: FormGroup, control: string): void {
    const VALOR = FormGroup.get(control)?.value;
    this.tramite630303Store.setTramite630303State({
      [control]: VALOR,
    });
  }

    getValorStore(): void {
      this.tramite630303Query.selectTramite630303State$
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          this.estadoSeleccionado = data;
        });
    }

    ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
    }
  
}
