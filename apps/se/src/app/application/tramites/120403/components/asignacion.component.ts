import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Catalogo, CatalogoSelectComponent, InputFecha, InputFechaComponent, InputRadioComponent, SharedModule, TituloComponent } from '@libs/shared/data-access-user/src';
import { ANO_CATALOGO, FECHA_FINAL, FECHA_INICIAL, RADIO_OPCIONS } from '../models/registro.model';
import { ReplaySubject, takeUntil } from 'rxjs';
import { CuposService } from '../services/cupos.service';

@Component({
  selector: 'app-asignacion',
  standalone: true,
  imports: [CommonModule, InputRadioComponent, TituloComponent, CatalogoSelectComponent, ReactiveFormsModule, SharedModule, InputFechaComponent],
  templateUrl: './asignacion.component.html',
  styleUrl: './asignacion.component.scss',
})
export class AsignacionComponent implements OnInit, OnDestroy {
  asignacionForm!: FormGroup;
  radioOpcions = RADIO_OPCIONS;
  valorSeleccionado: string = '';
  public anoCatalogo = ANO_CATALOGO;
  fechaInicialInput: InputFecha = FECHA_INICIAL;
  fechaFinalInput: InputFecha = FECHA_FINAL;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  
  constructor(private cupos: CuposService) { }

  ngOnInit(): void {
    this.obtenerDatosEstado();
  }

  public obtenerDatosEstado(): void {
    this.cupos
      .obtenerDatosAno()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.anoCatalogo.catalogos = resp as Catalogo[];
      });
  }

  ngOnDestroy(): void {

  }
}
