import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubProductosContenedoraComponent } from './sub-productos-contenedora.component';

describe('SubProductosContenedoraComponent', () => {
  let component: SubProductosContenedoraComponent;
  let fixture: ComponentFixture<SubProductosContenedoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubProductosContenedoraComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubProductosContenedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
