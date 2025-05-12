import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosTerritorioComponent } from './datos-territorio.component';

describe('DatosTerritorioComponent', () => {
  let component: DatosTerritorioComponent;
  let fixture: ComponentFixture<DatosTerritorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosTerritorioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosTerritorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
