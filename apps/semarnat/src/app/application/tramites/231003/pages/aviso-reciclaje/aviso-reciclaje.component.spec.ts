import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvisoReciclajeComponent } from './aviso-reciclaje.component';

describe('AvisoReciclajeComponent', () => {
  let component: AvisoReciclajeComponent;
  let fixture: ComponentFixture<AvisoReciclajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvisoReciclajeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvisoReciclajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
