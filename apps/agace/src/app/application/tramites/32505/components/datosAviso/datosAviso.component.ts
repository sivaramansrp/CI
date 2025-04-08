// datosAviso.service.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
// import { DatosAvisoService } from './datosAviso.service'; // Servicio comentado según instrucciones

@Component({
  selector: 'app-datos-aviso',
  templateUrl: './datosAviso.component.html',
  styleUrls: ['./datosAviso.component.css'],
  imports: [CommonModule, ReactiveFormsModule,TituloComponent, CatalogoSelectComponent],
    standalone: true,
})
export class DatosAvisoService implements OnInit {
  frmDatosAviso: FormGroup;
  titulo: string = 'Agregar Aviso'; // Inicializar según corresponda


  
  constructor(private fb: FormBuilder /*, private datosAvisoService: DatosAvisoService */) {
    this.frmDatosAviso = this.fb.group({
      aviso: this.fb.group({
        isBusqueda: ['']
      }),
      tipoRegistro: ['', Validators.required],
      folioImp: ['', Validators.required],
      identificadorVucem: ['', Validators.maxLength(25)],
      busquedaNivNumeroSerie: ['', [
        Validators.required,
        Validators.maxLength(17),
        Validators.pattern(/^[a-zA-Z0-9]*$/)
      ]],
      nivNumeroSerie: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]*$/)
      ]],
      idAnio: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      tipoVarianteVersion: ['', Validators.required],
      numeroCilindros: ['', Validators.required],
      numeroPuertas: ['', Validators.required],
      tipoCombustible: ['', Validators.required],
      tituloPropiedad: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]*$/)
      ]],
      nombreTituloPropiedad: ['', Validators.required],
      pais: ['', Validators.required],
      entidadFederativa: ['', Validators.required],
      numeroPlacas: [''],
      tipoAdquisicion: ['', Validators.required],
      numeroDocumento: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]*$/)
      ]],
      aduana: ['', Validators.required],
      patenteAutorizacion: ['', Validators.required],
      pedimento: ['', Validators.required],
      kilometraje: ['', Validators.required],
      valorAduana: ['', Validators.required],
      montoIGI: ['', Validators.required],
      formaPagoIGI: ['', Validators.required],
      montoDTA: ['', Validators.required],
      montoIVA: ['', Validators.required],
      valorDolares: ['', Validators.required],
      folioCFDI: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]*$/)
      ]],
      folioVenta: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]*$/)
      ]],
      valorVenta: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Inicializar cualquier lógica adicional si es necesario
  }

  onSubmit(): void {
    if (this.frmDatosAviso.valid) {
      // Manejar el envío del formulario
      // this.datosAvisoService.submitDatosAviso(this.frmDatosAviso.value).subscribe(response => {
      //   // Manejar la respuesta
      // });
      // Comentado según instrucciones
      console.log('Formulario enviado:', this.frmDatosAviso.value);
    } else {
      // Marcar todos los controles como tocados para mostrar validaciones
      this.frmDatosAviso.markAllAsTouched();
    }
  }

  onBusquedaVehiculoPorNIV(event: any): void {
    const input = event.target;
    input.value = input.value.replace(/[^a-zA-Z0-9]/g, '');
    // Implementar la lógica de búsqueda de vehículo por NIV
    // this.datosAvisoService.busquedaVehiculoPorNIV(input.value).subscribe(response => {
    //   // Manejar la respuesta
    // });
    // Comentado según instrucciones
  }

  onNivNumeroSerieChange(event: any): void {
    const input = event.target;
    input.value = input.value.replace(/[^a-zA-Z0-9]/g, '');
    // Implementar lógica adicional si es necesario
  }

  onTituloPropiedadChange(event: any): void {
    const input = event.target;
    input.value = input.value.replace(/[^a-zA-Z0-9]/g, '');
  }

  onNumeroDocumentoChange(event: any): void {
    const input = event.target;
    input.value = input.value.replace(/[^a-zA-Z0-9]/g, '');
  }

  onFolioCFDIChange(event: any): void {
    const input = event.target;
    input.value = input.value.replace(/[^a-zA-Z0-9]/g, '');
  }

  onFolioVentaChange(event: any): void {
    const input = event.target;
    input.value = input.value.replace(/[^a-zA-Z0-9]/g, '');
  }

  cerrarDialogoDatosAvisoVehiculoUsado(): void {
    // Implementar la lógica para cerrar el diálogo
    // this.dialogService.close();
    // Comentado según instrucciones
    console.log('Cerrar diálogo de datos de aviso de vehículo usado.');
  }

  agregarDatosAvisoVehiculoUsado(): void {
    // Implementar la lógica para agregar datos de aviso
    // this.datosAvisoService.agregarDatosAviso(this.frmDatosAviso.value).subscribe(response => {
    //   // Manejar la respuesta
    // });
    // Comentado según instrucciones
    console.log('Agregar datos de aviso de vehículo usado:', this.frmDatosAviso.value);
  }
}