// src/lib/geo.ts
// Build-time data fetchers for getStaticPaths() across all three route levels.
// These run ONCE at build time — never called at runtime on SSG pages.
// All functions return typed arrays or throw, so CI fails loudly on DB errors.

import { supabase } from './supabase';
import type { County, Town, TownWithCounty, OutcodeWithRelations } from '../types/index';

// ── Counties ──────────────────────────────────────────────────────────────────

export async function getAllCounties(): Promise<County[]> {
  const { data, error } = await supabase
    .from('counties')
    .select('*')
    .order('name', { ascending: true });

  if (error) throw new Error(`[geo] getAllCounties failed: ${error.message}`);
  return data ?? [];
}

// ── Towns ─────────────────────────────────────────────────────────────────────

export async function getAllTownsWithCounty(): Promise<TownWithCounty[]> {
  const { data, error } = await supabase
    .from('towns')
    .select(`
      id,
      county_id,
      name,
      slug,
      latitude,
      longitude,
      counties (
        id,
        name,
        slug
      )
    `)
    .order('name', { ascending: true });

  if (error) throw new Error(`[geo] getAllTownsWithCounty failed: ${error.message}`);
  return (data as TownWithCounty[]) ?? [];
}

export async function getTownsByCountySlug(countySlug: string): Promise<Town[]> {
  const { data: county } = await supabase
    .from('counties')
    .select('id')
    .eq('slug', countySlug)
    .single() as unknown as { data: { id: number } | null };

  if (!county) throw new Error(`[geo] County not found: ${countySlug}`);

  const { data, error } = await supabase
    .from('towns')
    .select('*')
    .eq('county_id', county.id)
    .order('name', { ascending: true });

  if (error) throw new Error(`[geo] getTownsByCountySlug failed: ${error.message}`);
  return data ?? [];
}

// ── Outcodes ──────────────────────────────────────────────────────────────────

export async function getAllOutcodesWithRelations(): Promise<OutcodeWithRelations[]> {
  const { data, error } = await supabase
    .from('outcodes')
    .select(`
      outcode,
      town_id,
      county_id,
      towns (
        id,
        county_id,
        name,
        slug,
        latitude,
        longitude
      ),
      counties (
        id,
        name,
        slug
      )
    `)
    .limit(5000)
    .order('outcode', { ascending: true });

  if (error) throw new Error(`[geo] getAllOutcodesWithRelations failed: ${error.message}`);
  return (data as OutcodeWithRelations[]) ?? [];
}

export async function getOutcodeByCode(outcode: string): Promise<OutcodeWithRelations | null> {
  const { data, error } = await supabase
    .from('outcodes')
    .select(`
      outcode,
      town_id,
      county_id,
      created_at,
      towns (*),
      counties (*)
    `)
    .eq('outcode', outcode.toUpperCase())
    .single();

  if (error) return null;
  return data as OutcodeWithRelations;
}
