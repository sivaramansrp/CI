import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarDestinatarioComponent } from './agregar-destinatario.component';

describe('AgregarDestinatarioComponent', () => {
  let component: AgregarDestinatarioComponent;
  let fixture: ComponentFixture<AgregarDestinatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarDestinatarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarDestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
