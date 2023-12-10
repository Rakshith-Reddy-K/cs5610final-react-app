import React, { useEffect, useState } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBreadcrumb,
  MDBBreadcrumbItem
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { getFollowingCount, getUserById, updateUser } from './client';
import { useParams } from "react-router-dom";
import { useAuth } from '../Home/AuthContext';
import NavBar from '../Navbar';

function BuyerProfile() {
  const { user , login } = useAuth(); 
  const { userId } = useParams();
  const editProfile = () => {
    setEditMode(!editMode);
  }
  const cancelEdit = () => {
    setEditMode(false);
  }
  const handleSave = () => {
    updateUser(userForm).then((user) => {
      setCurrentUser(user)
      setUserForm(user)
      setEditMode(false)
      login(user)
    })
  }
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [userForm, setUserForm] = useState(null);
  const [followingCount, setFollowingCount] = useState(null);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    if(user && userId == user.id) {
      setCurrentUser(user)
      setUserForm(user)
      getFollowingCount(userId).then((following) => {
        setFollowingCount(following.count)
      })
      setError(null)
    } else {
      getUserById(userId).then((user) => {
        setCurrentUser(user)
        setError(null)
      }).catch((err) => {
        setError(err)
      })
    }
  }, [user])
  console.log("Current uswer",currentUser)
  return (
    <><NavBar/>
    <section>
      <MDBContainer className="py-5">
        {error && <h3 style={{ color: "red" }}>Cannot load profile page!!</h3>}
        {user &&
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: '150px' }}
                    fluid />
                  
                  {currentUser!==null && followingCount !== null && <div><p className="text-muted mb-1">{currentUser.username}</p>
                    <div className="d-flex mb-2" style={{ margin: 16 }}>
                      <MDBCardBody className="p-0">
                        <MDBCardText className="mb-1 h5">{followingCount}</MDBCardText>
                        <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                      </MDBCardBody>
                    </div>
                    </div>
                  }
                </MDBCardBody>
              </MDBCard>
              {user && userId == user.id &&
              <MDBCard className="mb-4 mb-lg-0">
                <button type="button" class="btn btn-primary" onClick={editProfile}>Edit Profile</button>
              </MDBCard>}
            </MDBCol>
            {currentUser &&
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      {editMode ? <input value={userForm.name} style={{ maxHeight: 24 }} className="form-control" onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} />
                        : <MDBCardText className="text-muted">{currentUser.name}</MDBCardText>}
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      {editMode ? <input value={userForm.email} style={{ maxHeight: 24 }} className="form-control" onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} />
                        : <MDBCardText className="text-muted">{currentUser.email}</MDBCardText>}

                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Mobile Number</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      {editMode ? <input value={userForm.mobilenum} style={{ maxHeight: 24 }} className="form-control" onChange={(e) => setUserForm({ ...userForm, mobilenum: e.target.value })} />
                        : <MDBCardText className="text-muted">{currentUser.mobilenum}</MDBCardText>}

                    </MDBCol>
                  </MDBRow>

                </MDBCardBody>

              </MDBCard>
              {editMode &&
                <MDBRow >
                  <MDBCol sm="8">
                  </MDBCol>
                  <MDBCol sm="2">
                    <button type="button" class="btn btn-danger" onClick={cancelEdit}>Cancel</button>
                  </MDBCol>
                  <MDBCol sm="2">
                    <button type="button" class="btn btn-success" onClick={handleSave}>Save</button>
                  </MDBCol>
                </MDBRow>
              }
            </MDBCol>
}
          </MDBRow>
        }
      </MDBContainer>

    </section>
    </>
  );
}

export default BuyerProfile