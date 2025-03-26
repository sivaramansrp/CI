import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Catalogo, CatalogoSelectComponent, RespuestaCatalogos, TituloComponent } from '@libs/shared/data-access-user/src';
import { ValidarInicalmenteService } from '../../services/validar-inicalmente/validar-inicalmente.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-domicillo-del-destinatario',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent
  ],
  templateUrl: './domicillo-del-destinatario.component.html',
  styleUrl: './domicillo-del-destinatario.component.css',
})
export class DomicilloDelDestinatarioComponent implements OnInit,OnDestroy {

  domicilioDestinatario!:FormGroup

  private destroyed$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private service: ValidarInicalmenteService,
  ) {
    // Dependencia inyectada para uso posterior
  }

  
   /**
   * Lista de catálogos de estados.
   */
   estado: Catalogo[] = [];

  ngOnInit(): void {
    this.domicilioDestinatario = this.fb.group({
      ciudad:['',Validators.required],
      calle:['',Validators.required],
      numeroLetra:['',Validators.required],
      lada:[],
      telefono:[],
      fax:[],
      correoElectronico:['',Validators.required],
      paisDestino:[]
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
