import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosFabSeccionComponent } from './terceros-relacionados-fab-seccion.component';

describe('TercerosRelacionadosFabSeccionComponent', () => {
  let component: TercerosRelacionadosFabSeccionComponent;
  let fixture: ComponentFixture<TercerosRelacionadosFabSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TercerosRelacionadosFabSeccionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosFabSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
