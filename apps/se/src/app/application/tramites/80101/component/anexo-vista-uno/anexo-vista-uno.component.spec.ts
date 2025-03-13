import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnexoVistaUnoComponent } from './anexo-vista-uno.component';

describe('AnexoVistaUnoComponent', () => {
  let component: AnexoVistaUnoComponent;
  let fixture: ComponentFixture<AnexoVistaUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnexoVistaUnoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnexoVistaUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
