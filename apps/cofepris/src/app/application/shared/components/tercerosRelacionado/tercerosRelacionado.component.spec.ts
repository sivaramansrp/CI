import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadoComponent } from './tercerosRelacionado.component';

describe('TercerosRelacionadoComponent', () => {
  let component: TercerosRelacionadoComponent;
  let fixture: ComponentFixture<TercerosRelacionadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TercerosRelacionadoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
