import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RenunciaDeDerechosDeComponent } from './renuncia-de-derechos-de.component';

describe('RenunciaDeDerechosDeComponent', () => {
  let component: RenunciaDeDerechosDeComponent;
  let fixture: ComponentFixture<RenunciaDeDerechosDeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RenunciaDeDerechosDeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RenunciaDeDerechosDeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
