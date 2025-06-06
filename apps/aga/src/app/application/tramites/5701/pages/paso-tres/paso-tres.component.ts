import { Component, OnInit } from '@angular/core';
import { catchError, map, switchMap, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { TramiteFolioService } from '@ng-mf/data-access-user';
import { TramiteFolioStore } from '@ng-mf/data-access-user';
import { DocumentosService } from '../../../../core/services/5701/documentos/documentos.service';
import { FirmarRequest } from '../../../../core/models/5701/firmar-request-model';
import { BaseResponse } from '../../../../core/models/5701/base-response.model';

@Component({
  selector: 'paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss',
})
export class PasoTresComponent implements OnInit {
  /**
   * @description URL de la aplicación, se utiliza para redirigir al usuario al acuse del trámite.
   */
  url: string = '';
  /**
   * @description Constructor del componente PasoTresComponent.
   * @param router - Inyecta el servicio Router para la navegación.
   * @param tramiteFolioServices - Inyecta el servicio TramiteFolioService para obtener los datos del trámite.
   * @param tramiteStore - Inyecta el store TramiteFolioStore para manejar el estado del trámite.
   */
  constructor(
    private router: Router,
    private tramiteFolioServices: TramiteFolioService,
    private tramiteStore: TramiteFolioStore,
    private firmaService: DocumentosService,
  ) { }

  /**
   * Método de ciclo de vida de Angular que se llama una vez que el componente ha sido inicializado.
   * En este método, se obtiene la URL actual del router, se separa en partes y se construye la URL base
   */
  ngOnInit(): void {
    const URL_ACTUAL = this.router.url;
    const URL_SEPARADA = URL_ACTUAL.split('/');
    this.url = URL_SEPARADA.slice(0, 3).join('/');
  }

  /**
   * Maneja el evento para obtener la firma y realiza acciones adicionales.
   * @param ev - La cadena de texto que representa la firma obtenida.
   */
  obtieneFirma(ev: string): void {
    const FIRMA: string = ev;
    if (FIRMA) {
      // Obtener id_solicitud del session storage
      const idSolicitud = localStorage.getItem('id_solicitud');

      // Crear payload con datos simulados
      const payload: FirmarRequest = {
        id_solicitud: +idSolicitud!,
        ...this.datosFirmaSimulada,
      };

      // Enviar firma simulada al backend
      this.firmaService.enviarFirma(payload).pipe(
        tap((response: BaseResponse<string>) => {
          // Guardar el valor de datos en localStorage
          if (response.datos) {
            localStorage.setItem('folioFirma', response.datos);
          }
        }),
        switchMap(() => {
          // Si la firma se envía correctamente, obtener el trámite
          return this.tramiteFolioServices.obtenerTramite(19);
        }),
        map((tramite) => {
          this.tramiteStore.establecerTramite(tramite.data, FIRMA);
          this.router.navigate([`${this.url}/acuse`]);
        }),
        catchError((error) => {
          console.error('Error en el proceso de firma:', error);
          return throwError(() => error);
        })
      ).subscribe();
      // Obtiene el número de trámite
      this.tramiteFolioServices
        .generarFolio()
        .pipe(
          tap((tramite) => {           
            this.tramiteStore.establecerTramite(tramite.datos, FIRMA);
            this.router.navigate([`${this.url}/acuse`]);
          }),
          catchError((_error) => {
            return _error;
          })
        )
        .subscribe();
    }
  }

  
  private datosFirmaSimulada = {
  cadena_original: "7c323530303330313830303132303235393931323030303031307c31322f30352f32303235207c31383a34303a34347c494e5445475241444f524120444520555242414e495a4143494f4e4553205349474e554d205320444520524c2044452043567c41414c3034303932333545367c31322f30352f32303235207c31383a34313a32337c323530303330313830303132303235393931323030303031302d3030303030387c31322f30352f32303235207c41646d696e69737472616369f36e206465204365727469666963616369f36e2079204173756e746f7320496e7465726e6163696f6e616c65732064652041756469746f72ed6120646520436f6d657263696f204578746572696f72202233227c536f6c6963697475642064652052656e6f76616369f36e20656e20656c2045737175656d61206465204365727469666963616369f36e20646520456d707265736173204d6f64616c6964616420436f6d65726369616c697a61646f7261206520496d706f727461646f72617c31322f30352f32303235207c31383a33333a34337c3230323737333137307c",
  cert_serial_number: "3082054c30820434a00302010202143230303031303030303030313030303031383135300d06092a864886f70d01010505003082016f3118301606035504030c0f412e432e2064652070727565626173312f302d060355040a0c26536572766963696f2064652041646d696e69737472616369c3b36e205472696275746172696131383036060355040b0c2f41646d696e69737472616369c3b36e20646520536567757269646164206465206c6120496e666f726d616369c3b36e3129302706092a864886f70d010901161a617369736e657440707275656261732e7361742e676f622e6d783126302406035504090c1d41762e20486964616c676f2037372c20436f6c2e20477565727265726f310e300c06035504110c053036333030310b3009060355040613024d583119301706035504080c10446973747269746f204665646572616c3112301006035504070c09436f796f6163c3a16e31153013060355042d130c5341543937303730314e4e333132303006092a864886f70d0109020c23526573706f6e7361626c653a2048c3a963746f72204f726e656c617320417263696761301e170d3130313232343139303535395a170d3133303332333139303535395a3081c6312430220603550403131b41475249434f4c4120414c5045205320444520524c204445204356312430220603550429131b41475249434f4c4120414c5045205320444520524c20444520435631243022060355040a131b41475249434f4c4120414c5045205320444520524c204445204356310b3009060355040613024d5831253023060355042d131c41414c303430393233354536202f2042555249363930313238545630311e301c06035504051315202f20425552493639303132384844464e4d47303530819f300d06092a864886f70d010101050003818d0030818902818100bf4f938859fa109d8b0c69cbd32146c2ecb7344a46852ecef0da0caf246a779060797be7f18c5deec1d920b01581c3a18f3aced361b5cdbccacddb03bc0c83e14eefcad24940aabfe87d20f818132eb9a7dcb15ca670511e4901ec855a3bbebb83b91ae5eef8872fbedb56918b3cdaa4627da6098bf2101fceff9d66b938d8210203010001a382010830820104300c0603551d130101ff04023000300b0603551d0f0404030203d8301106096086480186f84201010404030205a0301d0603551d0e04160414b49c61c07db87cee5b5f51168836ab416efc5b5c302e0603551d1f042730253023a021a01f861d687474703a2f2f706b692e7361742e676f622e6d782f7361742e63726c303306082b0601050507010104273025302306082b060105050730018617687474703a2f2f6f6373702e7361742e676f622e6d782f301f0603551d23041830168014eb597d04229a538d9e711aa0589629f539e0a0c530100603551d2004093007300506032a0304301d0603551d250416301406082b0601050507030406082b06010505070302300d06092a864886f70d01010505000382010100c0db22e47e66c438465ffd70ebb631bc683a5de8318c7c7d54cc85d0354752b046b176f9d6dd58e054a3a8a1858b0eb870b348165d4dd4c9d01c05d88351bcef35a9166a1de9f72b04831bd3382edecb94f78d21812fa173a6fe5495f32eb153eb22a6996fa1140ec36e87f6dce513330ee3bb18a20023944af2768f4f22cc196b245b2be6c62bced2db221ede5e8691834da9b117f2fe905e4067b822f12b3e13c3b535b90aa15d1392ce0550f56dc632ac95463801b5cbbefecec5b720a7ff576bb180e3493d713a2e95bf2700e90ddc2c10180e97858adafbbbca8647d0b58f16932e460de15b8753c5b32efbac7e56b083a71e228d3d561d26b724ba453a",
  clave_usuario: "AAL0409235E6",
  fecha_firma: "2025-04-28T21:47:08.087Z",
  clave_rol: "Solicitante",
  sello: "54561471e7d3c4ad16689d507e4f64610f06643571581c189be1cbccc1502f2a2906c0f5963181544162a5bccbbf5694d94ccf3d870af96ed921d6ceac045616f8cd2b78b3b52587a6eef526656220214bdda1cb693caf02aac32ab2dfcaaac2a6bb10c8a347a95a7fcbc6cdd776c4b292caf6a450d8ef2b188784ce93ec5874",
  fecha_fin_vigencia: "2025-04-23T21:47:08.087Z",
  documentos_requeridos: [
    {
      id_documento_seleccionado: 2,
      hash_documento: "38656330353332373039613434623662366339313236393033393631343734346535613836633964",
      sello_documento: "3d785a782a37f150e5005a59f8f5d57f0b55024aadf83f04227b76603967a53e1e6dced585e45cae9d0c68f971d2f2f9a110e0f0629cc7b6580dae5ed277d77614d53e530006499cb10ac6dcfdf5c1f4ec82e4ea64629c2e376fe33233d7bacac273d042c14c85c83eed5daed3b840afd1c3639f0a2d20381d4303aebef5ab28"
    }
  ]
};
}
