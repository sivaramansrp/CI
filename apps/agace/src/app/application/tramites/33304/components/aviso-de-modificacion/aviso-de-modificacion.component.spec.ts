import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvisoDeModificacionComponent } from './aviso-de-modificacion.component';

describe('AvisoDeModificacionComponent', () => {
  let component: AvisoDeModificacionComponent;
  let fixture: ComponentFixture<AvisoDeModificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvisoDeModificacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvisoDeModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
