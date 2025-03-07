import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';

@Component({
  selector: 'app-tratados',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './tratados.component.html',
  styleUrl: './tratados.component.scss',
})
export class TratadosComponent implements OnInit {

  detallesdeltransporte: FormGroup;

  constructor(private fb: FormBuilder, private service: CertificadoTecnicoJaponService) {
    this.detallesdeltransporte = this.fb.group({
      tratadoAcuerdo: [""],
      paísBloque: [""],
      paísdeOrigen: [""],
      paísDestino: [""],
      fechadeExpedición: [""],
      fechadeVencimiento: [""],
    })
  }
  ngOnInit(): void {
    this.getTabledatas()
  
  }
 
  getTabledatas(): void {
    this.service.gettratados().subscribe(
      (data: any) => {
        this.detallesdeltransporte.patchValue({
          tratadoAcuerdo:data.tratadoAcuerdo,
          paísBloque:data.paísBloque,
          paísdeOrigen:data.paísdeOrigen,
          paísDestino:data.paísDestino,
          fechadeExpedición:data.fechadeExpedición,
          fechadeVencimiento:data.fechadeVencimiento
        })
      })
  }
}