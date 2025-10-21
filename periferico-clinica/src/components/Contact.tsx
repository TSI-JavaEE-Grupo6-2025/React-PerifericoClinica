
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Card, CardContent, Input, Button, Textarea } from "./ui"

export function Contact() {
  return (
    <section id="contacto" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Agenda tu Consulta
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            Estamos aquí para cuidar de tu salud. Contáctanos y agenda tu cita
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Dirección</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Av. Principal 123, Centro Médico
                    <br />
                    Ciudad, País 12345
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Teléfono</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    +1 (555) 123-4567
                    <br />
                    +1 (555) 987-6543
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    info@clinicasalud.com
                    <br />
                    citas@clinicasalud.com
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Horario</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Lunes a Viernes: 8:00 - 20:00
                    <br />
                    Sábados: 9:00 - 14:00
                    <br />
                    Emergencias: 24/7
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Nombre completo
                    </label>
                    <Input id="name" placeholder="Juan Pérez" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">
                      Teléfono
                    </label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="juan@ejemplo.com" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="specialty" className="text-sm font-medium text-foreground">
                    Especialidad
                  </label>
                  <Input id="specialty" placeholder="Ej: Cardiología" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Mensaje
                  </label>
                  <Textarea id="message" placeholder="Cuéntanos el motivo de tu consulta..." rows={4} />
                </div>

                <Button type="submit" className="w-full">
                  Enviar Solicitud
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
