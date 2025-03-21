import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetosDeLaMercanciaComponent } from './detos-de-la-mercancia.component';

describe('DetosDeLaMercanciaComponent', () => {
  let component: DetosDeLaMercanciaComponent;
  let fixture: ComponentFixture<DetosDeLaMercanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetosDeLaMercanciaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetosDeLaMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
