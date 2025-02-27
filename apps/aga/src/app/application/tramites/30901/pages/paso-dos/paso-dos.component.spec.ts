import { CommonModule } from '@angular/common';
import { ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PasoDosComponent } from './paso-dos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { AlertComponent, AnexarDocumentosComponent, RenovacionesMuestrasMercanciasService, TableComponent, TituloComponent } from '@ng-mf/data-access-user';

fdescribe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let renovacionesService: RenovacionesMuestrasMercanciasService;

  beforeEach(async () => {
    const renovacionesServiceMock = {
      obtenerOpcionesDesplegables: jasmine
        .createSpy('obtenerOpcionesDesplegables')
        .and.returnValue(
          of({
            requisitosObligatoriosTabla: {
              tableHeader: [],
              tableBody: [
                ['Hoja de Seguridad'],
                [
                  'Opinión positiva sobre el cumplimiento de las obligaciones tributarias.',
                ],
              ],
            },
          })
        ),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        PasoDosComponent,
        TituloComponent,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        TableComponent,
        AlertComponent,
        AnexarDocumentosComponent,
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [
        ToastrService,
        {
          provide: RenovacionesMuestrasMercanciasService,
          useValue: renovacionesServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    renovacionesService = TestBed.inject(RenovacionesMuestrasMercanciasService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerDatosIniciales on ngOnInit', () => {
    spyOn(component, 'obtenerDatosIniciales');
    component.ngOnInit();
    expect(component.obtenerDatosIniciales).toHaveBeenCalled();
  });

  it('should set tableData correctly when obtenerDatosIniciales is called', () => {
    component.obtenerDatosIniciales();
    fixture.detectChanges();
    expect(component.tableData.tableHeader).toEqual([]);
    expect(component.tableData.tableBody).toEqual([
      { tbodyData: ['Hoja de Seguridad'] },
      {
        tbodyData: [
          'Opinión positiva sobre el cumplimiento de las obligaciones tributarias.',
        ],
      },
    ]);
  });

  it('should call obtenerOpcionesDesplegables from renovacionesService when obtenerDatosIniciales is called', () => {
    component.obtenerDatosIniciales();
    expect(renovacionesService.obtenerOpcionesDesplegables).toHaveBeenCalled();
  });
});
