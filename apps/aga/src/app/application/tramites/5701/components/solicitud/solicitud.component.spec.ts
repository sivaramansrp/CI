import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudComponent } from './solicitud.component';
import { FormBuilder, ReactiveFormsModule, FormGroup, FormArray } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';

// Mock services and dependencies
const mockFormBuilder = new FormBuilder();
const mockChangeDetectorRef = { detectChanges: jest.fn() } as any;
const mockDomSanitizer = { bypassSecurityTrustUrl: jest.fn() } as any;

describe('SolicitudComponent', () => {
    let component: SolicitudComponent;
    let fixture: ComponentFixture<SolicitudComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, CatalogoSelectComponent, TituloComponent, HttpClientTestingModule],
            declarations: [SolicitudComponent],
            providers: [
                { provide: FormBuilder, useValue: mockFormBuilder },
                { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef },
                { provide: DomSanitizer, useValue: mockDomSanitizer },
                // Provide other required services as needed
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        // Assign patentes before component instantiation to avoid undefined errors
        (SolicitudComponent.prototype as any).patentes = { patentes: [], rfcs: [] };
        fixture = TestBed.createComponent(SolicitudComponent);
        component = fixture.componentInstance;
        // Minimal form structure for testing
        component.FormSolicitud = mockFormBuilder.group({
            datosImportadorExportador: mockFormBuilder.group({}),
            datosServicio: mockFormBuilder.group({ fechasSeleccionadas: mockFormBuilder.array([]) }),
            despacho: mockFormBuilder.group({}),
            pedimento: mockFormBuilder.array([]),
            personasResponsablesDespacho: mockFormBuilder.array([]),
            lineasCaptura: mockFormBuilder.array([]),
            mercancia: mockFormBuilder.group({}),
            pagoCaptura: mockFormBuilder.group({}),
            vehiculo: mockFormBuilder.group({ itemsVehiculo: mockFormBuilder.array([]) }),
            transporteArriboSalida: mockFormBuilder.group({}),
        });
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should return datosImportadorExportador FormGroup', () => {
        expect(component.datosImportadorExportador).toBeInstanceOf(FormGroup);
    });

    it('should return datosServicio FormGroup', () => {
        expect(component.datosServicio).toBeInstanceOf(FormGroup);
    });

    it('should return despacho FormGroup', () => {
        expect(component.despacho).toBeInstanceOf(FormGroup);
    });

    it('should return pedimento FormArray', () => {
        expect(component.pedimento).toBeInstanceOf(FormArray);
    });

    it('should return personasResponsablesDespacho FormArray', () => {
        expect(component.personasResponsablesDespacho).toBeInstanceOf(FormArray);
    });

    it('should return lineasCaptura FormArray', () => {
        expect(component.lineasCaptura).toBeInstanceOf(FormArray);
    });

    it('should return mercancia FormGroup', () => {
        expect(component.mercancia).toBeInstanceOf(FormGroup);
    });

    it('should return pagoCaptura FormGroup', () => {
        expect(component.pagoCaptura).toBeInstanceOf(FormGroup);
    });

    it('should return vehiculo FormGroup', () => {
        expect(component.vehiculo).toBeInstanceOf(FormGroup);
    });

    it('should return itemsVehiculo FormArray', () => {
        expect(component.itemsVehiculo).toBeInstanceOf(FormArray);
    });

    it('should return fechasSeleccionadas FormArray', () => {
        expect(component.fechasSeleccionadas).toBeInstanceOf(FormArray);
    });

    it('should have default values for boolean flags', () => {
        expect(component.colapsable).toBe(false);
        expect(component.mostrarRangoFechas).toBe(false);
        expect(component.isApoderado).toBe(false);
        expect(component.masDeUnaPatente).toBe(false);
        expect(component.masDeUnaEmpresa).toBe(false);
        expect(component.activarCatalogoDespacho).toBe(false);
        expect(component.desactivarSelectSeccionAduanera).toBe(false);
        expect(component.desactivarSelectRecinto).toBe(false);
    });

    it('should have default monto values as 0', () => {
        expect(component.montoACubrir).toBe(0);
        expect(component.montoPorDia).toBe(0);
        expect(component.montoPagadoLineas).toBe(0);
    });

    it('should have default muestraCertificaciones as true', () => {
        expect(component.muestraCertificaciones).toBe(true);
    });

    it('should have default activarCatalogoTipoOperacion as true', () => {
        expect(component.activarCatalogoTipoOperacion).toBe(true);
    });

    it('should have default activarRelacionSociedad and activarEncargoConferido as false', () => {
        expect(component.activarRelacionSociedad).toBe(false);
        expect(component.activarEncargoConferido).toBe(false);
    });

    it('should have default certificacionesDisabled, certificacionOEADisabled, revisionDisabled as true', () => {
        expect(component.certificacionesDisabled).toBe(true);
        expect(component.certificacionOEADisabled).toBe(true);
        expect(component.revisionDisabled).toBe(true);
    });

    it('should have default horaInicioUnmarked and horaFinUnmarked as false', () => {
        expect(component.horaInicioUnmarked).toBe(false);
        expect(component.horaFinUnmarked).toBe(false);
    });

    it('should have default resetearFechaInicioTouch as false', () => {
        expect(component.resetearFechaInicioTouch).toBe(false);
    });

    it('should have default mostarSelectTipoDespacho as false', () => {
        expect(component.mostarSelectTipoDespacho).toBe(false);
    });
});