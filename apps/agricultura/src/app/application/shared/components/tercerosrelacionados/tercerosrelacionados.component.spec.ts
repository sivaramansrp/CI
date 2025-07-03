import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosrelacionadosComponent } from './tercerosrelacionados.component';

describe('TercerosrelacionadosComponent', () => {
  let component: TercerosrelacionadosComponent;
  let fixture: ComponentFixture<TercerosrelacionadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TercerosrelacionadosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosrelacionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
