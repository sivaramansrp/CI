import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
interface Solicitude {
  fechaCreacion: string;
  mercancia: string;
  cantidad: number;
  proovedor: string;
}

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  styleUrl: './solicitud.component.scss'
})
export class SolicitudComponent {

  solicitudes: Solicitude[] = [];
  displayedColumns: string[] = ['fechaCreacion', 'mercancia', 'cantidad', 'proovedor'];
  showContent = false;
  loadSolicitudesData() {
    // Load the JSON file from the assets folder using a relative path
    this.http.get<Solicitude[]>('assets/json/220401/solicitude.json').subscribe(
      (data) => {
        this.solicitudes = data;
        
      },
      (error) => {
        console.error('Error loading solicitudes data', error);
      }
    );
  }
  toggleContent() {
    this.showContent = !this.showContent;
  }
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadSolicitudesData();
  }
                  
}
