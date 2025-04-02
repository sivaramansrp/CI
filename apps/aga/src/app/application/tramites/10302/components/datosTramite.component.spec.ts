import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosTramiteComponent } from './datosTramite.component';

describe('DatosTramiteComponent', () => {
  let component: DatosTramiteComponent;
  let fixture: ComponentFixture<DatosTramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosTramiteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
