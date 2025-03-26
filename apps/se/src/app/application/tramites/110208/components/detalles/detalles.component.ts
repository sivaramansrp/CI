import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Catalogo, CatalogoSelectComponent, RespuestaCatalogos, TituloComponent } from '@libs/shared/data-access-user/src';
import { ValidarInicalmenteService } from '../../services/validar-inicalmente/validar-inicalmente.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent
  ],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css',
})
export class DetallesComponent implements OnInit,OnDestroy{
  estado: Catalogo[] = [];

  private destroyed$ = new Subject<void>();

  detallas!:FormGroup

    constructor(
      private fb: FormBuilder,
      private service: ValidarInicalmenteService,
    ) {
      // Dependencia inyectada para uso posterior
    }

    ngOnInit(): void {
      this.detallas = this.fb.group({
        medio:[],
        rutaCompleta:[],
        puertoDeEmbarque:[],
        puertoDeDesembarque:[]
      })
      this.obtenerEstadoList()
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
