import React, { createContext, useContext, useState } from 'react';
import { Alert } from "@mui/material";
import styles from './AlertContext.module.css';
import {TaskAlt, Error} from "@mui/icons-material";

// Create the context
const AlertContext = createContext();

export const useAlertContext = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const removeAlert = (id) => {
    setAlerts((prevAlerts) => prevAlerts.map(alert => alert.id === id ? { ...alert, removing: true } : alert));
    setTimeout(() => {
      setAlerts((prevAlerts) => prevAlerts.filter(alert => alert.id !== id));
    }, 500); // Match this with the animation duration in CSS
  }

  const createAlert = (message, severity= 'success', duration = 5000) => {
    const id = new Date().getTime();
    setAlerts((prevAlerts) => [...prevAlerts, { id, message, severity, removing: false }]);

    setTimeout(() => {
      removeAlert(id);
    }, duration);
  }

  const value = { createAlert };

  return (
      <AlertContext.Provider value={value}>
        <div className={styles.AlertContext}>
          {alerts.map(alert => (
              <div
                  key={alert.id}
                  className={`${styles.alertItem} ${styles[alert.severity]}`}
                  style={{
                    display: 'flex',
                    flexPosition: 'row',
                    justifyContent: 'start',
                    alignItems: 'center'
                  }}
              >
                { alert.severity === "success" ? <TaskAlt style={{
                  marginInline: '10px',
                  color: 'green'
                }}/> : null }

                { alert.severity === "error" ? <Error style={{
                  marginInline: '10px',
                  color: 'red'
                }}/> : null }
                <span> {alert.message} </span>
              </div>
          ))}
        </div>
        {children}
      </AlertContext.Provider>
  );
};
