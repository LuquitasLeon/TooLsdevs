import { useEffect, useState } from "react";
import type { TeamMemberRecord } from "@toolsdevs/shared";
import { listTeamMembers } from "@/lib/api";

export function useTeamMembers() {
  const [members, setMembers] = useState<TeamMemberRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    listTeamMembers().then((result) => {
      if (cancelled) return;
      if (result.ok) setMembers(result.data.members);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { members, loading };
}
