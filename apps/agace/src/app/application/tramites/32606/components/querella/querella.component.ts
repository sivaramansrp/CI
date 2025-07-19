import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputRadioComponent, TituloComponent, InputCheckComponent, TablaDinamicaComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QUERELLA_TABLA, RADIO_08 } from '../../constantes/adace32606.enum';
import { EconomicoService } from '../../services/economico.service';
import { Tramite32606Store } from '../../state/Tramite32606.store';
import { Tramite32606Query } from '../../state/Tramite32606.query';

@Component({
  selector: 'app-querella',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, InputRadioComponent, InputCheckComponent,
    TablaDinamicaComponent
  ],
  templateUrl: './querella.component.html',
  styleUrl: './querella.component.css',
})
export class QuerellaComponent implements OnInit, OnDestroy {
  public querellaForm!: FormGroup;
  radioOpcions08 = RADIO_08;
  TablaSeleccion = TablaSeleccion;
  public querellaTabla = QUERELLA_TABLA;

  constructor(private economico: EconomicoService,
    public query: Tramite32606Query,
    public store: Tramite32606Store,
    private fb: FormBuilder) { }



  ngOnInit(): void {
    this.donanteDomicilio();
  }

  donanteDomicilio(): void {
    this.querellaForm = this.fb.group({
      tipoRadio18: [''],
      tipoRadio19: [''],
      tipoRadio20: [''],
      sistemaIdentificacion: [''],
      lugarRadicacion: [''],
      sistemaControlInventarios: [false],
    });
  }

  ngOnDestroy(): void {
  }
}
