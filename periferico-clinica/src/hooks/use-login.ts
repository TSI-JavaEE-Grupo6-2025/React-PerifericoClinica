// hook para la autenticación de usuarios administradores y profesionales

import { UserCredentials } from '../value-objects/UserCredentials';
import { AuthAdapter } from '../adapters/Auth/AuthAdapter';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const useLogin = (email: string, password: string) => {
    const navigate = useNavigate();
    // hook login
    const [error, setError] = useState<string | null>(null);
    


}
