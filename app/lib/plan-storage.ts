"use client";

import { useEffect, useState } from "react";

const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";
const PLAN_EVENT = "fitlog:plan-updated";
export const MAX_PLAN_SIZE = 5;

type PlanLists = {
  plan: number[];
  saved: number[];
};

function readIds(key: string): number[] {
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

function updateList(key: string, workoutId: number, remove = false): boolean {
  const ids = readIds(key);
  const exists = ids.includes(workoutId);

  if (remove ? !exists : exists) return false;
  if (key === PLAN_KEY && !remove && ids.length >= MAX_PLAN_SIZE) return false;

  const nextIds = remove ? ids.filter((id) => id !== workoutId) : [...ids, workoutId];
  window.localStorage.setItem(key, JSON.stringify(nextIds));
  window.dispatchEvent(new Event(PLAN_EVENT));
  return true;
}

export function addToPlan(workoutId: number): boolean {
  return updateList(PLAN_KEY, workoutId);
}

export function addToSaved(workoutId: number): boolean {
  return updateList(SAVED_KEY, workoutId);
}

export function useWorkoutPlan(): PlanLists {
  const [lists, setLists] = useState<PlanLists>({ plan: [], saved: [] });

  useEffect(() => {
    const syncLists = () => setLists(getPlanLists());
    syncLists();
    window.addEventListener(PLAN_EVENT, syncLists);
    window.addEventListener("storage", syncLists);

    return () => {
      window.removeEventListener(PLAN_EVENT, syncLists);
      window.removeEventListener("storage", syncLists);
    };
  }, []);

  return lists;
}