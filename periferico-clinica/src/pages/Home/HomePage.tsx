import React, {useEffect, useMemo} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui';
import { Building2, Stethoscope, ArrowRight } from '../../components/icons';
import { GlobalStyles } from '../../styles/styles';
import { setDocumentTitle } from '../../utils';

import { useTenantStore } from '../../store/TenantStore';


export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleAdminAccess = () => {
    navigate('/admin/login');
  };

  const handleProfessionalAccess = () => {
    navigate('/profesional/login');
  };
  const { tenant } = useTenantStore();
  const name = tenant?.name || 'Clínica'

  useEffect(()=> {
    setDocumentTitle(name)
  },[name])
  
  // movi la logica de tenantFetch a ProtectedHome.tsx

  const tenantData = useMemo(() => {
    if (!tenant) return null;
    return {
      id: tenant.tenantId,
      name: tenant.name,
      domain: tenant.domain,
      logoBase64: tenant.logoBase64,
      colors: tenant.colors
    }
  }, [tenant]);

  

  
  
  const primaryColor = tenantData?.colors?.primary || '#2980b9'
  const textButtonColor = tenantData?.colors?.text || '#ffffff';

  // Aplicar colores dinámicos mediante CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty('--clinic-primary', primaryColor);
    document.documentElement.style.setProperty('--clinic-text-button', textButtonColor);
  }, [primaryColor, textButtonColor]);

  return (
    <div className={GlobalStyles.layout.main}>
      <div className={GlobalStyles.layout.container}>
        <div className='flex flex-col items-center justify-center mb-8'>
          <div className="w-24 h-24 rounded-full bg-[var(--clinic-primary)] flex items-center justify-center overflow-hidden shadow-lg">
            {tenantData?.logoBase64 ? (
              <img
                src={tenantData.logoBase64 || "/placeholder.svg"}
                alt={`Logo ${tenantData.name}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <Building2 className="w-8 h-8 text-[var(--clinic-text-button)]" />
            )}
          </div>
          {tenantData && <p className="mt-3 text-lg font-semibold text-[#2c3e50]">{tenantData.name}</p>}
        </div>
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
              <div className={`w-16 h-16 rounded-full bg-[var(--clinic-primary)] flex items-center justify-center ${GlobalStyles.spacing.margin.sm_4}`}>
                <Building2 className="w-8 h-8 text-[var(--clinic-text-button)]" />
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
                className={`w-full ${GlobalStyles.components.button.base} cursor-pointer`}
                style={{ backgroundColor: 'var(--clinic-primary)', color: 'var(--clinic-text-button)' }}
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
              <div className={`w-16 h-16 rounded-full bg-[var(--clinic-primary)] flex items-center justify-center ${GlobalStyles.spacing.margin.sm_4}`}>
                <Stethoscope className="w-8 h-8 text-[var(--clinic-text-button)]" />
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
                className={`w-full ${GlobalStyles.components.button.base} cursor-pointer`}
                style={{ backgroundColor: 'var(--clinic-primary)', color: 'var(--clinic-text-button)' }}
                onClick={handleProfessionalAccess}
              >
                Acceder como Profesional
                <ArrowRight className={`ml-2 h-4 w-4`} />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Status Card */}
        <Card className="bg-white/80" style={{ borderColor: `${primaryColor}1a` }}>
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
