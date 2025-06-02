import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TablaDinamicaComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { CONFIGURACION_ENCABEZADO_SOCIO } from '../../core/constantes/socio-accionista.enum';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConsultaSocioAccionista } from '../../core/models/consulta-socio-accionista.model';

@Component({
  selector: 'app-registro-socio-accionista',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TablaDinamicaComponent],
  templateUrl: './registro-socio-accionista.component.html',
  styleUrl: './registro-socio-accionista.component.scss',
})
export class RegistroSocioAccionistaComponent {
  FormSocioAccionista!: FormGroup;
  tablaSeleccion = TablaSeleccion;
  encabezadoDeTablaAccionista = CONFIGURACION_ENCABEZADO_SOCIO;
  public listaSociosAccionistas: ConsultaSocioAccionista[] = [];
  public listaSociosAccionistasExtranjeros: ConsultaSocioAccionista[] = [];
  public socioAccionistaSeleccionado: ConsultaSocioAccionista[] = [];
  public socioAccionistaExtranjerosSeleccionado: ConsultaSocioAccionista[] = [];
  buscarSocioAccionista() {
    // Implement the logic to search for a shareholder here
    console.log('Searching for shareholder...');
  }
}
