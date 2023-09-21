import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserName, setProfile } from '../../redux/slices/userSlice';
import "./editName.scss";
import Button from "../button/Button";
import axios from "axios";

function EditName() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [editUserName, setEditUserName] = useState(useSelector((state) => state.user.userName));
  const userProfile = useSelector((state) => state.user);
  const [isEditMode, setEditMode] = useState(false);
  useEffect(() => {
    if (token) {
      axios("http://localhost:3001/api/v1/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          dispatch(setProfile(res.data.body));
        })
        .catch((err) => {
          console.log(err)
        });
    } 
  }, [token, dispatch]);
  const handleEditClick = () => {
    setEditMode(true);
  };
  const handleCancelClick = () => {
    setEditMode(false);
  };
  const handleSaveClick = () => {
    axios(`http://localhost:3001/api/v1/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify({
        userName: editUserName
      }),
    })
      .then((res) => {
        dispatch(setUserName(res.data.body.userName));
        setEditUserName(res.data.body.userName);
      })
      .catch((err) => {
        console.log(err)
      });
    setEditMode(false);
  };
  return (
    <div className="editName">
      <div className="user_welcome">
        <h1>
          Welcome back <br />
          {isEditMode ? (
            <form className="input_editName">
              <input
                style={{width: "200px"}}
                type="text"
                required
                placeholder={`Your last username: ${editUserName}`}
                onChange={(e) => setEditUserName(e.target.value)}
              />
               <Button text="Save" className="edit-button" onClick={handleSaveClick}/>
            </form>
          ) : (
            userProfile && `${userProfile.firstName} ${userProfile.lastName} !`
          )}
        </h1>
        {isEditMode ? (
            <Button text="Cancel" className="edit-button" onClick={handleCancelClick}/>
        ) : (
          <div className="button_editName">
            <Button text="Edit Name" className="edit-button" onClick={handleEditClick}/>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditName;