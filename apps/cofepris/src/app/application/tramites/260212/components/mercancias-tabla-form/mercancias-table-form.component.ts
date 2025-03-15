import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, CrosslistComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { PaisDeOriginComponent } from '../pais-de-origin/pais-de-origin.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-mercancias-table-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,CatalogoSelectComponent, TituloComponent, CrosslistComponent, PaisDeOriginComponent
  ],
  templateUrl: './mercancias-table-form.component.html',
  styleUrl: './mercancias-table-form.component.scss',
})
export class MercanciasTableFormComponent implements OnInit {
  @Output() cancel = new EventEmitter<void>();

  selectRangoDias: string[] = ['2025-03-14', '2025-03-15', '2025-03-16'];
  colapsable = false;

  mostrar_colapsable() {
    this.colapsable = !this.colapsable;
  }
  close() {
    this.cancel.emit();
  }

  clave: Catalogo[]=[]
  

  datosMercanciaForm!: FormGroup;

  constructor(private fb: FormBuilder,private solicitudService: SolicitudService) { }

  ngOnInit(): void {
    this.datosMercanciaFormInitial();

    this.solicitudService.getclave().subscribe((data) => {
      this.clave = data;
    }
    );

  }

  datosMercanciaFormInitial() {
    this.datosMercanciaForm = this.fb.group({
      clasificacion: ['', Validators.required],
      especificarClasificacion: ['', Validators.required],
      especificaDelProducto: ['', Validators.required],
      denominacionDistintiva: ['', Validators.required],
      nombreCientifico: ['', Validators.required],
      tipoDeProducto: ['', Validators.required],
      estadoFisico: ['', Validators.required],
      fraccionArancelaria: ['', Validators.required],
      descripcionFraccion: ['', Validators.required],
      cantidadUMT: ['', Validators.required],
      UMT: ['', Validators.required],
      cantidadUMC: ['', Validators.required],
      UMC: ['', Validators.required],
      tipoDeEnvase: ['', Validators.required]
    });
  }
}
