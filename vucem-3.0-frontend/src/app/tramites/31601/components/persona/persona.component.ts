import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';


interface personaparas {
  RFC: string;
  CURP: string;
  Nombre: number;
  Apellido_paterno: string;
  Apellido_materno: string;
}

@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule,TituloComponent],
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.scss'
})
export class PersonaComponent implements OnInit {
  personaparas: personaparas[] = [];
  showContent = false;
  toggleContent() {
    this.showContent = !this.showContent;
  }
  

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.loadPersonas(); // Load personas when component is initialized
  }

  loadPersonas(): void {
    const apiUrl = 'assets/json/31601/personapara.json';  // Replace with the actual URL or path of your JSON file

    // Use HttpClient to fetch the data from the JSON file
    this.http.get<personaparas[]>(apiUrl).subscribe(
      (data: personaparas[]) => {
        this.personaparas = data; // Store the fetched data in the personas array
      },
      (error) => {
        console.error('Error fetching personas', error); // Handle any errors
      }
    );
  }

}
