import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui';
import { Building2, Stethoscope, ArrowRight } from '../../components/icons';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleAdminAccess = () => {
    navigate('/admin/login');
  };

  const handleProfessionalAccess = () => {
    navigate('/profesional/login');
  };

  return (
    <div className="min-h-screen bg-[#f4f7fa] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-[#2c3e50]">
            Sistema HCEN - Componente Periférico
          </h1>
          <p className="text-lg text-gray-600">
            Plataforma de gestión clínica integrada con Historia Clínica Electrónica Nacional
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:items-stretch">
          {/* Portal Administrativo */}
          <Card className="flex flex-col hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer">
            <CardHeader className="flex-1">
              <div className="w-16 h-16 bg-[#2980b9] rounded-full flex items-center justify-center mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-[#2c3e50]">
                Portal Administrativo
              </CardTitle>
              <CardDescription>
                Gestión de usuarios, profesionales y configuración de la clínica
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button 
                className="w-full bg-[#2980b9] hover:bg-[#2471a3] cursor-pointer"
                onClick={handleAdminAccess}
              >
                Acceder como Administrador
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Portal Profesional */}
          <Card className="flex flex-col">
            <CardHeader className="flex-1 hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer">
              <div className="w-16 h-16 bg-[#2980b9] rounded-full flex items-center justify-center mb-4">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-[#2c3e50]">
                Portal Profesional
              </CardTitle>
              <CardDescription>
                Acceso a historia clínica y gestión de documentos médicos
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button 
                className="w-full bg-[#2980b9] hover:bg-[#2471a3] cursor-pointer"
                onClick={handleProfessionalAccess}
              >
                Acceder como Profesional
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Status Card */}
        <Card className="bg-white/80 border-[#2980b9]/10">
          <CardContent className="pt-6 cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
              <div>
                <p className="font-medium text-[#2c3e50]">Sistema Integrado con HCEN</p>
                <p className="text-sm text-gray-600">
                  Conexión activa con el componente central. Todos los datos se sincronizan 
                  automáticamente con el INUS y RNDC.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
