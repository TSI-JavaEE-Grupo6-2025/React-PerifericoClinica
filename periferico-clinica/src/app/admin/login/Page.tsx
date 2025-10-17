// Page for the admin login
// src/app/admin/login/Page.tsx

import React from 'react';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    Input,
    Label,
    Button
} from '../../../components';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// iconos necesarios
import { ArrowLeft, Building2, Lock, User } from 'lucide-react';
import { ROUTES } from '../../../routes/constants/routes';



export default function AdminLoginPage(){
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    // estado global para almacenar la autenticación del usuario
    // -> aqui
    const [error, setError] = useState<string | null>('');

    const handleGoBack = () => {
        navigate(ROUTES.HOME)
    };


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // simulamos la autenticación
        setTimeout(() => {
            setLoading(false);
            if(email === 'admin@clinica.com' && password === '123456'){
                alert('Autenticación exitosa');
                setError(null);
                
            }else{
                const errorMessage: string = 'Credenciales incorrectas';
                alert(errorMessage);
                setError(errorMessage);
            }
            navigate('/'); // -> luego colocar la ruta del dashboard
        }, 1000);
    }

    return (
        
        <div className="min-h-screen flex items-center justify-center bg-[#f4f7fa] p-4">
            <Button onClick={handleGoBack} className="absolute top-4 left-4 flex items-center gap-2 text-[#2980b9] transition-colors mb-4 cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
                <span className='text-sm'>Volver al inicio</span>
            </Button>
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className='w-16 h-16 bg-[#2980b9] rounded-full flex items-center justify-center'>
                            <Building2 className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    <CardTitle className="text-2xl font-bold text-[#2c3e50]">Portal Admin Clínica</CardTitle>
                    <CardDescription>Ingrese sus credenciales para acceder al sistema</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={(e: React.FormEvent) => handleLogin(e)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor='email'>Correo electrónico</Label>
                            <div className="relative">
                         
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id='email'
                                    type='email'
                                    placeholder='admin@clinica.com'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9]"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor='password'>Contraseña</Label>
                            <div className="relative">
                            
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id='password'
                                    type='password'
                                    placeholder='••••••••'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='pl-10 focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9]'
                                    required
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full bg-[#2980b9] hover:bg-[#2471a3] cursor-pointer" disabled={loading}>
                            {loading ? "Ingresando..." : "Ingresar como Administrador"}
                        </Button>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </form>
                </CardContent>
            </Card>
        </div>
    




    )


}