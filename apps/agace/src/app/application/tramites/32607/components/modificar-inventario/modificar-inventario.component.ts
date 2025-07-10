import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Solicitud32607State,
  Solicitud32607Store,
} from '../../estados/solicitud32607.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Solicitud32607Query } from '../../estados/solicitud32607.query';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-modificar-inventario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent],
  templateUrl: './modificar-inventario.component.html',
  styleUrl: './modificar-inventario.component.scss',
})
export class ModificarInventarioComponent implements OnInit, OnDestroy {
  modificarInventarioForm!: FormGroup;

  private destroy$: Subject<void> = new Subject<void>();

  solicitud32607State: Solicitud32607State = {} as Solicitud32607State;
  constructor(
    public fb: FormBuilder,
    public solicitud32607Store: Solicitud32607Store,
    public solicitud32607Query: Solicitud32607Query
  ) {}

  ngOnInit(): void {
    this.modificarInventarioForm = this.fb.group({
      inventarioNombre: [
        this.solicitud32607State.inventarioNombre,
        [Validators.required],
      ],
      inventarioAnexo: [this.solicitud32607State.inventarioAnexo],
      inventarioLugar: [
        this.solicitud32607State.inventarioLugar,
        [Validators.required],
      ],
    });

    this.solicitud32607Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud32607State) => {
          this.solicitud32607State = respuesta;
          this.modificarInventarioForm.patchValue({
            inventarioNombre: this.solicitud32607State.inventarioNombre,
            inventarioAnexo: this.solicitud32607State.inventarioAnexo,
            inventarioLugar: this.solicitud32607State.inventarioLugar,
          });
        })
      )
      .subscribe();
  }

  actualizarInventarioNombre(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32607Store.actualizarInventarioNombre(VALOR);
  }

  actualizarInventarioAnexo(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).checked;
    this.solicitud32607Store.actualizarInventarioAnexo(VALOR);
  }

  actualizarLugarDeRadicacion(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32607Store.actualizarInventarioLugar(VALOR);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
