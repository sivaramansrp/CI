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

  validarCertificado() {
    try {
      const contraseña = this.FormCertificado.get('password')?.value;
      if (contraseña) {
        const cert = pki.certificateFromPem(this.cert_file);
        const privateKey = pki.decryptRsaPrivateKey(this.key_file, contraseña);

        if (privateKey) {
          this.validation_message =
            '¡Certificado válido y llave privada coinciden!';
        } else {
          this.validation_message =
            'Error: La llave privada no coincide con el certificado o la contraseña es incorrecta.';
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}
