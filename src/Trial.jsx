import { saveKeyValue, getValueByKey } from "./backend/appwriteFunctions";

export default function Trial() {
  const testSave = async () => {
    await saveKeyValue("username", "Shahin Mahmud");
  };

  const testGet = async () => {
    const value = await getValueByKey("username");
    console.log("Final Value:", value);
  };

  return (
    <div>
      <button onClick={testSave}>Save Data</button>
      <button onClick={testGet}>Get Data</button>
    </div>
  );
}
