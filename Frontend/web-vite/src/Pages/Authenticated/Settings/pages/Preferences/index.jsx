import {useUser} from "@/Contexts/UserContext.jsx";
import {Cancel, Edit} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import SettingsField from "@/Components/SettingsField.jsx";

export const Preferences = () => {

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
                }}>Notification Preferences</h2>
            </div>

            {/* Account Information */}

            <div style={{
                width: '100%',
                height: 'max-content',
            }}>
                <SettingsField label="Can I be recieve email notifications?" value={"Yes"} />
            </div>
        </div>
    )
}
