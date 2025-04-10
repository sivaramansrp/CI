import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ConfiguracionTabla,
  CrosslistComponent,
  CrossListLable,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { CROSLISTA_ADUANAS_DISPONIBLES } from '../../constants/datos-del-tramilte.enum';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  DatosDelTramiteFormState,
  MERCANCIA_ENCABEZADO_DE_TABLA,
  MercanciaDetalle,
} from '../../models/datos-del-tramite.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-datos-del-tramite',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CrosslistComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent,
  ],
  templateUrl: './datos-del-tramite.component.html',
  styleUrl: './datos-del-tramite.component.css',
})
export class DatosDelTramiteComponent implements OnInit {
  public seleccionarAduanasDisponibles = CROSLISTA_ADUANAS_DISPONIBLES;
  public seleccionarAduanasDisponiblesDatos: string[] = [];
  public aduanasDisponiblesLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Aduanas disponibles',
    derecha: 'Aduanas seleccionadas',
  };
  form: FormGroup;
  @Input() datosDelTramiteFormState!: DatosDelTramiteFormState;
  @Input() datosMercanciaTabla: MercanciaDetalle[] = [];
  public mercanciaTablaConfiguracion = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
    configuracionTabla: MERCANCIA_ENCABEZADO_DE_TABLA,
    datos: [],
  };

  @Output() updateDatosDelTramiteFormulario =
    new EventEmitter<DatosDelTramiteFormState>();
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      permisoGeneral: ['', Validators.required],
      paisDestino: [
        { value: 'MEXICO (ESTADOS UNIDOS MEXICANOS)', disabled: true },
      ],
      usoFinal: ['', Validators.required],
    });
  }
  aduanasDisponiblesSeleccionadasChange(events: string[]): void {
    this.seleccionarAduanasDisponiblesDatos = events;
  }

  irAAcciones(accionesPath: string): void {
    this.router.navigate([accionesPath], {
      relativeTo: this.activatedRoute,
    });
  }

  ngOnInit(): void {
    this.form.patchValue({
      permisoGeneral: this.datosDelTramiteFormState.permisoGeneral,
      usoFinal: this.datosDelTramiteFormState.usoFinal,
    });
    this.seleccionarAduanasDisponiblesDatos =
      this.datosDelTramiteFormState.aduanasSeleccionadas;

    this.form.valueChanges.subscribe((formValue) => {
      const DATOS_DEL_TRAMITE: DatosDelTramiteFormState = {
        permisoGeneral: formValue.permisoGeneral,
        paisDestino: formValue.paisDestino,
        usoFinal: formValue.usoFinal,
        aduanasSeleccionadas: this.seleccionarAduanasDisponiblesDatos,
      };
      this.updateDatosDelTramiteFormulario.emit(DATOS_DEL_TRAMITE);
    });
  }
}
