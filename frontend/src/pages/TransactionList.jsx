import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import EditTransactionModal from "./EditTransactionModal";
import AuthContext from "../context/AuthContext";
import { API_URL, transactionTypes } from "../constants";
import { Button, Card, Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faQuestionCircle,
  faPlus,
  faFilter,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);
  const [totalFilteredAmount, setTotalFilteredAmount] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchTransactions();
  }, [token]);

  useEffect(() => {
    filterTransactions();
  }, [searchTerm, filterType, filterCategories, transactions]);

  useEffect(() => {
    calculateTotalFilteredAmount();
  }, [filteredTransactions]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${API_URL}/finance/transactions/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const filterTransactions = () => {
    let filtered = transactions;

    if (searchTerm) {
      filtered = filtered.filter((transaction) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          transaction.description.toLowerCase().includes(searchLower) ||
          transaction.amount.toString().toLowerCase().includes(searchLower) ||
          transaction.type.toLowerCase().includes(searchLower) ||
          transaction.category.toLowerCase().includes(searchLower)
        );
      });
    }

    if (filterType.length > 0) {
      filtered = filtered.filter((transaction) =>
        filterType.some((type) => transaction.type === type.value)
      );
    }

    if (filterCategories.length > 0) {
      filtered = filtered.filter((transaction) =>
        filterCategories.some(
          (category) => transaction.category === category.value
        )
      );
    }

    setFilteredTransactions(filtered);
  };

  const calculateTotalFilteredAmount = () => {
    let total = 0;
    filteredTransactions.forEach((transaction) => {
      const amount = parseFloat(transaction.amount);
      if (!isNaN(amount)) {
        if (transaction.type === "income") {
          total += amount;
        } else if (transaction.type === "expense") {
          total -= amount;
        }
      } else {
        console.error("Invalid transaction amount:", transaction.amount);
      }
    });
    setTotalFilteredAmount(total);
  };

  const handleEditClick = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`${API_URL}/finance/transactions/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterTypeSelect = (selectedOptions) => {
    setFilterType(selectedOptions || []);
  };

  const handleFilterCategorySelect = (selectedOptions) => {
    setFilterCategories(selectedOptions || []);
  };

  const getTransactionIcon = (type, category) => {
    const transactionType =
      Array.isArray(transactionTypes[type]) &&
      transactionTypes[type].find((t) => t.name === category);

    return transactionType ? transactionType.icon : faQuestionCircle;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  const typeOptions = [
    { value: "income", label: "Ganho" },
    { value: "expense", label: "Despesa" },
  ];

  const categoryOptions = Object.keys(transactionTypes).flatMap((type) =>
    transactionTypes[type].map((category) => ({
      value: category.name,
      label: category.name,
    }))
  );

  return (
    <div className="mt-4">
      <h1 className="text-center mb-4" style={{ color: "#343a40" }}>
        Transações
      </h1>

      <Col md={8} className="text-end">
        <h6 className="d-inline-block ms-3">
          Total: {formatCurrency(totalFilteredAmount)}
        </h6>
      </Col>

      <Row className="mb-3">
        <Col md={4} className="mb-3">
          <Form.Control
            type="text"
            placeholder="Pesquisar transações"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Col>
        <Col md={8} className="text-end">
          <Button
            variant="primary"
            onClick={handleCreateClick}
            style={{ backgroundColor: "#20c997", borderColor: "#20c997" }}
            className="mx-2"
          >
            Nova Transação
            <FontAwesomeIcon icon={faPlus} className="me-2 mx-2" />
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowFilters(!showFilters)}
            style={{ backgroundColor: "#6c757d", borderColor: "#6c757d" }}
          >
            {showFilters ? (
              <>
                Filtrar
                <FontAwesomeIcon icon={faTimes} className="me-2 mx-2" />
              </>
            ) : (
              <>
                Filtrar
                <FontAwesomeIcon icon={faFilter} className="me-2 mx-2" />
              </>
            )}
          </Button>
        </Col>
      </Row>
      {showFilters && (
        <Row className="mb-3">
          <Col md={4}>
            <Form.Label style={{ fontSize: "0.875rem", marginTop: "1rem" }}>
              Tipo
            </Form.Label>
            <Select
              isMulti
              options={typeOptions}
              placeholder="Filtrar por Tipo"
              onChange={handleFilterTypeSelect}
              value={filterType}
            />
          </Col>
          <Col md={4}>
            <Form.Label style={{ fontSize: "0.875rem", marginTop: "1rem" }}>
              Categoria
            </Form.Label>
            <Select
              isMulti
              options={categoryOptions}
              placeholder="Filtrar por Categoria"
              onChange={handleFilterCategorySelect}
              value={filterCategories}
            />
          </Col>
        </Row>
      )}

      <Row className="mt-3">
        {filteredTransactions.map((transaction) => (
          <Col key={transaction.id} sm={12} md={6} lg={4} className="mb-3">
            <Card
              style={{ background: "#fdfdfd" }}
              className={`${
                transaction.type === "income"
                  ? "income-border"
                  : "expense-border"
              } shadow-sm`}
            >
              <Card.Body>
                <Card.Title>
                  <Col>
                    <FontAwesomeIcon
                      icon={getTransactionIcon(
                        transaction.type,
                        transaction.category
                      )}
                      className="me-2"
                    />
                  </Col>
                  <Col>
                    <div className="pt-2">{transaction.description}</div>

                    <span className="float-end">
                      {transaction.type === "income" ? (
                        <span className="success-color">&#9679;</span>
                      ) : (
                        <span className="danger-color">&#9679;</span>
                      )}
                    </span>
                  </Col>
                </Card.Title>
                <Card.Text>
                  <strong>Valor:</strong> {formatCurrency(transaction.amount)}
                </Card.Text>
                <div className="d-flex justify-content-end">
                  <Button
                    style={{
                      borderColor: "#1e2b48",
                      color: "#1e2b48",
                      backgroundColor: "#fdfdfd",
                    }}
                    size="sm"
                    onClick={() => handleEditClick(transaction)}
                    className="me-2"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    style={{
                      borderColor: "#d3557d",
                      color: "#d3557d",
                      backgroundColor: "#fdfdfd",
                    }}
                    size="sm"
                    onClick={() => handleDeleteClick(transaction.id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {isModalOpen && (
        <EditTransactionModal
          transaction={selectedTransaction}
          onClose={() => setIsModalOpen(false)}
          onSave={fetchTransactions}
          token={token}
        />
      )}
    </div>
  );
};

export default TransactionList;
