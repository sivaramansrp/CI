import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvisoDeCambioComponent } from './aviso-de-cambio.component';

describe('AvisoDeCambioComponent', () => {
  let component: AvisoDeCambioComponent;
  let fixture: ComponentFixture<AvisoDeCambioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvisoDeCambioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvisoDeCambioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
