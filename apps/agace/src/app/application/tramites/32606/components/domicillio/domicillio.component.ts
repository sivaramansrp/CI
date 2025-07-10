import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CatalogoSelectComponent, InputRadioComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { DOMICILIO_CATALOGO, DOMICILLIO_TABLA, RADIO_07 } from '../../constantes/adace32606.enum';
import { Domicillio } from '../../models/adace.model';
import { EconomicoService } from '../../services/economico.service';
import { Tramite32606Query } from '../../state/Tramite32606.query';
import { Tramite32606Store } from '../../state/Tramite32606.store';

@Component({
  selector: 'app-domicillio',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,CatalogoSelectComponent,TablaDinamicaComponent,InputRadioComponent,TituloComponent],
  templateUrl: './domicillio.component.html',
  styleUrl: './domicillio.component.css',
})
export class DomicillioComponent implements OnInit , OnDestroy {

  public domicillioForm!: FormGroup;
  public domicillio = DOMICILIO_CATALOGO;
  TablaSeleccion = TablaSeleccion;
  public domicillioTabla = DOMICILLIO_TABLA;
  public domicillioDatos: Domicillio[] = [];
  radioOpcions07 = RADIO_07;
  nombreArchivo: string = '';
  nombreArchivo2: string = '';

  constructor(private economico: EconomicoService,
      public query: Tramite32606Query,
      public store: Tramite32606Store,
      private fb: FormBuilder) { }


  ngOnInit(): void {
    this.donanteDomicilio();
  }

  donanteDomicilio(): void {
    this.domicillioForm = this.fb.group({
      domicillio: [''],
      tipoRadio07: [''],
      tipoRadio08: [''],
      file1: [''],
      file2: [''],
      actualmente: [''],
      actualmente2: [''],
      
    });
  }

   alSeleccionarArchivo(event: Event): void {
    const TARGET = event.target as HTMLInputElement;
    const FILE = TARGET?.files ? TARGET.files[0] : null;
    this.nombreArchivo = FILE ? FILE.name : '';
    this.domicillioForm.patchValue({
      archivo: FILE,
    });
  }

  alSeleccionarArchivo2(event: Event): void {
    const TARGET = event.target as HTMLInputElement;
    const FILE = TARGET?.files ? TARGET.files[0] : null;
    this.nombreArchivo2 = FILE ? FILE.name : '';
    this.domicillioForm.patchValue({
      archivo2: FILE,
    });
  }
  
  ngOnDestroy(): void {

  }
}
