import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Reservation } from "./entities/reservation.entity.js";
import { ReservationDto } from "./reservation.dto.js";
import type { DashboardStats } from "@uneg-lab/api-types/dashboard.js";

const ESTADOS = ["Pendiente", "Aprobada", "Rechazada", "Cancelada"] as const;

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationsRepository: Repository<Reservation>,
  ) {}

  async findAll(): Promise<ReservationDto[]> {
    return MOCK_RESERVATIONS;
  }

  getStats(): DashboardStats {
    const counts = { Pendiente: 0, Aprobada: 0, Rechazada: 0, Cancelada: 0 };
    for (const r of MOCK_RESERVATIONS) {
      if (r.estado in counts) counts[r.estado as keyof typeof counts]++;
    }
    return {
      pendientes: counts.Pendiente,
      aprobadas: counts.Aprobada,
      rechazadas: counts.Rechazada,
      canceladas: counts.Cancelada,
      total: MOCK_RESERVATIONS.length,
    };
  }

  findAllPaginated(
    page: number,
    limit: number,
    estado?: string,
  ): { data: ReservationDto[]; total: number } {
    let list = [...MOCK_RESERVATIONS];
    if (estado && ESTADOS.includes(estado as (typeof ESTADOS)[number])) {
      list = list.filter((r) => r.estado === estado);
    }
    const total = list.length;
    const start = (page - 1) * limit;
    const data = list.slice(start, start + limit);
    return { data, total };
  }
}

const MOCK_RESERVATIONS: ReservationDto[] = [
  {
    id: 3,
    nombre: "Carlos López",
    fecha: "19/11/2025",
    estado: "Pendiente",
    descripcion: "Reserva para reunión de equipo",
  },
  {
    id: 4,
    nombre: "Ana Martínez",
    fecha: "21/11/2025",
    estado: "Aprobada",
    descripcion: "Reserva de sala de conferencias",
  },
  {
    id: 5,
    nombre: "Carlos López",
    fecha: "19/11/2025",
    estado: "Pendiente",
    descripcion: "Reserva para reunión de equipo",
  },
  {
    id: 6,
    nombre: "Ana Martínez",
    fecha: "21/11/2025",
    estado: "Aprobada",
    descripcion: "Reserva de sala de conferencias",
  },
  ...Array.from({ length: 26 }, (_, i) => ({
    id: 7 + i,
    nombre: "Lorenzo Parra",
    fecha: `${25 + (i % 5)} ene 2026`,
    estado: "Pendiente" as const,
    descripcion:
      "Se necesita con urgencia esta aula para clases de POO y laboratorios.",
  })),
  ...Array.from({ length: 9 }, (_, i) => ({
    id: 33 + i,
    nombre: "Lorenzo Parra",
    fecha: `${20 + i} ene 2026`,
    estado: "Aprobada" as const,
    descripcion: "Reserva aprobada para evento académico.",
  })),
];
