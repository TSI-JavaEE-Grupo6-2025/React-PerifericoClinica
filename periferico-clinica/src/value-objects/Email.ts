
const PUBLIC_DOMAINS: string[] = [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'icloud.com',
    'live.com',
    'msn.com',
    'aol.com',
    'yahoo.es',
]



/**
 * Email Value Object
 * @description: Validación de correo electrónico acorde a las reglas de negocio.
 * - El correo electrónico debe ser válido.
 * - El correo electrónico debe ser corporativo de la clinica
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
        if(this.isPublicDomain()){
            throw new Error('El correo electrónico debe ser HCEN');
        }
    }

    toString(): string {
        return this.value.toString()
    }

    // obtenemos el dominio del email.
    getDomain(): string {
        return this.value.split('@')[1].toLowerCase();
    }

    private isPublicDomain(): boolean {
        return PUBLIC_DOMAINS.includes(this.getDomain());
    }

    getValue(): string { return this.value;}
    equals(other: Email): boolean { return this.value === other.getValue();}
}