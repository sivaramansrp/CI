import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { camCertificadoStore } from '../../estados/cam-certificado.store';

interface FormValues {
  [key: string]: string | number | boolean | object | undefined;
}
@Component({
  selector: 'app-cam-destinatario',
  templateUrl: './cam-destinatario.component.html',
  styleUrl: './cam-destinatario.component.css',
})
export class CamDestinatarioComponent implements OnInit {
  
  exportadorForm!: FormGroup

  constructor(
    private readonly fb: FormBuilder, 
    private store: camCertificadoStore
  ){

  }

  ngOnInit(): void {
    this.initActionFormBuild();
  }
  initActionFormBuild(): void {
    this.exportadorForm = this.fb.group({
      lugar:['', Validators.required],
      exportador: ['',Validators.required],
      empresa: ['',Validators.required],
      cargo: ['',Validators.required],
      lada: [''],
      telfono: ['',Validators.required],
      fax: ['',Validators.required],
      correo: ['',Validators.required]
    })

  }

  detosDelDestinatarioFunc(e: unknown): void {
    this.store.setFormDatosDelDestinatario(e as FormValues);
  }
}
