import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { PropietarioComponent } from '../../../../shared/components/propietario/propietario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud261401State } from '../../../../estados/tramites/tramite261401.store';
import { SolicitudModificacionPermisoSalidaTerritorioService } from '../../services/solicitud-modificacion-permiso-salida-territorio.service';
import { Subject } from 'rxjs';
import { Tramite261401Query } from '../../../../estados/queries/tramite261401.query';
import { Tramite261401Store } from '../../../../estados/tramites/tramite261401.store';
import { Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    PropietarioComponent
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {
  formulario!: FormGroup;
  private destroy$ = new Subject<void>();
  private seccionState!: Solicitud261401State;

  constructor(
    private fb: FormBuilder,
    private tramite261401Store: Tramite261401Store,
    private tramite261401Query: Tramite261401Query,
    private service: SolicitudModificacionPermisoSalidaTerritorioService
  ) {
    // Constructor
  }

  ngOnInit(): void {
    this.tramite261401Query.selectSolicitud$?.pipe(takeUntil(this.destroy$))
        .subscribe((data:Solicitud261401State) => {
          this.seccionState = data;    
        });
        this.crearFormulario();

  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  setValoresStore(form: FormGroup, campo: string) :void{
    const VALOR = form.get(campo)?.value;
    this.tramite261401Store.establecerDatos({ [campo]: VALOR });
  }
  crearFormulario(): void {
    this.formulario = this.fb.group({
      observaciones: [this.seccionState?.observaciones, [Validators.required]],
    });
  }
}
