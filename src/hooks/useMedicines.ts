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
 * Custom React hook that fetches medicines live from the backend API.
 * Includes optional polling every 30 seconds to keep live inventory stock real-time.
 */
export function useMedicines(enablePolling = true): UseMedicinesResult {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Use a ref to safe-guard against state updates after on-mount unmounts
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

  // Initial fetch on mount
  useEffect(() => {
    isMountedRef.current = true;
    loadData(true);

    let intervalId: any = null;
    if (enablePolling) {
      // Poll every 30 seconds to sync live stock levels seamlessly
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
