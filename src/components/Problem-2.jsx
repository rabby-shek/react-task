import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useModal } from "../contexts/ModalProvider";

const Problem2 = () => {
  const {
    isModalAOpen,
    isModalBOpen,
    openModalA,
    openModalB,
    closeModalA,
    closeModalB,
  } = useModal();
  const [contacts, setContacts] = useState([]);
  const [usContacts, setUsContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlyEven, setShowOnlyEven] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://contact.mediusware.com/api/contacts/?page=${page}`
      );
      const contactsWithId = response.data.results.map((contact, index) => ({
        ...contact,
        id: index + 1 + (page - 1) * 5,
      }));

      setContacts((prevContacts) => [...prevContacts, ...contactsWithId]);
      const usContactsForPage = contactsWithId.filter(
        (contact) => contact.country.name === "United States"
      );
      setUsContacts((prevUsContacts) => [
        ...prevUsContacts,
        ...usContactsForPage,
      ]);
      const contactsForModal = isModalBOpen
        ? usContactsForPage
        : contactsWithId;
      setFilteredContacts((prevFilteredContacts) => [
        ...prevFilteredContacts,
        ...contactsForModal,
      ]);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleToggleEven = () => {
    setShowOnlyEven(!showOnlyEven);
  };

  const handleShowAllContacts = () => {
    setFilteredContacts(contacts);
  };

  const handleScroll = (e) => {
    const element = e.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setPage(1);
      fetchData();
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={openModalA}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={openModalB}
          >
            US Contacts
          </button>
        </div>

        {/* Modal A */}
        {isModalAOpen && (
          <div
            className="modal"
            tabIndex={-1}
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modal A</h5>
                </div>
                <div
                  className="modal-body"
                  onScroll={handleScroll}
                  style={{ maxHeight: "400px", overflowY: "auto" }}
                >
                  <div className="form-group mb-3">
                    <label htmlFor="searchTerm">Search Contact:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="searchTerm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={handleSearch}
                    />
                    <button
                      className="btn btn-primary mt-2"
                      onClick={handleSearch}
                    >
                      Search
                    </button>
                  </div>
                  <div className="form-check mb-3"></div>
                  <ul className="list-group">
                    {filteredContacts
                      .filter((contact) =>
                        showOnlyEven ? contact.id % 2 === 0 : true
                      )
                      .map((contact) => (
                        <li key={contact.id} className={`list-group-item`}>
                          {contact.id}. {contact.country.name} - {contact.phone}
                        </li>
                      ))}
                  </ul>
                  {loading && <p>Loading...</p>}
                </div>
                <div className="modal-footer">
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="showOnlyEven"
                      checked={showOnlyEven}
                      onChange={handleToggleEven}
                    />
                    <label className="form-check-label" htmlFor="showOnlyEven">
                      Show Only Even
                    </label>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={openModalA}
                  >
                    All Contacts
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={openModalB}
                  >
                    US Contacts
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={closeModalA}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Modal B */}
        {isModalBOpen && (
          <div
            className="modal"
            tabIndex={-1}
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modal B</h5>
                </div>
                <div
                  className="modal-body"
                  onScroll={handleScroll}
                  style={{ maxHeight: "400px", overflowY: "auto" }}
                >
                  <div className="form-group mb-3">
                    <label htmlFor="searchTerm">Search Contact:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="searchTerm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={handleSearch}
                    />
                    <button
                      className="btn btn-primary mt-2"
                      onClick={handleSearch}
                    >
                      Search
                    </button>
                  </div>
                  <div className="form-check mb-3"></div>
                  <ul className="list-group">
                    {usContacts.map((contact) => (
                      <li key={contact.id} className={`list-group-item`}>
                        {contact.id}. {contact.country.name} - {contact.phone}
                      </li>
                    ))}
                  </ul>
                  {loading && <p>Loading...</p>}
                </div>
                <div className="modal-footer">
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="showOnlyEven"
                      checked={showOnlyEven}
                      onChange={handleToggleEven}
                    />
                    <label className="form-check-label" htmlFor="showOnlyEven">
                      Show Only Even
                    </label>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={openModalA}
                  >
                    All Contacts
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={openModalB}
                  >
                    US Contacts
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={closeModalB}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Problem2;
