import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { animate, state, style, transition, trigger } from '@angular/animations';


export interface ColumnConfig {
    encabezado: string;
    clave: string;
    width?: string;
}

@Component({
    selector: 'app-tabla-expandida',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tabla-dinamica-expandida.component.html',
    styleUrls: ['./tabla-dinamica-expandida.component.css'],
    animations: [
        trigger('expandCollapse', [
            state('void', style({
                height: '0',
                opacity: 0
            })),
            state('*', style({
                height: '*',
                opacity: 1
            })),
            transition('void <=> *', animate('200ms ease-in-out'))
        ])
    ]
})
export class TablaDinamicaExpandidaComponent {
    /**
     * Un arreglo de objetos de configuración de columnas que se utiliza para definir
     * la estructura y el comportamiento de la tabla dinámica. Cada objeto en el arreglo
     * debe cumplir con la interfaz `ColumnConfig`, especificando propiedades como el encabezado
     * de la columna, el mapeo de campos, el formato y otras opciones de visualización.
     *
     * @ejemplo
     * columns = [
     *   { encabezado: 'Nombre', clave: 'nombre' },
     *   { encabezado: 'Edad', clave: 'edad', width: '100px' }
     * ];
     */
    @Input() columns: ColumnConfig[] = [];
    /**
     * Un arreglo de objetos que representa las filas de la tabla.
     * Cada objeto debe contener las claves definidas en la configuración de columnas.
     *
     * @ejemplo
     * data = [
     *   { nombre: 'Juan', edad: 30 },
     *   { nombre: 'Ana', edad: 25 }
     * ];
     */
    @Input() data: Record<string, unknown>[] = [];
    /**
     * Indica si la tabla es expandible o no.
     * Cuando es `true`, permite expandir filas para mostrar información adicional.
     * Valor por defecto: `false`.
     */
    @Input() expandible = false;
    /**
     * Permite inyectar un TemplateRef personalizado para mostrar contenido anidado
     * dentro de la fila expandida de la tabla. Si se proporciona, este template se
     * renderizará cuando una fila esté expandida.
     *
     * @ejemplo
     * <ng-template #detalle let-elemento>
     *   <div>Detalles: {{ elemento | json }}</div>
     * </ng-template>
     * <app-tabla-expandida [nestedContent]="detalle"></app-tabla-expandida>
     */
    @Input() nestedContent: TemplateRef<unknown> | null = null;

    /**
     * Evento que se emite cuando una fila es expandida.
     * El valor emitido es el objeto de datos correspondiente a la fila expandida.
     */
    @Output() rowExpanded = new EventEmitter<Record<string, unknown>>();

    /**
     * Índice de la fila actualmente expandida.
     * Si no hay ninguna fila expandida, su valor es -1.
     */
    expandedIndex: number = -1;

    /**
     * Alterna la expansión de una fila en la tabla dinámica.
     * 
     * Si la fila especificada por el índice ya está expandida, la colapsa.
     * Si no está expandida, la expande y emite el evento `rowExpanded` con los datos de la fila seleccionada.
     * 
     * @param index - Índice de la fila a expandir o colapsar.
     */
    toggleRow(index: number): void {
        if (this.expandedIndex === index) {
            this.expandedIndex = -1;
        } else {
            this.expandedIndex = index;
            this.rowExpanded.emit(this.data[index]);
        }
    }
}


