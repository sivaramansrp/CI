import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosVistaComponent } from './terceros-relacionados-vista.component';

describe('TercerosRelacionadosVistaComponent', () => {
  let component: TercerosRelacionadosVistaComponent;
  let fixture: ComponentFixture<TercerosRelacionadosVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TercerosRelacionadosVistaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
