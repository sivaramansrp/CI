import {
  Catalogo,
  CatalogoSelectComponent,
  InputRadioComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MOVIMIENTO_OPCIONES_DE_BOTON_DE_RADIO } from '../../constantes/flora-fauna.enum';
import { TipoMovimientoService } from '../../services/tipo-movimiento.service';
import { Tramite250101Store } from '../../estados/tramite250101.store';

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

export class TipoMovimientoComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  aduanaData: Catalogo[] = [];
  inspectoriaData: Catalogo[] = [];
  municipioData: Catalogo[] = [];
  
  movimientoOpcionDeBotonDeRadio = MOVIMIENTO_OPCIONES_DE_BOTON_DE_RADIO;

  public tipoMovimientoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tramite250101Store: Tramite250101Store,
    private tipoMovimientoService: TipoMovimientoService
  ) {
    //  La lógica del constructor se puede añadir aquí si es necesario
  }

  ngOnInit(): void {
    this.tipoMovimientoService.getAduanaData().pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.aduanaData = data;
    });

    this.tipoMovimientoService.getInspectoriaData().pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.inspectoriaData = data;
    });

    this.tipoMovimientoService.getAlcaldiaData().pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.municipioData = data;
    });

    this.establecerTipoMovimientoFormGroup();
  }

  establecerTipoMovimientoFormGroup(): void {
    this.tipoMovimientoForm = this.fb.group({
      tipoMovimiento: new FormControl(this.movimientoOpcionDeBotonDeRadio[0]?.value || '', [Validators.required]),
      tipoAduana: new FormControl('', [Validators.required]),
      tipoInspectoria: new FormControl('', [Validators.required]),
      tipoMunicipio: new FormControl('', [Validators.required]),
    });
  }

  actualizarAduana():void{
    const ADUANA = this.tipoMovimientoForm.get('tipoAduana')?.value;
    this.tramite250101Store.establecerTipoAduana(ADUANA);
  }

  actualizarInspectoria():void{
    const INSPECTORIA = this.tipoMovimientoForm.get('tipoInspectoria')?.value;
    this.tramite250101Store.establecerTipoInspectoria(INSPECTORIA);
  }
  
  actualizarMunicipio():void{
    const MUNICIPIO = this.tipoMovimientoForm.get('tipoMunicipio')?.value;
    this.tramite250101Store.establecerTipoMunicipio(MUNICIPIO);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
