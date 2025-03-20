import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioDeMensajesService } from '../../services/servicio-de-mensajes.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as formData from '../../constants/datos-del-formulario.json';
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
    this.detalleDelPermiso = true;
    this.establecerFormularioDeDetallesDe();
      }
      public agregar(event: any): void{
        this.servicioDeMensajesService.enviarMensaje(false);
          }
          public detalleCancelar(event: any): void{
            this.detalleDelPermiso = false;
          }
          
      public cancelar(event: any): void{
        this.servicioDeMensajesService.enviarMensaje(false);
          }
      public establecerBusquedaForm(): void {
        this.busquedaForm = this.fb.group({
          tramite: ['',[Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])]]
        });
      }
      public estableDetalleDelPermisoForm(): void {
        this.detalleDelPermisoForm = this.fb.group({
          folioTramite: [{value: '', disabled: true}],
          tipoDeSolicitud: [{value: '', disabled: true}],
          regimen: [{value: '', disabled: true}],
          condicionDeLaMercancia: [{value: '', disabled: true}],
          umt: [{value: '', disabled: true}],
          cantidad: [{value: '', disabled: true}],
          cdr: [{value: '', disabled: true}],
          usd: [{value: '', disabled: true}],
          fraccionArancelaria: [{value: '', disabled: true}],
          descripcionDeLaMercancia: [{value: '', disabled: true}],
          procedencia: [{value: '', disabled: true}],
          mercancia: [{value: '', disabled: true}],
          beneficioQueSeObtiene: [{value: '', disabled: true}],
          observaciones: [{value: '', disabled: true}],
        });
      }
      public establecerFormularioDeDetallesDe(): void {
        this.detalleDelPermisoForm.patchValue(formData);
      }
    
}
