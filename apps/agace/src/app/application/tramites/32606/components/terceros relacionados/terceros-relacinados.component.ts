import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TablaDinamicaComponent, TituloComponent,TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Tramite32606Query } from '../../state/Tramite32606.query';
import { EconomicoService } from '../../services/economico.service';
import { Tramite32606Store } from '../../state/Tramite32606.store';
import { ENLACE_OPERATIVO_TABLA, PERSONAS_TABLA } from '../../constantes/adace32606.enum';
import { RecibirNotificaciones } from '../../models/adace.model';

@Component({
  selector: 'app-terceros-relacinados',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent,TablaDinamicaComponent],
  templateUrl: './terceros-relacinados.component.html',
  styleUrl: './terceros-relacinados.component.css',
})
export class TercerosRelacinadosComponent {
  public tercerosRelacionadosForm !: FormGroup;
  TablaSeleccion = TablaSeleccion;
  public enlaceTabla = ENLACE_OPERATIVO_TABLA;
  public personasTabla = PERSONAS_TABLA;
  personasLista: RecibirNotificaciones[] = [] as RecibirNotificaciones[];

   constructor(private economico: EconomicoService,
      public query: Tramite32606Query,
      public store: Tramite32606Store,
      private fb: FormBuilder) { }
   
  
    ngOnInit(): void {
      this.donanteDomicilio();
    }
  
    donanteDomicilio(): void {
      this.tercerosRelacionadosForm = this.fb.group({
        rfcTercero: [''],
        rfc: [''],
        nombre: [''],
        apellidoPaterno: [''],
        apellidoMaterno: [''],
        telefono: [''],
        correoElectronico: [''],
        
      });
    }
  
    ngOnDestroy(): void {
    }
}
