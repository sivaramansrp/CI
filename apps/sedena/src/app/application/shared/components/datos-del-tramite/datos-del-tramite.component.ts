import { Component } from '@angular/core';
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
import { MERCANCIA_ENCABEZADO_DE_TABLA } from '../../models/datos-del-tramite.model';
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
export class DatosDelTramiteComponent {
  public seleccionarAduanasDisponibles = CROSLISTA_ADUANAS_DISPONIBLES;
  public seleccionarAduanasDisponiblesDatos: string[] = [];
  public aduanasDisponiblesLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Aduanas disponibles',
    derecha: 'Aduanas seleccionadas',
  };
  form: FormGroup;
  public mercanciaTablaConfiguracion = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
    configuracionTabla: MERCANCIA_ENCABEZADO_DE_TABLA,
    datos: [],
  };
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
}
