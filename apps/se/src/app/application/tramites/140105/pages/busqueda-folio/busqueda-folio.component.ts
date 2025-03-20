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
  public detalleDelPermisoForm!: FormGroup;
  public detalleDelPermiso: boolean = false;

  constructor(private servicioDeMensajesService: ServicioDeMensajesService, private fb: FormBuilder){
    this.establecerBusquedaForm();
    this.estableDetalleDelPermisoForm();
   }
  public buscar(event: any): void{
    // this.servicioDeMensajesService.sendMessage(false);
    this.detalleDelPermiso = true;
    this.establecerFormularioDeDetallesDe();
      }
      public agregar(event: any): void{
        this.servicioDeMensajesService.sendMessage(false);
          }
          public detalleCancelar(event: any): void{
            this.detalleDelPermiso = false;
          }
          
      public cancelar(event: any): void{
        this.servicioDeMensajesService.sendMessage(false);
          }
      public establecerBusquedaForm(): void {
        this.busquedaForm = this.fb.group({
          tramite: [{value: '',disabled: false}]
        });
      }
      public estableDetalleDelPermisoForm(): void {
        this.detalleDelPermisoForm = this.fb.group({
          folioTramite: [{value: '', disabled: true}]
        });
      }
      public establecerFormularioDeDetallesDe(): void {
        this.detalleDelPermisoForm.get('folioTramite')?.setValue('AALM87326');
      }
    
}
