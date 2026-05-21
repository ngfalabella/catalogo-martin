import { Producto, Sabor, Presentacion } from '@/types';

export async function getProductos(): Promise<Producto[]> {
  // Llamamos a la variable de entorno
  const url = process.env.GOOGLE_SHEET_CSV_URL;

  if (!url) {
    console.error("Falta configurar la variable GOOGLE_SHEET_CSV_URL en el archivo .env");
    return [];
  }

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 }
    });
    
    const csvText = await response.text();
    
    const lines = csvText.split('\n').map(line => line.replace('\r', '').trim()).filter(Boolean);
    const rows = lines.slice(1);

    return rows.map((row) => {
      const columns = row.split(',');

      return {
        id: columns[0],
        marca: columns[1],
        sabor: columns[2] as Sabor,
        presentacion: columns[3] as Presentacion,
        imagen: columns[4],
        unidadesPorPack: Number(columns[5]),
        precioPack: Number(columns[6]),
        precioPallet: Number(columns[7]),
      };
    });
  } catch (error) {
    console.error("Error al conectar con Google Sheets:", error);
    return [];
  }
}