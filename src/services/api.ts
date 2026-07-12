/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Medicine } from "../data/mockData";

const API_BASE =
  (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:8000";

/**
 * Kelas Error kustom untuk menangani error spesifik dari API beserta kode status HTTP-nya.
 */
export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Mengambil data inventaris obat terbaru dari API backend.
 * Memetakan respons mentah dari database ke dalam format objek `Medicine` yang terstandarisasi.
 * Akan melemparkan `ApiError` jika request gagal atau format tidak valid.
 */
export async function fetchMedicines(): Promise<Medicine[]> {
  try {
    const url = `${API_BASE}/api/medicines`;
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store", // ✅ paksa ambil data terbaru (bukan cache)
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new ApiError(
        `Gagal mengambil data dari server database (HTTP ${response.status}: ${response.statusText})`,
        response.status,
      );
    }

    const json = await response.json();

    const rawData = Array.isArray(json)
      ? json
      : json?.data && Array.isArray(json.data)
        ? json.data
        : null;

    if (!rawData) {
      throw new ApiError(
        "Format respon dari server API tidak valid (Bukan berupa list data obat).",
      );
    }

    return rawData.map((med: any): Medicine => {
      const requires_prescription =
        med.requires_prescription === true ||
        med.requires_prescription === 1 ||
        med.requires_prescription === "1" ||
        String(med.requires_prescription).toLowerCase() === "true";

      return {
        id: Number(med.id),
        name: String(med.name || ""),
        generic_name: med.generic_name ? String(med.generic_name) : null,
        category_id:
          med.category_id !== undefined && med.category_id !== null
            ? Number(med.category_id)
            : null, // ✅ FK angka
        category: med.category // ✅ pertahankan sebagai OBJEK
          ? {
              id: Number(med.category.id),
              name: String(med.category.name ?? ""),
              description: med.category.description
                ? String(med.category.description)
                : null,
            }
          : null,
        manufacturer: med.manufacturer ? String(med.manufacturer) : null,
        unit: String(med.unit || "tablet"),
        price:
          med.price !== undefined && med.price !== null ? Number(med.price) : 0,
        stock:
          med.stock !== undefined && med.stock !== null ? Number(med.stock) : 0,
        min_stock:
          med.min_stock !== undefined && med.min_stock !== null
            ? Number(med.min_stock)
            : 0,
        expiry_date: med.expiry_date ? String(med.expiry_date) : null,
        requires_prescription,
        description: med.description ? String(med.description) : null,
        created_at: med.created_at ? String(med.created_at) : null,
        updated_at: med.updated_at ? String(med.updated_at) : null,
      };
    });
  } catch (err: any) {
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError(
      `Koneksi gagal ke server database di ${API_BASE}. Pastikan backend Laravel API Anda sudah aktif. (Error: ${err.message})`,
    );
  }
}
