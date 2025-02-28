import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ProsecModificacionComponent} from './prosec-modificacion.component'

describe('ProsecModificacionComponent', () => {
  let component: ProsecModificacionComponent;
  let fixture: ComponentFixture<ProsecModificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProsecModificacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProsecModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
