import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from "@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component";

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src';

import { FORMULARIO_DATOS_PROPIETARIO } from '../../enum/retorno-importacion-temporal.enum';
import { Tramite630303Query } from '../../estados/tramite630303.query';

import { Tramite630303State, Tramite630303Store } from '../../estados/tramite630303.store';

import { Subject, takeUntil } from 'rxjs';
import { CatalogoSelectComponent } from "@ng-mf/data-access-user";
import { TituloComponent } from "@ng-mf/data-access-user";

@Component({
  selector: 'app-tipo-propietario',
  standalone: true,
  imports: [CommonModule, FormasDinamicasComponent, CatalogoSelectComponent,TituloComponent,ReactiveFormsModule],
  templateUrl: './tipo-propietario.component.html',
  styleUrls: ['./tipo-propietario.component.scss'],
})
export class TipoPropietarioComponent implements OnInit,OnDestroy {



    formularioDatosTipoPropietario: ModeloDeFormaDinamica[] = FORMULARIO_DATOS_PROPIETARIO;
  tipoPropietarioFormulario!: FormGroup;
    /**
     * Estado seleccionado del trámite 630303.
     */
    estadoSeleccionado!: Tramite630303State;
  private destroyed$ = new Subject<void>();
  constructor(private fb: FormBuilder,private tramite630303Store: Tramite630303Store,
      private tramite630303Query: Tramite630303Query) {
   //
  }
 
  
  ngOnInit(): void {
    this.getValorStore();
    this.inicializarFormulario();
  }
  inicializarFormulario() : void {
    this.tipoPropietarioFormulario = this.fb.group({
      propietario: ['', Validators.required],
      tipoDePropietario: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: [''],
      calle: ['', Validators.required],
      numeroExterior: ['', Validators.required],
      numeroInterior: [''],
      pais: ['', Validators.required],
      estadoLocalidad: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      codigoPostal: ['', Validators.required]
    });
  }
    /**
     * Obtiene el estado actual del trámite desde el store.
     */
    getValorStore(): void {
      this.tramite630303Query.selectTramite630303State$
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          this.estadoSeleccionado = data;
        });
    }
    establecerCambioDeValor($event: { campo: string; valor: unknown; }): void {
      this.tramite630303Store.setTramite630303State($event.campo, $event.valor);
      }
    ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete()
     }
}
