import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoTresComponent } from './paso-tres.component';
import { Router } from '@angular/router';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';

// Mock del componente firma-electronica
@Component({
  selector: 'firma-electronica',
  template: '<button (click)="simulateFirma()">Simular Firma</button>',
  standalone: true
})
class MockFirmaElectronicaComponent {
  @Input() tipo: string = '';
  @Output() firma = new EventEmitter<string>();

  simulateFirma() {
    this.firma.emit('mock-signature'); // Simula la emisión de una firma válida
  }
}

describe('PasoTresComponent', () => {
  let componente: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let mockRouter: any;

  beforeEach(async () => {
    mockRouter = { navigate: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [MockFirmaElectronicaComponent],
      declarations: [PasoTresComponent],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería llamar a obtieneFirma cuando se emita firma desde firma-electronica', () => {
    // Simula manualmente el evento firma
    const firmaComponent = fixture.debugElement.query(By.directive(MockFirmaElectronicaComponent)).componentInstance;

    // Emite una firma válida
    firmaComponent.simulateFirma();

    // Verifica que el router navegue después del evento
    expect(mockRouter.navigate).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
  });

  it('NO debería llamar a navigate si firma es una cadena vacía', () => {
    // Llama manualmente a obtieneFirma con una cadena vacía para probar el caso donde firma no es válida
    componente.obtieneFirma('');
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('debería renderizar el componente firma-electronica', () => {
    const firmaElement = fixture.debugElement.query(By.directive(MockFirmaElectronicaComponent));
    expect(firmaElement).toBeTruthy();
  });
});