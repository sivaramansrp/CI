import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaisesDeDestinoComponent } from './paises-de-destino.component';

describe('PaisesDeDestinoComponent', () => {
  let component: PaisesDeDestinoComponent;
  let fixture: ComponentFixture<PaisesDeDestinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaisesDeDestinoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaisesDeDestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
