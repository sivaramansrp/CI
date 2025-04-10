import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { FormGroup } from '@angular/forms';
// import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
// import { ReactiveFormsModule } from '@angular/forms';
// import { Subject } from 'rxjs';
// import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src'
// import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
// import { takeUntil } from 'rxjs';
@Component({
  selector: 'app-manifiestos',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './manifiestos.component.html',
  styleUrl: './manifiestos.component.css',
})
export class ManifiestosComponent implements OnInit {
    /** Texto del manifiesto de veracidad */
    public manifestoDeVeracidad = 'Cumplo con los requisitos y normatividad aplicable, sin que me eximan de que la autoridad sanitaria verifique su cumplimiento, esto sin perjuicio de las sanciones en que puedo incurrir por falsedat de declaraciones dadas a una autondad. Asimismo acepto, que la notificación de este trámite, sea a través de la ventanilla Unica de Comercio Exterior por los mecanismos de la misma';

    /** Cuadro de texto para motivo desistimiento */
    public motivoDesistimientotextBox = '';

  
    /** Texto de confirmación de veracidad */
    public confirmarVeracidad = '';
  
    /** Booleano para verificar si la casilla declaracionEstaMarcado */
    public declaracionEstaMarcado = false;
  /**
 * Formulario reactivo para datos preoperativos.
 */
  domicilioEstablecimiento!: FormGroup;
    /**
 * Formulario reactivo para datos preoperativos.
 */
    Aduana!: FormGroup;
    /** Subject para notificar la destrucción del componente */
    // private destroy$ = new Subject<void>();




/**
 * Constructor para SolicitanteComponent.
 * 
 * @param fb - Una instancia de FormBuilder utilizada para crear y gestionar formularios.
 */
constructor(private fb: FormBuilder,) {

}

/**
 * Gancho de ciclo de vida que se llama después de que se inicializan las propiedades enlazadas a datos de una directiva.
 * Inicializa el componente configurando los valores del formulario.
 * 
 */
ngOnInit(): void {
  this.mercanciasData();
}


mercanciasData(){
  this.Aduana = this.fb.group({
    Aduan: [{ value: '', disabled: false }],
    No: [{ value: '', disabled: false }],

    Si: [{ value: '', disabled: false }],

  });
}
  

}

