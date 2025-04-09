import { Catalogo, CatalogoSelectComponent, InputRadioComponent, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// import SolicitudeJson from '@libs/shared/theme/assets/json/231003/solicitud.json';
import { RadioOpcion, SolicitudJson } from '@libs/shared/data-access-user/src/core/models/231003/solicitud.model';
import rawData from '@libs/shared/theme/assets/json/231003/solicitud.json';
const RADIO_OPCIONES = rawData as SolicitudJson;


@Component({
  selector: 'app-datos-solicitud',
  standalone: true,
  imports: [CommonModule,
    CatalogoSelectComponent,
    TituloComponent,
    ReactiveFormsModule, TableComponent,InputRadioComponent],
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.css',
})
export class DatosSolicitudComponent implements OnInit {

  solicitudForm!: FormGroup;

  aduanas!: Catalogo[];

  radioOptions: RadioOpcion[] = RADIO_OPCIONES.radioOptions;

  requiereEmpresaServicioReciclaje: RadioOpcion[] = RADIO_OPCIONES.requiereEmpresaServicioReciclaje;

  public establecimientoHeaderData: string[] = [];

  public establecimientoBodyData: unknown = [];

  constructor(public fb: FormBuilder,private router: Router) {
    // Constructor logic if needed
  }

  // Add any methods or properties needed for the component here

  ngOnInit(): void {
    this.solicitudForm = this.fb.group({
      datosdelForm: this.fb.group({
        numeroRegistroAmbiental: ['', Validators.required],
        descripcionGenerica1: ['', Validators.required],
        numeroProgramaImmex: ['', Validators.required],
      }),
    });
    this.aduanas = RADIO_OPCIONES.Immex;
    this.establecimientoHeaderData = RADIO_OPCIONES.table[0]?.encabezadoDeTabla || [];
    this.establecimientoBodyData = RADIO_OPCIONES.table[0]?.cuerpoTabla || [];
    this.requiereEmpresaServicioReciclaje = RADIO_OPCIONES.requiereEmpresaServicioReciclaje;

  }

  isInvalid(id: string): boolean | undefined {
    const CONTROL = this.solicitudForm.get('datosdelForm')?.get(id);
    return CONTROL?.invalid && CONTROL?.touched;
  }

  navigateToPath(): void {
    this.router.navigate(['pago/aviso-de-reciclaje/datos-residuos']);
  }
}
