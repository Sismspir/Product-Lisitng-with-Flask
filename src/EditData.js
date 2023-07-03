import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditData() {

    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);

    // log inputs every time they change
    useEffect(() => {
        console.log(inputs);
    }, [inputs]);

    // change the value of an item when the user types inside the input field
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    // save the data when the user submits the form
    const handleSubmit = (event) => {
        // prevent the page from reloading
        event.preventDefault();

        // check if at least one input is changed
        try {
            if (Object.keys(inputs).length === 0) {
                alert("Please enter at least one value");
            } else {
                // save the data and redirect the user to the /list route
                axios.post("api/db-data/save", inputs).then(function (response) {

                    console.log(inputs, response);
                    alert("Item created successfully!");
                    navigate("/list");
            });
            }
        } catch (error) {
            alert('An error occurred: ' + error.message);
        }
      };
    
    // handle duplicate ID
    useEffect(() => {
        const axiosInterceptor = axios.interceptors.response.use(
        // the first callback function returns the response
        (response) => response,
        // the second handles the error and display an alert
        (error) => {
      
            alert('The id already exists! ' + error.message);
            navigate("/list");
        }
        );
        // Clean up the interceptor when the component is unmounted
        return () => {
        axios.interceptors.response.eject(axiosInterceptor);
        };
    }, [inputs]);
        
    return (
        <div className="table-container">
            <h1>Add Data</h1>
            <form onSubmit={handleSubmit}>
            <table cellSpacing="10">
                <tbody>
                    <tr>
                    <th>
                        <label>External id:</label>
                    </th>
                    <td>
                        <input value={inputs.externalId} type="number" name="external_id" onChange={handleChange} />
                    </td>

                    <th>
                        <label>Name:</label>
                    </th>
                    <td>
                        <input value={inputs.name} type="text" name="name" onChange={handleChange} />
                    </td>
                    </tr>
                    <tr>
                    <th>
                        <label>Code:</label>
                    </th>
                    <td>
                        <input value={inputs.code} type="number" name="code" onChange={handleChange} />
                    </td>
                    <th>
                        <label>Description:</label>
                    </th>
                    <td>
                        <input value={inputs.description} type="text" name="description" onChange={handleChange} />
                    </td>
                    </tr>
                    <tr>
                    <th>
                        <label>Barcode:</label>
                    </th>
                    <td>
                        <input value={inputs.barcode} type="number" name="barcode" onChange={handleChange} />
                    </td>

                    <th>
                        <label>Retail Price:</label>
                    </th>
                    <td>
                        <input value={inputs.price} type="number" name="retail_price" onChange={handleChange} />
                    </td>
                    </tr>
                    <tr>
                    <th>
                        <label>Whole Sale Price:</label>
                    </th>
                    <td>
                        <input value={inputs.wholeSalePrice} type="number" name="whole_sale_price" onChange={handleChange} />
                    </td>

                    <th>
                        <label>Discount:</label>
                    </th>
                    <td>
                        <input value={inputs.discount} type="number" name="discount" onChange={handleChange} />
                    </td>
                    </tr>
                    <tr>
                    <td colSpan="4" align="right">
                        <button className="btn-save">Save</button>
                    </td>
                    </tr>
                </tbody>
              </table>
            </form>
        </div>
    )
 }