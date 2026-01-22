import React from 'react';
import { Button, TextField } from '@mui/material';

const EditModal = ({ show, title, onSave, onCancel, saveDisabled, children }) => {
    if (!show) return null;

    return (
        <div style={{
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            left: 0,
            top: 0,
            zIndex: 10000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(5px)',
        }}>
            <div style={{
                minHeight: '250px',
                minWidth: '400px',
                backgroundColor: 'white',
                borderRadius: '10px',
                border: '1px solid #EDEDED',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <div style={{
                    padding: '25px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                }}>
                    <h2 style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        fontFamily: 'Inter',
                        textAlign: 'center',
                    }}>{title}</h2>

                    {children}

                    <Button style={{
                        marginTop: '25px'
                    }}
                            variant={"contained"}
                            onClick={onSave}
                            disabled={saveDisabled}
                    >Save</Button>

                    <Button style={{
                        marginTop: '25px'
                    }}
                            variant={"contained"}
                            onClick={onCancel}
                    >Cancel</Button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
