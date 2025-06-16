import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelTramiteContenedoraComponent } from './datos-del-tramite-contenedora.component';
import { ActivatedRoute } from '@angular/router';
import { DatosDelTramiteComponent } from '../../../../shared/components/datos-del-tramite/datos-del-tramite.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('DatosDelTramiteContenedoraComponent', () => {
  let component: DatosDelTramiteContenedoraComponent;
  let fixture: ComponentFixture<DatosDelTramiteContenedoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [DatosDelTramiteComponent, DatosDelTramiteContenedoraComponent, ReactiveFormsModule,FormsModule,CommonModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelTramiteContenedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
