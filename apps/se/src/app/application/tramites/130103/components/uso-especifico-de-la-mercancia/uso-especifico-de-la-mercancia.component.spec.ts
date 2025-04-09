import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsoEspecificoDeLaMercanciaComponent } from './uso-especifico-de-la-mercancia.component';

describe('UsoEspecificoDeLaMercanciaComponent', () => {
  let component: UsoEspecificoDeLaMercanciaComponent;
  let fixture: ComponentFixture<UsoEspecificoDeLaMercanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsoEspecificoDeLaMercanciaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsoEspecificoDeLaMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
