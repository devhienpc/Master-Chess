import React from 'react';
import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";

const SettingsField = ({ label, value, onClick}) => {
    return (
        <div style={{
            width: '100%',
        }}>
            <div style={{
                paddingInline: '25px',
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
            }}>
                <span style={{ fontFamily: "Inter", fontSize: '24px' }}>
                    {label}: <span style={{ fontWeight: 'bold' }}>{value}</span>
                </span>
                <IconButton style={{ marginLeft: '0px' }} onClick={onClick}>
                    <Edit />
                </IconButton>
            </div>
        </div>
    );
};

export default SettingsField;
