/**
 * Safe Analytics Helper for Nexus Demo
 * 
 * Uses @vercel/analytics/next track function if available in the browser environment.
 * Tracks only high-level demonstration navigation events.
 * Strictly NEVER captures free-text user input, personal information, or client tokens.
 */

import { track } from "@vercel/analytics"

export type DemoAnalyticsEvent =
  | "demo_viewed"
  | "demo_started"
  | "demo_step_viewed"
  | "demo_approval_clicked"
  | "demo_completed"
  | "demo_reset"
  | "demo_consultation_clicked"

export function trackDemoEvent(
  event: DemoAnalyticsEvent,
  properties?: Record<string, string | number | boolean>
) {
  try {
    if (typeof window !== "undefined") {
      track(event, properties)
    }
  } catch (err) {
    // Fail silently in development or when offline
  }
}
