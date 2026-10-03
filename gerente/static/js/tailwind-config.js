tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // 1. COLORES NUEVOS (MATERIAL DESIGN 3) - Para Clases, Reportes, Personal, etc.
        "tertiary-fixed": "#dae2fd",
        "on-secondary-fixed": "#00174b",
        "primary-fixed": "#73fbb8",
        "secondary": "#0051d5",
        "on-secondary": "#ffffff",
        "on-primary-fixed": "#002112",
        "background": "#f8f9ff",
        "secondary-fixed-dim": "#b4c5ff",
        "tertiary-fixed-dim": "#bec6e0",
        "surface-container": "#e5eeff",
        "inverse-primary": "#53de9e",
        "outline": "#6c7a70",
        "on-tertiary": "#ffffff",
        "surface-container-lowest": "#ffffff",
        "on-background": "#0b1c30",
        "secondary-container": "#316bf3",
        "on-tertiary-container": "#2a3246",
        "surface-container-low": "#eff4ff",
        "secondary-fixed": "#dbe1ff",
        "surface-dim": "#cbdbf5",
        "on-secondary-container": "#fefcff",
        "on-error-container": "#93000a",
        "primary": "#006c46",
        "on-primary-fixed-variant": "#005233",
        "tertiary-container": "#929ab2",
        "tertiary": "#565e74",
        "primary-fixed-dim": "#53de9e",
        "inverse-surface": "#213145",
        "primary-container": "#00b074",
        "error": "#ba1a1a",
        "surface-container-highest": "#d3e4fe",
        "on-primary-container": "#003a23",
        "on-tertiary-fixed-variant": "#3f465c",
        "on-surface-variant": "#3d4a41",
        "surface": "#f8f9ff",
        "error-container": "#ffdad6",
        "on-secondary-fixed-variant": "#003ea8",
        "on-primary": "#ffffff",
        "surface-variant": "#d3e4fe",
        "on-error": "#ffffff",
        "on-tertiary-fixed": "#131b2e",
        "surface-bright": "#f8f9ff",
        "surface-tint": "#006c46",
        "inverse-on-surface": "#eaf1ff",
        "surface-container-high": "#dce9ff",
        "on-surface": "#0b1c30",
        "outline-variant": "#bccabf",
        
        // 2. COLORES ANTERIORES (ATHLETIC) - Para que Dashboard y Finanzas no se rompan
        athletic: {
          navy: '#0b1329',
          dark: '#1e293b',
          surface: '#ffffff',
          border: '#e2e8f0',
          emerald: '#10b981',
          'emerald-dark': '#059669',
          cyan: '#06b6d4',
          blue: '#2563eb',
          amber: '#f59e0b',
          rose: '#ef4444',
          purple: '#8b5cf6',
        }
      },
      boxShadow: {
        // Sombras del Dashboard original
        'card': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)',
        'card-hover': '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "space-lg": "1.5rem",
        "space-md": "1rem",
        "gutter": "1.25rem",
        "margin": "1.5rem",
        "space-xl": "2rem",
        "space-xs": "0.25rem",
        "margin-desktop": "2.5rem",
        "space-sm": "0.5rem",
        "gutter-desktop": "1.5rem"
      },
      fontFamily: {
        // Fuentes base originales
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        // Fuentes del nuevo sistema
        "headline-md": ["Plus Jakarta Sans"],
        "label-sm": ["Inter"],
        "body-md": ["Plus Jakarta Sans"],
        "headline-sm": ["Plus Jakarta Sans"],
        "display-lg": ["Plus Jakarta Sans"],
        "body-lg": ["Plus Jakarta Sans"],
        "label-md": ["Inter"],
        "headline-lg": ["Plus Jakarta Sans"],
        "body-sm": ["Plus Jakarta Sans"],
        "label-lg": ["Inter"],
        "display-lg-mobile": ["Plus Jakarta Sans"]
      },
      fontSize: {
        "headline-md": ["22px", { "lineHeight": "28px", "letterSpacing": "-0.01em", "fontWeight": "700" }],
        "label-sm": ["11px", { "lineHeight": "14px", "letterSpacing": "0.04em", "fontWeight": "700" }],
        "body-md": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
        "headline-sm": ["18px", { "lineHeight": "24px", "fontWeight": "600" }],
        "display-lg": ["40px", { "lineHeight": "48px", "letterSpacing": "-0.02em", "fontWeight": "800" }],
        "body-lg": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "label-md": ["12px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "600" }],
        "headline-lg": ["28px", { "lineHeight": "36px", "letterSpacing": "-0.015em", "fontWeight": "700" }],
        "body-sm": ["12px", { "lineHeight": "16px", "fontWeight": "400" }],
        "label-lg": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "600" }],
        "display-lg-mobile": ["32px", { "lineHeight": "38px", "letterSpacing": "-0.02em", "fontWeight": "800" }]
      }
    }
  }
}