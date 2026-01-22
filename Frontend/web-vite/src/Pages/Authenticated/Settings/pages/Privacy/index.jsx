import {useUser} from "@/Contexts/UserContext.jsx";
import {Cancel, Edit} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import SettingsField from "@/Components/SettingsField.jsx";

export const Privacy = () => {

    const { currentUser } = useUser();

    return (
        <div style={{
            width: '100%',
        }}>
            {/* Title */}
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'start'
            }}>
                <h2 style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    marginBlock: '0px',
                    fontFamily: 'Inter',
                    padding: '25px',
                }}>Privacy Information</h2>
            </div>

            {/* Account Information */}

            <div style={{
                width: '100%',
                height: 'max-content',
            }}>
                <SettingsField label="Who can view my profile?" value={"Everyone"} />
                <SettingsField label="Who can view my friends?" value={"Everyone"} />
                <SettingsField label="Who can view who I follow?" value={"Everyone"} />
                <SettingsField label="Who can view my matches?" value={"Everyone"} />
            </div>
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'start'
            }}>
                <h2 style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    marginBlock: '0px',
                    fontFamily: 'Inter',
                    padding: '25px',
                }}>Communication</h2>
            </div>
            <div style={{
                width: '100%',
                height: 'max-content',
                paddingBottom: '25px'
            }}>
                <SettingsField label="Who can send me friend requests?" value={"Everyone"} />
                <SettingsField label="Who can send me messages?" value={"Everyone"} />




            </div>
        </div>
    )
}
