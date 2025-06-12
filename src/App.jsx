import React, { useState } from "react";
import app from "./firebase";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { Plus, Database, Upload } from "lucide-react"; // optional: for icons

const db = getFirestore(app);

const App = () => {
  const [userData, setUserData] = useState([]);

  const writeDatatoDB = async () => {
    const result = await addDoc(collection(db, "cities"), {
      name: "Vijayawada",
      pinCode: 521325,
      latitude: 1234.32,
      longitude: 8483.245,
    });
    console.log("Document Ref Id:", result.id);
  };

  const data = [
    { SectorSide: "Vijayawada East", SectorNumber: 45 },
    { SectorSide: "Vijayawada West", SectorNumber: 29 },
    { SectorSide: "Vijayawada North", SectorNumber: 31 },
    { SectorSide: "Vijayawada Central", SectorNumber: 10 },
    { SectorSide: "Vijayawada South", SectorNumber: 42 },
  ];

  const makeSubCollections = async () => {
    try {
      for (const docData of data) {
        const result = await addDoc(
          collection(db, "cities/68z8GKeMZpRB383ombtf/sectors"),
          docData
        );
        console.log("Subcollection doc ID:", result.id);
      }
    } catch (error) {
      console.error("Error adding subcollection docs:", error);
    }
  };

  const readDatafromDB = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = [];

    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    setUserData(users);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-blue-100 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-10 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-700">Welcome, Mani 👋</h1>
          <p className="text-gray-600 mt-2">Firestore Dashboard</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-white">
          <button
            onClick={writeDatatoDB}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition-all px-5 py-3 rounded-xl shadow-md"
          >
            <Plus className="w-5 h-5" />
            Write Main City
          </button>

          <button
            onClick={makeSubCollections}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition-all px-5 py-3 rounded-xl shadow-md"
          >
            <Upload className="w-5 h-5" />
            Add Sub-Collections
          </button>

          <button
            onClick={readDatafromDB}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 transition-all px-5 py-3 rounded-xl shadow-md"
          >
            <Database className="w-5 h-5" />
            Read Data From DB
          </button>
        </div>

        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 max-h-[300px] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">User Data</h2>
          {userData.length === 0 ? (
            <p className="text-gray-400 italic">No data available</p>
          ) : (
            <ul className="space-y-3">
              {userData.map((user) => (
                <li
                  key={user.id}
                  className="bg-white p-4 rounded-xl shadow border flex flex-col sm:flex-row sm:justify-between"
                >
                  <div>
                    <p className="text-sm text-gray-600">ID:</p>
                    <p className="font-mono text-blue-600">{user.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Details:</p>
                    <pre className="bg-gray-100 text-sm p-2 rounded">{JSON.stringify(user, null, 2)}</pre>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
