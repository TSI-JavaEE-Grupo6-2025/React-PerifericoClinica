import type { UserHcen } from "../types/userHcen";
import { Email } from "./Email";
import { Password } from "./Password";

export class UserCredentials {
    public readonly email: Email;
    public readonly password: Password;

    constructor(email: Email, password: Password) {
        this.email = email;
        this.password = password;
        this.validate();
    }

    private validate(): void {
        const domainURL = window.location.hostname;
        if (!domainURL || domainURL.trim() === '') {
            throw new Error('Domain URL is required');
        }
    }

    static fromForm(email: string, password: string): UserCredentials {
        const emailVO = new Email(email);
        const passwordVO = new Password(password);
        
        return new UserCredentials(emailVO, passwordVO);
    }

    toBackendPayLoad(): UserHcen {
        return {
            email: this.email.getValue(),
            password: this.password.getValue(),
            domain: window.location.hostname,
        }

    }
}


