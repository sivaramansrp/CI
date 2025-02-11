import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosGeneralesComponent } from './datos-generales.component';
import { RevisionService } from '../../../../core/services/220501/revision.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('DatosGeneralesComponent', () => {
  let component: DatosGeneralesComponent;
  let fixture: ComponentFixture<DatosGeneralesComponent>;
  let revisionService: RevisionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosGeneralesComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [RevisionService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosGeneralesComponent);
    component = fixture.componentInstance;
    revisionService = TestBed.inject(RevisionService);
    fixture.detectChanges();
  });

  it('should toggle classes on an element', () => {
    const element = document.createElement('div');
    element.classList.add('bi-caret-up-fill');
    component.myFunction(element);
    expect(element.classList.contains('bi-caret-up-fill')).toBeFalse();
    expect(element.classList.contains('bi-caret-down')).toBeTrue();
  });

  it('should validate form field', () => {
    const form = component.forma;
    const field = 'someField';
    expect(component.isValid(form, field)).toBeTrue();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
