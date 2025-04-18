import * as forge from 'node-forge';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LOGIN, PADDING } from '../../constantes/constantes';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ValidacionesFormularioService } from '../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';

@Component({
  selector: 'firma-electronica',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './firma-electronica.component.html',
  styleUrl: './firma-electronica.component.scss',
})
export class FirmaElectronicaComponent {
  @Input({ required: true }) tipo: string = '';
  @Output() valido = new EventEmitter<boolean>();
  @Output() firma = new EventEmitter<string>();

  certFile: string = '';
  keyFile: string = '';
  datosBinarios!: ArrayBuffer;
  mensajeValidacion: string = '';
  contrasenia: string = '';

  FormCertificado = this.fb.group({
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private formValidator: ValidacionesFormularioService
  ) { 
    // Lógica de inicialización si es necesario
  }

  /**
   * Getter para saber si el componente esta siendo usado para hacer 'login'
   * @returns {boolean} Regresa un true si el componente se esta usando para autenticarse e iniciar sesión, de lo contrario retorna un false.
   */
  get login(): boolean {
    return this.tipo === LOGIN ? true : false;
  }

  /**
   * Metodo para saber si el campo del formulario es valido.
   * @param field El nombre del campo del formulario que se va a validar.
   * @returns {boolean | null} : Regresa un booleano si el campo es valido o no o puede regresar null si no se ha tocado el campo.
   */
  isValid(field: string): boolean | null {
    return this.formValidator.isValid(this.FormCertificado, field);
  }

  /**
   * Lee el archivo seleccionado y lo convierte a un ArrayBuffer.
   * @param type El tipo de archivo que se esta leyendo .cer o .key.
   * @param event El evento de cambio que se dispara cuando se selecciona un archivo.
   * @returns {void} No devuelve valor alguno.
   */
  handleFile(type: string, event: Event): void {
    const INPUT = event.target as HTMLInputElement;
    if (INPUT.files) {
      const ARCHIVO_ORIGINAL = INPUT.files[0];
      const READER = new FileReader();
      READER.onload = async (e: ProgressEvent<FileReader>): Promise<void> => {
        if (e.target && e.target.result) {
          if (type === 'cer') {
            const RESULT = (await e.target.result) as ArrayBuffer;
            const DER = new Uint8Array(RESULT);
            const BUFF = forge.util.createBuffer(DER);
            const ASN1 = forge.asn1.fromDer(BUFF);
            const CERT = forge.pki.certificateFromAsn1(ASN1);
            const PEM = forge.pki.certificateToPem(CERT);
            this.certFile = PEM;
          }
          if (type === 'key') {
            this.datosBinarios = (await e.target.result) as ArrayBuffer;
          }
        }
      };
      READER.readAsArrayBuffer(ARCHIVO_ORIGINAL);
    }
  }

  /**
   * Metodo que se ejecuta al dar click en el boton de 'Firmar'.
   * @returns {void} No regresa valor alguno.
   */
  onSubmit(): void {
    if (this.FormCertificado.invalid) {
      this.FormCertificado.markAllAsTouched();
      return;
    }

    const PASSWORD = this.FormCertificado.get('password')?.value;
    this.contrasenia =
      PASSWORD !== undefined && PASSWORD !== null ? PASSWORD : '';

    this.validateFilesBase(this.certFile, this.datosBinarios, this.contrasenia);
  }

  /**
   * Valida si el certificado y la llave privada coinciden.
   * @param certFile Datos del certificado en el formato pem (.cer).
   * @param binaryData Datos en binario de la llave privada (.key).
   * @param password contraseña de la llave privada.
   * @returns {void} No regresa valor alguno.
   */
  validateFilesBase(
    certeile: string,
    binaryData: ArrayBuffer,
    password: string
  ): void {
    try {
      const CERT = forge.pki.certificateFromPem(this.certFile);
      const CERT_PUBLIC_KEY = CERT.publicKey as forge.pki.rsa.PublicKey;

      const PADDING_START = PADDING.INICIO;
      const PADDING_END = PADDING.FIN;
      const DER = new Uint8Array(binaryData);
      const BINARY_STRING = String.fromCharCode(...DER);
      const CONTENT = PADDING_START + btoa(BINARY_STRING) + PADDING_END; // añadir paddings al string del certificado, para poder desencriptarlo.
      const PRIVATE_KEY = forge.pki.decryptRsaPrivateKey(CONTENT, password);

      const VALIDACIONES =
        PRIVATE_KEY &&
        CERT_PUBLIC_KEY &&
        CERT_PUBLIC_KEY.n.t === PRIVATE_KEY.n.t &&
        CERT_PUBLIC_KEY.e.t === PRIVATE_KEY.e.t;

      if (VALIDACIONES) {
        this.toastrService.success(
          '¡Certificado válido y llave privada coinciden!'
        );
        this.valido.emit(true);
        if (!this.login) {
          const FIRMA = FirmaElectronicaComponent.firmar('hola', PRIVATE_KEY);
          this.firma.emit(FIRMA);
        }
      } else {
        this.valido.emit(false);
        this.toastrService.error(
          'La llave privada no coincide con el certificado o la contraseña es incorrecta.'
        );
      }
    } catch (ERROR) {
      this.toastrService.error('Error en la validación');
    }
  }

  /**
   * Encripta una cadena de texto, usando la libreria forge.
   * @param cadena cadena a encriptar.
   * @param privateKey Llave privada en formato RSA.
   * @returns {string} Regresa la cadena encriptada.
   */
  static firmar(cadena: string, privateKey: forge.pki.rsa.PrivateKey): string {
    const MD = forge.md.sha256.create();
    MD.update(cadena, 'utf8');
    return forge.util.encode64(privateKey.sign(MD));
  }
}
