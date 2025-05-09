import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosPorGarantiaComponent } from './datos-por-garantia.component';

describe('DatosPorGarantiaComponent', () => {
  let component: DatosPorGarantiaComponent;
  let fixture: ComponentFixture<DatosPorGarantiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosPorGarantiaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosPorGarantiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
