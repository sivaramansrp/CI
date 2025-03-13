import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'traducir' })
export class TranslatePipe implements PipeTransform {
    private translations: { [key: string]: string } = {
        'HELLO': 'Hola',
        'GOODBYE': 'Adiós'
    };

    transform(value: string, ...args: string[]): string {
        return this.translations[value] || value;
    }

    static transform(value: string | boolean | number): string | boolean | number {
        return value;
    }
}