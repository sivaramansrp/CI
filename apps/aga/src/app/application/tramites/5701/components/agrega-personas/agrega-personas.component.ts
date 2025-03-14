import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Persona } from '../../../../core/models/5701/tramite5701.model';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';

@Component({
  selector: 'agrega-personas',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agrega-personas.component.html',
  styleUrl: './agrega-personas.component.scss',
})
export class AgregaPersonasComponent {
  gafete: FormControl = new FormControl('', [Validators.maxLength(25)]);

  personaForm: FormGroup = this.fb.group({
    nombre: [{ value: '', disabled: true }],
    primerApellido: [{ value: '', disabled: true }],
    segundoApellido: [{ value: '', disabled: true }],
  });

  persona!: Persona;

  personas: Persona[] = [];

  constructor(
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService
  ) {}

  isValid(field: string): boolean | null{
    return this.validacionesService.isValid(this.personaForm, field);
  }

  get gafeteIsValid(): boolean | null {
    return this.gafete.errors && this.gafete.touched;
  }

  buscarGafete(): void {
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

  agregarPersona(): void {
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

  eliminar(i: number) : void {
    this.personas.splice(i, 1);
    //modal de confirmacion de elimincacion
  }
}
