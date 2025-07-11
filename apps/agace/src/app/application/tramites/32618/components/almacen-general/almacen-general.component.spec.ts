import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlmacenGeneralComponent } from './almacen-general.component';

describe('AlmacenGeneralComponent', () => {
  let component: AlmacenGeneralComponent;
  let fixture: ComponentFixture<AlmacenGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlmacenGeneralComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlmacenGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
