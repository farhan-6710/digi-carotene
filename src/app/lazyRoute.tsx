import { lazy, Suspense, type ComponentType } from "react";

import { CenteredLoading } from "@/shared/components/LoadingSpinner";

async function loadLazyModule<T extends Record<string, ComponentType>>(
  loader: () => Promise<T>,
  exportName: string,
): Promise<{ default: ComponentType }> {
  const load = async () => {
    const module = await loader();
    const component = module[exportName];

    if (!component) {
      throw new Error(`Missing export "${exportName}" in lazy route module.`);
    }

    return { default: component };
  };

  try {
    return await load();
  } catch (error) {
    if (!import.meta.env.DEV) {
      throw error;
    }

    // Vite HMR can invalidate modules mid-session; retry once before failing.
    await new Promise((resolve) => setTimeout(resolve, 200));
    return load();
  }
}

export function lazyRoutePage(
  loader: () => Promise<Record<string, ComponentType>>,
  exportName: string,
) {
  const LazyPage = lazy(() => loadLazyModule(loader, exportName));

  return function LazyRoutePage() {
    return (
      <Suspense fallback={<CenteredLoading />}>
        <LazyPage />
      </Suspense>
    );
  };
}
