import { useState, useEffect } from "react";
import Table from "../../../components/tables/Table";
import CardCollection from "../../../components/elements/card/CardCollection";
import Card from "../../../components/elements/card/Card";
import config from "../../../config";

const Payments = () => {
    const [payments, setPayments] = useState(new Map());
    const [todaysTotal, setTodaysTotal] = useState(0);
    const [weeksTotal, setWeeksTotal] = useState(0);
    const [monthsTotal, setMonthsTotal] = useState(0);
    const [fiscalTotal, setFiscalTotal] = useState(0);

    const getPaymentsFromServer = () => {
        let map = new Map();

        fetch(`${config.SERVER_IP}/payments`)
            .then((data) => data.json())
            .then((data) => {
                data.payments.map((payment) => {
                    map = new Map(map).set(
                        payment.id,
                        payment
                    );
                    setPayments(map);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getTotals = () => {

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

            fetch(`${config.SERVER_IP}/payments/total/month`)
                .then((data) => data.json())
                .then((data) => {
                    let total = data.total;
                    setMonthsTotal(total / 100);
                })
                .catch((err) => {
                    console.log(err);
                });

                fetch(`${config.SERVER_IP}/payments/total/year`)
                    .then((data) => data.json())
                    .then((data) => {
                        let total = data.total;
                        setFiscalTotal(total / 100);
                    })
                    .catch((err) => {
                        console.log(err);
                    });

    }

    useEffect(() => {
        getPaymentsFromServer();
        getTotals();
    }, []);

    return (
        <main>
            <h1>Payments</h1>

            <CardCollection>
                <Card title={"Income Today"} info={`£${todaysTotal}`} />
                <Card title={"Income Week"} info={`£${weeksTotal}`} />
                <Card title={"Income Month"} info={`£${monthsTotal}`} />
                <Card title={"Fiscal Year Total"} info={`£${fiscalTotal}`} />
            </CardCollection>

            {payments && (
                <Table
                    headings={["Member", "Method", "Total", "Date"]}
                    rows={Array.from(payments, ([id, data]) => [
                        id,
                        data.member_name,
                        data.method_name,
                        `£ ${(data.total / 100).toFixed(2)}`,
                        data.date.split("T")[0]
                    ])}
                    recordCallback={(id) => {
                        // Do nothing
                    }}
                />
            )}
        </main>
    );
};

export default Payments;
