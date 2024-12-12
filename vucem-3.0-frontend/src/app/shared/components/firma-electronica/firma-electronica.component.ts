import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { pki } from 'node-forge';

@Component({
  selector: 'firma-electronica',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './firma-electronica.component.html',
  styleUrl: './firma-electronica.component.scss',
})
export class FirmaElectronicaComponent {
  certFile: any = null;
  keyFile: any = null;
  validationMessage: string = '';

  FormCertificado = this.fb.group({
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  desencriptarKey(type: string, event: any): void {
    const typeFile = type === 'cer' ? 'certFile' : 'keyFile';
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      // if (e.target) {
        this[typeFile] = e.target.result;
      // }
    };
    reader.readAsText(file);
    console.log(`.cer: ${this.certFile}`);
    console.log(`.key: ${this.keyFile}`);
  }

  validarCertificado() {
    try {
      console.log(`.cer: ${this.certFile}`);
      console.log(`.key: ${this.keyFile}`);
      const contraseña = this.FormCertificado.get('password')?.value;
      if (contraseña) {
        const cert = pki.certificateFromPem(this.certFile);
        console.log(cert);

        const privateKey = pki.decryptRsaPrivateKey(this.keyFile, contraseña);
        console.log(privateKey);

        if (privateKey) {
          this.validationMessage =
            '¡Certificado válido y llave privada coinciden!';
        } else {
          this.validationMessage =
            'Error: La llave privada no coincide con el certificado o la contraseña es incorrecta.';
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}
