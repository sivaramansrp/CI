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
    a_paterno: [{value: '', disabled: true}],
    a_materno: [{value: '', disabled: true}],

    // Persona Moral
    act_economica: [{value: '', disabled: true}],
    correo: [{value: '', disabled: true}],

    // Domicilio Fiscal Persona Moral o Fisica Nacional
    pais: [{value: '', disabled: true}],
    codigo_postal: [{value: '', disabled: true}],
    entidad_federativa: [{value: '', disabled: true}],
    municipio: [{value: '', disabled: true}],
    localidad: [{value: '', disabled: true}],
    colonia: [{value: '', disabled: true}],
    calle: [{value: '', disabled: true}],
    n_ext: [{value: '', disabled: true}],
    n_int: [{value: '', disabled: true}],
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
    act_economica: [{value: '', disabled: true}],

    pais: [{value:'', disabled: true}],
    codigo_postal: [{value:'', disabled: true}],
    estado: [{value:'', disabled: true}],
    calle: [{value:'', disabled: true}],
    n_int: [{value:'', disabled: true}],
    n_ext: [{value:'', disabled: true}],
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
    this.solicitanteServicio.getDatosGenerales().subscribe((resp) => {

      if ( resp.code === 200) {
        const datos_solicitante = resp.data.datos_solicitante.generales;
        const datos_dom_fiscal = resp.data.datos_solicitante.domicilio_fiscal;

        this.setValorInput('curp', datos_solicitante.curp);
        this.setValorInput('rfc', datos_solicitante.rfc);
        this.setValorInput('nombre_razon_social', datos_solicitante.nombre);
        this.setValorInput('a_paterno', datos_solicitante.a_paterno);
        this.setValorInput('a_materno', datos_solicitante.a_materno);
        this.setValorInput('act_economica', datos_solicitante.act_economica);
        this.setValorInput('correo', datos_solicitante.correo);

        this.setValorInput('pais', datos_dom_fiscal.pais);
        this.setValorInput('codigo_postal', datos_dom_fiscal.codigo_postal);
        this.setValorInput('entidad_federativa', datos_dom_fiscal.entidad_federativa);
        this.setValorInput('municipio', datos_dom_fiscal.municipio);
        this.setValorInput('localidad', datos_dom_fiscal.localidad);
        this.setValorInput('colonia', datos_dom_fiscal.colonia);
        this.setValorInput('calle', datos_dom_fiscal.calle);
        this.setValorInput('n_ext', datos_dom_fiscal.n_ext);
        this.setValorInput('n_int', datos_dom_fiscal.n_int);
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

