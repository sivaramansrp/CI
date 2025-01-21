import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SolicitanteService } from '../../../../core/services/shared/solicitante/solicitante.service';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'solicitante',
  standalone: true,
  imports: [TituloComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './solicitante.component.html',
  styleUrl: './solicitante.component.scss',
})
export class SolicitanteComponent {

  public FormPersonaFisica: FormGroup = this.fb.group({
    rfc: [{value: '', disabled: true}],
    curp: [{value: '', disabled: true}],
    nombreRazonSocial: [{value: '', disabled: true}],
    aPaterno: [{value: '', disabled: true}],
    aMaterno: [{value: '', disabled: true}],

    // Persona Moral
    actEconomica: [{value: '', disabled: true}],
    correo: [{value: '', disabled: true}],

    // Domicilio Fiscal Persona Moral o Fisica Nacional
    pais: [{value: '', disabled: true}],
    codigoPostal: [{value: '', disabled: true}],
    entidadFederativa: [{value: '', disabled: true}],
    municipio: [{value: '', disabled: true}],
    localidad: [{value: '', disabled: true}],
    colonia: [{value: '', disabled: true}],
    calle: [{value: '', disabled: true}],
    nExt: [{value: '', disabled: true}],
    nInt: [{value: '', disabled: true}],
    lada: [{value: '', disabled: true}],
    telefono: [{value: '', disabled: true}]
  });

  public FormExtranjero = this.fb.group({
    nombreRazonSocial: [{value:'', disabled: true}],
    aPaterno: [{value:'', disabled: true}],
    aMaterno: [{value:'', disabled: true}],
    idFiscal: [{value:'', disabled: true}],
    nroSegSocial: [{value:'', disabled: true}],
    correo: [{value:'', disabled: true}],
    actEconomica: [{value: '', disabled: true}],

    pais: [{value:'', disabled: true}],
    codigoPostal: [{value:'', disabled: true}],
    estado: [{value:'', disabled: true}],
    calle: [{value:'', disabled: true}],
    nInt: [{value:'', disabled: true}],
    nExt: [{value:'', disabled: true}],
  })


  constructor(
    private solicitanteServicio: SolicitanteService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.getDatosGenerales();
  }

  get nacional() {
    return true;
  }

  get personaFisica() {
    return false;
  }

  getDatosGenerales() {
    this.solicitanteServicio.getDatosGenerales(5).subscribe((resp) => {
      if ( resp.codigo === "200") {
        const datos = JSON.parse(resp.data);
        const datosSolicitante = datos.datosSolicitante.generales;
        const datosDomicilioFiscal = datos.datosSolicitante.domicilioFiscal;

        this.setValorInput('curp', datosSolicitante.curp);
        this.setValorInput('rfc', datosSolicitante.rfc);
        this.setValorInput('nombreRazonSocial', datosSolicitante.nombre);
        this.setValorInput('aPaterno', datosSolicitante.aPaterno);
        this.setValorInput('aMaterno', datosSolicitante.aMaterno);
        this.setValorInput('actEconomica', datosSolicitante.actEconomica);
        this.setValorInput('correo', datosSolicitante.correo);

        this.setValorInput('pais', datosDomicilioFiscal.pais);
        this.setValorInput('codigoPostal', datosDomicilioFiscal.codigoPostal);
        this.setValorInput('entidadFederativa', datosDomicilioFiscal.entidadFederativa);
        this.setValorInput('municipio', datosDomicilioFiscal.municipio);
        this.setValorInput('localidad', datosDomicilioFiscal.localidad);
        this.setValorInput('colonia', datosDomicilioFiscal.colonia);
        this.setValorInput('calle', datosDomicilioFiscal.calle);
        this.setValorInput('nExt', datosDomicilioFiscal.nExt);
        this.setValorInput('nInt', datosDomicilioFiscal.nInt);
        this.setValorInput('lada', datosDomicilioFiscal.lada);
        this.setValorInput('telefono', datosDomicilioFiscal.telefono);
      }
    });
  }

  setValorInput(field: string, value: string) : void {
    this.FormPersonaFisica.controls[field].enable();
    this.FormPersonaFisica.controls[field].setValue(value);
    this.FormPersonaFisica.controls[field].disable();
  }
}

