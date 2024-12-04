// src/constants.js
import { faMoneyCheckAlt, faBriefcase, faChartLine, faGift, faHome, faQuestionCircle, faUtensils, faBus, faLightbulb, faHeartbeat, faFilm } from '@fortawesome/free-solid-svg-icons';
// export const API_URL = 'http://127.0.0.1:8000'; // Replace with your API URL
export const API_URL = 'https://dinsage-dot-dinsage.rj.r.appspot.com';

export const transactionTypes = {
    income: [
      {
        id: 1,
        name: "Salário",
        description: "Salário mensal ou renda regular",
        icon: faMoneyCheckAlt,
      },
      {
        id: 2,
        name: "Freelance",
        description: "Renda de trabalho freelance ou gig",
        icon: faBriefcase,
      },
      {
        id: 3,
        name: "Retornos de Investimento",
        description: "Lucros ou dividendos de investimentos",
        icon: faChartLine,
      },
      {
        id: 4,
        name: "Presente",
        description: "Dinheiro recebido como presentes ou recompensas",
        icon: faGift,
      },
      {
        id: 5,
        name: "Renda de Aluguel",
        description: "Renda de aluguel de propriedades",
        icon: faHome,
      },
      {
        id: 6,
        name: "Outros",
        description: "Other types of income",
        icon: faQuestionCircle,
      },
    ],
    expense: [
      {
        id: 7,
        name: "Alimentação",
        description: "Compras de supermercado ou refeições fora",
        icon: faUtensils,
      },
      {
        id: 8,
        name: "Transporte",
        description: "Combustível, transporte público ou serviços de transporte",
        icon: faBus,
      },
      {
        id: 9,
        name: "Utilidades",
        description: "Contas como eletricidade, água e internet",
        icon: faLightbulb,
      },
      {
        id: 10,
        name: "Saúde",
        description: "Despesas médicas ou de fitness",
        icon: faHeartbeat,
      },
      {
        id: 11,
        name: "Entretenimento",
        description: "Serviços de streaming, filmes ou lazer",
        icon: faFilm,
      },
      {
        id: 12,
        name: "Outros",
        description: "Other types of expenses",
        icon: faQuestionCircle,
      },
    ],
  };