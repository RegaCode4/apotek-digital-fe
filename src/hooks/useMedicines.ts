/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { Medicine } from '../data/mockData';
import { fetchMedicines } from '../services/api';

export interface UseMedicinesResult {
  medicines: Medicine[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook React kustom yang mengambil data obat secara langsung dari API backend.
 * Mendukung fitur polling (pengambilan data berulang) setiap 30 detik untuk menjaga stok inventaris tetap real-time.
 */
export function useMedicines(enablePolling = true): UseMedicinesResult {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Gunakan ref untuk mencegah update state (memory leak) jika komponen sudah di-unmount
  const isMountedRef = useRef<boolean>(true);

  const loadData = useCallback(async (showLoadingState = false) => {
    if (showLoadingState) {
      setIsLoading(true);
    }
    try {
      const data = await fetchMedicines();
      if (isMountedRef.current) {
        setMedicines(data);
        setError(null);
      }
    } catch (err: any) {
      if (isMountedRef.current) {
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  // Pengambilan data pertama kali saat komponen dimuat (mount)
  useEffect(() => {
    isMountedRef.current = true;
    loadData(true);

    let intervalId: any = null;
    if (enablePolling) {
      // Lakukan polling setiap 30 detik untuk sinkronisasi level stok secara live
      intervalId = setInterval(() => {
        loadData(false);
      }, 30000);
    }

    return () => {
      isMountedRef.current = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [loadData, enablePolling]);

  const refetch = useCallback(async () => {
    await loadData(true);
  }, [loadData]);

  return {
    medicines,
    isLoading,
    error,
    refetch
  };
}
