import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label } from '../../../components';
import { Stethoscope } from '../../../components/icons';
import { ROUTES } from '../../../routes/constants/routes';
import { ArrowLeft, User, Lock } from 'lucide-react';
import { GlobalStyles } from '../../../styles/styles';

export const ProfesionalLoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const handleGoBack = () => {
        navigate(ROUTES.HOME);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate authentication
        setTimeout(() => {
            setLoading(false);
            if(email === 'profesional@clinica.com' && password === '123456'){
                alert('Autenticación como profesional de salud exitosa!');
                setError(null);
            }else{
                const errorMessage: string = 'Credenciales incorrectas';
                alert(errorMessage);
                setError(errorMessage);
            }
            navigate('/'); // -> luego colocar la ruta del dashboard
        }, 1000);
    };

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
                            <Stethoscope className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <CardTitle className={`${GlobalStyles.typography['2xl']} ${GlobalStyles.typography.bold} text-[${GlobalStyles.colors.sidebarBg}]`}>
                        Portal Profesional de Salud
                    </CardTitle>
                    <CardDescription>
                        Ingrese sus credenciales para acceder al sistema
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className={GlobalStyles.spacing.space.md_4}>
                        <div className={GlobalStyles.spacing.space.sm_2}>
                            <Label htmlFor="email">Correo electrónico</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="profesional@clinica.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9]"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9]"
                                    required
                                />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className={`w-full ${GlobalStyles.components.button.primary} cursor-pointer`}
                            disabled={loading}
                        >
                            {loading ? "Ingresando..." : "Ingresar como Profesional"}
                        </Button>
                        {error && <p className={`text-red-500 ${GlobalStyles.typography.sm}`}>{error}</p>}
                    </form>
                </CardContent>
            </Card>

        </div>
    );
};