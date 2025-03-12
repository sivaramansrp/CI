import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotifDomicileComponent } from '../NotifDomicile/NotifDomicile.component';

import { Cancelaciones140201Store } from '../../estados/cancelaciones.store';

import { Cancelaciones140201Query } from '../../estados/cancelaciones.query';
@Component({
  selector: 'app-datos-del-las-140201',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    NotifDomicileComponent,
  ],
  templateUrl: './datos-del-las-140201.component.html',
  styleUrl: './datos-del-las-140201.component.scss',
})
export class DatosDelLas140201Component implements OnInit {
  authNotifPersonsForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cancelaciones140201Store: Cancelaciones140201Store,
    private cancelaciones140201Query: Cancelaciones140201Query
  ) {
    //constructor
  }
  nombre$ = this.cancelaciones140201Query.nombre$;
  apellidoPaterno$ =this.cancelaciones140201Query.apellidoPaterno$;
  correoElectronico$ =this.cancelaciones140201Query. correoElectronico$
  ngOnInit(): void {
    this.authNotifPersonsForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellidoPaterno: [''],
      apellidoMaterno: [{ value: '', disabled: true }],
      correoElectronico: ['', [Validators.required, Validators.email]],
    });
    this.updateState();
  }

  updateState() {
    this.nombre$.subscribe((nombre) => {
      if (nombre) {
        this.authNotifPersonsForm.get('nombre')?.setValue(nombre);
      }
    });

    this.apellidoPaterno$.subscribe((apellidoPaterno)=>{
      if (apellidoPaterno) {
        this.authNotifPersonsForm.get('apellidoPaterno')?.setValue(apellidoPaterno);
      }
    });
    this.correoElectronico$.subscribe((correoElectronico)=>{
      if (correoElectronico) {
        this.authNotifPersonsForm.get('correoElectronico')?.setValue(correoElectronico);
      }
    });
  }
  updateNombre() {
    const NOMBRE = this.authNotifPersonsForm.get('nombre')?.value;
    this.cancelaciones140201Store.setNombre(NOMBRE);
  }
  updateApellidoPaterno(){
    const APELLIDO_PATERNO = this.authNotifPersonsForm.get('apellidoPaterno')?.value;
    this.cancelaciones140201Store.setApellidoPaterno(APELLIDO_PATERNO);
  }
  updateCorreoElectronico(){
    const CORREO_ELECTRONICO = this.authNotifPersonsForm.get('correoElectronico')?.value;
    this.cancelaciones140201Store.setCorreoElectronico(CORREO_ELECTRONICO);
  }
}
