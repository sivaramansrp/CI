import { ActivatedRoute } from '@angular/router';
import { CROSLISTA_ADUANAS_DISPONIBLES } from '../../constants/datos-del-tramilte.enum';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CrossListLable } from '@ng-mf/data-access-user';
import { CrosslistComponent } from '@ng-mf/data-access-user';
import { DatosDelTramiteFormState } from '../../models/datos-del-tramite.model';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { MERCANCIA_ENCABEZADO_DE_TABLA } from '../../models/datos-del-tramite.model';
import { MercanciaDetalle } from '../../models/datos-del-tramite.model';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';

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
