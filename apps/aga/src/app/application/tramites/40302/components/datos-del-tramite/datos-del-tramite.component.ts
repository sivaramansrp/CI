import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TituloComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-datos-del-tramite',
  standalone: true,
  imports: [TituloComponent,ReactiveFormsModule],
  templateUrl: './datos-del-tramite.component.html',
  styleUrl: './datos-del-tramite.component.scss'
})
export class DatosDelTramiteComponent implements OnInit {
public solicitudForm! : FormGroup;

constructor(private fb: FormBuilder){
  this.establecerSolicitudForm();
}

  ngOnInit(): void {
    this.establecerValoresDeFormulario();
  }

  public establecerSolicitudForm(): void {
    this.solicitudForm = this.fb.group({
      cveFolioCaat: [{ value: '', disabled: true }],
      descTipoCaat: [{ value: '', disabled: true }],
      descTipoAgente: [{ value: '', disabled: true }],
      directorGeneralNombre: ['', [Validators.required, Validators.maxLength(200)]],
      primerApellido:  ['', [Validators.required, Validators.maxLength(200)]],
      segundoApellido:  ['', [Validators.maxLength(200)]],
    })
  }

public establecerValoresDeFormulario(): void{
  this.solicitudForm.get('cveFolioCaat')?.setValue('3L6V');
  this.solicitudForm.get('descTipoCaat')?.setValue('Naviero');
  this.solicitudForm.get('descTipoAgente')?.setValue('Agente Naviero');
  this.solicitudForm.get('directorGeneralNombre')?.setValue('HAZEL');
  this.solicitudForm.get('primerApellido')?.setValue('NAVA');
  this.solicitudForm.get('segundoApellido')?.setValue('AVILA');
  }
}
