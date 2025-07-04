// Accessibility monitoring and utilities
export const accessibilityMetrics = {
  contrastRatio: 0,
  focusableElements: 0,
  ariaLabels: 0,
  semanticElements: 0,
  keyboardNavigation: true,
  screenReaderCompatible: true,
};

// WCAG 2.1 AA compliance standards
export const WCAG_STANDARDS = {
  CONTRAST_RATIO: 4.5, // Normal text
  CONTRAST_RATIO_LARGE: 3.0, // Large text
  FOCUS_INDICATOR: true,
  ARIA_LABELS: true,
  SEMANTIC_HTML: true,
  KEYBOARD_NAVIGATION: true,
};

// Color contrast calculation
export const calculateContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (color: string): number => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    const [rs, gs, bs] = [r, g, b].map(c => {
      if (c <= 0.03928) {
        return c / 12.92;
      }
      return Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
};

// Focus management utilities
export const manageFocus = {
  // Trap focus within a container
  trapFocus: (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    firstElement.focus();

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  },

  // Move focus to first focusable element
  focusFirstElement: (container: HTMLElement) => {
    const focusableElement = container.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement;
    
    if (focusableElement) {
      focusableElement.focus();
    }
  },

  // Restore focus to previous element
  restoreFocus: (element: HTMLElement) => {
    element.focus();
  },
};

// ARIA utilities
export const ariaUtils = {
  // Announce message to screen readers
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  // Update ARIA labels
  updateAriaLabel: (element: HTMLElement, label: string) => {
    element.setAttribute('aria-label', label);
  },

  // Set ARIA expanded state
  setExpanded: (element: HTMLElement, expanded: boolean) => {
    element.setAttribute('aria-expanded', expanded.toString());
  },

  // Set ARIA pressed state
  setPressed: (element: HTMLElement, pressed: boolean) => {
    element.setAttribute('aria-pressed', pressed.toString());
  },

  // Set ARIA selected state
  setSelected: (element: HTMLElement, selected: boolean) => {
    element.setAttribute('aria-selected', selected.toString());
  },
};

// Accessibility audit
export const auditAccessibility = () => {
  const audit = {
    violations: [] as string[],
    warnings: [] as string[],
    recommendations: [] as string[],
    score: 100,
  };

  // Check for missing alt attributes
  const images = document.querySelectorAll('img');
  images.forEach((img, index) => {
    if (!img.alt && !img.getAttribute('aria-label')) {
      audit.violations.push(`Image ${index + 1} missing alt attribute`);
      audit.score -= 5;
    }
  });

  // Check for proper heading structure
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let previousLevel = 0;
  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1));
    if (level > previousLevel + 1) {
      audit.warnings.push(`Heading structure issue: ${heading.tagName} follows h${previousLevel}`);
    }
    previousLevel = level;
  });

  // Check for focus indicators
  const focusableElements = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  focusableElements.forEach((element) => {
    const computedStyle = window.getComputedStyle(element);
    const outline = computedStyle.outline;
    const boxShadow = computedStyle.boxShadow;
    
    if (outline === 'none' && !boxShadow.includes('rgb')) {
      audit.warnings.push('Focus indicator missing on interactive element');
    }
  });

  // Check for semantic HTML
  const divs = document.querySelectorAll('div');
  divs.forEach((div) => {
    if (div.onclick || div.getAttribute('role')) {
      if (!div.getAttribute('tabindex')) {
        audit.violations.push('Clickable div missing keyboard accessibility');
        audit.score -= 3;
      }
    }
  });

  // Check for form labels
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach((input) => {
    const id = input.getAttribute('id');
    const label = document.querySelector(`label[for="${id}"]`);
    const ariaLabel = input.getAttribute('aria-label');
    
    if (!label && !ariaLabel && input.type !== 'hidden') {
      audit.violations.push(`Form control missing label: ${input.type}`);
      audit.score -= 5;
    }
  });

  // Generate recommendations
  if (audit.violations.length > 0) {
    audit.recommendations.push('Fix all accessibility violations');
  }
  
  if (audit.warnings.length > 0) {
    audit.recommendations.push('Address accessibility warnings');
  }

  if (audit.score < 90) {
    audit.recommendations.push('Conduct manual accessibility testing');
  }

  return audit;
};

// Keyboard navigation utilities
export const keyboardNavigation = {
  // Handle arrow key navigation
  handleArrowKeys: (items: HTMLElement[], currentIndex: number, onSelect: (index: number) => void) => {
    return (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % items.length;
          onSelect(nextIndex);
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
          onSelect(prevIndex);
          break;
        case 'Home':
          e.preventDefault();
          onSelect(0);
          break;
        case 'End':
          e.preventDefault();
          onSelect(items.length - 1);
          break;
      }
    };
  },

  // Handle escape key
  handleEscape: (callback: () => void) => {
    return (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        callback();
      }
    };
  },
};

// Screen reader utilities
export const screenReader = {
  // Hide element from screen readers
  hide: (element: HTMLElement) => {
    element.setAttribute('aria-hidden', 'true');
  },

  // Show element to screen readers
  show: (element: HTMLElement) => {
    element.removeAttribute('aria-hidden');
  },

  // Make element focusable for screen readers
  makeFocusable: (element: HTMLElement) => {
    element.setAttribute('tabindex', '0');
  },

  // Remove element from tab order
  removeFromTabOrder: (element: HTMLElement) => {
    element.setAttribute('tabindex', '-1');
  },
};

// Accessibility monitoring
export const monitorAccessibility = () => {
  // Monitor focus changes
  document.addEventListener('focusin', (e) => {
    const target = e.target as HTMLElement;
    console.log('Focus moved to:', target.tagName, target.className);
  });

  // Monitor keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      console.log('Tab navigation detected');
    }
  });

  // Monitor screen reader usage
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mediaQuery.matches) {
    console.log('User prefers reduced motion');
  }
}; 