"use client";

import { useSyncExternalStore } from "react";

const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";
const PLAN_EVENT = "fitlog:plan-updated";
export const MAX_PLAN_SIZE = 5;

type PlanLists = {
  plan: number[];
  saved: number[];
};

const EMPTY_LISTS: PlanLists = { plan: [], saved: [] };
let cachedLists: PlanLists | null = null;
const listeners = new Set<() => void>();

function readIds(key: string): number[] {
  if (typeof window === "undefined") return [];

  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(key) ?? "[]");
    return Array.isArray(value) ? value.filter((id): id is number => Number.isInteger(id)) : [];
  } catch {
    return [];
  }
}

export function getPlanLists(): PlanLists {
  return {
    plan: readIds(PLAN_KEY),
    saved: readIds(SAVED_KEY),
  };
}

function getSnapshot(): PlanLists {
  if (typeof window === "undefined") return EMPTY_LISTS;
  cachedLists ??= getPlanLists();
  return cachedLists;
}

function publishLists() {
  const nextLists = getPlanLists();
  const currentLists = cachedLists;
  if (
    currentLists &&
    currentLists.plan.length === nextLists.plan.length &&
    currentLists.saved.length === nextLists.saved.length &&
    currentLists.plan.every((id, index) => id === nextLists.plan[index]) &&
    currentLists.saved.every((id, index) => id === nextLists.saved[index])
  ) {
    return;
  }

  cachedLists = nextLists;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    window.addEventListener(PLAN_EVENT, publishLists);
    window.addEventListener("storage", publishLists);
  }
  publishLists();

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener(PLAN_EVENT, publishLists);
      window.removeEventListener("storage", publishLists);
    }
  };
}

function updateList(key: string, workoutId: number, remove = false): boolean {
  const ids = readIds(key);
  const exists = ids.includes(workoutId);

  if (remove ? !exists : exists) return false;
  if (key === PLAN_KEY && !remove && ids.length >= MAX_PLAN_SIZE) return false;

  const nextIds = remove ? ids.filter((id) => id !== workoutId) : [...ids, workoutId];

  try {
    window.localStorage.setItem(key, JSON.stringify(nextIds));
    window.dispatchEvent(new Event(PLAN_EVENT));
    return true;
  } catch {
    return false;
  }
}

export function addToPlan(workoutId: number): boolean {
  return updateList(PLAN_KEY, workoutId);
}

export function addToSaved(workoutId: number): boolean {
  return updateList(SAVED_KEY, workoutId);
}

export function removeFromPlan(workoutId: number): boolean {
  return updateList(PLAN_KEY, workoutId, true);
}

export function removeFromSaved(workoutId: number): boolean {
  return updateList(SAVED_KEY, workoutId, true);
}

export function useWorkoutPlan(): PlanLists {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY_LISTS);
}