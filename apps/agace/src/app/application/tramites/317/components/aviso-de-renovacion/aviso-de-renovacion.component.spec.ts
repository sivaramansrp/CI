import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvisoDeRenovacionComponent } from './aviso-de-renovacion.component';

describe('AvisoDeRenovacionComponent', () => {
  let component: AvisoDeRenovacionComponent;
  let fixture: ComponentFixture<AvisoDeRenovacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvisoDeRenovacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvisoDeRenovacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
