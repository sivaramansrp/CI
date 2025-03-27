import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputFecha, InputFechaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";


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
  selector: 'acuses-y-resoluciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,TituloComponent],
  templateUrl: './acuses-y-resoluciones.component.html',
  styleUrl: './acuses-y-resoluciones.component.scss',
})
export class AcusesYResolucionesComponent implements OnInit {

   public acusesYResolucionesFormGroup!: FormGroup;
    public fechaInicioInput: InputFecha = FECHA_INICIO;
    public fechaFinalInput: InputFecha = FECHA_FINAL;
    public router!: Router;
  
    public constructor(
      protected readonly formBuilder: FormBuilder,
    ) {
      //this.acusesYResolucionesFormGroup = this.inicializaFormulario();
    }


    // -------------
    // desisitimientoForm!: FormGroup;

    // constructor(private fb: FormBuilder) { }
  
    // ngOnInit(): void {
    //   this.desisitimientoForm = this.fb.group({
    //     folioOriginal: [''],
    //     justificacionDelDesistimiento: ['']
    //   });
    //   this.setFormValues();
    // }
    // setFormValues() {
    //   this.desisitimientoForm.get('rfc')?.setValue(mockData.folioOriginal);
    //   this.desisitimientoForm.get('denominacion')?.setValue(mockData.justificacionDelDesistimiento);
    // }

    // ------------
  
    /**
     * Método para crear el formulario y sus campos
     * @returns Un form group con los campos necesarios
     */
    ngOnInit(): void {
      this.acusesYResolucionesFormGroup = this.formBuilder.group({
        folio: [ { value: '', disabled: true }],
        dependencia:[''],
        fechaInicial: [''],
        fechaFinal: [''],
        unidadAdministrativaORepresentaciónFederal: [''],
        tipoDeSolicitud: [''],
        estatusDeLaSolicitud: [''],
        díasHábilesTranscurridos: ['']
      });

    this.iniTializedFormValues();
    
    }

    public iniTializedFormValues() {
      this.acusesYResolucionesFormGroup.get('folio')?.setValue('11105');
      this.acusesYResolucionesFormGroup.get('dependencia')?.setValue('AGA');
      this.acusesYResolucionesFormGroup.get('fechaInicial')?.setValue('todayDate');
      this.acusesYResolucionesFormGroup.get('fechaFinal')?.setValue('');
      this.acusesYResolucionesFormGroup.get('unidadAdministrativaORepresentaciónFederal')?.setValue('Shekhar K');
      this.acusesYResolucionesFormGroup.get('tipoDeSolicitud')?.setValue('Retirada de la autorización de donaciones');
      this.acusesYResolucionesFormGroup.get('estatusDeLaSolicitud')?.setValue('En trámite');
      this.acusesYResolucionesFormGroup.get('díasHábilesTranscurridos')?.setValue('');
    }
  
    // public cambioFechaInicio(nuevo_valor: string) {
    //   this.acusesYResolucionesFormGroup.get('fechaInicio')?.setValue(nuevo_valor);
    //   this.acusesYResolucionesFormGroup.get('fechaInicio')?.markAsUntouched();
    // }
  
    // public cambioFechaFinal(nuevo_valor: string) {
    //   this.acusesYResolucionesFormGroup.get('fechaFinal')?.setValue(nuevo_valor);
    //   this.acusesYResolucionesFormGroup.get('fechaFinal')?.markAsUntouched();
    // }

    public continuar() : void {
      this.router.navigate(['acuses-y-resoluciones']);
    }

}
