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
import { GlobalStyles } from '../../../styles/styles';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// iconos necesarios
import { ArrowLeft, Building2, Lock, User } from 'lucide-react';
import { ROUTES } from '../../../routes/constants/routes';

// llamo al hook de useLogin
import { useLogin } from '../../../hooks/use-login';

export default function AdminLoginPage(){
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const { handleLogin, error, loading } = useLogin();

    const handleGoBack = () => {
        navigate(ROUTES.HOME)
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            console.log('Email enviado a handleSubmit: ', email)
            console.log('Password enviado a handleSubmit: ', password)
            await handleLogin(email, password); 
        } catch (error) {
            // El error ya se maneja en el hook
            console.error('Error en login:', error);
        }
    }

    

    return (
        
        <div className={GlobalStyles.layout.main}>
            <Button onClick={handleGoBack} className={`${GlobalStyles.layout.absolute_tl_4} flex items-center gap-2 text-[${GlobalStyles.colors.primary}] ${GlobalStyles.animations.transition} cursor-pointer`}>
                <ArrowLeft className="w-4 h-4" />
                <span className={GlobalStyles.typography.sm}>Volver al inicio</span>
            </Button>
            <Card className="w-full max-w-md">
                <CardHeader className={`${GlobalStyles.spacing.space.xs_1} text-center`}>
                    <div className="flex justify-center mb-4">
                        <div className={`w-16 h-16 bg-[${GlobalStyles.colors.primary}] rounded-full flex items-center justify-center`}>
                            <Building2 className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    <CardTitle className={`${GlobalStyles.typography['2xl']} ${GlobalStyles.typography.bold} text-[${GlobalStyles.colors.sidebarBg}]`}>Portal Admin Clínica</CardTitle>
                    <CardDescription>Ingrese sus credenciales para acceder al sistema</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={(e: React.FormEvent) => handleSubmit(e)} className={GlobalStyles.spacing.space.md_4}>
                        <div className={GlobalStyles.spacing.space.sm_2}>
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
                        <Button type="submit" className={`w-full ${GlobalStyles.components.button.primary} cursor-pointer`} disabled={loading}>
                            {loading ? "Ingresando..." : "Ingresar como Administrador"}
                        </Button>
                        {error && <p className={`text-red-500 ${GlobalStyles.typography.sm}`}>{error}</p>}
                    </form>
                </CardContent>
            </Card>
        </div>
    




    )


}