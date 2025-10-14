import defaultConfig from '../config/app.config.json';
import { configService } from '../services/configService';

const getConfig = () => {
  try {
    return configService.getCurrentConfig();
  } catch {
    return defaultConfig;
  }
};

const c = getConfig().colors;
const p = c.primary;
const s = c.secondary;

export const colors = {
  bgPrimary: `bg-${p}-${c.primary_shade}`,
  bgPrimaryDark: `bg-${p}-${c.primary_dark_shade}`,
  bgPrimaryLight: `bg-${p}-${c.light_shade}`,
  bgSecondaryLight: `bg-${s}-${c.light_shade}`,
  hoverBgPrimary: `hover:bg-${p}-${c.primary_shade}`,
  hoverBgPrimaryDark: `hover:bg-${p}-${c.primary_dark_shade}`,
  hoverBgSecondaryDark: `hover:bg-${s}-${c.primary_dark_shade}`,
  textPrimary: `text-${p}-${c.primary_shade}`,
  textPrimaryDark: `text-${p}-${c.primary_dark_shade}`,
  textAccent: `text-${p}-${c.accent_shade}`,
  borderPrimary: `border-${p}-${c.border_shade}`,
  borderPrimaryMid: `border-${p}-${c.accent_shade}`,
  borderPrimaryDark: `border-${p}-${c.primary_shade}`,
  gradientPrimary: `bg-gradient-to-r from-${p}-${c.primary_shade} to-${s}-${c.secondary_shade}`,
  gradientLight: `bg-gradient-to-r from-${p}-${c.light_shade} to-${s}-${c.light_shade}`,
  gradientBr: `bg-gradient-to-br from-${p}-${c.light_shade} to-${s}-${c.light_shade}`,
  hoverGradient: `hover:from-${p}-${c.primary_dark_shade} hover:to-${s}-${c.primary_dark_shade}`,
  hoverGradientLight: `hover:from-${p}-${c.light_shade} hover:to-${s}-${c.light_shade}`,
  ringPrimary: `ring-${p}-${c.primary_shade}`,
  checkBg: `bg-${p}-${c.primary_shade}`,
  shimmer: `from-${p}-${c.accent_shade}/0 via-white/20 to-${p}-${c.accent_shade}/0`,
};
