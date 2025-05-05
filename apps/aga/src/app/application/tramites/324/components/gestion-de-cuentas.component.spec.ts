import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionDeCuentasComponent } from './gestion-de-cuentas.component';

describe('GestionDeCuentasComponent', () => {
  let component: GestionDeCuentasComponent;
  let fixture: ComponentFixture<GestionDeCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionDeCuentasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionDeCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
