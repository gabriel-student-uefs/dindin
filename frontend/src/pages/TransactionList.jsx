import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import EditTransactionModal from "./EditTransactionModal";
import AuthContext from "../context/AuthContext";
import { API_URL, transactionTypes } from "../constants";
import { Button, Card, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faQuestionCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchTransactions();
  }, [token]);

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

  const getTransactionIcon = (type, category) => {
    const transactionType =
      Array.isArray(transactionTypes[type]) &&
      transactionTypes[type].find((t) => t.name === category);

    console.log(type, category, transactionType);
    return transactionType ? transactionType.icon : faQuestionCircle;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  return (
    <div className="mt-4">
      <h1
        className="text-center mb-4"
        style={{ fontWeight: "bold", color: "#343a40" }}
      >
        Transações
      </h1>
      <div className="text-center" shadow-sm>
        {" "}
        <Button
          variant="primary"
          onClick={handleCreateClick}
          style={{ backgroundColor: "#20c997", borderColor: "#20c997" }}
        >
          Nova Transação
          <FontAwesomeIcon icon={faPlus} className="me-2 mx-2" />
        </Button>
      </div>

      <Row className="mt-3">
        {transactions.map((transaction) => (
          <Col key={transaction.id} sm={12} md={6} lg={4} className="mb-3">
            <Card
             style={{background: "#fdfdfd"}}
              className={`${
                transaction.type == "income"
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
