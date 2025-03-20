import * as formData from '../../constants/datos-del-formulario.json';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicioDeMensajesService } from '../../services/servicio-de-mensajes.service';
@Component({
  selector: 'app-busqueda-folio',
  templateUrl: './busqueda-folio.component.html',
  styleUrl: './busqueda-folio.component.scss',
})
export class BusquedaFolioComponent {
  public busquedaForm!: FormGroup;
  public detalleDelPermisoForm!: FormGroup;
  public detalleDelPermiso: boolean = false;

  constructor(private servicioDeMensajesService: ServicioDeMensajesService, private fb: FormBuilder) {
    this.establecerBusquedaForm();
    this.estableDetalleDelPermisoForm();
  }
  public buscar(event: Event): void {
    if (this.busquedaForm.invalid) {
      this.busquedaForm.markAllAsTouched();
      // alert('El formulario contiene errores. Por favor, corrígelos antes de continuar.');
      return;
    }

    this.detalleDelPermiso = true;
    this.establecerFormularioDeDetallesDe();
  }
  public agregar(event: Event): void {
    this.servicioDeMensajesService.enviarMensaje(false);
    this.servicioDeMensajesService.establecerDatosDePermiso(true);
  }
  public detalleCancelar(event: Event): void {
    this.detalleDelPermiso = false;
  }

  public cancelar(event: Event): void {
    this.servicioDeMensajesService.enviarMensaje(false);
  }
  public establecerBusquedaForm(): void {
    this.busquedaForm = this.fb.group({
      tramite: ['', [Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])]]
    });
  }
  public estableDetalleDelPermisoForm(): void {
    this.detalleDelPermisoForm = this.fb.group({
      folioTramite: [{ value: '', disabled: true }],
      tipoDeSolicitud: [{ value: '', disabled: true }],
      regimen: [{ value: '', disabled: true }],
      condicionDeLaMercancia: [{ value: '', disabled: true }],
      umt: [{ value: '', disabled: true }],
      cantidad: [{ value: '', disabled: true }],
      cdr: [{ value: '', disabled: true }],
      usd: [{ value: '', disabled: true }],
      fraccionArancelaria: [{ value: '', disabled: true }],
      descripcionDeLaMercancia: [{ value: '', disabled: true }],
      procedencia: [{ value: '', disabled: true }],
      mercancia: [{ value: '', disabled: true }],
      beneficioQueSeObtiene: [{ value: '', disabled: true }],
      observaciones: [{ value: '', disabled: true }],
    });
  }
  public establecerFormularioDeDetallesDe(): void {
    this.detalleDelPermisoForm.patchValue(formData);
  }

}
