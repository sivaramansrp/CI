import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from '../../../../core/services/shared/catalogos/catalogos.service';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CATALOGOS_ID } from '../../../../shared/constantes/constantes';
import { BtnContinuarComponent } from '../../../../shared/components/btn-continuar/btn-continuar.component';
import { map } from 'rxjs/operators';
import { PASOS } from '../../../../shared/constantes/303/pasos.enums';
import { DatosPasos } from '../../../../core/models/shared/components.model';
import { ListaPasosWizard } from '../../../../core/models/5701/servicios-extraordinarios.model';
import { WizardComponent } from '../../../../shared/components/wizard/wizard.component';

interface AccionBoton {
  accion: string;
  valor: number;
}
@Component({
  selector: 'app-datos-dela',
  templateUrl: './datos-dela.component.html',
  styleUrl: './datos-dela.component.scss',
})
export class DatosDelaComponent implements OnInit {


  datosForm: FormGroup;
  aduanas!: Catalogo[];
  selectedAduana: any;
  pasos: ListaPasosWizard[] = PASOS;
  indice: number = 1;

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  constructor(
    private fb: FormBuilder,
    private catalogosServices: CatalogosService
  ) { }

  ngOnInit(): void {
    this.datosForm = this.fb.group({
      aduanas: [null, Validators.required],
    });
    this.aduanasdata();
  }

  getValorIndice(e: AccionBoton) {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
  onAduanaSelect(): void {
    // Capture the selected value
    this.selectedAduana = this.datosForm.get('aduanas')?.value;
  }

  aduanasdata(): void {
    console.log('ngoninit start');
    this.catalogosServices.getCatalogo(CATALOGOS_ID.CAT_ADUANAS).subscribe({
      next: (resp) => {
        console.log('API Response:', resp);
        if (resp.length > 0) {
          this.aduanas = resp;
        }
      },
      error: (err) => console.error('API Error:', err),
      complete: () => console.log('API Call Completed'),
    });
  }
}
