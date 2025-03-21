// Importaciones necesarias desde Angular y otros módulos para el componente
import { Component, ViewChild } from '@angular/core';
import { BtnContinuarComponent, DatosPasos, WizardComponent } from "@ng-mf/data-access-user";
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '../../constants/permiso-importacion-modification.enum';
import { PasoCuatroComponent } from "../paso-cuatro/paso-cuatro.component";
import { PasoDosComponent } from "../paso-dos/paso-dos.component";
import { PasoTresComponent } from "../paso-tres/paso-tres.component";
import { PasoUnoComponent } from "../paso-uno/paso-uno.component";
// Interfaz para definir la estructura del objeto de acción del botón

interface AccionBoton {
  accion: string; // Define la acción del botón (e.g., 'cont' para continuar, 'atras' para retroceder)
  valor: number;  // Almacena el valor del índice al que se debe navegar
}

@Component({
  selector: 'app-permiso-de-retiro', // Selector del componente para usarlo en otros lugares
  templateUrl: './permiso-de-retiro.component.html', // Ruta del archivo HTML asociado
  styleUrl: './permiso-de-retiro.component.scss',    // Ruta del archivo de estilos asociado
  imports: [WizardComponent, BtnContinuarComponent, PasoUnoComponent, PasoDosComponent, PasoTresComponent, PasoCuatroComponent], // Importaciones de componentes necesarios
  standalone: true, // Indica que este es un componente independiente

})
export class PermisoDeRetiroComponent {
  // Variable que almacena el índice actual del paso
  indice = 1;

  // Lista de pasos para el asistente, obtenida de una constante
  pasos: ListaPasosWizard[] = PASOS;

  // Decorador para obtener una referencia del componente WizardComponent
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  // Objeto que contiene datos de los pasos para configurar el componente
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length, // Número total de pasos
    indice: this.indice,         // Índice actual del paso
    txtBtnAnt: 'Anterior',       // Texto para el botón "Anterior"
    txtBtnSig: 'Continuar',      // Texto para el botón "Continuar"
  };
  // Método para actualizar el índice según el evento del botón
  getValorIndice(e: AccionBoton): void {
    // Valida que el valor esté en el rango permitido
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor; // Actualiza el índice actual
      if (e.accion === 'cont') {
        // Navega al siguiente paso si la acción es 'cont'
        this.wizardComponent.siguiente();
      } else {
        // Navega al paso anterior si la acción es diferente
       this.wizardComponent.atras();
      }
    }
  }
}

