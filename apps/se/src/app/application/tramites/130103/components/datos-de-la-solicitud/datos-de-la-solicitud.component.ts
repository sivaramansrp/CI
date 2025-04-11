import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CriterioDeDictamenComponent } from '../criterio-de-dictamen/criterio-de-dictamen.component';
import { DatosDeLaMercanciaComponent } from '../datos-de-la-mercancia/datos-de-la-mercancia.component';
import { DatosDelTramiteRealizerComponent } from '../datos-del-tramite-realizer/datos-del-tramite-realizer.component';
import { PaisProcedenciaComponent } from '../pais-procedencia/pais-procedencia.component';
import { PartidasDeLaMercanciaComponent } from '../partidas-de-la-mercancia/partidas-de-la-mercancia.component';
import { RepresentacionFederalComponent } from '../representacion-federal/representacion-federal.component';
import { UsoEspecificoDeLaMercanciaComponent } from '../uso-especifico-de-la-mercancia/uso-especifico-de-la-mercancia.component';

/**
  * compo doc
  * @component
  * @selector app-datos-de-la-solicitud
  * @description
  * Este componente es responsable de gestionar y renderizar los datos relacionados con 
  * la solicitud en el trámite de importación definitiva. Integra múltiples componentes 
  * que representan diferentes secciones del formulario, como datos del trámite, datos de la mercancía, 
  * partidas de la mercancía, uso específico de la mercancía, criterio de dictamen, país de procedencia 
  * y representación federal.
  * 
  * Funcionalidades principales:
  * - Renderiza dinámicamente las secciones del formulario utilizando componentes específicos.
  * - Permite la interacción con los datos de cada sección para completar la información de la solicitud.
  * 
  * Componentes importados:
  * - `DatosDelTramiteRealizerComponent`: Gestiona los datos del trámite.
  * - `DatosDeLaMercanciaComponent`: Gestiona los datos de la mercancía.
  * - `PartidasDeLaMercanciaComponent`: Gestiona las partidas de la mercancía.
  * - `UsoEspecificoDeLaMercanciaComponent`: Gestiona el uso específico de la mercancía.
  * - `CriterioDeDictamenComponent`: Gestiona el criterio de dictamen.
  * - `PaisProcedenciaComponent`: Gestiona los datos del país de procedencia.
  * - `RepresentacionFederalComponent`: Gestiona la representación federal.
  * 
  * @templateUrl ./datos-de-la-solicitud.component.html
  * @styleUrl ./datos-de-la-solicitud.component.scss
  */
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    DatosDelTramiteRealizerComponent,
    DatosDeLaMercanciaComponent,
    PartidasDeLaMercanciaComponent,
    UsoEspecificoDeLaMercanciaComponent,
    CriterioDeDictamenComponent,
    PaisProcedenciaComponent,
    RepresentacionFederalComponent
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})

export class DatosDeLaSolicitudComponent {}
