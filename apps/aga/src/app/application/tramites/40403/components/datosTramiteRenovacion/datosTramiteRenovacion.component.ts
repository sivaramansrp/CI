import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DatosTramiteRenovacionService } from '../services/datosTramiteRenovacion.service';

@Component({
  selector: 'app-datos-tramite-renovacion',
  templateUrl: './datos-tramite-renovacion.component.html',
  styleUrls: ['./datos-tramite-renovacion.component.css']
})
export class DatosTramiteRenovacionComponent implements OnInit {
  formulario: FormGroup;
  codigoTransportacion: any[] = [];
  tipoCaatAereo: any[] = [];

  constructor(
    private fb: FormBuilder,
    private datosTramiteRenovacionService: DatosTramiteRenovacionService
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarCodigoTransportacion();
    this.cargarTipoCaatAereo();
  }

  private inicializarFormulario(): void {
    this.formulario = this.fb.group({
      solicitud: this.fb.group({
        idSolicitud: [''],
        solicitante: this.fb.group({
          idPersonaSolicitud: [''],
          ideGenerica1: [{ value: '', disabled: true }]
        }),
        caatSolicitudes: this.fb.array([
          this.fb.group({
            fechaInicioVigencia: [''],
            fechaFinVigencia: [''],
            caat: this.fb.group({
              cveFolioCaat: [{ value: '', disabled: true }]
            })
          })
        ]),
        ideCodTransportacionAerea: [{ value: '', disabled: true }],
        codIataIcao: [{ value: '', disabled: true }]
      }),
      claveFolioCAAT: ['', [Validators.maxLength(4)]],
      descripcionTipoCaat: [{ value: '', disabled: true }]
    });
  }

  get caatSolicitudes(): FormArray {
    return this.formulario.get('solicitud.caatSolicitudes') as FormArray;
  }

  private cargarCodigoTransportacion(): void {
    this.datosTramiteRenovacionService.getCodigoTransportacion().subscribe(
      (datos) => {
        this.codigoTransportacion = datos;
      },
      (error) => {
        console.error('Error al cargar codigoTransportacion', error);
      }
    );
  }

  private cargarTipoCaatAereo(): void {
    this.datosTramiteRenovacionService.getTipoCaatAereo().subscribe(
      (datos) => {
        this.tipoCaatAereo = datos;
      },
      (error) => {
        console.error('Error al cargar tipoCaatAereo', error);
      }
    );
  }

  caatConMayusculas(event: any): void {
    const valor = event.target.value;
    this.formulario.get('claveFolioCAAT')?.setValue(valor.toUpperCase());
  }

  buscarSolicitudPorCAAT(): void {
    if (this.formulario.valid) {
      const claveFolio = this.formulario.get('claveFolioCAAT')?.value;
      this.datosTramiteRenovacionService.buscarSolicitudPorCAAT(claveFolio).subscribe(
        (respuesta) => {
          this.formulario.patchValue(respuesta);
        },
        (error) => {
          console.error('Error al buscar solicitud por CAAT', error);
        }
      );
    }
  }
}