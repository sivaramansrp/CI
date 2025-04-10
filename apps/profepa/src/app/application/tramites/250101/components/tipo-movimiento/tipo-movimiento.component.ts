import {
  Catalogo,
  CatalogoSelectComponent,
  InputRadioComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MOVIMIENTO_OPCIONES_DE_BOTON_DE_RADIO } from '../../constantes/flora-fauna.enum';
import { TipoMovimientoService } from '../../services/tipo-movimiento.service';

@Component({
  selector: 'app-tipo-movimiento',
  standalone: true,
  imports: [
    TituloComponent,
    InputRadioComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './tipo-movimiento.component.html',
  styleUrl: './tipo-movimiento.component.scss',
})

export class TipoMovimientoComponent implements OnInit {
  movimientoOpcionDeBotonDeRadio = MOVIMIENTO_OPCIONES_DE_BOTON_DE_RADIO;

  aduanaData: Catalogo[] = [];
  inspectoriaData: Catalogo[] = [];
  municipioData: Catalogo[] = [];

  public tipoMovimientoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tipoMovimientoService: TipoMovimientoService
  ) {
    //  La lógica del constructor se puede añadir aquí si es necesario
  }

  ngOnInit(): void {
    this.tipoMovimientoService.getAduanaData().subscribe((data) => {
      this.aduanaData = data;
    });

    this.tipoMovimientoService.getInspectoriaData().subscribe((data) => {
      this.inspectoriaData = data;
    });

    this.tipoMovimientoService.getAlcaldiaData().subscribe((data) => {
      this.municipioData = data;
    });

    this.establecerTipoMovimientoFormGroup();
  }

  establecerTipoMovimientoFormGroup(): void {
    this.tipoMovimientoForm = this.fb.group({
      tipoAduana: new FormControl('', [Validators.required]),
      tipoInspectoria: new FormControl('', [Validators.required]),
      tipoMuncipio: new FormControl('', [Validators.required]),
    });
  }
}
