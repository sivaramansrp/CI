import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutorizacionDatosComponent } from './autorizacion-datos.component';

describe('AutorizacionDatosComponent', () => {
  let component: AutorizacionDatosComponent;
  let fixture: ComponentFixture<AutorizacionDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutorizacionDatosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutorizacionDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
