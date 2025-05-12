import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartidasDeLaMercanciaComponent } from './Partidas-de-la-mercancia.component';

describe('PartidasDeLaMercanciaComponent', () => {
  let component: PartidasDeLaMercanciaComponent;
  let fixture: ComponentFixture<PartidasDeLaMercanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartidasDeLaMercanciaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PartidasDeLaMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
