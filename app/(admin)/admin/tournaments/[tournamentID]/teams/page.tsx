"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast"; // Correctly import the useToast hook
import { Team } from "@/types/Team";

const TeamsAdminPage = () => {
  const { tournamentId } = useParams();
  const { addToast } = useToast(); // Correctly extract addToast from useToast
  const [teams, setTeams] = useState<Team[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      teamId: "",
      name: "",
      playerCount: 5,
    },
  });

  // Fetch teams
  const fetchTeams = async () => {
    try {
      const { data }: { data: Team[] } = await axios.get(
        `/api/teams?tournamentId=${tournamentId}`
      );
      setTeams(data);
    } catch (error) {
      addToast({
        title: "Error",
        description: "Failed to fetch teams. Please try again.",
        variant: "destructive",
      });
      console.error("Error fetching teams:", error);
    }
  };

  // Add/Edit team
  const onSubmit = async (data: any) => {
    try {
      if (editMode && editingTeam) {
        await axios.put("/api/teams", { id: editingTeam.teamId, ...data });
        addToast({
          title: "Success",
          description: "Team updated successfully!",
        });
      } else {
        await axios.post("/api/teams", { ...data, tournamentId });
        addToast({ title: "Success", description: "Team added successfully!" });
      }
      reset(); // Clear form
      setEditMode(false);
      setEditingTeam(null);
      fetchTeams(); // Refresh list
    } catch (error) {
      addToast({
        title: "Error",
        description: "Failed to save team. Please try again.",
        variant: "destructive",
      });
      console.error("Error submitting team:", error);
    }
  };

  // Edit team
  const handleEdit = (team: Team) => {
    setEditMode(true);
    setEditingTeam(team);
    reset(team);
  };

  // Delete team
  const handleDelete = async (teamId: string) => {
    try {
      await axios.delete(`/api/teams?id=${teamId}`);
      addToast({
        title: "Success",
        description: "Team deleted successfully!",
      });
      fetchTeams();
    } catch (error) {
      addToast({
        title: "Error",
        description: "Failed to delete team. Please try again.",
        variant: "destructive",
      });
      console.error("Error deleting team:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [tournamentId]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-center text-3xl font-extrabold mb-6">
        Manage Teams for Tournament {tournamentId}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
        <Input
          {...register("teamId")}
          placeholder="Team Unique ID (e.g., ST02001)"
          className="border-primary focus:ring-primary"
        />
        <Input
          {...register("name")}
          placeholder="Team Name"
          className="border-primary focus:ring-primary"
        />
        <Input
          {...register("playerCount")}
          type="number"
          placeholder="Player Count"
          className="border-primary focus:ring-primary"
        />
        <Button type="submit" className="w-full hover:bg-primary/90">
          {editMode ? "Update Team" : "Add Team"}
        </Button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <Card
            key={team.teamId}
            className="p-4 bg-card hover:shadow-lg transition-all"
          >
            <h2 className="text-lg font-bold">{team.name}</h2>
            <p className="text-sm">Players: {team.playerCount}</p>
            <div className="flex justify-between mt-4">
              <Button
                onClick={() => handleEdit(team)}
                className="hover:bg-primary/90"
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(team.teamId)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamsAdminPage;
