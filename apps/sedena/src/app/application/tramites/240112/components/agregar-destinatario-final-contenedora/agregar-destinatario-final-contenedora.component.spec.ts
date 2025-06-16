import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarDestinatarioFinalContenedoraComponent } from './agregar-destinatario-final-contenedora.component';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AgregarDestinatarioFinalComponent } from '../../../../shared/components/agregar-destinatario-final/agregar-destinatario-final.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('AgregarDestinatarioFinalContenedoraComponent', () => {
  let component: AgregarDestinatarioFinalContenedoraComponent;
  let fixture: ComponentFixture<AgregarDestinatarioFinalContenedoraComponent>;

  beforeEach(async () => {
    jest.spyOn(console, 'warn');

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AgregarDestinatarioFinalComponent,
        AgregarDestinatarioFinalContenedoraComponent,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        HttpClientTestingModule
      ],
      providers: [DatosSolicitudService],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarDestinatarioFinalContenedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
