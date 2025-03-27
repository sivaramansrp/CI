import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  AMBIENTES,
  InputFecha,
  InputFechaComponent,
} from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router";


export const FECHA_INICIO = {
  labelNombre: 'Fecha inicial',
  required: true,
  habilitado: true,
};

export const FECHA_FINAL = {
  labelNombre: 'Fecha final',
  required: true,
  habilitado: true,
};

@Component({
  selector: 'acuses-y-resoluiones-folio-del-tramite-buscar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputFechaComponent,RouterModule],
  templateUrl: './acuses-y-resoluiones-folio-del-tramite-buscar.component.html',
  styleUrl: './acuses-y-resoluiones-folio-del-tramite-buscar.component.scss',
})
export class AcusesYResoluionesFolioDelTramiteBuscarComponent implements OnInit {
  public FormBusqueda!: FormGroup;
  public fechaInicioInput: InputFecha = FECHA_INICIO;
 public fechaFinalInput: InputFecha = FECHA_FINAL;
  public router!: Router;

  public constructor(protected readonly formBuilder: FormBuilder) {
    this.FormBusqueda = this.inicializaFormulario();
  }
  
  public ruta: string = '';
  
  ngOnInit(): void {
    if (window.location.host.indexOf('localhost') !== -1) {
      this.ruta = 'localhost:4208';
    } else {
      this.ruta = 'localhost:4208';
    }
  }

  /**
   * Método para crear el formulario y sus campos
   * @returns Un form group con los campos necesarios
   */
  private inicializaFormulario(): FormGroup {
    const CAMPOS_FOMULARIO = {
      folio: [],
      fechaInicial: [],
      fechaFinal: [],
    };
    return this.formBuilder.group(CAMPOS_FOMULARIO);
  }

  public cambioFechaInicio(nuevo_valor: string) {
    this.FormBusqueda.get('fechaInicio')?.setValue(nuevo_valor);
    this.FormBusqueda.get('fechaInicio')?.markAsUntouched();
  }

  public cambioFechaFinal(nuevo_valor: string) {
    this.FormBusqueda.get('fechaFinal')?.setValue(nuevo_valor);
    this.FormBusqueda.get('fechaFinal')?.markAsUntouched();
  }

  continuar() : void {
    this.router.navigate(['acuses-y-resoluciones']);
  }
  
}
