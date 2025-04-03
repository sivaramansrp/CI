import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosModalComponent } from './terceros-relacionados-modal.component';

describe('TercerosRelacionadosModalComponent', () => {
  let component: TercerosRelacionadosModalComponent;
  let fixture: ComponentFixture<TercerosRelacionadosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TercerosRelacionadosModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
