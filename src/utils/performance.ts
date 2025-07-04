// Performance monitoring utilities
export const performanceMetrics = {
  fcp: 0,
  lcp: 0,
  fid: 0,
  cls: 0,
  ttfb: 0,
};

// Performance budget constants
export const PERFORMANCE_BUDGET = {
  FCP: 1200, // 1.2 seconds
  LCP: 2500, // 2.5 seconds
  FID: 100,  // 100ms
  CLS: 0.1,  // 0.1
  TTFB: 600, // 600ms
  HERO_ASSETS: 200, // 200kb
};

// Performance monitoring
export const monitorPerformance = () => {
  if ('PerformanceObserver' in window) {
    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcp = entries[entries.length - 1];
      performanceMetrics.fcp = fcp.startTime;
      console.log('FCP:', fcp.startTime);
    });
    fcpObserver.observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lcp = entries[entries.length - 1];
      performanceMetrics.lcp = lcp.startTime;
      console.log('LCP:', lcp.startTime);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        performanceMetrics.fid = entry.processingStart - entry.startTime;
        console.log('FID:', performanceMetrics.fid);
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      performanceMetrics.cls = clsValue;
      console.log('CLS:', clsValue);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  }

  // Time to First Byte
  if ('navigation' in performance) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    performanceMetrics.ttfb = navigation.responseStart - navigation.requestStart;
    console.log('TTFB:', performanceMetrics.ttfb);
  }
};

// Asset size monitoring
export const monitorAssetSizes = () => {
  const resources = performance.getEntriesByType('resource');
  const heroAssets = resources.filter(resource => 
    resource.name.includes('hero') || 
    resource.name.includes('video') ||
    resource.name.includes('background')
  );

  const totalHeroSize = heroAssets.reduce((total, resource) => {
    return total + (resource.transferSize || 0);
  }, 0);

  console.log('Hero assets total size:', totalHeroSize / 1024, 'KB');
  
  if (totalHeroSize > PERFORMANCE_BUDGET.HERO_ASSETS * 1024) {
    console.warn('Hero assets exceed performance budget!');
  }

  return totalHeroSize;
};

// Image optimization utilities
export const optimizeImage = (src: string, width: number, quality: number = 80): string => {
  // Add WebP support check
  const supportsWebP = document.createElement('canvas')
    .toDataURL('image/webp')
    .indexOf('data:image/webp') === 0;

  if (supportsWebP) {
    return `${src}?format=webp&w=${width}&q=${quality}`;
  }
  
  return `${src}?w=${width}&q=${quality}`;
};

// Lazy loading utility
export const lazyLoad = (element: HTMLElement, callback: () => void) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback();
        observer.unobserve(element);
      }
    });
  });

  observer.observe(element);
  return observer;
};

// Animation performance monitoring
export const monitorAnimationPerformance = () => {
  let frameCount = 0;
  let lastTime = performance.now();

  const countFrames = () => {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime >= 1000) {
      const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      console.log('FPS:', fps);
      
      if (fps < 30) {
        console.warn('Low FPS detected:', fps);
      }
      
      frameCount = 0;
      lastTime = currentTime;
    }
    
    requestAnimationFrame(countFrames);
  };

  requestAnimationFrame(countFrames);
};

// Memory usage monitoring
export const monitorMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    console.log('Memory usage:', {
      used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
      total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
      limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
    });
  }
};

// Performance report generator
export const generatePerformanceReport = () => {
  const report = {
    metrics: performanceMetrics,
    budget: PERFORMANCE_BUDGET,
    violations: [] as string[],
    recommendations: [] as string[]
  };

  // Check for violations
  if (performanceMetrics.fcp > PERFORMANCE_BUDGET.FCP) {
    report.violations.push('FCP exceeds budget');
    report.recommendations.push('Optimize critical rendering path');
  }

  if (performanceMetrics.lcp > PERFORMANCE_BUDGET.LCP) {
    report.violations.push('LCP exceeds budget');
    report.recommendations.push('Optimize largest contentful paint element');
  }

  if (performanceMetrics.fid > PERFORMANCE_BUDGET.FID) {
    report.violations.push('FID exceeds budget');
    report.recommendations.push('Reduce JavaScript execution time');
  }

  if (performanceMetrics.cls > PERFORMANCE_BUDGET.CLS) {
    report.violations.push('CLS exceeds budget');
    report.recommendations.push('Fix layout shifts');
  }

  return report;
}; 