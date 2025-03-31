import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Chofer40103Service } from '../../estados/chofer40103.service';

@Component({
  selector: 'app-datos-tramite-renovacion',
  templateUrl: './datos-tramite-renovacion.component.html',
  styleUrls: ['./datos-tramite-renovacion.component.scss'],
})
export class DatosTramiteRenovacionComponent implements OnInit {
  formulario!: FormGroup;
  codigoTransportacion: any[] = [];
  tipoCaatAereo: any[] = [];
  public tipoDeCaatAerea!: Catalogo[];
  public ideCodTransportacionAerea!: Catalogo[];
  constructor(
    private fb: FormBuilder,
    private chofer40103Service: Chofer40103Service
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarCodigoTransportacion();
    this.cargarTipoCaatAereo();
    this.tipoDeCaatAereaData();
    this.ideCodTransportacionAereaData();
  }

  private inicializarFormulario(): void {
    this.formulario = this.fb.group({
      idSolicitud: [''],
      idPersonaSolicitud: [''],
      ideGenerica1: [''],
      claveFolioCAAT: ['', [Validators.required, Validators.maxLength(4)]],
      cveFolioCaat: [''],
      descripcionTipoCaat: [''],
      tipoDeCaatAerea: [],
      ideCodTransportacionAerea: [],
      codIataIcao: [''],
      fechaInicioVigencia: [''],
      fechaFinVigencia: [''],
    });
  }

  get caatSolicitudes(): FormArray {
    return this.formulario.get('solicitud.caatSolicitudes') as FormArray;
  }
  caatConMayusculas(event: any): void {
    const valor = event.target.value;
    this.formulario.get('claveFolioCAAT')?.setValue(valor.toUpperCase());
  }
  private cargarCodigoTransportacion(): void {
    this.chofer40103Service.getideCodTransportacionAerea().subscribe(
      (datos) => {
        this.codigoTransportacion = datos;
      },
      (error) => {
        console.error('Error al cargar codigoTransportacion', error);
      }
    );
  }

  private cargarTipoCaatAereo(): void {
    this.chofer40103Service.gettipoDeCaatAerea().subscribe(
      (datos) => {
        this.tipoCaatAereo = datos;
      },
      (error) => {
        console.error('Error al cargar tipoCaatAereo', error);
      }
    );
  }
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
  buscarSolicitudPorCAAT(): void {
    if (this.formulario.valid) {
      const claveFolio = this.formulario.get('claveFolioCAAT')?.value;
      if (!claveFolio) {
        console.error('Clave Folio CAAT is required!');
        return;
      }

      console.log('Sending API Request with claveFolioCAAT:', claveFolio);

      this.chofer40103Service.buscarSolicitudPorCAATe(claveFolio).subscribe(
        (respuesta) => {
          console.log('API Response Received:', respuesta);
          if (respuesta) {
            console.log('Populating Form with:', respuesta);
            this.formulario.patchValue({
              idSolicitud: respuesta.idSolicitud || '',
              idPersonaSolicitud: respuesta.idPersonaSolicitud || '',
              ideGenerica1: respuesta.ideGenerica1 || '',
              claveFolioCAAT: respuesta.claveFolioCAAT || '',
              cveFolioCaat: respuesta.cveFolioCaat || '',
              descripcionTipoCaat: respuesta.descripcionTipoCaat || '',
              tipoDeCaatAerea: respuesta.tipoDeCaatAerea || '',
              ideCodTransportacionAerea:
                respuesta.ideCodTransportacionAerea || '',
              codIataIcao: respuesta.codIataIcao || '',
              fechaInicioVigencia: respuesta.fechaInicioVigencia || '',
              fechaFinVigencia: respuesta.fechaFinVigencia || '',
            });
          } else {
            console.error('No data found for CAAT:', claveFolio);
          }
        },
        (error) => {
          console.error('API Error Details:', {
            status: error.status,
            message: error.message,
            error: error.error,
          });
        }
      );
    } else {
      console.error('Form is not valid. Errors:', this.formulario.errors);
    }
  }

  tipoDeCaatAereaData(): void {
    this.chofer40103Service.gettipoDeCaatAerea().subscribe((data) => {
      this.tipoDeCaatAerea = data;
    });
  }

  ideCodTransportacionAereaData(): void {
    this.chofer40103Service.getideCodTransportacionAerea().subscribe((data) => {
      this.ideCodTransportacionAerea = data;
    });
  }
}
