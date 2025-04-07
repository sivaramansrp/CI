import * as formData from '@libs/shared/theme/assets/json/140105/datos-del-formulario.json';
import { combineLatest } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ServicioDeMensajesService } from '../../services/servicio-de-mensajes.service';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-busqueda-folio',
  templateUrl: './busqueda-folio.component.html',
  styleUrl: './busqueda-folio.component.scss',
})
export class BusquedaFolioComponent implements OnInit, OnDestroy {
  public montoACancelarForm!: FormGroup;
  public devloverForm!: FormGroup;
  // public detalleDelPermiso: boolean = false;
  public mostrarDevolverFacturas!: boolean;
  public mostrarBusqueda!: boolean;
  
  constructor(private servicioDeMensajesService: ServicioDeMensajesService, private fb: FormBuilder) {
    this.establecerMontoACancelarForm();
    this.estableDevloverForm();
  }

  ngOnInit(): void {
    this.servicioDeMensajesService.devolverFacturasMensaje$.subscribe((mensaje) => {
      this.mostrarDevolverFacturas = mensaje;
    });
  
    this.servicioDeMensajesService.mensaje$.subscribe((mensaje) => {
      this.mostrarBusqueda = mensaje;
    });
}

  /**
   * Método que se ejecuta al realizar una búsqueda.
   * Valida si el formulario de búsqueda es válido. Si es inválido, marca todos los campos como tocados.
   * Si el formulario es válido, muestra el detalle del permiso y establece los datos correspondientes.
   * 
   * @param event Evento que desencadena la búsqueda.
   */

  public agregarSelect(event: Event): void {
    if (this.montoACancelarForm.invalid) {
      this.montoACancelarForm.markAllAsTouched();
      return;
    }
    this.servicioDeMensajesService.enviarMensaje(false);
    this.servicioDeMensajesService.establecerDatosDePermiso(true);
    // this.establecerFormularioDeDetallesDe();
  }

   /**
   * Método que se ejecuta al agregar datos.
   * Envía un mensaje indicando que los datos del permiso han sido establecidos.
   * 
   * @param event Evento que desencadena la acción de agregar.
   */

  public agregar(event: Event): void {
    this.servicioDeMensajesService.enviarMensaje(false);
    this.servicioDeMensajesService.establecerDatosDePermiso(true);
  }

  /**
   * Método que se ejecuta al cancelar la visualización del detalle del permiso.
   * Establece la variable detalleDelPermiso a false, ocultando el detalle.
   * 
   * @param event Evento que desencadena la acción de cancelar.
   */

  public detalleCancelar(event: Event): void {
    // this.detalleDelPermiso = false;
  }

  /**
   * Método que se ejecuta al cancelar la acción de búsqueda.
   * Envía un mensaje para indicar que se ha cancelado la búsqueda.
   * 
   * @param event Evento que desencadena la cancelación de la acción.
   */

  public cancelar(event: Event): void {
    this.servicioDeMensajesService.enviarMensaje(false);
  }

  /**
   * Método para establecer el formulario de búsqueda con su validación.
   * Inicializa el formulario de búsqueda con un campo 'tramite' que es obligatorio 
   * y solo acepta números.
   */
  public establecerMontoACancelarForm(): void {
    this.montoACancelarForm = this.fb.group({
      monto: ['', [Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])]]
    });
  }

   /**
   * Método para establecer el formulario del detalle del permiso.
   * Inicializa los campos del formulario como deshabilitados y vacíos.
   */
  public estableDevloverForm(): void {
    this.devloverForm = this.fb.group({
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

   /**
   * Método para establecer los valores en el formulario de detalles de permiso.
   * Se utiliza para actualizar el formulario con los datos correspondientes al detalle de la solicitud.
   */
  public establecerFormularioDeDetallesDe(): void {
    this.devloverForm.patchValue(formData);
  }
  ngOnDestroy() {
    this.servicioDeMensajesService.establecerDatosDePermiso(false);
  }

}
