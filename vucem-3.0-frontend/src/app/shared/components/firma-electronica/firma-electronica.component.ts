import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { asn1, pki, util } from 'node-forge';

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
        // Remove spaces and newlines from the privateKeyBase64
        const cert1 = this.cert_file.split(',');
        this.cert_file = cert1[1];

        const certDerBytes = util.decode64(this.cert_file);
        const obj = asn1.fromDer(certDerBytes);
        const cert_archivo = pki.certificateFromAsn1(obj);

        const cerKey = cert_archivo.publicKey;

        const cerToPem = pki.publicKeyToPem(cerKey);

        console.log(cerToPem);

        // *** Conversion de key to PEM *** //

        const key1 = this.key_file.split(',');
        this.key_file = key1[1];
        const keyDerBytes = util.decode64(this.cert_file);
        const objKey = asn1.fromDer(keyDerBytes);

        console.log(objKey);






        // const key_archivo = pki.certificateFromAsn1(objKey);

        // const keyKey = key_archivo.publicKey;

        // const keyToPem = pki.publicKeyToPem(keyKey);

        // console.log(keyToPem);

        // const privateKey = pki.decryptRsaPrivateKey(cerToPem, contrasenia);
        // console.log(privateKey);













        // const privateCert = pki.certificateToPem(this.cert_file)

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
