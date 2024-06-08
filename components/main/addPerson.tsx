export default function AddPerson() {
  return (
    <>
      <h2 className="font-bold text-4xl mb-4 ">Add connection</h2>
      <form className="flex flex-col gap-4">
        <label htmlFor="name" className="text-md font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="p-2 border border-gray-300 rounded-md"
          placeholder="Name of person"
        />

        <label htmlFor="about" className="text-md font-medium">
          About
        </label>
        <textarea
          id="about"
          name="about"
          className="p-2 border border-gray-300 rounded-md h-32"
          placeholder="Give a natural language description of the person"
        />

        <button
          type="submit"
          className="bg-gray-700 text-white p-2 rounded-md mt-4"
        >
          Submit
        </button>
      </form>
    </>
  );
}
