import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import config from "../config";

import Header from "./layout/Header";
import Navigation from "./layout/Navigation";
import Footer from "./layout/Footer";

import Home from "./pages/home/Home";
import Members from "./pages/members/Members";
import Lessons from "./pages/lessons/Lessons";
import Attendance from "./pages/attendance/Attendance";
import LessonList from "./pages/attendance/LessonList";

import "./App.css";
import Payments from "./pages/payments/Payments";

const App = ({ setToken }) => {
    const [lessonTypes, setLessonTypes] = useState(new Map());
    const [paymentMethods, setPaymentMethods] = useState(new Map());
    const [purchaseTypes, setPurchaseTypes] = useState(new Map());
    const [lessonPricing, setLessonPricing] = useState(new Map());

    const getLessonTypesFromServer = async () => {
        let table = new Map();

        await fetch(`${config.SERVER_IP}/lessonTypes`)
            .then((data) => data.json())
            .then((data) => {
                data.lesson_types.map((lessonType) => {
                    table = new Map(table).set(lessonType.id, lessonType);
                    setLessonTypes(table);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getPaymentMethodsFromServer = async () => {
        let table = new Map();

        await fetch(`${config.SERVER_IP}/paymentMethods`)
            .then((data) => data.json())
            .then((data) => {
                data.payment_methods.map((method) => {
                    table = new Map(table).set(method.id, method);
                    setPaymentMethods(table);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getPurchaseTypesFromServer = async () => {
        let table = new Map();

        await fetch(`${config.SERVER_IP}/lessonPurchaseTypes`)
            .then((data) => data.json())
            .then((data) => {
                data.lesson_purchase_types.map((type) => {
                    table = new Map(table).set(type.id, type);
                    setPurchaseTypes(table);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getLessonPricingFromServer = async () => {
        let table = new Map();

        await fetch(`${config.SERVER_IP}/lessonPricing`)
            .then((data) => data.json())
            .then((data) => {
                data.lesson_pricing.map((pricing) => {
                    table = new Map(table).set(pricing.id, pricing);
                    setLessonPricing(table);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getLessonTypesFromServer();
        getPaymentMethodsFromServer();
        getPurchaseTypesFromServer();
        getLessonPricingFromServer();
    }, []);

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
                                    <Attendance
                                        lessonTypes={lessonTypes}
                                        purchaseTypes={purchaseTypes}
                                        lessonPricing={lessonPricing}
                                    />
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
                            path="/payments"
                            element={
                                <div className="scroll-container">
                                    <Payments />
                                    <Footer />
                                </div>
                            }
                        />
                        <Route
                            path="*"
                            element={
                                <div className="scroll-container">
                                    <main>
                                        <h1>404 - Page not found</h1>
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
