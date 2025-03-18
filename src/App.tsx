// import ListView from "./list/list-view";
import { TanstackListView } from "./tanstack/tanstack-list-view";

const App = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="p-6 border-b">
        <h1 className="text-3xl font-black">Wirepas Gateway Management Tool</h1>
      </div>
      <div className="flex-1 overflow-hidden relative w-full">
        {/* <ListView /> */}
        <TanstackListView />
      </div>
    </div>
  );
};

export default App;
