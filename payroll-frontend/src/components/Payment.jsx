import { useState, useEffect } from "react";
import axios from "axios";

function Payment() {

    const [paymentid, setPaymentid] = useState(null);

    const [payment, setPayment] = useState({
        empid: "",
        paymentmonth: "",
        paymentyear: "",
        paymentdate: "",
        paymentmode: "",
        amount: "",
        remarks: ""
    });

    const [payments, setPayments] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        loadPayments();
        loadEmployees();
    }, []);

    const loadPayments = async () => {
        const result = await axios.get("http://localhost:8080/payment");
        setPayments(result.data);
    };

    const loadEmployees = async () => {
        const result = await axios.get("http://localhost:8080/employee");
        setEmployees(result.data);
    };

    const handleChange = (e) => {
        setPayment({
            ...payment,
            [e.target.name]: e.target.value
        });
    };

    const savePayment = async (e) => {
        e.preventDefault();

        const paymentData = {
            paymentmonth: payment.paymentmonth,
            paymentyear: payment.paymentyear,
            paymentdate: payment.paymentdate,
            paymentmode: payment.paymentmode,
            amount: payment.amount,
            remarks: payment.remarks,
            employee: {
                empid: payment.empid
            }
        };

        if (paymentid === null) {
            await axios.post(
                "http://localhost:8080/payment",
                paymentData
            );
            alert("Payment Saved Successfully!");
        } else {
            await axios.put(
                `http://localhost:8080/payment/${paymentid}`,
                paymentData
            );
            alert("Payment Updated Successfully!");
        }

        clearForm();
        loadPayments();
    };

    const editPayment = (pay) => {
        setPaymentid(pay.paymentid);

        setPayment({
            empid: pay.employee?.empid || "",
            paymentmonth: pay.paymentmonth,
            paymentyear: pay.paymentyear,
            paymentdate: pay.paymentdate,
            paymentmode: pay.paymentmode,
            amount: pay.amount,
            remarks: pay.remarks
        });
    };

    const deletePayment = async (id) => {

        if (!window.confirm("Are you sure?")) {
            return;
        }

        await axios.delete(
            `http://localhost:8080/payment/${id}`
        );

        loadPayments();
    };

    const clearForm = () => {
        setPaymentid(null);

        setPayment({
            empid: "",
            paymentmonth: "",
            paymentyear: "",
            paymentdate: "",
            paymentmode: "",
            amount: "",
            remarks: ""
        });
    };

    return (
        <div className="container mt-4">

            <div className="card shadow mb-4">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Payment Management</h5>
                </div>

                <div className="card-body">
                    <form onSubmit={savePayment}>
                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <label>Employee</label>
                                <select
                                    className="form-select"
                                    name="empid"
                                    value={payment.empid}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Employee</option>

                                    {employees.map((emp) => (
                                        <option
                                            key={emp.empid}
                                            value={emp.empid}
                                        >
                                            {emp.empname}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Payment Month</label>
                                <select
                                    className="form-select"
                                    name="paymentmonth"
                                    value={payment.paymentmonth}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Month</option>
                                    <option>January</option>
                                    <option>February</option>
                                    <option>March</option>
                                    <option>April</option>
                                    <option>May</option>
                                    <option>June</option>
                                    <option>July</option>
                                    <option>August</option>
                                    <option>September</option>
                                    <option>October</option>
                                    <option>November</option>
                                    <option>December</option>
                                </select>
                            </div>

                            <div className="col-md-4 mb-3">
                                <label>Payment Year</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="paymentyear"
                                    value={payment.paymentyear}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label>Payment Date</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="paymentdate"
                                    value={payment.paymentdate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label>Payment Mode</label>
                                <select
                                    className="form-select"
                                    name="paymentmode"
                                    value={payment.paymentmode}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Mode</option>
                                    <option>Cash</option>
                                    <option>UPI</option>
                                    <option>Bank Transfer</option>
                                    <option>Cheque</option>
                                </select>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Amount</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="amount"
                                    value={payment.amount}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Remarks</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="remarks"
                                    value={payment.remarks}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-12">
                                <button
                                    type="submit"
                                    className="btn btn-primary me-2"
                                >
                                    {paymentid === null ? "Save" : "Update"}
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={clearForm}
                                >
                                    Clear
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>

            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Payment List</h5>
                </div>

                <div className="card-body">
                    <table className="table table-bordered table-hover">

                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Employee</th>
                                <th>Month</th>
                                <th>Year</th>
                                <th>Date</th>
                                <th>Mode</th>
                                <th>Amount</th>
                                <th>Remarks</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {payments.map((pay) => (
                                <tr key={pay.paymentid}>
                                    <td>{pay.paymentid}</td>
                                    <td>{pay.employee?.empname}</td>
                                    <td>{pay.paymentmonth}</td>
                                    <td>{pay.paymentyear}</td>
                                    <td>{pay.paymentdate}</td>
                                    <td>{pay.paymentmode}</td>
                                    <td>₹{pay.amount}</td>
                                    <td>{pay.remarks}</td>

                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => editPayment(pay)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deletePayment(pay.paymentid)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>

        </div>
    );
}

export default Payment;