

export class Password {
    private readonly password: string;

    constructor(value: string) {
        
        this.password = value;
        this.validate(value);
        
    }

    private validate(password: string): void {
        if (!password || password.trim().length === 0) {
            throw new Error('La contraseña no puede estar vacía.');
        }
        if (password.length < 8) {
            throw new Error('La contraseña debe tener al menos 8 caracteres.');
        }
        // if(!/(?=.*[a-z])/.test(password)){
        //     throw new Error('La contraseña debe tener al menos una letra minúscula.');
        // }

        // if(!/(?=.*[A-Z])/.test(password)){
        //     throw new Error('La contraseña debe tener al menos una letra mayúscula.');
        // }

        // if(!/(?=.*\d)/.test(password)){
        //     throw new Error('La contraseña debe tener al menos un número.');
        // }

        // if(!/(?=.*[@$!%*?&])/.test(password)){
        //     throw new Error('La contraseña debe tener al menos un caracter especial.');
        // }
    }

    toString(): string {
        return this.password.toString()
    }

    getValue(): string { return this.password;}
    equals(other: Password): boolean { return this.password === other.getValue();}
}