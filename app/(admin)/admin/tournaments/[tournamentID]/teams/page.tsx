"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import TeamList from "@/components/team/TeamList";
import { Team } from "@/types/Team";

const TeamsAdminPage = () => {
  const params = useParams();
  const tournamentId = Array.isArray(params.tournamentId)
    ? params.tournamentId[0]
    : params.tournamentId || "";

  const { addToast } = useToast();
  const [teams, setTeams] = useState<Team[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      teamName: "", // Align with the API
    },
  });

  // Fetch teams
  const fetchTeams = async () => {
    try {
      if (!tournamentId) {
        throw new Error("Tournament ID is undefined.");
      }

      const { data }: { data: Team[] } = await axios.get(
        `/api/teams?tournamentId=${encodeURIComponent(tournamentId)}`
      );
      setTeams(data);
    } catch (error: any) {
      console.error("Error fetching teams:", error);
      addToast({
        title: "Error",
        description: "Failed to fetch teams. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Submit function for adding/editing teams
  const onSubmit = async (data: any) => {
    try {
      if (!tournamentId) {
        addToast({
          title: "Error",
          description: "Tournament ID is missing. Cannot add team.",
          variant: "destructive",
        });
        return;
      }

      if (editMode && editingTeam) {
        await axios.put(`/api/teams`, {
          id: editingTeam._id,
          teamName: data.teamName, // Align with the API
        });
        addToast({
          title: "Success",
          description: "Team updated successfully!",
        });
      } else {
        await axios.post(`/api/teams`, {
          teamName: data.teamName, // Align with the API
          tournamentId,
        });
        addToast({
          title: "Success",
          description: "Team added successfully!",
        });
      }

      reset();
      setEditMode(false);
      setEditingTeam(null);
      setIsSheetOpen(false);
      fetchTeams();
    } catch (error) {
      console.error("Error submitting team:", error);
      addToast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Edit Team Handler
  const handleEdit = (team: Team) => {
    setEditMode(true);
    setEditingTeam(team);
    setIsSheetOpen(true);
    reset({ teamName: team.teamName });
  };

  // Delete Team Handler
  const handleDelete = async (teamId: string) => {
    try {
      await axios.delete(`/api/teams?id=${encodeURIComponent(teamId)}`);
      addToast({
        title: "Success",
        description: "Team deleted successfully!",
      });
      fetchTeams();
    } catch (error: any) {
      console.error("Error deleting team:", error);
      addToast({
        title: "Error",
        description: "Failed to delete team. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (tournamentId) {
      fetchTeams();
    }
  }, [tournamentId]);

  return (
    <div className="w-full py-3 bg-background">
      <div className="max-w-4xl px-4 mx-auto">
        <h2 className="text-center text-xl font-semibold mb-6">Manage Teams</h2>
        <h1 className="text-center text-3xl font-extrabold mb-6">
          {tournamentId || "Unknown"}
        </h1>

        {/* CREATE TEAM BUTTON */}
        <div className="flex justify-center mb-6">
          <Button
            onClick={() => {
              reset();
              setEditMode(false);
              setIsSheetOpen(true);
            }}
            className="px-8 py-3 text-lg font-semibold card-hover"
          >
            CREATE TEAM
          </Button>
        </div>

        {/* Team List */}
        <TeamList
          teams={teams}
          tournamentId={tournamentId}
          isAdmin={true}
          onEditTeam={handleEdit}
          onDeleteTeam={handleDelete}
        />

        {/* Sheet for Adding or Editing a Team */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>{editMode ? "Edit Team" : "Add Team"}</SheetTitle>
              <SheetDescription>
                {editMode
                  ? "Update the team details."
                  : "Fill out the form below to create a new team."}
              </SheetDescription>
            </SheetHeader>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-4 mt-4"
            >
              <Input
                {...register("teamName", { required: true })}
                placeholder="Team Name"
              />
              <SheetFooter>
                <Button type="submit" className="card-hover">
                  {editMode ? "Update Team" : "Add Team"}
                </Button>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default TeamsAdminPage;
