import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditItem() {
  const navigate = useNavigate();
  // extract the id from the url
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [formData, setFormData] = useState(null);

  // triggered every time the id is changed
  useEffect(() => {
    const fetchItem = async () => {

      try {
        // get the data from the api
        const response = await axios.get(`/api/db-data/${id}`);
        setItem(response.data);
        // fill the already existed data in the placeholder 
        setFormData({
          external_id: id,
          name: response.data.name,
          code: response.data.code,
          description: response.data.description,
          barcode: response.data.barcode,
          retail_price: response.data.retail_price,
          whole_sale_price: response.data.whole_sale_price,
          discount: response.data.discount,
        });

      } catch (error) {
        console.log("Fetch Error: ", error);
      }
    };

    fetchItem();
  }, [id]);
  
  // send the data to the api when the form is submited
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // send the data to the api when the form is submited
      await axios.put(`/api/db-data/edit/${id}`, formData);
      alert("Item updated successfully!");
      navigate("/list");
    } 
      catch (error) {
      alert("Failed to update item. Please try again.");
      console.log("Error: ", error);
    }
  };
  
  // update the formData every time user types
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="table-container">
      <h2>Edit Item</h2>
      <form onSubmit={handleSubmit}>
        <table cellSpacing="10">
          <tbody>
            <tr>
              <th>
                <label>Name:</label>
              </th>
              <td>
                <input
                  placeholder={item?.name}
                  value={formData?.name || ""}
                  type="text"
                  name="name"
                  onChange={handleChange}
                />
              </td>
              <th>
                <label>Code:</label>
              </th>
              <td>
                <input
                  placeholder={item?.code}
                  value={formData?.code || ""}
                  type="number"
                  name="code"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>
                <label>Description:</label>
              </th>
              <td>
                <input
                  placeholder={item?.description}
                  value={formData?.description || ""}
                  type="text"
                  name="description"
                  onChange={handleChange}
                />
              </td>
              <th>
                <label>Barcode:</label>
              </th>
              <td>
                <input
                  placeholder={item?.barcode}
                  value={formData?.barcode || ""}
                  type="number"
                  name="barcode"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>
                <label>Retail Price:</label>
              </th>
              <td>
                <input
                  placeholder={item?.retail_price}
                  value={formData?.retail_price || ""}
                  type="number"
                  name="retail_price"
                  onChange={handleChange}
                />
              </td>
              <th>
                <label>Whole Sale Price:</label>
              </th>
              <td>
                <input
                  placeholder={item?.whole_sale_price}
                  value={formData?.whole_sale_price || ""}
                  type="number"
                  name="whole_sale_price"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>
                <label>Discount:</label>
              </th>
              <td>
                <input
                  placeholder={item?.discount}
                  value={formData?.discount || ""}
                  type="number"
                  name="discount"
                  onChange={handleChange}
                />
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
  );
}
