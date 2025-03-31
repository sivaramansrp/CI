import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

// Angular Common Module
import { CommonModule } from '@angular/common';

// Angular Forms Modules
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Modal } from 'bootstrap';

import { Subject, takeUntil } from 'rxjs';


import { TituloComponent } from '@libs/shared/data-access-user/src';

import { DatosDelSolicituteSeccionQuery } from '../../estados/queries/datos-del-solicitute-seccion.query';
import { DatosDelSolicituteSeccionStateStore } from '../../estados/stores/datos-del-solicitute-seccion.store';

@Component({
  selector: 'app-datos-del-establecimiento-seccion',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './Datos-del-establecimiento-seccion.component.html',
  styleUrl: './Datos-del-establecimiento-seccion.component.scss',
})
export class DatosDelEstablecimientoSeccionComponent
  implements OnInit, AfterViewInit , OnDestroy
{
  @ViewChild('establecimientoModalButton', { static: false })
  establecimientoModalButton!: ElementRef;
  private destroy$ = new Subject<void>();
  constructor(private fb: FormBuilder,
    private establecimientoStore: DatosDelSolicituteSeccionStateStore,
    private establecimientoQuery: DatosDelSolicituteSeccionQuery
  ) {}
  detosEstablecimiento!: FormGroup;
  establecimientoModalInstance!: Modal;
  ngOnInit():void {
    this.detosEstablecimiento = this.fb.group({
      establecimientoDenominacionRazonSocial: ['', Validators.required],

      establecimientoCorreoElectronico: ['', Validators.required],
    });
     // Load the state into the form
     this.establecimientoQuery.select()
     .pipe(takeUntil(this.destroy$))
     .subscribe((state) => {
      this.detosEstablecimiento.patchValue(state);
    });

    // Update the store whenever the form changes
    this.detosEstablecimiento.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe((value) => {
      this.establecimientoStore.update(value);
    });
  }
  ngAfterViewInit(): void {
    if (this.establecimientoModalButton) {
      this.establecimientoModalInstance = new Modal(
        this.establecimientoModalButton.nativeElement
      );
    }
  }
  openEstablecimientoModal(): void {
    this.establecimientoModalInstance.show();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
