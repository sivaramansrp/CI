import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { Catalogo, InputFecha, TituloComponent } from "@ng-mf/data-access-user";
import { CatalogoSelectComponent } from "@ng-mf/data-access-user";
import { DatosMercanciaImportacionTemporalComponent } from '../datos-mercancia-importacion-temporal/datos-mercancia-importacion-temporal.component';
import { InputFechaComponent } from "@ng-mf/data-access-user";

import { DatosRetornoAutorizacionComponent } from "../datos-retorno-autorizacion/datos-retorno-autorizacion.component";
import { DatosRetornoProrrogaComponent } from "../datos-retorno-prorroga/datos-retorno-prorroga.component";

import { ESTIMADA_RETORNO } from '../../enum/retorno-importacion-temporal.enum';
import { RetornoImportacionTemporalService } from '../../services/retorno-importacion-temporal.service';

import { Tramite630307State, Tramite630307Store } from '../../estados/tramite630307.store';
import { Tramite630307Query } from '../../estados/tramite630307.query';



@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, CatalogoSelectComponent, InputFechaComponent, DatosRetornoProrrogaComponent, DatosRetornoAutorizacionComponent, DatosMercanciaImportacionTemporalComponent],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {

  datosImportacionTemporalFormulario!: FormGroup;
  datosfecha: InputFecha = ESTIMADA_RETORNO;
  aduanaDeingresOpciones: Catalogo[] = [];
  seccionAduaneraOpciones: Catalogo[] = [];
  prorrogaOpciones: Catalogo[] = [];
  private destroyed$ = new Subject<void>();
  showRetornoProrroga: boolean = false;
  estadoSeleccionado!:Tramite630307State;

  constructor(private fb: FormBuilder, private retornoImportacionTemporalService: RetornoImportacionTemporalService, private tramite630307Store: Tramite630307Store,private tramite630307Query: Tramite630307Query) {
  //constructor
  }

  ngOnInit(): void {
    this.getValorStore();
    this.inizializarFormulario();
    this.getAduanaDeIngreso();
    this.getSeccionAduanera();
    this.getProrroga();
  }

  inizializarFormulario(): void {
    this.datosImportacionTemporalFormulario = this.fb.group({
      cveAduana: [this.estadoSeleccionado.cveAduana, Validators.required],
      cveSeccionAduanal: [this.estadoSeleccionado.cveSeccionAduanal],
      fechaLimiteRetorno: [this.estadoSeleccionado.fechaLimiteRetorno, Validators.required],
      cuentaProrroga: [this.estadoSeleccionado.cuentaProrroga, Validators.required]
    });
  }

  cambioFechaFinal(nuevo_valor: string): void {
    this.datosImportacionTemporalFormulario.patchValue({
      fechaLimiteRetorno: nuevo_valor,
    });
    this.setValorStore(this.datosImportacionTemporalFormulario, 'fechaLimiteRetorno');
  }

  getAduanaDeIngreso(): void {
    this.retornoImportacionTemporalService.getAduanaDeIngreso()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.aduanaDeingresOpciones = data;
      }
      );
  }
  getSeccionAduanera(): void {
    this.retornoImportacionTemporalService.getSeccionAduanera()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.seccionAduaneraOpciones = data;
      });
  }
  getProrroga(): void {
    this.retornoImportacionTemporalService.getProrroga()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.prorrogaOpciones = data;
      });
  }

  onChangeTipoImportacionRetorno(): void {

    const CUENTA_PRORROGA = this.datosImportacionTemporalFormulario.get('cuentaProrroga')?.value;
    if (CUENTA_PRORROGA === '1') {
      this.showRetornoProrroga = true;
    }
    else {
      this.showRetornoProrroga = false;
    }
    this.setValorStore(this.datosImportacionTemporalFormulario, 'cuentaProrroga');
  }

  setValorStore(FormGroup: FormGroup, control: string): void {
    const VALOR = FormGroup.get(control)?.value;
    this.tramite630307Store.setTramite630307State({
      [control]: VALOR
    });
  }

  getValorStore(): void {
    this.tramite630307Query.selectTramite630307State$.pipe(
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

