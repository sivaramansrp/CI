import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import * as forge from 'node-forge';

@Component({
  selector: 'firma-electronica',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './firma-electronica.component.html',
  styleUrl: './firma-electronica.component.scss',
})
export class FirmaElectronicaComponent {
  cert_file: any = null;
  key_file: any = null;
  validation_message: string = '';

  FormCertificado = this.fb.group({
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  desencriptarKey(type: string, event: any): void {
    const type_file = type === 'cer' ? 'cert_file' : 'key_file';
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this[type_file] = e.target.result;
    };
    reader.readAsText(file);
  }

  convertToBase64(file: File, tipo: string) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const base64String = event.target.result;
      if (tipo == 'cer') {
        this.cert_file = base64String;
      } else {
        this.key_file = base64String;
      }
    };
    reader.readAsDataURL(file);
  }

  onCertFileChange(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.convertToBase64(selectedFile, 'cer');
    }
  }

  onKeyFileChange(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.convertToBase64(selectedFile, 'key');
    }
  }

  validarCertificado() {
    try {
      const contrasenia = this.FormCertificado.get('password')?.value;

      if (contrasenia) {
        // Remove headers, footers, and whitespace
        const cert1 = this.cert_file.split(',');
        this.cert_file = cert1[1];

        const cleanedCert = this.cert_file
          .replace(/-----.*-----/g, '')
          .replace(/\s+/g, '');
        const certBuffer = forge.util.decode64(cleanedCert);
        console.log(cleanedCert);
        const asn1Cert = forge.asn1.fromDer(
          forge.util.createBuffer(certBuffer)
        );
        const cert = forge.pki.certificateFromAsn1(asn1Cert);

        // Convert to PEM format
        this.cert_file = forge.pki.certificateToPem(cert);
        console.log(this.cert_file);

        // Convert Base64 to DER

        // *** Conversion de key to PEM *** //

        // if (privateKey) {
        //   this.validation_message =
        //     '¡Certificado válido y llave privada coinciden!';
        // } else {
        //   this.validation_message =
        //     'Error: La llave privada no coincide con el certificado o la contraseña es incorrecta.';
        // }
      }
    } catch (e) {
      console.log(e);
    }
  }
}
