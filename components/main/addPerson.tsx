"use client";
import { useState } from "react";

export default function AddPerson() {
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("/api/addConnection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        note: about,
      }),
    });

    if (response.ok) {
      setIsSuccess(true);
      setSuccessMessage("User added successfully");
      setEmail(""); // Clear the name input
      setAbout(""); // Clear the about input
    } else {
      setIsSuccess(false);
      setSuccessMessage("Failed to add user");
    }
  };

  return (
    <>
      <h2 className="font-bold text-4xl mb-4 ">Add connection</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label htmlFor="name" className="text-md font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="p-2 border shadow border-gray-300 rounded-md outline-none"
          placeholder="Name of person"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="about" className="text-md font-medium">
          Notes
        </label>
        <textarea
          id="about"
          name="about"
          className="p-2 border shadow border-gray-300 rounded-md h-32 outline-none"
          placeholder="Give a natural language description of the person"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />

        <button
          type="submit"
          className="bg-gray-700 text-white p-2 rounded-md shadow mt-4"
        >
          Submit
        </button>
      </form>
      {successMessage && (
        <div
          className={`mt-4 p-2 rounded-md ${
            isSuccess
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {successMessage}
        </div>
      )}
    </>
  );
}
