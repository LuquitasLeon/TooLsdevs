import { createApp } from "../src/app.js";

/**
 * Punto de entrada para Vercel: exporta la app de Express directamente,
 * sin `.listen()`. Vercel la invoca como función serverless por request.
 */
export default createApp();
