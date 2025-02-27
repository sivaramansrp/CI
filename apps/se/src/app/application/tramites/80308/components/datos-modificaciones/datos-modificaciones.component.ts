import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Catalogo } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { ModificacionSolicitudeService } from '../../services/modificacion-solicitude.service';
import { DatosModificacion } from '../../models/plantas-consulta.model';

@Component({
  selector: 'app-datos-modificaciones',
  templateUrl: './datos-modificaciones.component.html',
  styleUrls: ['./datos-modificaciones.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  providers:[ModificacionSolicitudeService]
})
export class DatosModificacionesComponent implements OnInit {
  formularioDatosGenerales!: FormGroup;
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private modificionService: ModificacionSolicitudeService
  ) {}

  ngOnInit(): void {
    this.iniciarFormulario();
    this.cargarDatos();
  }

  private iniciarFormulario(): void {
    this.formularioDatosGenerales = this.fb.group({
      rfc: [{ value: '', disabled: true }],
      representacionFederal: [{ value: '', disabled: true }],
      tipoModalidad: [{ value: '', disabled: true }],
      descripcionModalidad: [{ value: '', disabled: true }],
    });
  }

  cargarDatos(): void {
    this.modificionService
      .obtenerDatosGenerales()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: DatosModificacion) => {
          this.formularioDatosGenerales.patchValue(data);
        },
        (error) => {
          console.error('Error al cargar los estados:', error);
        }
      );
  }
}
