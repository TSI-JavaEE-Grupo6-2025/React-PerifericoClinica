

import { Button } from './ui/Button'
import { Menu, X, Phone, Calendar } from 'lucide-react'
import { useState } from 'react'


export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                            <svg className='h-6 w-6 text-primary-foreground' fill='none' stroke="currentColor" viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                                />
                            </svg>
                        </div>
                         <span className="font-serif text-xl font-semibold text-foreground">Clínica Salud Integral</span>
                    </div>

                    <nav className="hidden items-center gap-6 md:flex">
                        <a 
                          href="#servicios"
                          className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                        >
                            Servicios
                        </a>
                        <a 
                          href="#especialidades"
                          className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                        >
                            Especialidades
                        </a>
                        <a 
                          href="#equipo"
                          className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                        >
                            Nuestro Equipo
                        </a>
                        <a 
                          href="#contacto"
                          className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                        >
                            Contacto
                        </a>
                    </nav>

                    <div>
                        <Button variant='ghost' size='sm' className='gap-2'>
                            <Phone className='h-4 w-4' />
                            <span className='text-sm'>Llamar</span>
                        </Button>
                        <Button size='sm' className='gap-2'>
                            <Calendar className='h-4 w-4' />
                            <span className='text-sm'>Agendar Cita</span>
                        </Button>
                    </div>

                    <button className='md:hidden' onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label='Toggle menu'>
                        {mobileMenuOpen ? <X className='h-6 w-6'/> : <Menu className='h-6 w-6'/>}
                    </button>
                    {mobileMenuOpen && (
                        <div className="border-t border-border py-4 md:hidden">
                        <nav className="flex flex-col gap-4">
                          <a href="#servicios" className="text-sm font-medium text-foreground/80">
                            Servicios
                          </a>
                          <a href="#especialidades" className="text-sm font-medium text-foreground/80">
                            Especialidades
                          </a>
                          <a href="#equipo" className="text-sm font-medium text-foreground/80">
                            Nuestro Equipo
                          </a>
                          <a href="#contacto" className="text-sm font-medium text-foreground/80">
                            Contacto
                          </a>
                          <div className="flex flex-col gap-2 pt-2">
                            <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
                              <Phone className="h-4 w-4" />
                              Llamar
                            </Button>
                            <Button size="sm" className="w-full gap-2">
                              <Calendar className="h-4 w-4" />
                              Agendar Cita
                            </Button>
                          </div>
                        </nav>
                      </div>
                    )}
                </div>
            </div>
        </header>
    )
}