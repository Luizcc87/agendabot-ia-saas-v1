
import { lazy } from 'react';

// Lazy load de componentes pesados para code splitting
export const LazyDashboard = lazy(() => 
  import('../pages/admin/Dashboard').then(module => ({
    default: module.default
  }))
);

export const LazyCalendar = lazy(() => 
  import('../pages/admin/Calendar').then(module => ({
    default: module.default
  }))
);

export const LazyLeads = lazy(() => 
  import('../pages/admin/Leads').then(module => ({
    default: module.default
  }))
);

export const LazySettings = lazy(() => 
  import('../pages/admin/Settings').then(module => ({
    default: module.default
  }))
);

export const LazyBilling = lazy(() => 
  import('../pages/admin/Billing').then(module => ({
    default: module.default
  }))
);

// Debounce para buscas e inputs
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle para scroll events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Intersection Observer para lazy loading
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Performance monitoring
export const performanceMonitor = {
  // Medir tempo de execução de funções
  measureFunction: <T extends (...args: any[]) => any>(
    func: T,
    name: string
  ): T => {
    return ((...args: Parameters<T>) => {
      const start = performance.now();
      const result = func(...args);
      const end = performance.now();
      
      console.log(`${name} took ${end - start} milliseconds`);
      return result;
    }) as T;
  },

  // Medir carregamento de componentes
  measureComponent: (componentName: string) => {
    const start = performance.now();
    
    return () => {
      const end = performance.now();
      console.log(`${componentName} render took ${end - start} milliseconds`);
    };
  },

  // Web Vitals básicos
  measureWebVitals: () => {
    // Largest Contentful Paint
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        console.log('LCP:', entry.startTime);
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        console.log('FID:', entry.processingStart - entry.startTime);
      }
    }).observe({ entryTypes: ['first-input'] });
  }
};

// Image optimization helpers
export const imageOptimization = {
  // Lazy loading de imagens
  lazyLoadImage: (src: string, placeholder?: string) => {
    return {
      src: placeholder || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNGM0Y0RjYiLz48L3N2Zz4=',
      'data-src': src,
      loading: 'lazy' as const,
      decoding: 'async' as const,
    };
  },

  // Gerar srcSet para responsive images
  generateSrcSet: (baseUrl: string, sizes: number[]) => {
    return sizes
      .map(size => `${baseUrl}?w=${size} ${size}w`)
      .join(', ');
  }
};

// Bundle analyzer helper
export const bundleAnalyzer = {
  // Analisar imports dinâmicos
  logImport: (moduleName: string) => {
    console.log(`Loading module: ${moduleName}`);
    return performance.now();
  },

  // Finalizar medição de import
  logImportComplete: (moduleName: string, startTime: number) => {
    const endTime = performance.now();
    console.log(`Module ${moduleName} loaded in ${endTime - startTime}ms`);
  }
};

// Memory management
export const memoryUtils = {
  // Cleanup de event listeners
  createCleanupFunction: (
    element: Element | Window,
    event: string,
    handler: EventListener
  ) => {
    element.addEventListener(event, handler);
    return () => element.removeEventListener(event, handler);
  },

  // Verificar uso de memória (dev only)
  checkMemoryUsage: () => {
    if (typeof (performance as any).memory !== 'undefined') {
      const memory = (performance as any).memory;
      console.log({
        used: `${Math.round(memory.usedJSHeapSize / 1048576)} MB`,
        total: `${Math.round(memory.totalJSHeapSize / 1048576)} MB`,
        limit: `${Math.round(memory.jsHeapSizeLimit / 1048576)} MB`
      });
    }
  }
};

// Cache utilities
export const cacheUtils = {
  // Simple in-memory cache
  createCache: <T>() => {
    const cache = new Map<string, { value: T; timestamp: number }>();
    
    return {
      get: (key: string, ttl: number = 300000): T | null => {
        const item = cache.get(key);
        if (!item) return null;
        
        if (Date.now() - item.timestamp > ttl) {
          cache.delete(key);
          return null;
        }
        
        return item.value;
      },
      
      set: (key: string, value: T): void => {
        cache.set(key, { value, timestamp: Date.now() });
      },
      
      clear: (): void => {
        cache.clear();
      }
    };
  }
};
