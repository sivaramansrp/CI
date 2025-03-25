import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarDestinatarioFinalComponent } from './agregar-destinatario-final.component';

describe('AgregarDestinatarioFinalComponent', () => {
  let component: AgregarDestinatarioFinalComponent;
  let fixture: ComponentFixture<AgregarDestinatarioFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarDestinatarioFinalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarDestinatarioFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
