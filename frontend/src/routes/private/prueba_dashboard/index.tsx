import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  MapPin, 
  Code,
  User
} from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Datos mock para las estadísticas
const stats = {
  pendientes: 12,
  aprobadas: 60,
  rechazadas: 5,
  total: 77,
};

// Datos mock para las reservas
const reservas = [
  {
    id: 1,
    profesor: "Prof. Carlos Jiménez",
    curso: "Programación I",
    ubicacion: "Laboratorio de Computación",
    fechaInicio: "15/09/2025",
    fechaFin: "20/12/2025",
    horaInicio: "8:00",
    horaFin: "10:00",
    estado: "Pendiente",
  },
  {
    id: 2,
    profesor: "Prof. Sandra Martínez",
    curso: "Física II",
    ubicacion: "Laboratorio de Computación",
    fechaInicio: "18/09/2025",
    fechaFin: "22/12/2025",
    horaInicio: "14:00",
    horaFin: "16:00",
    estado: "Pendiente",
  },
  {
    id: 3,
    profesor: "Prof. Juan Rodríguez",
    curso: "Programación I",
    ubicacion: "Laboratorio de Computación",
    fechaInicio: "20/09/2025",
    fechaFin: "25/12/2025",
    horaInicio: "10:00",
    horaFin: "12:00",
    estado: "Pendiente",
  },
  {
    id: 4,
    profesor: "Prof. Marta Coro",
    curso: "Física II",
    ubicacion: "Laboratorio de Computación",
    fechaInicio: "22/09/2025",
    fechaFin: "27/12/2025",
    horaInicio: "16:00",
    horaFin: "18:00",
    estado: "Pendiente",
  },
];

export default function PruebaDashboard() {
  const [activeTab, setActiveTab] = useState<"todas" | "semestral" | "evento" | "especial">("todas");
  const [filterEstado, setFilterEstado] = useState<string>("todos");

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b bg-[#1e293b] px-4 text-white">
        <h1 className="text-lg font-semibold">Dashboard principal</h1>
        <div className="flex items-center gap-3">
          <Code className="size-5" />
          <div className="flex size-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold">
            DB
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="space-y-6 p-6">
        {/* Title Section */}
        <div>
          <h2 className="text-3xl font-bold">Panel de Administración</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Sistema de Reservas Laboratorio UNEG
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex size-12 items-center justify-center rounded-lg bg-orange-100">
                <Clock className="size-6 text-orange-600" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Pendientes</p>
                <p className="text-2xl font-bold">{stats.pendientes}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex size-12 items-center justify-center rounded-lg bg-green-100">
                <CheckCircle2 className="size-6 text-green-600" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Aprobadas</p>
                <p className="text-2xl font-bold">{stats.aprobadas}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex size-12 items-center justify-center rounded-lg bg-pink-100">
                <XCircle className="size-6 text-pink-600" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Rechazadas</p>
                <p className="text-2xl font-bold">{stats.rechazadas}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex size-12 items-center justify-center rounded-lg bg-blue-100">
                <Calendar className="size-6 text-blue-600" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reservation Management Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Gestión de Reservas</CardTitle>
                <CardDescription>
                  Revisa y aprueba las solicitudes de reserva
                </CardDescription>
              </div>
              <Select value={filterEstado} onValueChange={setFilterEstado}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Todos los estados" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="aprobada">Aprobada</SelectItem>
                  <SelectItem value="rechazada">Rechazada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Tabs */}
            <ToggleGroup
              type="single"
              value={activeTab}
              onValueChange={(value) => {
                if (value) setActiveTab(value as typeof activeTab);
              }}
              variant="outline"
            >
              <ToggleGroupItem value="todas">Todas</ToggleGroupItem>
              <ToggleGroupItem value="semestral">Semestral</ToggleGroupItem>
              <ToggleGroupItem value="evento">Evento</ToggleGroupItem>
              <ToggleGroupItem value="especial">Especial</ToggleGroupItem>
            </ToggleGroup>

            {/* Reservations List */}
            <div className="space-y-4">
              {reservas.map((reserva) => (
                <Card key={reserva.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                          <User className="size-4 text-muted-foreground" />
                          <span className="font-semibold">{reserva.profesor}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{reserva.curso}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="size-4 text-muted-foreground" />
                            <span>{reserva.ubicacion}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="size-4 text-muted-foreground" />
                            <span>
                              {reserva.fechaInicio} - {reserva.fechaFin}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="size-4 text-muted-foreground" />
                            <span>
                              {reserva.horaInicio} - {reserva.horaFin}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Ver detalles
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
                          >
                            <CheckCircle2 className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                          >
                            <XCircle className="size-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <Badge 
                        variant="outline" 
                        className="bg-orange-100 text-orange-700 border-orange-300"
                      >
                        {reserva.estado}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

