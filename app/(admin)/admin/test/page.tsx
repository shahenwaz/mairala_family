"use client";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";

interface TestData {
  name: string;
  type: string;
  description: string;
}

export default function TestPage() {
  const [data, setData] = useState<TestData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const testQuery = query(collection(db, "test"), orderBy("name")); // Order by 'name'
      const querySnapshot = await getDocs(testQuery);
      const fetchedData = querySnapshot.docs.map(
        (doc) => doc.data() as TestData
      );
      setData(fetchedData);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Test Firebase Firestore</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}
