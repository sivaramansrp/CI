/* eslint-disable class-methods-use-this */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable sort-imports */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { RegistroCuentasBancariasService } from '../../services/registro-cuentas-bancarias.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { REGEX_RFC } from '@libs/shared/data-access-user/src/tramites/constantes/regex.constants';

@Component({
  selector: 'app-agregar-cuenta',
  standalone: true,
  imports: [CommonModule, TituloComponent,CatalogoSelectComponent,ReactiveFormsModule],
  templateUrl: './agregar-cuenta.component.html',
  styleUrl: './agregar-cuenta.component.scss',
})
export class AgregarCuentaComponent implements OnInit {

  public tipoDePersona!: Catalogo[];
  public paisDondeRadica!: Catalogo[];
  public institucion!: Catalogo[];
  public estado!: Catalogo[];
  public agregarCuentaForm!: FormGroup;

  constructor( 
      private _registroCuentasBancariasSvc: RegistroCuentasBancariasService,
      private fb: FormBuilder) { 
        this.crearAgregarCuentaForm();
  }

  ngOnInit(): void {
    this.getTipoDePersona();
    this.getPaisDondeRadica();
    this.getInstitucion();
    this.getEstado();
  }

  public deepCopy(obj = {}) {
    return JSON.parse(JSON.stringify(obj));
  }

  public crearAgregarCuentaForm():void {
    this.agregarCuentaForm = this.fb.group({
      titularDeLaCuenta: ['',[Validators.required,Validators.maxLength(90)]],
      persona: [''],
      rfc: ['',[Validators.required,Validators.pattern(REGEX_RFC)]],
      numeroDeCuenta: ['',[Validators.required,Validators.maxLength(30)]],
      pais: [''],
      institucion: [''],
      estado: [''],
      sucursal: ['',[Validators.required,Validators.maxLength(10),Validators.pattern(/[^0-9A-Za-z&_-]/)]],
      numeroDePlaza: ['',[Validators.required,Validators.maxLength(10),Validators.pattern(/[^0-9A-Za-z]/)]]
    })
  }

  public getTipoDePersona(): void {
    this._registroCuentasBancariasSvc.getTipoDePersonaDatos().subscribe((response) => {
      const API_RESPONSE = this.deepCopy(response);
      this.tipoDePersona = API_RESPONSE.data;
    })
  }

  public getPaisDondeRadica(): void {
    this._registroCuentasBancariasSvc.getPaisDondeRadicaDatos().subscribe((response) => {
      const API_RESPONSE = this.deepCopy(response);
      this.paisDondeRadica = API_RESPONSE.data;
    })
  }

  public getInstitucion(): void {
    this._registroCuentasBancariasSvc.getInstitucionDatos().subscribe((response) => {
      const API_RESPONSE = this.deepCopy(response);
      this.institucion = API_RESPONSE.data;
    })
  }

  public getEstado(): void {
    this._registroCuentasBancariasSvc.getEstadoDatos().subscribe((response) => {
      const API_RESPONSE = this.deepCopy(response);
      this.estado = API_RESPONSE.data;
    })
  }

  public tipoDePersonaSeleccion(): void {
    if (this.agregarCuentaForm.get('persona')?.value) {
      this.agregarCuentaForm.get('persona')?.enable();
    } else {
      this.agregarCuentaForm.get('persona')?.disable();
    }
  }

  public paisDondeRadicaSeleccion(): void {
    if (this.agregarCuentaForm.get('pais')?.value) {
      this.agregarCuentaForm.get('pais')?.enable();
    } else {
      this.agregarCuentaForm.get('pais')?.disable();
    }
  }

  public institucionSeleccion(): void {
    if (this.agregarCuentaForm.get('institucion')?.value) {
      this.agregarCuentaForm.get('institucion')?.enable();
    } else {
      this.agregarCuentaForm.get('institucion')?.disable();
    }
  }

  public estadoSeleccion(): void {
    if (this.agregarCuentaForm.get('estado')?.value) {
      this.agregarCuentaForm.get('estado')?.enable();
    } else {
      this.agregarCuentaForm.get('estado')?.disable();
    }
  }
}
