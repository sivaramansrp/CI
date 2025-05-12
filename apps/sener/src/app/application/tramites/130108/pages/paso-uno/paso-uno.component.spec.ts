import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';  // Import NO_ERRORS_SCHEMA
import { CommonModule } from '@angular/common';  // Import CommonModule
import { SolicitudComponent } from '../../components/solicitud/solicitud.component'; // Import SolicitudComponent

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial indice value as 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });
});
