import {useUser} from "@/Contexts/UserContext.jsx";
import {Edit} from "@mui/icons-material";
import {Button, IconButton, TextField} from "@mui/material";
import SettingsField from "@/Components/SettingsField.jsx";
import {useState} from "react";
import EditModal from "@/Components/EditModal.jsx";

export const Account = () => {

    const {setCurrentUser, sendRequest, currentUser} = useUser();

    const [showEditDisplayName, setShowEditDisplayName] = useState(false)
    const [showEditUsername, setShowEditUsername] = useState(false)
    const [showEditEmail, setShowEditEmail] = useState(false)
    const [showEditPassword, setShowEditPassword] = useState(false)

    const [showEditBirthday, setShowEditBirthday] = useState(false)
    const [showEditLanguage, setShowEditLanguage] = useState(false)
    const [showEditGender, setShowEditGender] = useState(false)
    const [showEditRegion, setShowEditRegion] = useState(false)

    const [newDisplayName, setNewDisplayName] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <>
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
                    }}>Account Information</h2>
                </div>

                {/* Account Information */}

                <div style={{
                    width: '100%',
                    height: 'max-content',
                }}>
                    <SettingsField label="Display Name" value={currentUser.displayName} onClick={() => {
                        setShowEditDisplayName(true)
                    }}/>
                    <SettingsField label="Username" value={currentUser.username} onClick={() => {
                        setShowEditUsername(true)
                    }}/>
                    <SettingsField label="Email Address" value={"*******@gmail.com"} onClick={() => {
                        setShowEditEmail(true)
                    }}/>
                    <SettingsField label="Password" value={"*************"} onClick={() => {
                        setShowEditPassword(true)
                    }}/>
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
                    }}>Personal Information</h2>
                </div>

                <div style={{
                    width: '100%',
                    height: 'max-content',
                    paddingBottom: '25px'
                }}>
                    <SettingsField label="Birthday" value={"06-22-2003"}/>
                    <SettingsField label="Language" value={"English"}/>
                    <SettingsField label="Gender (Optional)" value={"Male"}/>
                    <SettingsField label="Region (Optional)" value={"NA"}/>

                </div>

            </div>


            <EditModal
                show={showEditDisplayName}
                title="Edit Display Name"
                onSave={() => {

                    if (newDisplayName == '') {
                        return;
                    }

                    fetch("http://localhost:8080/api/users/changeDisplayName", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("access_token")
                        },
                        body: JSON.stringify({
                            displayName: newDisplayName
                        })
                    }).then((response) => {
                        if (response.status === 200) {
                            setShowEditDisplayName(false)
                            setNewDisplayName("")
                            setCurrentUser({
                                ...currentUser,
                                displayName: newDisplayName
                            })
                        }
                    })

                }}
                onCancel={() => {
                    setShowEditDisplayName(false)
                    setNewDisplayName("")
                }}
                saveDisabled={newDisplayName === ""}
            >
                <TextField style={{
                    marginTop: '10px'
                }} onChange={
                    (e) => {
                        setNewDisplayName(e.target.value)
                    }
                }></TextField>
            </EditModal>

            {/* Repeat for other fields */}
            <EditModal
                show={showEditUsername}
                title="Edit Username"
                onSave={() => {/* handle save */
                }}
                onCancel={() => {
                    setShowEditUsername(false)
                    setNewUsername("")
                    setConfirmPassword("")
                }}
                saveDisabled={newUsername === ""}
            >
                <TextField style={{
                    marginTop: '10px'
                }} onChange={
                    (e) => {
                        setNewUsername(e.target.value)
                    }
                }
                           label={"Enter a new Username"}

                ></TextField>

                <TextField style={{
                    marginTop: '10px'
                }} onChange={
                    (e) => {
                        setConfirmPassword(e.target.value)
                    }
                }
                           label={"Confirm your Password"}
                           type={"password"}
                ></TextField>
            </EditModal>

            <EditModal
                show={showEditEmail}
                title="Change your Email"
                onSave={() => {/* handle save */
                }}
                onCancel={() => {
                    setShowEditEmail(false)
                    setNewEmail("")
                }}
                saveDisabled={newDisplayName === ""}
            >
                <TextField style={{
                    marginTop: '10px'
                }} onChange={
                    (e) => {
                        setNewEmail(e.target.value)
                    }
                }
                           label={"Enter a new Email Address"}

                ></TextField>

                <TextField style={{
                    marginTop: '10px'
                }} onChange={
                    (e) => {
                        setConfirmPassword(e.target.value)
                    }
                }
                           label={"Confirm your Password"}
                           type={"password"}
                ></TextField>
            </EditModal>


        </>
    )
}
