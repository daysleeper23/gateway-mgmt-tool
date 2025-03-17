import ListView from "./list/list-view";

const App = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="p-6 border-b">
        <h1 className="text-3xl font-black">Wirepas Gateway Management Tool</h1>
      </div>
      <div className="flex-1 overflow-hidden relative w-full">
        <ListView />
      </div>
    </div>
  );
};

export default App;
