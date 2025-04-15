import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TituloComponent } from "@ng-mf/data-access-user";

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tramite630303State, Tramite630303Store } from '../../estados/tramite630303.store';
import { Tramite630303Query } from '../../estados/tramite630303.query';

import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-manifiesto',
  standalone: true,
  imports: [CommonModule, TituloComponent,ReactiveFormsModule],
  templateUrl: './manifiesto.component.html',
  styleUrl: './manifiesto.component.scss',
})
export class ManifiestoComponent implements OnInit,OnDestroy{
  private destroyed$ = new Subject<void>();
  manifiestoFormulario!: FormGroup;
  estadoSeleccionado!:Tramite630303State;

  constructor(private fb: FormBuilder,private tramite630303Store: Tramite630303Store,private tramite630303Query: Tramite630303Query) {
   
  }
 
  ngOnInit(): void {
    this.getValorStore();
    this.inizializarFormulario();
  }

  inizializarFormulario(): void {
    this.manifiestoFormulario = this.fb.group({
      declaracion: [this.estadoSeleccionado?.declaracion, Validators.required]
    });
  }

  setValorStore(FormGroup: FormGroup, control: string): void {
    const VALOR = FormGroup.get(control)?.value;
    this.tramite630303Store.setTramite630303State({
      [control]: VALOR
    });
  }

    getValorStore(): void {
      this.tramite630303Query.selectTramite630303State$.pipe(
        takeUntil(this.destroyed$)
      ).subscribe(
        (data) => {
          this.estadoSeleccionado = data;
        }
      );
    }
    ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
    }
}
