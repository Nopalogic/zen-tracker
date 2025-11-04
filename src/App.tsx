import { Route, Routes } from "react-router-dom";
import TimeTracker from "./features/time-tracker";
import Layout from "./components/layout";
import Tasks from "./features/tasks";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<TimeTracker />} />
        <Route path="/tasks" element={<Tasks />} />
      </Route>
    </Routes>
  );
}
