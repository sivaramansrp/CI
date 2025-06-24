import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src';

/**
 * @fileoverview Componente para mostrar el subtítulo y la sección de firma electrónica en el paso tres del asistente.
 * Este componente integra el formulario de firma electrónica para finalizar el trámite.
 * @module PasoTresComponent
 */

/**
 * Componente para mostrar el subtítulo del asistente y la sección de firma electrónica en el paso tres.
 * @component PasoTresComponent
 * @selector app-paso-tres
 * @templateUrl ./paso-tres.component.html
 * @styleUrls ./paso-tres.component.scss --220201
 */
@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrls: ['./paso-tres.component.scss'],
  standalone: true,
  imports: [CommonModule, FirmaElectronicaComponent]
})
export class PasoTresComponent {
}