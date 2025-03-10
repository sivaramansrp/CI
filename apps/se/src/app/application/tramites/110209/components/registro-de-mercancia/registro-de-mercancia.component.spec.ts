import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroDeMercanciaComponent } from './registro-de-mercancia.component';

describe('RegistroDeMercanciaComponent', () => {
  let component: RegistroDeMercanciaComponent;
  let fixture: ComponentFixture<RegistroDeMercanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroDeMercanciaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroDeMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
