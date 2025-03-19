
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { EncabezadoRequerimientoComponent } from '@libs/shared/data-access-user/src';
import { Router } from '@angular/router';

/**
   * @description Estructura de las observaciones de dictamen
   */
interface Observacion {
  id: number;
  Detalle: string;
  fechaGeneracion: string;
  fechaAtencion: string;
  GeneradaPor: string;
  Estatus: string;
}
@Component({
  selector: 'app-observaciones-dictamen',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EncabezadoRequerimientoComponent],
  templateUrl: './observaciones-dictamen.component.html',
  styleUrl: './observaciones-dictamen.component.css',
})
export class ObservacionesDictamenComponent {
  /**
   * @description Variable que almacena el formulario de dictamen
   */
  public dictamenForm: FormGroup; 
  /**
   * @description Variable que almacena las observaciones del dictamen
   */
  public observaciones: Observacion[] = [];
  constructor(private fb: FormBuilder, private router: Router) {
    this.dictamenForm = this.fb.group({
      cumplimiento: [{ value:'1', disabled: true }], 
      mensajeDictamen: ['']    
    });    
    // Simular observaciones para mostrar en la tabla
    this.observaciones = [
      { id: 1, Detalle: 'Observación 1', fechaGeneracion: '2025-03-14', fechaAtencion: '2025-03-14', Estatus: 'Atendido', GeneradaPor: 'Funcionario 1' },
      { id: 2, Detalle: 'Observación 2', fechaGeneracion: '2025-03-13', fechaAtencion: '2025-03-14', Estatus: 'Atendido', GeneradaPor: 'Funcionario 1' },
      { id: 3, Detalle: 'Observación 3', fechaGeneracion: '2025-03-12', fechaAtencion: '2025-03-14', Estatus: 'Atendido', GeneradaPor: 'Funcionario 1' }
    ];
  }
  /**
   * @description Metodo que redirige a la pantalla de Autorizar Dictamen
   */
  BtnRegresar(): void {  
    this.router.navigate(['funcionario/autorizar-dictamen']);    
  }   
  /**
   * @description Metodo que redirige al Guardado de la Observacion
   */
  BtnGuardarObs(): void { 
    const MENSAJE_DICTAMEN = this.dictamenForm.get('mensajeDictamen')?.value;
    if (MENSAJE_DICTAMEN) {
      const NUEVA_OBSERVACION: Observacion = {
        id: this.observaciones.length + 1,
        Detalle: MENSAJE_DICTAMEN,
        fechaAtencion: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
        fechaGeneracion: new Date().toISOString().split('T')[0],
        Estatus: 'Atendido',
        GeneradaPor: 'Funcionario 1'
      };
      this.observaciones.push(NUEVA_OBSERVACION);
    }
    // Redirigir al componente BandejaPendientesComponent
    this.router.navigate(['funcionario/bandeja']);  
  } 
}
