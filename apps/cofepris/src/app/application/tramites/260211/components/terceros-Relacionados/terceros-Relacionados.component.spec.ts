import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadoesComponent } from './terceros-Relacionados.component';

describe('TercerosRelacionadoesComponent', () => {
  let component: TercerosRelacionadoesComponent;
  let fixture: ComponentFixture<TercerosRelacionadoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TercerosRelacionadoesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
