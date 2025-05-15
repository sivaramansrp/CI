import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { CambioDenominacionRazonSocialService } from '../services/cambioDenominacionRazonSocial.service'; // Comentado según instrucciones

@Component({
  selector: 'app-cambio-denominacion-razon-social',
  templateUrl: './cambio-denominacion-razon-social.component.html',
  styleUrls: ['./cambio-denominacion-razon-social.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class CambioDenominacionRazonSocialComponent implements OnInit {
  avisoCambioRazonSocialForm!: FormGroup;
  mostrarMensaje: boolean = false;
  tblErrorRazonSocialIgual: string = '';
  tblErrorFolioAcuse: string = '';

  constructor(private fb: FormBuilder) 
  { 
  }

  ngOnInit(): void {
    this.avisoCambioRazonSocialForm = this.fb.group({

        rfcVucem: [{value:'',disabled:true}],
        razonSocialVucem: [{value:'',disabled:true}],
        rfcIdc: [{value:'',disabled:true}],
        razonSocialIdc: [{value:'',disabled:true}],
        folioAcuse: ['', Validators.required]

    });
  }
}