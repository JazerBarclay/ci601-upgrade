import { useEffect, useState } from "react";
import Card from "../../../components/elements/card/Card";
import CardCollection from "../../../components/elements/card/CardCollection";
import config from "../../../config";
import React, { PureComponent } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import "./Home.css";

const Home = () => {
    const [todaysTotal, setTodaysTotal] = useState("0");
    const [todaysAttendees, setTodaysAttendees] = useState("0");
    const [currentLesson, setCurrentLesson] = useSßtate("N/A");
    const [nextLesson, setNextLesson] = useState("N/A");

    const incomeData = [
        {
            name: "Sat",
            tw: 24.64,
            lw: 19.55,
        },
        {
            name: "Sun",
            tw: 0,
            lw: 0,
        },
        {
            name: "Mon",
            tw: 16,
            lw: 24,
        },
        {
            name: "Tues",
            tw: 31,
            lw: 26,
        },
        {
            name: "Wed",
            tw: 15,
            lw: 12,
        },
        {
            name: "Thur",
            tw: 28,
            lw: 24,
        },
        {
            name: "Fri",
            tw: 12,
            lw: 6,
        },
    ];

    const attendeesData = [
        {
            name: "Sat",
            tw: 22,
            lw: 21,
        },
        {
            name: "Sun",
            tw: 0,
            lw: 0,
        },
        {
            name: "Mon",
            tw: 16,
            lw: 24,
        },
        {
            name: "Tues",
            tw: 31,
            lw: 26,
        },
        {
            name: "Wed",
            tw: 15,
            lw: 12,
        },
        {
            name: "Thur",
            tw: 28,
            lw: 24,
        },
        {
            name: "Fri",
            tw: 12,
            lw: 6,
        },
    ];

    // Todays Total
    useEffect(() => {
        fetch(`${config.SERVER_IP}/payments`)
            .then((data) => data.json())
            .then((data) => {
                let total = 0;
                data.payments.map((payment) => {
                    total += payment.amount;
                });
                setTodaysTotal(total / 100);
            })
            .catch((err) => {
                console.log(err);
            });

        fetch(`${config.SERVER_IP}/attendance/today`)
            .then((data) => data.json())
            .then((data) => {
                let total = 0;
                data.attendees.map((members) => {
                    total += 1;
                });
                setTodaysAttendees(total);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <main className="homePage">
            <h1>Up-Grade Martial Arts</h1>
            <h2>Today - {new Date().toDateString()}</h2>
            <CardCollection>
                <Card title={"Income"} info={`£${todaysTotal}`} />
                <Card title={"Attendees"} info={todaysAttendees} />
                <Card title={"Current Lesson"} info={currentLesson} />
                <Card title={"Next Lesson"} info={nextLesson} />
            </CardCollection>

            <h2>Income - Weekly</h2>
            <ResponsiveContainer
                width="100%"
                minHeight="200px"
                maxHeight="200px"
            >
                <LineChart
                    width={500}
                    height={300}
                    data={incomeData}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 20,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Line
                        type="monotone"
                        dataKey="tw"
                        stroke="#FF7E07"
                        activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="lw" stroke="#FFCE54" />
                </LineChart>
            </ResponsiveContainer>

            <h2>Attendees - Weekly</h2>
            <ResponsiveContainer
                width="100%"
                minHeight="200px"
                maxHeight="200px"
            >
                <LineChart
                    width={500}
                    height={300}
                    data={attendeesData}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 20,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Line
                        type="monotone"
                        dataKey="tw"
                        stroke="#FF7E07"
                        activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="lw" stroke="#FFCE54" />
                </LineChart>
            </ResponsiveContainer>
        </main>
    );
};

export default Home;
