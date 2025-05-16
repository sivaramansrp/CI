import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosContenedoraComponent } from './terceros-relacionados-contenedora.component';

describe('TercerosRelacionadosContenedoraComponent', () => {
  let componente: TercerosRelacionadosContenedoraComponent;
  let fixture: ComponentFixture<TercerosRelacionadosContenedoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TercerosRelacionadosContenedoraComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosContenedoraComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(componente).toBeTruthy();
  });
});
