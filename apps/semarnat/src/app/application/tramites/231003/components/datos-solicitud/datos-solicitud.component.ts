import { Catalogo, CatalogoSelectComponent, InputRadioComponent, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  formularioEmpresaReciclaje!: FormGroup;

  aduanas!: Catalogo[];

  radioOptions: RadioOpcion[] = RADIO_OPCIONES.radioOptions;

  requiereEmpresaServicioReciclaje: RadioOpcion[] = RADIO_OPCIONES.requiereEmpresaServicioReciclaje;
  reciclajeEnInstalaciones: RadioOpcion[] = RADIO_OPCIONES.reciclajeEnInstalaciones

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
    this.reciclajeEnInstalaciones = RADIO_OPCIONES.reciclajeEnInstalaciones;
    this.inicializarFormularioEmpresaReciclaje();
    // this.suscribirCambioRequiereEmpresa();

  }

  isInvalid(id: string): boolean | undefined {
    const CONTROL = this.solicitudForm.get('datosdelForm')?.get(id);
    return CONTROL?.invalid && CONTROL?.touched;
  }

  navigateToPath(): void {
    this.router.navigate(['pago/aviso-de-reciclaje/datos-residuos']);
  }

  private inicializarFormularioEmpresaReciclaje(): void {
    this.formularioEmpresaReciclaje = new FormGroup({
      requiereEmpresa: new FormControl('Si', Validators.required), // default is "Sí"
      nombreEmpresa: new FormControl('', Validators.required),
      representanteLegal: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      correoElectronico: new FormControl('', [Validators.required, Validators.email])
    });
  }
  

  // private suscribirCambioRequiereEmpresa(): void {
  //   const CAMPO_REQUIERE_EMPRESA = 'requiereEmpresa';
  //   const CAMPOS_A_CONTROLAR = ['nombreEmpresa', 'representanteLegal', 'telefono', 'correoElectronico'];
  
  //   this.formularioEmpresaReciclaje.get(CAMPO_REQUIERE_EMPRESA)?.valueChanges.subscribe((valor: string) => {
  //     const HABILITAR = valor === 'Sí';
  
  //     CAMPOS_A_CONTROLAR.forEach((campo: string) => {
  //       const CONTROL = this.formularioEmpresaReciclaje.get(campo);
  //       if (CONTROL) {
  //         HABILITAR ? CONTROL.enable() : CONTROL.disable();
  //       }
  //     });
  //   });
  // }
  
}
