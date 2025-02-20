import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { map} from 'rxjs';

import { ServiciosPantallaService } from '../../../../core/services/31601/servicios-pantalla.service';
import { personaparas } from '../../../../core/models/31601/servicios-pantallas.model';


/**
 * Componente `PersonaComponent`.
 * Este componente es responsable de manejar la interfaz relacionada con la visualización y carga de datos de personas.
 * Permite al usuario visualizar información sobre una persona a partir de un archivo JSON, cargado mediante un servicio HTTP.
 * 
 * El componente utiliza el servicio `ServiciosPantallaService` para obtener los datos de las personas desde un archivo JSON,
 * y muestra esta información en la interfaz.
 * 
 * Además, incluye el componente `TituloComponent` para mostrar un título en la pantalla.
 * 
 * @component PersonaComponent
 * @selector app-persona
 * @templateUrl './persona.component.html'
 * @styleUrl './persona.component.scss'
 * @imports [
 *   HttpClientModule,
 *   FormsModule,
 *   CommonModule,
 *   TituloComponent
 * ]
 */
@Component({
  selector: 'app-persona', // Selector para usar este componente en plantillas HTML
  standalone: true, // Define que el componente puede funcionar de forma independiente (sin módulo específico)
  imports: [
    HttpClientModule, // Importación de módulo para realizar peticiones HTTP
    FormsModule, // Importación de módulo para trabajar con formularios
    CommonModule, // Módulo común de Angular para herramientas generales
    TituloComponent, // Componente para mostrar el título
  ],
  templateUrl: './persona.component.html', // Ruta a la plantilla HTML
  styleUrl: './persona.component.scss' // Ruta al archivo de estilos SCSS
})
export class PersonaComponent implements OnInit {
  
  /**
   * Array que contiene los datos de las personas cargadas desde el archivo JSON.
   * @type {personaparas[]}
   */
  personaparas: personaparas[] = [];

  /**
   * Controla la visibilidad del contenido adicional.
   * @type {boolean}
   */
  showContent = false;
 

  /**
   * Método que alterna la visibilidad del contenido.
   * @returns {void}
   */
  toggleContent(): void {
    this.showContent = !this.showContent;
  }

  /**
   * Constructor del componente.
   * @param {HttpClient} http - Instancia del cliente HTTP para realizar peticiones.
   */
  constructor(public http: HttpClient, private pantallaSvc: ServiciosPantallaService) {}

  /**
   * Método que se ejecuta cuando el componente se inicializa.
   * Se encarga de cargar los datos de las personas desde el archivo JSON.
   * @returns {void}
   */
  ngOnInit(): void {
    this.loadPersonas(); // Carga las personas al inicializar el componente
  }

 /**
 * Método que realiza la carga de los datos de personas desde el archivo JSON.
 * El archivo JSON se encuentra en la ruta `assets/json/31601/personapara.json`.
 * Utiliza el servicio `pantallaSvc` para obtener los datos y asignarlos a la propiedad `personaparas` del componente.
 * 
 * Este método hace uso de un observable y suscribe a él para recibir la respuesta y asignar los datos cargados a la propiedad `personaparas`.
 * 
 * @method loadPersonas
 * @returns {void} No devuelve ningún valor. Solo asigna los datos a la propiedad `personaparas`.
 */
loadPersonas(): void {
  // Realiza la solicitud HTTP para obtener los datos de personas desde el archivo JSON
  const personaparas$ = this.pantallaSvc
    .getPersonapara() // Llama al servicio para obtener el array de personas
    .pipe(
      map((resp) => {
        // Asigna los datos obtenidos a la propiedad 'personaparas'
        this.personaparas = resp;
      })
    );
    
  // Suscribe al observable para que la asignación de los datos se ejecute
  personaparas$.subscribe();
}

}
