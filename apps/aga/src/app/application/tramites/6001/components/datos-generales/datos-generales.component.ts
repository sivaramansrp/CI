/* eslint-disable class-methods-use-this */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable sort-imports */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroCuentasBancariasService } from '../../services/registro-cuentas-bancarias.service';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegistroDeSolicitudesTabla } from '../../models/registro-cuentas-bancarias.model';
@Component({
  selector: 'app-datos-generales',
  standalone: true,
  imports: [CommonModule,TituloComponent,TablaDinamicaComponent,ReactiveFormsModule],
  templateUrl: './datos-generales.component.html',
  styleUrl: './datos-generales.component.scss',
})
export class DatosGeneralesComponent implements OnInit {

  public formDatosGenerales!: FormGroup;
  public registroDeSolicitudesTablaDatos: RegistroDeSolicitudesTabla[] = [];

  /** Configuración de la tabla de sectores */
  public configuracionTabla: ConfiguracionColumna<RegistroDeSolicitudesTabla>[] = [
    { encabezado: 'Tipo movimiento', clave: (item: RegistroDeSolicitudesTabla) => item.movimiento, orden: 1 },
    { encabezado: 'Titular cuenta', clave: (item: RegistroDeSolicitudesTabla) => item.cuenta, orden: 2 },
    { encabezado: 'RFC', clave: (item: RegistroDeSolicitudesTabla) => item.rfc, orden: 3 },
    { encabezado: 'Tipo persona', clave: (item: RegistroDeSolicitudesTabla) => item.persona, orden: 4 },
    { encabezado: 'Número de cuenta', clave: (item: RegistroDeSolicitudesTabla) => item.numerodecuenta, orden: 5 },
    { encabezado: 'Sucursal', clave: (item: RegistroDeSolicitudesTabla) => item.sucursal, orden: 6 },
    { encabezado: 'Institución de crédito', clave: (item: RegistroDeSolicitudesTabla) => item.instituciondecredito, orden: 7 },
    { encabezado: 'Número de plaza', clave: (item: RegistroDeSolicitudesTabla) => item.numero, orden: 8 },
    { encabezado: 'Pais donde radica cuenta', clave: (item: RegistroDeSolicitudesTabla) => item.radicaCuenta, orden: 9 },
    { encabezado: 'Estado', clave: (item: RegistroDeSolicitudesTabla) => item.estado, orden: 10 },
    { encabezado: 'Domicilio extranjero', clave: (item: RegistroDeSolicitudesTabla) => item.domicilio, orden: 11 }
  ];


  constructor(
    private _registroCuentasBancariasSvc: RegistroCuentasBancariasService,
    private fb: FormBuilder,
  ) { 
    //
  }


  ngOnInit(): void {
    this.crearFormDatosGenerales();
    this.getSolicitudesTabla();
    this.obtenerFormDatosGeneralesDatos();
  }

  public isObject(value: unknown): boolean {
    return value !== null && typeof value === 'object';
  }

  public isValidArray(value: unknown): boolean {
    return Array.isArray(value) && value.length > 0;
  }

  public crearFormDatosGenerales():void {
    this.formDatosGenerales = this.fb.group({
      aduanaAdicional: [{ value: '', disabled: true }],
      nombre: [{ value: '', disabled: true }],
      federalDeContribuyentes: [{ value: '', disabled: true }],
      tipoDePersona: [{ value: '', disabled: true }],
    });
  }

  public getSolicitudesTabla(): void {
    this._registroCuentasBancariasSvc.getSolicitudesTabla().subscribe((data) => {
      this.registroDeSolicitudesTablaDatos = data;
    });
  }

  public obtenerFormDatosGeneralesDatos(): void {
    this._registroCuentasBancariasSvc.obtenerDatosDeFormularioDeAPI().subscribe((response) => {
      if(this.isObject(response) && this.isValidArray(response.data)) {
        const API_RESPONSE_DATOS = response.data[0];
        this.formDatosGenerales.get('aduanaAdicional')?.setValue(API_RESPONSE_DATOS.aduanaAdicional);
        this.formDatosGenerales.get('nombre')?.setValue(API_RESPONSE_DATOS.nombre);
        this.formDatosGenerales.get('federalDeContribuyentes')?.setValue(API_RESPONSE_DATOS.federalDeContribuyentes);
        this.formDatosGenerales.get('tipoDePersona')?.setValue(API_RESPONSE_DATOS.tipoDePersona);
      }
    });
  }

  public altaDeCuenta(): void {
    this._registroCuentasBancariasSvc.cambiarComponente('AgregarCuenta');
  }

}
