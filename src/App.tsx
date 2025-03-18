// import ListView from "./list/list-view";
import { Route, Routes } from "react-router";
import TanstackListView from "./list/tanstack/tanstack-list-view";
import { lazy } from "react";
import StatisticsView from "./statistics/statistics-view";

const ListView = lazy(() => import("./list/raw/list-view"));

const App = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="p-6 border-b">
        <h1 className="text-3xl font-black">Wirepas Gateway Management Tool</h1>
      </div>
      <div className="flex-1 overflow-hidden relative w-full">
        <Routes>
          <Route path="/" element={<TanstackListView />} />
          <Route path="/:uuid" element={<StatisticsView />} />
          <Route path="/list" element={<ListView />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
