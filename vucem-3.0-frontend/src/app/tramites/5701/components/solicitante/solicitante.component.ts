import { Component } from '@angular/core';
import { ServiciosExtraordinariosService } from '../../../../core/services/5701/servicios-extraordinarios/servicios-extraordinarios.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RespuestaSolicitud } from '../../../../core/models/5701/servicios-extraordinarios.model';

@Component({
  selector: 'solicitante',
  templateUrl: './solicitante.component.html',
  styleUrl: './solicitante.component.scss',
})
export class SolicitanteComponent {

  public SolicitanteForm: FormGroup = this.fb.group({
    curp: [{value: '', disabled: true}],
    rfc: [{value: '', disabled: true}],
    nombre: [{value: '', disabled: true}],
    a_paterno: [{value: '', disabled: true}],
    a_materno: [{value: '', disabled: true}],
    act_economica: [{value: '', disabled: true}],
    correo: [{value: '', disabled: true}],
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
  })

  constructor(
    private sExtraordinariosService: ServiciosExtraordinariosService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.getDatosGenerales();
  }

  getDatosGenerales() {
    this.sExtraordinariosService.getDatosGenerales().subscribe((resp) => {
      console.log(resp);

      if ( resp.code === 200) {
        const datosSolicitante = resp.data.datos_solicitante.generales;
        const datosDomFiscal = resp.data.datos_solicitante.domicilio_fiscal;

        this.setValorInput('curp', datosSolicitante.curp);
        this.setValorInput('rfc', datosSolicitante.rfc);
        this.setValorInput('nombre', datosSolicitante.nombre);
        this.setValorInput('a_paterno', datosSolicitante.a_paterno);
        this.setValorInput('a_materno', datosSolicitante.a_materno);
        this.setValorInput('act_economica', datosSolicitante.act_economica);
        this.setValorInput('correo', datosSolicitante.correo);

        this.setValorInput('pais', datosDomFiscal.pais);
        this.setValorInput('codigo_postal', datosDomFiscal.codigo_postal);
        this.setValorInput('entidad_federativa', datosDomFiscal.entidad_federativa);
        this.setValorInput('municipio', datosDomFiscal.municipio);
        this.setValorInput('localidad', datosDomFiscal.localidad);
        this.setValorInput('colonia', datosDomFiscal.colonia);
        this.setValorInput('calle', datosDomFiscal.calle);
        this.setValorInput('n_ext', datosDomFiscal.n_ext);
        this.setValorInput('n_int', datosDomFiscal.n_int);
        this.setValorInput('lada', datosDomFiscal.lada);
        this.setValorInput('telefono', datosDomFiscal.telefono);









      }


    });
  }

  setValorInput(field: string, value: string) : void {
    this.SolicitanteForm.controls[field].enable();
    this.SolicitanteForm.controls[field].setValue(value);
    this.SolicitanteForm.controls[field].disable();
  }
}

