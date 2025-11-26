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
import { useState, useEffect, useMemo } from 'react';
import { useTenantStore } from '../../../store/TenantStore';

// iconos necesarios
import { ArrowLeft, Building2, Lock, User } from 'lucide-react';
import { ROUTES } from '../../../routes/constants/routes';

// llamo al hook de useLogin
import { useLogin } from '../../../hooks/use-login';

export default function AdminLoginPage(){
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const { handleLogin, error, loading } = useLogin('ADMIN_CLINIC');
    const { tenant } = useTenantStore();

    // Obtener colores dinámicos del tenant
    const tenantData = useMemo(() => {
        if (!tenant) return null;
        return {
            colors: tenant.colors,
            logoBase64: tenant.logoBase64
        }
    }, [tenant]);

    const primaryColor = tenantData?.colors?.primary || '#2980b9';
    const textButtonColor = tenantData?.colors?.text || '#ffffff';

    // Aplicar colores dinámicos mediante CSS variables
    useEffect(() => {
        document.documentElement.style.setProperty('--clinic-primary', primaryColor);
        document.documentElement.style.setProperty('--clinic-text-button', textButtonColor);
    }, [primaryColor, textButtonColor]);

    const handleGoBack = () => {
        navigate(ROUTES.HOME)
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            await handleLogin(email, password); 
        } catch (error) {
            // El error ya se maneja en el hook
            console.error('Error en login:', error);
        }
    }

    

    return (
        
        <div className={GlobalStyles.layout.main}>
            <Button 
                onClick={handleGoBack} 
                className={`${GlobalStyles.layout.absolute_tl_4} flex items-center gap-2 ${GlobalStyles.animations.transition} cursor-pointer`}
                style={{ backgroundColor: 'var(--clinic-primary)', color: 'var(--clinic-text-button)' }}
            >
                <ArrowLeft className="w-4 h-4" />
                <span className={GlobalStyles.typography.sm}>Volver al inicio</span>
            </Button>
            <Card className="w-full max-w-md">
                <CardHeader className={`${GlobalStyles.spacing.space.xs_1} text-center`}>
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-[var(--clinic-primary)] rounded-full flex items-center justify-center overflow-hidden">
                            {tenantData?.logoBase64 ? (
                                <img
                                    src={tenantData.logoBase64 || "/placeholder.svg"}
                                    alt="Logo de la clínica"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Building2 className="w-8 h-8 text-[var(--clinic-text-button)]" />
                            )}
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
                                    className="pl-10 focus-visible:ring-[var(--clinic-primary)]/50 focus-visible:border-[var(--clinic-primary)]"
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
                                    className='pl-10 focus-visible:ring-[var(--clinic-primary)]/50 focus-visible:border-[var(--clinic-primary)]'
                                    required
                                />
                            </div>
                        </div>
                        <Button 
                            type="submit" 
                            className={`w-full ${GlobalStyles.components.button.base} cursor-pointer`}
                            style={{ backgroundColor: 'var(--clinic-primary)', color: 'var(--clinic-text-button)' }}
                            disabled={loading}
                        >
                            {loading ? "Ingresando..." : "Ingresar como Administrador"}
                        </Button>
                        {error && <p className={`text-red-500 ${GlobalStyles.typography.sm}`}>{error}</p>}
                    </form>
                </CardContent>
            </Card>
        </div>
    




    )


}