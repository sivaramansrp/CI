import { Injectable } from '@angular/core';

interface AuthInfo {
  rfc: string;
  name: string;
  rol: string;
  rol2: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthInformationService {
  authInfo: AuthInfo = {
    rfc: 'ZUOC511210V6A',
    name: 'MIGUEL ANGEL CRUZ CANCHE',
    rol: 'aduanaCentraLocal',
    rol2: 'funcionario',
  };
}
