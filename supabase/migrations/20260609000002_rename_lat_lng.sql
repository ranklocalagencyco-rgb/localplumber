-- Rename lat/lng to latitude/longitude to match application type definitions
alter table towns rename column lat to latitude;
alter table towns rename column lng to longitude;
