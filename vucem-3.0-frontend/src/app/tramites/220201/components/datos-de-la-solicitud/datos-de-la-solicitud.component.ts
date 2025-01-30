import { Component } from '@angular/core';
import { TEXTOS } from '../../../../shared/constantes/issuance-extension-modification.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'datos-de-la-solicitud',
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss'
})
export class DatosDeLaSolicitudComponent {
  TEXTOS: string = TEXTOS;
  forma!: FormGroup;
  selectRangoDias: Array<string> = [];
  colapsable: boolean = false;
  datosDelaSolicitud!: FormGroup;
  constructor(private readonly fb: FormBuilder) {
    this.crearFormulario();
    this.initActionFormBuild();
  }
  crearFormulario(): void {
    this.forma = this.fb.group({
      datosDelaSolicitud: this.fb.group({}),

    });
  }
  initActionFormBuild() {
    this.datosDelaSolicitud = this.fb.group({
      aduanaIngreso: ['', Validators.required],
      oficinaInspeccion: ['', Validators.required],
      puntoInspeccion: ['', Validators.required],
      claveUCON: ['', [Validators.required]],
      establecimientoTIF: ['', Validators.required],
      nombreVeterinario: ['', Validators.required],
      numeroGuia: [''],
      certficacion: [''],
      regimen: ['', Validators.required]
    });

    this.forma.setControl('datosDelaSolicitud', this.datosDelaSolicitud);
    console.log(this.forma);
  }

  mostrar_colapsable() {
    this.colapsable = !this.colapsable;
  }
}
