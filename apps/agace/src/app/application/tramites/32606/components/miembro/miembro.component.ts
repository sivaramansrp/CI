import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputRadioComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EMPRESA_TABLA, RADIO_08 } from '../../constantes/adace32606.enum';
import { EconomicoService } from '../../services/economico.service';
import { Tramite32606Query } from '../../state/Tramite32606.query';
import { Tramite32606Store } from '../../state/Tramite32606.store';

@Component({
  selector: 'app-miembro',
  standalone: true,
  imports: [CommonModule, TituloComponent, TablaDinamicaComponent, ReactiveFormsModule, InputRadioComponent],
  templateUrl: './miembro.component.html',
  styleUrl: './miembro.component.css',
})
export class MiembroComponent implements OnInit, OnDestroy {
  public miembroForm !: FormGroup;
  radioOpcions08 = RADIO_08;
  TablaSeleccion = TablaSeleccion;
  public empresaTabla = EMPRESA_TABLA;

  constructor(private economico: EconomicoService,
    public query: Tramite32606Query,
    public store: Tramite32606Store,
    private fb: FormBuilder) { }



  ngOnInit(): void {
    this.donanteDomicilio();
  }

  donanteDomicilio(): void {
    this.miembroForm = this.fb.group({
      tipoRadio08: [''],

    });
  }

  ngOnDestroy(): void {
  }

}
