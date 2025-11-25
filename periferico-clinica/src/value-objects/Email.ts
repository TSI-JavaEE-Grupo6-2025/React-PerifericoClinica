
/**
 * Email Value Object
 * @description: Validación de correo electrónico acorde a las reglas de negocio.
 * - El correo electrónico debe ser válido.
 */

export class Email {
    private readonly value: string;

    constructor(value: string){
        if (!value || value.trim() === '') {
            throw new Error('Email cannot be empty');
        }
        this.value = value;
        this.validate(value);
    }
    private validate(value: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(value)){
            throw new Error('Correo electrónico no válido');
        }
        // Validación de dominio público removida - se permite cualquier email válido
    }

    toString(): string {
        return this.value.toString()
    }

    // obtenemos el dominio del email.
    getDomain(): string {
        return this.value.split('@')[1].toLowerCase();
    }

    getValue(): string { return this.value;}
    equals(other: Email): boolean { return this.value === other.getValue();}
}