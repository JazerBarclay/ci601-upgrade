import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import Navigation from "./layout/Navigation";
import Footer from "./layout/Footer";

import Home from "./pages/home/Home";
import Members from "./pages/members/Members";
import Lessons from "./pages/lessons/Lessons";

import "./App.css";
import Attendance from "./pages/attendance/Attendance";
import LessonList from "./pages/attendance/LessonList";

const App = ({ setToken }) => {
    return (
        <div className="appContainer">
            <Header />
            <BrowserRouter basename="/">
                <Routes>
                    <Route
                        path="/"
                        element={<Navigation setToken={setToken} />}
                    >
                        <Route
                            index
                            element={
                                <div className="scroll-container">
                                    <Home />
                                    <Footer />
                                </div>
                            }
                        />
                        <Route
                            path="/members"
                            element={
                                <div className="scroll-container">
                                    <Members />
                                    <Footer />
                                </div>
                            }
                        />
                        <Route
                            path="/lessons"
                            element={
                                <div className="scroll-container">
                                    <Lessons />
                                    <Footer />
                                </div>
                            }
                        />
                        <Route
                            path="/attendance"
                            element={
                                <div className="scroll-container">
                                    <LessonList />
                                    <Footer />
                                </div>
                            }
                        />
                        <Route
                            path="/attendance/:lesson"
                            element={
                                <div className="scroll-container">
                                    <Attendance />
                                    <Footer />
                                </div>
                            }
                        />
                        <Route
                            path="*"
                            element={
                                <div className="scroll-container">
                                    <main>
                                        <h1>Page not found</h1>
                                    </main>
                                    <Footer />
                                </div>
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
