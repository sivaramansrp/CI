import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Persona } from '@ng-mf/data-access-user';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';

import { Solicitud32502State, Tramite32502Store } from '../../../../estados/tramites/tramite32502.store';
import { SeccionAgaceState } from '../../../../estados/seccion.store';
import { Subject } from 'rxjs';
import { Tramite32502Query } from '../../../../estados/queries/tramite3250.query';


@Component({
  selector: 'agrega-personas',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agrega-personas.component.html',
  styleUrl: './agrega-personas.component.scss',
})
export class AgregaPersonasComponent {
  private seccion!: SeccionAgaceState;
  public solicitudState!: Solicitud32502State;
  gafete: FormControl = new FormControl('', [Validators.maxLength(25)]);

  personaForm: FormGroup = this.fb.group({
    nombre: [{value: this.tramite32502Store?.setNombre || "nombre", disabled: true }],
    primerApellido: [{ value: this.tramite32502Store.setPrimerApellido, disabled: true }],
    segundoApellido: [{ value: this.tramite32502Store.setSegundoApellido, disabled: true }],
  });

  persona!: Persona;

  personas: Array<Persona> = [];
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private tramite32502Store: Tramite32502Store,
    private tramite32502Query: Tramite32502Query,
    private seccionQuery: Tramite32502Query
  ) {
    //
  }

  isValid(field: string) {
    return this.validacionesService.isValid(this.personaForm, field);
  }

  get gafeteIsValid() {
    return this.gafete.errors && this.gafete.touched;
  }

  buscarGafete() {
    // Aquí va a buscar por gafete a un endpoint

    const GAFETE = this.gafete.value;

    if (!GAFETE) {
      alert('No has proporcionado información que es requerida.');
      return;
    }

    if (!this.persona) {
      alert(
        'No se encontraron datos con el número de gafete, intenta de nuevo o agrega los datos restantes.'
      );
      this.habilitarCamposFormulario();
      //return;
    }
  }

  habilitarCamposFormulario(): void {
    Object.keys(this.personaForm.controls).forEach((campo) => {
      const CONTROL = this.personaForm.get(campo);
      CONTROL?.enable();
      CONTROL?.setValidators([Validators.required, Validators.maxLength(30)]);
      CONTROL?.updateValueAndValidity();
    });
  }

  deshabilitarCamposFormulario(): void {
    Object.keys(this.personaForm.controls).forEach((campo) => {
      const CONTROL = this.personaForm.get(campo);
      CONTROL?.disable();
    });
  }

  agregarPersona() {
    this.gafete.setValidators([Validators.required, Validators.maxLength(25)]);
    this.gafete.updateValueAndValidity();

    if (this.gafete.invalid || this.personaForm.invalid) {
      alert('Debes capturar todos los datos marcados como obligatorios.');
      this.gafete.markAllAsTouched();
      this.personaForm.markAllAsTouched();
      this.habilitarCamposFormulario();
      return;
    }

    if (this.personas.length >= 5) {
      alert('Solo puede agregar hasta 5 personas');
      return;
    }

    const RESPONSABLE: Persona = {
      gafete: this.gafete.value,
      nombre: this.personaForm.get('nombre')?.value,
      primerApellido: this.personaForm.get('primerApellido')?.value,
      segundoApellido: this.personaForm.get('segundoApellido')?.value,
    };

    this.personas.push(RESPONSABLE);
    this.personaForm.reset({});
    this.deshabilitarCamposFormulario();
  }

  eliminar(i: number) {
    this.personas.splice(i, 1);
    //modal de confirmacion de elimincacion
  }
}
