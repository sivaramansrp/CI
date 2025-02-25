import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '@ng-mf/data-access-user';
import { DescripcionDelCupoService } from 'libs/shared/data-access-user/src/core/services/120402/descripcion-del-cupo/descripcion-del-cupo.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cantidad-solicitada',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './cantidad-solicitada.component.html',
  styleUrl: './cantidad-solicitada.component.scss',
})
export class CantidadSolicitadaComponent implements OnInit, OnDestroy{
  form!: FormGroup;
  private destroyed$ = new Subject<void>();

  ngOnInit() {
    this.crearFormulario();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  constructor(
    private fb: FormBuilder,
  ) {}
  
  crearFormulario(): void {
    this.form = this.fb.group({
      cantidadSolicitada: [{ value: '100', disabled: false }],
    });
  }
}