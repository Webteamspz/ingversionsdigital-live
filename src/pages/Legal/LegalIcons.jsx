const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: "false",
};

export const IconShield = (props) => (
  <svg {...iconProps} {...props}>
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const IconList = (props) => (
  <svg {...iconProps} {...props}>
    <path d="M9 6h11M9 12h11M9 18h11" />
    <path d="M4 6h.01M4 12h.01M4 18h.01" />
  </svg>
);

export const IconUsers = (props) => (
  <svg {...iconProps} {...props}>
    <path d="M17 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-3A3.5 3.5 0 0 0 7 18.5V20" />
    <circle cx="12" cy="8" r="3.2" />
    <path d="M20 20v-1.5a3 3 0 0 0-2-2.83" />
    <path d="M16.5 5.2a3.2 3.2 0 0 1 0 5.9" />
  </svg>
);

export const IconMail = (props) => (
  <svg {...iconProps} {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

export const IconRefresh = (props) => (
  <svg {...iconProps} {...props}>
    <path d="M3 12a9 9 0 0 1 15.3-6.4L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-15.3 6.4L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);

export const IconScale = (props) => (
  <svg {...iconProps} {...props}>
    <path d="M12 3v18M8 21h8" />
    <path d="M5 7h14" />
    <path d="M5 7l-3 6a3 3 0 0 0 6 0l-3-6z" />
    <path d="M19 7l-3 6a3 3 0 0 0 6 0l-3-6z" />
  </svg>
);

export const IconDocument = (props) => (
  <svg {...iconProps} {...props}>
    <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6M9 17h6" />
  </svg>
);

export const IconCookie = (props) => (
  <svg {...iconProps} {...props}>
    <path d="M12 3a9 9 0 1 0 9 9c-1.5 0-2.5-1-2.5-2.3 0-.5.1-.9.1-1.4C18.6 8 17 6.4 15.5 6.4c-.6 0-1 .1-1.5.3C13.4 4.5 12.8 3 12 3z" />
    <circle cx="9" cy="11" r=".9" fill="currentColor" stroke="none" />
    <circle cx="13" cy="15" r=".9" fill="currentColor" stroke="none" />
    <circle cx="9.5" cy="16.5" r=".7" fill="currentColor" stroke="none" />
  </svg>
);

export const IconAlert = (props) => (
  <svg {...iconProps} {...props}>
    <path d="M12 3l10 18H2L12 3z" />
    <path d="M12 10v4" />
    <path d="M12 17h.01" />
  </svg>
);

export const IconCopyright = (props) => (
  <svg {...iconProps} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M14.5 9.5a3 3 0 1 0 0 5" />
  </svg>
);
