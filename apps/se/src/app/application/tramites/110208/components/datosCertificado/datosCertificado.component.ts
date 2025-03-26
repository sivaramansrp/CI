import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidarInicalmenteService } from '../../services/validar-inicalmente/validar-inicalmente.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-datos-certificado',
  standalone: true,
  imports: [CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent
  ],
  templateUrl: './datosCertificado.component.html',
  styleUrl: './datosCertificado.component.css',
})
export class DatosCertificadoComponent implements OnInit,OnDestroy{
  formDatosCertificado!: FormGroup

  private destroyed$ = new Subject<void>();

  /**
 * Lista de catálogos de estados.
 */
  estado: Catalogo[] = [];
  constructor(
      private readonly fb: FormBuilder,
      private service: ValidarInicalmenteService,
    ) {
      // Dependencia inyectada para uso posterior
    }

    ngOnInit(): void {
      this.obtenerEstadoList()
      this.formDatosCertificado = this.fb.group({
        observaciones:[],
        idioma:['',Validators.required],
        entidadFederativa:['',Validators.required],
        representacionFederal:['',Validators.required]
      })
    }

    /**
     * Obtiene la lista de estados desde un archivo JSON.
     */
    obtenerEstadoList(): void {
      this.service.obtenerEstadoList()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          const DATOS = data?.data;
          this.estado = DATOS;
        });
    }

    ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
    }
}
