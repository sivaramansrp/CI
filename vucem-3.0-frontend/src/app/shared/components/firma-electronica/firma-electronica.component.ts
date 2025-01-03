import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import * as forge from 'node-forge';
import { ValidacionesFormularioService } from '../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';

@Component({
  selector: 'firma-electronica',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './firma-electronica.component.html',
  styleUrl: './firma-electronica.component.scss',
})
export class FirmaElectronicaComponent {
  @Input() tipo: string = '';
  @Output() valido = new EventEmitter<boolean>();

  cert_file: string = '';
  key_file: string = '';
  datos_binarios!: ArrayBuffer;
  mensaje_validacion: string = '';
  contrasenia: string = '';

  FormCertificado = this.fb.group({
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private formValidator: ValidacionesFormularioService
  ) {}

  get login() {
    return this.tipo === 'login' ? true : false;
  }

  isValid(field: string) {
    return this.formValidator.isValidField(this.FormCertificado, field);
  }

  handleFile(type: string, event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const original_file = input.files[0];
      const reader = new FileReader();
      reader.onload = async (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          if (type === 'cer') {
            const result = (await e.target.result) as ArrayBuffer;
            const der = new Uint8Array(result);
            const buff = forge.util.createBuffer(der);
            const asn1 = forge.asn1.fromDer(buff);
            const cert = forge.pki.certificateFromAsn1(asn1);
            const pem = forge.pki.certificateToPem(cert);
            this.cert_file = pem;
          }
          if (type === 'key') {
            this.datos_binarios = (await e.target.result) as ArrayBuffer;
          }
        }
      };
      reader.readAsArrayBuffer(original_file);
    }
  }

  onSubmit() {
    if (this.FormCertificado.invalid) {
      this.FormCertificado.markAllAsTouched();
      return;
    }

    const password = this.FormCertificado.get('password')?.value;
    this.contrasenia =
      password !== undefined && password !== null ? password : '';

    this.validateFilesBase(
      this.cert_file,
      this.datos_binarios,
      this.contrasenia
    );
  }

  validateFilesBase(
    certFile: string,
    binaryData: ArrayBuffer,
    password: string
  ): void {
    try {
      const cert = forge.pki.certificateFromPem(certFile);
      const cert_public_key = cert.publicKey as forge.pki.rsa.PublicKey;

      const padding_start = '-----BEGIN ENCRYPTED PRIVATE KEY-----\n';
      const padding_end = '\n-----END ENCRYPTED PRIVATE KEY-----';
      const der = new Uint8Array(binaryData);
      const binary_string = String.fromCharCode(...der);
      const content = padding_start + btoa(binary_string) + padding_end; // añadir paddings
      const private_key = forge.pki.decryptRsaPrivateKey(content, password);

      if (private_key && cert_public_key) {
        if (
          cert_public_key.n.t === private_key.n.t &&
          cert_public_key.e.t === private_key.e.t
        ) {
          this.valido.emit(true);
          this.toastrService.success(
            '¡Certificado válido y llave privada coinciden!'
          );
        } else {
          this.valido.emit(false);

          this.toastrService.error(
            'La llave privada no coincide con el certificado o la contraseña es incorrecta.'
          );
        }
      } else {
        this.valido.emit(false);

        this.toastrService.error(
          'La llave privada no coincide con el certificado o la contraseña es incorrecta.'
        );
      }
    } catch (error) {
      console.log(error);
      this.toastrService.error('Error en la validación');
    }
  }
}
