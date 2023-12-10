import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBBreadcrumbItem, MDBBreadcrumb } from 'mdb-react-ui-kit';
import { Link, useParams } from 'react-router-dom';
import { createFollow, deleteFollow, getFollow, getUserById } from './client';
import './index.css'
import { useAuth } from '../Home/AuthContext';
import { getFollowersCount } from './client';
import NavBar from '../Navbar';
export default function SellerProfile() {
  const { user } = useAuth();
  const { sellerId } = useParams();
  const [seller, setSeller] = useState();
  const [error, setError] = useState(false);
  const [isUserFollowing,setIsUserFollowing] = useState(false);
  const [followersCount, setfollowersCount] = useState(null);
  const followSeller = () => {
    if(isUserFollowing) {
      deleteFollow(user.id,sellerId).then(()=>{
        setIsUserFollowing(false)
        setfollowersCount(parseInt(followersCount)-1)
      })
    } else {
    createFollow(user.id,sellerId).then(()=>{
      setIsUserFollowing(true)
      setfollowersCount(parseInt(followersCount)+1)
    })
  }
  }
  useEffect(() => {
    getUserById(sellerId).then((user) => {
      setSeller(user)
      setError(false)
    }).catch((err) => {
      setError(err)
    })
    getFollowersCount(sellerId).then((followers) =>{
      setfollowersCount(followers.count);
    }).catch((err) => {
      setError(err)
    })
    if(user && user.id) {
    getFollow(user.id,sellerId).then((response)=>{
      if(JSON.stringify(response) === '{}') {
        setIsUserFollowing(false)  
      } else {
      setIsUserFollowing(true)
      }
      setError(false)
    }).catch((err) => {
      setError(err)
    })
  }
  }, [sellerId])
  return (
    <><NavBar/>
    <div className="gradient-custom-2">
      <MDBContainer className="py-5 h-100">
        {error && <h3 style={{ color: "red" }}>Cannot load seller profile page!!</h3>}
        {seller &&
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="9" xl="7">
              <MDBCard>
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                  </div>
                  <div className="ms-3" style={{ marginTop: '130px' }}>
                    <MDBTypography tag="h5">{seller.name}</MDBTypography>
                    <MDBCardText>{seller.email}</MDBCardText>
                  </div>
                </div>
                 <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                 {user &&
                  <div className="d-flex justify-content-end text-center py-1">
                  {followersCount!== null &&<div style={{marginRight:40}}>
                        <MDBCardText className="mb-1 h5">{followersCount}</MDBCardText>
                        <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                  </div>}
                  <div style={{marginLeft:40}}>
                      <button type="button" class="btn btn-primary" onClick={followSeller} style={{ height: '36px', overflow: 'visible', margin: 10 }}>
                        {isUserFollowing? "Unfollow" :"Follow"}
                      </button>
                  </div>
                  </div>}
                </div>
                { seller.description!=null && 
                <MDBCardBody>
                  <div>
                    <p className="lead text-bold mb-1">About</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <MDBCardText className="font-italic mb-1">{seller.description}</MDBCardText>
                    </div>
                  </div>
                </MDBCardBody>
                }
                <MDBCardBody className="text-black">
                  <div >
                    <p className="lead text-bold mb-1" style={{fontWeight:"bolder !important"}}>Contact Details</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <MDBCardText>Email: {seller.email}</MDBCardText>
                    <MDBCardText>Mobile: {seller.mobilenum}</MDBCardText>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        }
      </MDBContainer>
    </div>
    </>);
}