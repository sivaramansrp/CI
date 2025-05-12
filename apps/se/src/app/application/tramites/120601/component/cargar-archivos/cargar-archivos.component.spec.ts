import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { CargarArchivosComponent } from './cargar-archivos.component';

import { AlertComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

describe('CargarArchivosComponent', () => {
  let component: CargarArchivosComponent;
  let fixture: ComponentFixture<CargarArchivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, AlertComponent, TituloComponent],
      declarations: [CargarArchivosComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct initial message', () => {
    const EXPECTED_MESSAGE =
      'La solicitud ha quedado registrada con el número temporal 202759017. Éste no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.';
    
    expect(component.cargararchivos).toBe(EXPECTED_MESSAGE);
  });
});
