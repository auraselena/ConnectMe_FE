import React from "react";
import { FaTwitter, FaInstagramSquare, FaFacebookSquare } from "react-icons/fa";

export const Footer = () => {
    return (
        <div className="bg-light shadow-lg">
        <div className="d-flex flex-row justify-content-evenly py-4">
          <div>
            <div className="fs-5 fw-bold">ConnectMe!</div>
            <div>About Us</div>
            <div>Help</div>
            <div>Career</div>
          </div>
          <div className="d-none d-lg-block">
            <div className="fs-5 fw-bold">Places</div>
            <div>Groups</div>
            <div>Marketplace</div>
            <div>Pages</div>
          </div>
          <div className="d-none d-lg-block">
            <div className="fs-5 fw-bold">Favorites</div>
            <div>Reels</div>
            <div>Events</div>
            <div>Saved</div>
          </div>
          <div className="d-none d-lg-block">
            <div className="fs-5 fw-bold">Settings</div>
            <div>Ad centre</div>
            <div>Ads Manager</div>
            <div>Security & Privacy</div>
          </div>
          {/* <div className="d-none d-lg-block">
            <div className="fs-3 fw-bold">Sosial</div>
            <div className="d-flex flex-row gap-1">
              <FaTwitter size={28} color="darkorange" />
              <FaInstagramSquare size={28} color="darkorange" />
              <FaFacebookSquare size={28} color="darkorange" />
            </div>
          </div> */}
        </div>
        <div className="text-muted text-center my-3">©️ 2023 ConnectMe! team. All rights reserved.</div>
      </div>
    )
}