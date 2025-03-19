import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioDeMensajesService } from '../../services/servicio-de-mensajes.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-busqueda-folio',
  templateUrl: './busqueda-folio.component.html',
  styleUrl: './busqueda-folio.component.scss',
})
export class BusquedaFolioComponent {
  public busquedaForm!: FormGroup;

  constructor(private servicioDeMensajesService: ServicioDeMensajesService, private fb: FormBuilder){
    this.establecerBusquedaForm();
   }
  public buscar(event: any): void{
    this.servicioDeMensajesService.sendMessage(false);
      }
      public cancelar(event: any): void{
        this.servicioDeMensajesService.sendMessage(false);
          }
      public establecerBusquedaForm(): void {
        this.busquedaForm = this.fb.group({
          tramite: [{value: '',disabled: false}]
        });
      }
}
