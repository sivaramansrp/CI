import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { DatosMercanciaContenedoraComponent } from './datos-mercancia-contenedora.component';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { of } from 'rxjs';
import { DatosMercanciaComponent } from '../../../../shared/components/datos-mercancia/datos-mercancia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('DatosMercanciaContenedoraComponent', () => {
  let component: DatosMercanciaContenedoraComponent;
  let fixture: ComponentFixture<DatosMercanciaContenedoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [DatosMercanciaComponent, DatosMercanciaContenedoraComponent, ReactiveFormsModule,FormsModule ,CommonModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}), // Mock params as an observable
            queryParams: of({}), // Mock queryParams if needed
            data: of({}), // Mock data as an observable
          },
        },
        {
          provide: DatosSolicitudService,
          useValue: {
            obtenerFraccionesCatalogo: jest.fn().mockReturnValue(of([])), // Mock the method to return an observable
            obtenerUMCCatalogo: jest.fn().mockReturnValue(of([])), // Mock the method to return an observable
            obtenerMonedaCatalogo: jest.fn().mockReturnValue(of([])), // Mock the method to return an observable
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosMercanciaContenedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});