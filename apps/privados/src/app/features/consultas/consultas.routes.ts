import { Routes } from '@angular/router';
import { CONSULTAS_ROUTES } from '../../routes.constants';
import { ManifiestoAereoPage } from './manifiesto-aereo/pages/manifiesto-aereo/manifiesto-aereo.page';
import { ConsultasPage } from '../../store-front/pages/consultas/consultas.page';
import { manifiestoAereoRoutes } from './manifiesto-aereo/manifiesto-aereo.routes';
import { DescargarDocumentoConsultadoPage } from './descargar-documento-consultado/pages/descargar-documento-consultado/descargar-documento-consultado.page';
import { descargarDocumentoConsultaRoutes } from './descargar-documento-consultado/descargar-documento-consultado.routes';
import { guiasAereasRoutes } from './guias-aereas/guias-aereas.routes';
import { ConsultaGuiasAereasPage } from './guias-aereas/pages/consulta-guias-aereas/consulta-guias-aereas.page';

export const consultasRoutes: Routes = [
  {
    path: '',
    component: ConsultasPage,
  },
  // Manifiesto Aereo Routes
  {
    path: CONSULTAS_ROUTES.MANIFIESTO_AEREO,
    component: ManifiestoAereoPage,
  },
  ...manifiestoAereoRoutes,
  // Descargar Documento Consultado Routes
  {
    path: CONSULTAS_ROUTES.DESCARGAR_DOCUMENTO_CONSULTADO,
    component: DescargarDocumentoConsultadoPage,
  },
  ...descargarDocumentoConsultaRoutes,
  // Guías Aereas Routes
  {
    path: CONSULTAS_ROUTES.CONSULTA_GUIAS_AEREAS,
    component: ConsultaGuiasAereasPage,
  },
  ...guiasAereasRoutes,
  {
    path: '**',
    redirectTo: '',
  },
];

export default consultasRoutes;
