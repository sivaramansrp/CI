import { Component, OnDestroy, OnInit } from '@angular/core';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { FECHA_DE_PAGO } from '../../models/solicitud-datos.model';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputFecha } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { Permiso260906Query } from '../../../../estados/queries/permiso260906.query';
import { ReactiveFormsModule } from '@angular/forms';
import { Sanitario260906Store } from '../../../../estados/tramites/sanitario260906.store';
import { SanitarioService } from '../../services/sanitario.service';
import { Solicitud260906State } from '../../../../estados/tramites/sanitario260906.store';
import { Subject } from 'rxjs';
import { TituloComponent } from '@ng-mf/data-access-user';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-derechos',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, CatalogoSelectComponent, InputFechaComponent],
  templateUrl: './derechos.component.html',
  styleUrls: ['./derechos.component.css'],
})
export class DerechosComponent implements OnInit, OnDestroy {
  derechosForm!: FormGroup;
  private destroyNotifier$: Subject<void> = new Subject();
  public derechosList!: Catalogo[];
  public solicitudState!: Solicitud260906State;
  fechaInicioInput: InputFecha = FECHA_DE_PAGO;

  constructor(
    private fb: FormBuilder,
    private service: SanitarioService,
    private sanitario260906Store: Sanitario260906Store,
    private permiso260906Query: Permiso260906Query
  ) {
    // Inicialización adicional si es necesario
  }

  ngOnInit(): void {
    this.permiso260906Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.derechosForm = this.fb.group({
      referencia: [this.solicitudState?.referencia],
      cadenaDependencia: [this.solicitudState?.cadenaDependencia],
      Llave: [this.solicitudState?.Llave],
      banco: [this.solicitudState?.banco],
      tipoFetch: [this.solicitudState?.tipoFetch],
      importe: [this.solicitudState?.importe],
    });

    this.loadComboUnidadMedida();
  }

  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Sanitario260906Store): void {
    const VALOR = form.get(campo)?.value;
    (this.sanitario260906Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  loadComboUnidadMedida(): void {
    this.service.getDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data): void => {
        this.derechosList = data as Catalogo[];
      });
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  onFechaCambiada(fecha: string): void {
    this.derechosForm.patchValue({ tipoFetch: fecha });
  }
}