import { useEffect, useMemo, useRef, useState } from "react";
import { clsx } from "clsx";

import type { ProductImages } from "@/shared/types/product.types";
import { NoImageIcon } from "@/assets/icons";
import { resolveMediaUrl } from "@/shared/utils/resolveMediaUrl";

import styles from "./ProductImage.module.scss";

type Props = {
  images?: ProductImages | null;
  className?: string;
  type?: "main" | "card";
};

export function ProductImage({ images, className = "", type = "card" }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);

  const source = useMemo(() => {
    if (images?.[type]?.url) return images[type];
    if (images?.card?.url) return images.card;
    if (images?.main?.url) return images.main;
    return null;
  }, [images, type]);

  const [loading, setLoading] = useState(Boolean(source));
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setLoading(Boolean(source));
  }, [source]);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) setLoading(false);
  }, [source]);

  if (!source || error) {
    return (
      <div className={clsx(styles.placeholder, className)}>
        <NoImageIcon />
      </div>
    );
  }

  return (
    <div className={clsx(styles.root, className)}>
      {loading && <div className={styles.skeleton} />}

      <img
        ref={imgRef}
        src={resolveMediaUrl(source.url)}
        alt={source.alt || "Изображение товара"}
        className={styles.image}
        loading="lazy"
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);

          setError(true);
        }}
      />
    </div>
  );
}
