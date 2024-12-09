"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Tournament {
  id: string; // Added `id` to match the virtual field
  uniqueId: string;
  title: string;
  prizePool: number;
  status: "Ongoing" | "Finalized";
  logo: string;
  startDate: string;
  endDate: string;
  background: string;
  colorScheme: "green" | "yellow";
}

const TournamentsPage = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [form, setForm] = useState({
    uniqueId: "",
    title: "",
    prizePool: 0,
    status: "Ongoing",
    logo: "",
    startDate: "",
    endDate: "",
    background: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState("");

  const fetchTournaments = async () => {
    try {
      const { data }: { data: Tournament[] } = await axios.get(
        "/api/tournaments"
      );
      setTournaments(data);
    } catch (error) {
      console.error("Failed to fetch tournaments:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put("/api/tournaments", { id: editingId, ...form });
        setEditMode(false);
        setEditingId("");
      } else {
        await axios.post("/api/tournaments", form);
      }
      fetchTournaments();
      setForm({
        uniqueId: "",
        title: "",
        prizePool: 0,
        status: "Ongoing",
        logo: "",
        startDate: "",
        endDate: "",
        background: "",
      });
    } catch (error) {
      console.error("Failed to submit tournament:", error);
    }
  };

  const handleEdit = (tournament: Tournament) => {
    setEditMode(true);
    setEditingId(tournament.id);
    setForm({ ...tournament });
  };

  const handleDelete = async (id: string) => {
    try {
      // Pass the ID as a query parameter
      await axios.delete(`/api/tournaments?id=${id}`);
      fetchTournaments(); // Refresh the tournaments list
    } catch (error) {
      console.error("Failed to delete tournament:", error);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <div>
      <h1>Manage Tournaments</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="UID (e.g., ST010)"
          value={form.uniqueId}
          onChange={(e) => setForm({ ...form, uniqueId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Prize Pool"
          value={form.prizePool}
          onChange={(e) => setForm({ ...form, prizePool: +e.target.value })}
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="Ongoing">Ongoing</option>
          <option value="Finalized">Finalized</option>
        </select>
        <input
          type="text"
          placeholder="Logo URL"
          value={form.logo}
          onChange={(e) => setForm({ ...form, logo: e.target.value })}
        />
        <input
          type="date"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
        />
        <input
          type="date"
          value={form.endDate}
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
        />
        <input
          type="text"
          placeholder="Background URL"
          value={form.background}
          onChange={(e) => setForm({ ...form, background: e.target.value })}
        />
        <button type="submit">
          {editMode ? "Update" : "Create"} Tournament
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tournaments.map((tournament) => (
          <div key={tournament.id}>
            <h3>{tournament.title}</h3>
            <p>{tournament.status}</p>
            <button onClick={() => handleEdit(tournament)}>Edit</button>
            <button onClick={() => handleDelete(tournament.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentsPage;
