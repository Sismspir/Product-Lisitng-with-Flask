import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function ListUser() {

    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [data, setData] = useState([]);

    // get the data from the url sent to the api
    const handleClick = async () => {

        const backendApiUrl = '/api/fetch-data';
        // update the items array with the response
        try {
          const response = await axios.get(backendApiUrl);
          setItems([...response.data.data])
          console.log('Response:', response.data, items);
        } 
        catch (error) {
          console.log('Fetch Error: ', error);
        }
    };

    // get the data from the database using the api
    const handleUpdate = async () => {

        const backendApiUrl = '/api/get-data';

        try {
            const response = await axios.get(backendApiUrl);
            setData(response.data)
            console.log(data)
            console.log('Response:', response);
          }
          catch (error) {
            console.log('Fetch Error: ', error);
          }
      };
    
    // redirect the user to the add-data form
    const handleAdd = () => {
        navigate('/edit-data');
      };

    // delete the item with the given id
    const deleteItem = (id) => {
        // send the delete request to the db
        axios.delete(`/api/db-data/delete/${id}`).then(function(response){
        alert(`The item with the id: ${id} deleted successfully!`);
        // reload the page when an item is deleted
        window.location.reload(true);
        });
    }

    // redirect the user when the edit-item button is clicked
    const editItem = (id) => {
        navigate(`/edit-item/${id}`);
    }

    return (
        <div className="table-container">
            <div className="flexible">
            <button onClick={handleClick} className="btn-fetch">Fetch Data</button>  
            {items.length !== 0 && <span> <button onClick={handleUpdate} className="btn-fetch">Update Data</button>  <button onClick={handleAdd} className="btn-fetch">Add Data</button>
            </span> }
            </div>   
            <table className="table">
                <thead>
                    <tr>
                    <th>External Id</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Description</th>
                    <th>Barcode</th>
                    <th>Retail Price</th>
                    <th>Whole Sale Price</th>
                    <th>Discount</th>
                    <th>Delete</th>
                    <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.externalId}>
                            <td>{item.externalId}</td>
                            <td>{item.name}</td>
                            <td>{item.code}</td>
                            <td>{item.description}</td>
                            <td>{item.barcode}</td>
                            <td>{item.retailPrice}</td>
                            <td>{item.wholesalePrice}</td>
                            <td>{item.discount}</td>
                            <td> </td>
                            <td> </td>
                        </tr>
                    ))}
                </tbody>
                <tbody>
                    {data.map((item) => (
                        <tr key={item[0]}>
                            <td>{item[0]}</td>
                            <td>{item[1]}</td>
                            <td>{item[2]}</td>
                            <td>{item[3]}</td>
                            <td>{item[4]}</td>
                            <td>{item[5]}</td>
                            <td>{item[6]}</td>
                            <td>{item[7]}</td>
                            <td>          
                               <button className="btn-delete" onClick={() => deleteItem(item[0])}>Delete</button>
                           </td>
                           <td>          
                               <button className="btn-delete" onClick={() => editItem(item[0])}>Edit</button>
                           </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}