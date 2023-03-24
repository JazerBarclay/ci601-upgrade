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
    const [weeksTotal, setWeeksTotal] = useState("0");
    const [todaysAttendees, setTodaysAttendees] = useState("0");
    const [weeksAttendees, setWeeksAttendees] = useState("N/A");

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

    // Get statistics
    useEffect(() => {

        fetch(`${config.SERVER_IP}/payments/total/today`)
            .then((data) => data.json())
            .then((data) => {
                let total = data.total;
                setTodaysTotal(total / 100);
            })
            .catch((err) => {
                console.log(err);
            });

        fetch(`${config.SERVER_IP}/payments/total/week`)
            .then((data) => data.json())
            .then((data) => {
                let total = data.total;
                setWeeksTotal(total / 100);
            })
            .catch((err) => {
                console.log(err);
            });

        fetch(`${config.SERVER_IP}/attendance/total/today`)
            .then((data) => data.json())
            .then((data) => {
                let total = data.total;
                setTodaysAttendees(total);
            })
            .catch((err) => {
                console.log(err);
            });

        fetch(`${config.SERVER_IP}/attendance/total/week`)
            .then((data) => data.json())
            .then((data) => {
                let total = data.total;
                setWeeksAttendees(total);
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);

    return (
        <main className="homePage">
            <h1>Today - {new Date().toDateString()}</h1>
            <CardCollection>
                <Card title={"Income Today"} info={`£${todaysTotal}`} />
                <Card title={"Income Week"} info={`£${weeksTotal}`} />
                <Card title={"Attendees Today"} info={todaysAttendees} />
                <Card title={"Attendees Week"} info={weeksAttendees} />
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
