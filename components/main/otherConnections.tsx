export default function OtherConnections() {

  return (
    <>
      <h2 className="font-bold text-4xl mb-4 mt-32">Other connections</h2>
      <div className="flex flex-col border border-gray-300 rounded-xl shadow overflow-hidden">
        <input
          type="text"
          className="p-2 flex-grow"
          placeholder="Try searching something like: 'Someone who is an AI researcher'"
        />
        <button className="bg-gray-700 text-white p-2">Search</button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="border border-gray-300 rounded-xl shadow p-4">
          <h3 className="font-bold text-2xl mb-3">Connection 1</h3>
          <p className="text-gray-600">
            This is a brief description of Connection 1. It provides some
            details about the connection.
          </p>
          <br></br>
          <span className="text-gray-600">Connection: </span>
          <a href="/connections/1" className="underline">
            Name
          </a>
        </div>
        <div className="border border-gray-300 rounded-xl shadow p-4">
          <h3 className="font-bold text-2xl mb-3">Connection 2</h3>
          <p className="text-gray-600">
            This is a brief description of Connection 2. It provides some
            details about the connection.
          </p>
          <br></br>
          <span className="text-gray-600">Connection: </span>
          <a href="/connections/1" className="underline">
            Name
          </a>
        </div>
        <div className="border border-gray-300 rounded-xl shadow p-4">
          <h3 className="font-bold text-2xl mb-3">Connection 3</h3>
          <p className="text-gray-600">
            This is a brief description of Connection 3. It provides some
            details about the connection.
          </p>
          <br></br>
          <span className="text-gray-600">Connection: </span>
          <a href="/connections/1" className="underline">
            Name
          </a>
        </div>
      </div>
    </>
  );
}

