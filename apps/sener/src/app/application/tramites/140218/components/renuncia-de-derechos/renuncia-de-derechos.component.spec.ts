import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RenunciaDeDerechosComponent } from './renuncia-de-derechos.component';


describe('RenunciaDeDerechosComponent', () => {
  let component: RenunciaDeDerechosComponent;
  let fixture: ComponentFixture<RenunciaDeDerechosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenunciaDeDerechosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RenunciaDeDerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
