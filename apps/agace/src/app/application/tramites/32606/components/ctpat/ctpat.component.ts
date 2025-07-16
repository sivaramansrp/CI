import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RADIO_01 } from '../../constantes/adace32606.enum';
import { EconomicoService } from '../../services/economico.service';
import { Tramite32606Query } from '../../state/Tramite32606.query';
import { Tramite32606Store } from '../../state/Tramite32606.store';

@Component({
  selector: 'app-ctpat',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, InputRadioComponent],
  templateUrl: './ctpat.component.html',
  styleUrl: './ctpat.component.css',
})
export class CtpatComponent implements OnDestroy , OnInit {
  radioOpcions01 = RADIO_01;
  public ctpatForm !: FormGroup;

  constructor(private economico: EconomicoService,
      public query: Tramite32606Query,
      public store: Tramite32606Store,
      private fb: FormBuilder) { }
  
  
    ngOnInit(): void {
      this.donanteDomicilio();
    }
  
    donanteDomicilio(): void {
      this.ctpatForm = this.fb.group({
        tipoRadio05: [''],
          
      });
    }
  
    ngOnDestroy(): void {
    }
  
}
