import { useEffect, useRef, useState } from "react";

import { menuApi } from "../api/menu.api";
import { useToast } from "@/shared/hooks/useToast";
import { showApiError } from "@/shared/utils/showApiError";
import type { MenuMeta } from "@/shared/types/menu.types";
import type { MenuMetaResult } from "../model/menu.types";

export function useMenuMeta(): MenuMetaResult {
  const { showError } = useToast();
  const [meta, setMeta] = useState<MenuMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    const loadMeta = async () => {
      try {
        const data = await menuApi.getMeta();
        if (!mountedRef.current) return;

        setMeta(data);
        setLoading(false);
      } catch (error) {
        if (!mountedRef.current) return;
        showApiError(error, showError);
      }
    };

    loadMeta();
    return () => {
      mountedRef.current = false;
    };
  }, [showError]);

  return {
    meta,
    loading,
  };
}
