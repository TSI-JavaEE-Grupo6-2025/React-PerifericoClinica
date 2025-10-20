import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui';
import { Building2, Stethoscope, ArrowRight } from '../../components/icons';
import { GlobalStyles } from '../../styles/styles';

import { TENANT_CONFIG } from '../../config/tenant-config';
import { extractTenantFromDomain } from '../../utils/domain-utils';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleAdminAccess = () => {
    navigate('/admin/login');
  };

  const handleProfessionalAccess = () => {
    navigate('/profesional/login');
  };
   
  // integrar useTenantFetcher para dibujar luego el logo de la clinica
  //const config = TENANT_CONFIG.development; // aunque coloque en produccion , va detectar que estoy en localhost y retornara dev-tenant 
  const domain = extractTenantFromDomain(window.location.hostname,{
    allDomain: true
  });
  
  console.log('configuración de desarrollo: ', TENANT_CONFIG.development);
  console.log('Probando la captura del dominio en home page en entorno de development: ', domain);

  return (
    <div className={GlobalStyles.layout.main}>
      <div className={GlobalStyles.layout.container}>
        {/* logo de la clínica */}
        {
          domain && (
            <span className='text-4xl text-center justify-center flex text-gray-500'>El dominio de la clínica es: {domain} - 👉Logo👈</span>
          )
        }
        <div className={`text-center ${GlobalStyles.spacing.space.md_4}`}>
          <h1 className={`${GlobalStyles.typography['4xl']} ${GlobalStyles.typography.bold} text-[#2c3e50]`}>
            Sistema HCEN - Componente Periférico
          </h1>
          <p className={`${GlobalStyles.typography.lg} text-gray-600`}>
            Plataforma de gestión clínica integrada con Historia Clínica Electrónica Nacional
          </p>
        </div>

        <div className={`${GlobalStyles.layout.grid}`}>
          {/* Portal Administrativo */}
          <Card className={`flex flex-col ${GlobalStyles.animations.hover} ${GlobalStyles.animations.transition} cursor-pointer`}>
            <CardHeader className="flex-1">
              <div className={`w-16 h-16 bg-[${GlobalStyles.colors.primary}] rounded-full flex items-center justify-center ${GlobalStyles.spacing.margin.sm_4}`}>
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <CardTitle className={`${GlobalStyles.typography['2xl']} ${GlobalStyles.typography.semibold} text-[${GlobalStyles.colors.sidebarBg}]`}>
                Portal Administrativo
              </CardTitle>
              <CardDescription>
                Gestión de usuarios, profesionales y configuración de la clínica
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button 
                className={`w-full ${GlobalStyles.components.button.primary} cursor-pointer`}
                onClick={handleAdminAccess}
              >
                Acceder como Administrador
                <ArrowRight className={`ml-2 h-4 w-4`} />
              </Button>
            </CardContent>
          </Card>

          {/* Portal Profesional */}
          <Card className="flex flex-col">
            <CardHeader className={`flex flex-col ${GlobalStyles.animations.hover} ${GlobalStyles.animations.transition} cursor-pointer`}>
              <div className={`w-16 h-16 bg-[${GlobalStyles.colors.primary}] rounded-full flex items-center justify-center ${GlobalStyles.spacing.margin.sm_4}`}>
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <CardTitle className={`${GlobalStyles.typography['2xl']} ${GlobalStyles.typography.semibold} text-[${GlobalStyles.colors.sidebarBg}]`}>
                Portal Profesional
              </CardTitle>
              <CardDescription>
                Acceso a historia clínica y gestión de documentos médicos
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button 
                className={`w-full ${GlobalStyles.components.button.primary} cursor-pointer`}
                onClick={handleProfessionalAccess}
              >
                Acceder como Profesional
                <ArrowRight className={`ml-2 h-4 w-4`} />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Status Card */}
        <Card className="bg-white/80 border-[#2980b9]/10">
          <CardContent className="pt-6 cursor-pointer">
            <div className={`flex items-start ${GlobalStyles.spacing.gap.md_4}`}>
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
              <div>
                <p className={`${GlobalStyles.typography.medium} text-[${GlobalStyles.colors.sidebarBg}]`}>Sistema Integrado con HCEN</p>
                <p className={`${GlobalStyles.typography.sm} text-gray-600`}>
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
