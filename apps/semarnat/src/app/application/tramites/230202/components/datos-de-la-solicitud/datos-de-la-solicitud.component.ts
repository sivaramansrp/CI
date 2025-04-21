import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule, TituloComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent {
  /**
   * Formulario principal del trámite.
   */
  solicitudForm!: FormGroup;

  constructor(
    // private store: Tramite230202Store,
    // private query: Tramite230202Query,
    public fb: FormBuilder
  ) {}

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    // this.inicializaCatalogos();

  //   this.query.selectSolicitud$
  //     .pipe(
  //       takeUntil(this.destroyNotifier$),
  //       map((seccionState) => {

  //         this.solicitudState = seccionState;
  //       })
  //     )
  //     .subscribe();
  // }
  }
}
