import React, { useState } from 'react';

const Problem1 = () => {
  const [show, setShow] = useState('all');
  const [formData, setFormData] = useState({ name: '', status: '' });
  const [tableData, setTableData] = useState([]);


//handeling form input change here
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//handeling form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setTableData([...tableData, formData]);
    setFormData({ name: '', status: '' });
  };

  const handleClick = (val) => {
    setShow(val);
  };

//filtering data here
// return type is sorted data
const filterData = () => {
    let sortedData = tableData.slice();
  
    sortedData.sort((a, b) => {
      const order = { active: 1, completed: 2 };
  
      const statusA = a.status.toLowerCase();
      const statusB = b.status.toLowerCase();
  
      const orderA = order[statusA] || 3; // Assign a higher order for other statuses
      const orderB = order[statusB] || 3;
  
      return orderA - orderB;
    });
  
    if (show === 'all') {
      return sortedData;
    } else {
      return sortedData.filter((data) => data.status.toLowerCase() === show);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmit}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === 'all' && 'active'}`}
                type="button"
                onClick={() => handleClick('all')}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === 'active' && 'active'}`}
                type="button"
                onClick={() => handleClick('active')}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === 'completed' && 'active'}`}
                type="button"
                onClick={() => handleClick('completed')}
              >
                Completed
              </button>
            </li>
          </ul>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {filterData().map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
