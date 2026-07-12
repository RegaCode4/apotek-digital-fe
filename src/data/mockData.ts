/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PharmacyProfile {
  name: string;
  tagline: string;
  description: string;
  address: string;
  city: string;
  email: string;
  whatsApp: string;
  operatingHours: {
    weekday: string;
    weekend: string;
    notes: string;
  };
  googleMapsEmbedUrl: string;
  googleMapsShareUrl: string;
}

// Cermin 1:1 dari skema Database Laravel yang ada di screenshot
export interface Category {
  id: number;
  name: string;
  description: string | null;
}

// 1:1 dengan tabel medicines (struktur relasional baru)
export interface Medicine {
  id: number;
  name: string;
  generic_name: string | null;
  category_id: number | null; // ← foreign key (ganti `category` lama)
  category?: Category | null; // ← relasi yang di-eager-load dari API
  manufacturer: string | null;
  unit: string;
  price: number;
  stock: number;
  min_stock: number;
  expiry_date: string | null;
  requires_prescription: boolean;
  description: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface MedicineCategory {
  id: string;
  name: string;
  iconName: string;
  description: string;
  itemCount: number;
}

export const pharmacyProfile: PharmacyProfile = {
  name: "Apotek Digital",
  tagline: "Apotek Modern, Pelayanan Terpercaya",
  description:
    "Apotek Digital adalah pionir layanan penunjang kesehatan modern terintegrasi di Indonesia. Kami menghadirkan kemudahan konsultasi obat, pengecekan ketersediaan stok obat secara real-time, dan layanan tebus resep dokter dengan standar klinis yang tinggi guna mendedikasikan pelayanan medis terbaik serta terpercaya bagi Anda dan keluarga.",
  address: "Jl. Benteng No. 1, Kec. Pauh, Kota Padang",
  city: "Kota Padang, Sumatera Barat",
  email: "apotekdigital@gmail.com",
  whatsApp: "+62 822-7895-4406",
  operatingHours: {
    weekday: "Senin - Jumat: 07:00 - 22:00",
    weekend: "Sabtu - Minggu: 08:00 - 20:00",
    notes:
      "Apoteker standby selama jam operasional. Layanan gawat darurat hubungi WhatsApp kami.",
  },
  googleMapsEmbedUrl:
    "https://maps.google.com/maps?q=-0.9336407845261357,100.43166340073151&z=16&hl=id&output=embed",
  googleMapsShareUrl:
    "https://www.google.com/maps?q=-0.9336407845261357,100.43166340073151",
};

// Ikon per nama kategori (pakai nama ikon lucide-react yang valid)
export const categoryIcons: Record<string, string> = {
  "Sistem Pencernaan & Metabolisme": "Pill",
  "Sistem Kardiovaskular": "HeartPulse",
  "Sistem Saraf Pusat": "Brain",
  "Anti-Infeksi Sistemik": "ShieldAlert",
  "Sistem Pernapasan": "Wind",
  "Sistem Endokrin": "FlaskConical",
  Antineoplastik: "Ribbon",
  Dermatologikal: "Hand",
  "Sistem Muskuloskeletal": "Bone",
  "Organ Sensorik": "Eye",
  "Sistem Genitourinari & Hormon Seks": "Stethoscope",
  "Darah & Organ Pembentuk Darah": "Droplet",
  "Antiparasit, Insektisida & Repelen": "Bug",
  "Berbagai Macam (Various)": "Package",
  "Vitamin dan Suplemen": "Sparkles",
};

// Bangun daftar kategori dari relasi med.category (hanya kategori yang punya obat)
export function buildCategories(medicines: Medicine[]): MedicineCategory[] {
  const map = new Map<
    number,
    { name: string; description: string | null; count: number }
  >();
  for (const m of medicines) {
    if (!m.category) continue;
    const c = m.category;
    const existing = map.get(c.id);
    if (existing) {
      existing.count++;
    } else {
      map.set(c.id, { name: c.name, description: c.description, count: 1 });
    }
  }
  const dynamic: MedicineCategory[] = Array.from(map.entries())
    .sort((a, b) => a[1].name.localeCompare(b[1].name, "id"))
    .map(([id, info]) => ({
      id: String(id), // id = category_id (string) untuk filter
      name: info.name,
      iconName: categoryIcons[info.name] ?? "LayoutGrid",
      description: info.description ?? "Lihat ketersediaan stok obat",
      itemCount: info.count,
    }));
  return [
    {
      id: "semua",
      name: "Semua Obat",
      iconName: "LayoutGrid",
      description: "Tampilkan seluruh produk obat berstandar BPOM",
      itemCount: medicines.length,
    },
    ...dynamic,
  ];
}
