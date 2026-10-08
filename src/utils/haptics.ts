/**
 * Subtle haptic feedback helper for mobile touch devices
 * Gracefully no-ops on desktop or unsupported devices
 */
export function triggerHaptic(type: 'tap' | 'selection' | 'success' | 'warning' = 'tap') {
  if (typeof window === 'undefined') return;
  if (!('vibrate' in navigator)) return;

  try {
    switch (type) {
      case 'tap':
        navigator.vibrate(8);
        break;
      case 'selection':
        navigator.vibrate(12);
        break;
      case 'success':
        navigator.vibrate([10, 30, 15]);
        break;
      case 'warning':
        navigator.vibrate([20, 40, 20]);
        break;
      default:
        navigator.vibrate(8);
    }
  } catch {
    // Ignore any browser vibration permission errors
  }
}
