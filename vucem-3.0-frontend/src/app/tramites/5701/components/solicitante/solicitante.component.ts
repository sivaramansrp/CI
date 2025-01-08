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
    nombre_razon_social: [{value: '', disabled: true}],
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
    nombre_razon_social: [{value:'', disabled: true}],
    p_apellido: [{value:'', disabled: true}],
    s_apellido: [{value:'', disabled: true}],
    n_id_fiscal: [{value:'', disabled: true}],
    n_seg_social: [{value:'', disabled: true}],
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
    return true;
  }

  getDatosGenerales() {
    this.solicitanteServicio.getDatosGenerales(5).subscribe((resp) => {
      if ( resp.codigo === "200") {
        const datos = JSON.parse(resp.data);
        const datosSolicitante = datos.datosSolicitante.generales;
        const datos_dom_fiscal = datos.datosSolicitante.domicilioFiscal;

        this.setValorInput('curp', datosSolicitante.curp);
        this.setValorInput('rfc', datosSolicitante.rfc);
        this.setValorInput('nombre_razon_social', datosSolicitante.nombre);
        this.setValorInput('aPaterno', datosSolicitante.aPaterno);
        this.setValorInput('aMaterno', datosSolicitante.aMaterno);
        this.setValorInput('actEconomica', datosSolicitante.actEconomica);
        this.setValorInput('correo', datosSolicitante.correo);

        this.setValorInput('pais', datos_dom_fiscal.pais);
        this.setValorInput('codigoPostal', datos_dom_fiscal.codigoPostal);
        this.setValorInput('entidadFederativa', datos_dom_fiscal.entidadFederativa);
        this.setValorInput('municipio', datos_dom_fiscal.municipio);
        this.setValorInput('localidad', datos_dom_fiscal.localidad);
        this.setValorInput('colonia', datos_dom_fiscal.colonia);
        this.setValorInput('calle', datos_dom_fiscal.calle);
        this.setValorInput('nExt', datos_dom_fiscal.nExt);
        this.setValorInput('nInt', datos_dom_fiscal.nInt);
        this.setValorInput('lada', datos_dom_fiscal.lada);
        this.setValorInput('telefono', datos_dom_fiscal.telefono);
      }
    });
  }

  setValorInput(field: string, value: string) : void {
    this.FormPersonaFisica.controls[field].enable();
    this.FormPersonaFisica.controls[field].setValue(value);
    this.FormPersonaFisica.controls[field].disable();
  }
}

