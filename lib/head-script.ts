import { MQ, RULES } from "./motion";

/**
 * Inline <head> script (runs before first paint):
 *  - sets <html data-motion="ok"> ONLY when the user has NOT asked for reduced motion
 *    (tokens.css hides [data-reveal] only under that attribute);
 *  - failsafe: if no reveal marked itself as run (html[data-motion-ran]) within RULES.failsafeMs,
 *    remove the attribute so everything is visible.
 */
export const noFlashScript = `(function(){try{var d=document.documentElement;if(window.matchMedia(${JSON.stringify(
  MQ.reduced,
)}).matches)return;d.setAttribute("data-motion","ok");setTimeout(function(){if(!d.hasAttribute("data-motion-ran"))d.removeAttribute("data-motion")},${RULES.failsafeMs})}catch(e){}})();`;
