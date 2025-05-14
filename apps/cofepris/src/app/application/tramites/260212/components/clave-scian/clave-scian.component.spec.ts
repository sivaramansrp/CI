import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ClaveScianComponent } from './clave-scian.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClaveScianComponent', () => {
  let component: ClaveScianComponent;
  let fixture: ComponentFixture<ClaveScianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ClaveScianComponent,HttpClientTestingModule],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(ClaveScianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize claveForm with default values', () => {
    expect(component.claveForm).toBeDefined();
    expect(component.claveForm.get('clave')).toBeTruthy();
    expect(component.claveForm.get('clave')?.value).toBe('');
    expect(component.claveForm.get('descripcion')).toBeTruthy();
    expect(component.claveForm.get('descripcion')?.value).toBe('');
  });

  it('should emit cancel event on cancelar method', () => {
    spyOn(component.cancel, 'emit');
    component.cancelar();
    expect(component.cancel.emit).toHaveBeenCalled();
  });

  it('should complete and destroy destroy$ on ngOnDestroy', () => {
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });
});

