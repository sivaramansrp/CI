
import { Component, OnInit } from '@angular/core';
import { FormularioDinamico } from '../../../../core/models/shared/forms-model';
import { IDDEUSUARIO, ZOOSANITARIO_SOLICITANTE_FISICA_NACIONAL } from '../../../../shared/constantes/issuance-extension-modification.enum';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { SolicitanteService } from '../../../../core/services/shared/solicitante/solicitante.service';
import { FormulariosService } from '../../../../core/services/shared/formularios/formularios.service';

@Component({
  selector: 'solicitante',
  templateUrl: './solicitante.component.html',
  styleUrl: './solicitante.component.scss'
})
export class SolicitanteComponent implements OnInit {
  persona: Array<FormularioDinamico> = []
  form!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly solicitanteServices: SolicitanteService,
    private readonly formServices: FormulariosService
  ) {
    this.persona = ZOOSANITARIO_SOLICITANTE_FISICA_NACIONAL;
    this.crearFormulario();
  }
  ngOnInit() {
    this.inicializarFormGroup(this.persona, 'datosGenerales');
    this.obtenerDetallesDeUsuario();
  }
  obtenerDetallesDeUsuario() {
    this.solicitanteServices.getDatosGenerales(IDDEUSUARIO).subscribe((response) => {
      if (response) {
        const datos = JSON.parse(response.data);
        const datosSolicitante = datos.datosGenerales;
        const camposDatosGenerales =
          this.formServices.obtenerNombresCamposForm(
            this.datosGeneralesForm
          );
        camposDatosGenerales.forEach((campo) => {
          this.formServices.agregarValorCampoDesactivados(
            this.datosGeneralesForm,
            campo,
            datosSolicitante[campo]
          );
        });
      }
    });
  }
  get datosGeneralesForm() {
    return this.form.get('datosGenerales') as FormGroup;
  }
  crearFormulario(): void {
    this.form = this.fb.group({
      datosGenerales: this.fb.group({})
    });
  }
  inicializarFormGroup(
    config: Array<FormularioDinamico>,
    grupoNombre: string
  ): void {
    const grupo = this.form.get(grupoNombre) as FormGroup;
    config.forEach((campo) => {
      const validators = this.getValidators(campo.validators);
      grupo.addControl(
        campo.campo,
        this.fb.control({ value: '', disabled: campo.disabled }, validators)
      );
    });

  }
  getValidators(validators: Array<string>): ValidatorFn[] {
    const formValidators: ValidatorFn[] = [];
    validators.forEach((validator) => {
      if (validator === 'required') {
        formValidators.push(Validators.required);
      } else if (validator.includes('maxLength')) {
        const max = validator.split(':')[1];
        formValidators.push(Validators.maxLength(Number(max)));
      } else if (validator.includes('pattern')) {
        const pattern = validator.split(':')[1];
        formValidators.push(Validators.pattern(pattern));
      }
    });
    return formValidators;
  }
}
