import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://lxnozihmhenwvkmkrcvr.supabase.co";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4bm96aWhtaGVud3ZrbWtyY3ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMDg2NjMsImV4cCI6MTk4Mzc4NDY2M30.7sJlW4N4z3OUmZ3tgQaTw6tEW0-aYwSDDPndbGATMu0";
const supabase = createClient(PROJECT_URL, API_KEY);

export default function videoServices() {
  return {
    getAllVideos() {
      return supabase.from("video").select("*");
    },
  };
}
