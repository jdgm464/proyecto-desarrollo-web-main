import { Injectable } from "@nestjs/common";
import type { DashboardStats } from "@uneg-lab/api-types/dashboard.js";
import PDFDocument from "pdfkit";
import { ReservationsService } from "../reservations/reservations.service.js";

@Injectable()
export class DashboardService {
  constructor(private readonly reservationsService: ReservationsService) {}

  getStats(): DashboardStats {
    return this.reservationsService.getStats();
  }

  getReservationsPaginated(
    page: number,
    limit: number,
    estado?: string,
  ) {
    return this.reservationsService.findAllPaginated(page, limit, estado);
  }

  async generatePdf(): Promise<Buffer> {
    const { data: reservas } =
      this.reservationsService.findAllPaginated(1, 1000);
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 });
      const chunks: Buffer[] = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      doc.fontSize(20).text("Sistema de Reservas Laboratorio UNEG", { align: "center" });
      doc.moveDown();
      doc.fontSize(14).text("Reporte de solicitudes de reserva", { align: "center" });
      doc.moveDown(2);

      doc.fontSize(10);
      reservas.forEach((r, i) => {
        doc.text(`${i + 1}. ${r.nombre}`, { continued: false });
        doc.text(`   Fecha: ${r.fecha} | Estado: ${r.estado}`);
        doc.text(`   ${r.descripcion}`);
        doc.moveDown(0.5);
      });

      doc.end();
    });
  }
}
