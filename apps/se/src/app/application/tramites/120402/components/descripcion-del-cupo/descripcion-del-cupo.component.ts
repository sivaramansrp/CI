import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { DescripcionDelCupoService } from 'libs/shared/data-access-user/src/core/services/120402/descripcion-del-cupo/descripcion-del-cupo.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-descripcion-del-cupo',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './descripcion-del-cupo.component.html',
  styleUrl: './descripcion-del-cupo.component.scss',
})
export class DescripcionDelCupoComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  private destroyed$ = new Subject<void>();

  ngOnInit() {
    this.crearFormulario();
    this.loadDescripcionDelCupo();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  constructor(
    private fb: FormBuilder,
    private service: DescripcionDelCupoService
  ) {}

  crearFormulario(): void {
    this.form = this.fb.group({
      claveDelCupo: [{ value: '', disabled: true }],
      mecanismoDeAsignacion: [{ value: '', disabled: true }],
      descripcionDelProducto: [{ value: '', disabled: true }],
      unidadDeMedida: [{ value: '', disabled: true }],
      regimenAduanero: [{ value: '', disabled: true }],
      fechaDeInicioDeVigenciaDelCupo: [{ value: '', disabled: true }],
      fechaDeFinDeVigenciaDelCupo: [{ value: '', disabled: true }],
      fraccionesArancelarias: [{ value: '', disabled: true }],
      tratadoAcuerdo: [{ value: '', disabled: true }],
      paises: [{ value: '', disabled: true }],
    });
  }

  loadDescripcionDelCupo() {
    this.service
      .getDescripcionDelCupo()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: any) => {        
        this.form.patchValue({
          claveDelCupo: data.claveDelCupo,
          mecanismoDeAsignacion: data.mecanismoDeAsignacion,
          descripcionDelProducto: data.descripcionDelProducto,
          unidadDeMedida: data.unidadDeMedida,
          regimenAduanero: data.regimenAduanero,
          fechaDeInicioDeVigenciaDelCupo: data.fechaDeInicioDeVigenciaDelCupo,
          fechaDeFinDeVigenciaDelCupo: data.fechaDeFinDeVigenciaDelCupo,
          fraccionesArancelarias: data.fraccionesArancelarias,
          tratadoAcuerdo: data.tratadoAcuerdo,
          paises:data.paises
        });
      });
  }
}
