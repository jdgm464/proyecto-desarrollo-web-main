import { Controller, Get, Query, Res } from "@nestjs/common";
import type { Response } from "express";
import { Auth } from "../auth/decorators/auth.decorator.js";
import { DashboardService } from "./dashboard.service.js";


@Auth()
@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get("stats")
  getStats() {
    return this.dashboardService.getStats();
  }

  @Get("reservations")
  getReservations(
    @Query("page") page = "1",
    @Query("limit") limit = "8",
    @Query("estado") estado?: string,
  ) {
    const pageNum = Math.max(1, parseInt(String(page), 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(String(limit), 10) || 8));
    return this.dashboardService.getReservationsPaginated(
      pageNum,
      limitNum,
      estado,
    );
  }

  @Get("pdf")
  async getPdf(@Res({ passthrough: false }) res: Response) {
    const buffer = await this.dashboardService.generatePdf();
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="reservas-uneg.pdf"',
      "Content-Length": buffer.length,
    });
    res.send(buffer);
  }
}
