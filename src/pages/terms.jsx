import React from "react";
import { Link } from "react-router-dom";

function Terms() {
  return (
    <div className="container my-5 page-container">
      <div
        className="card shadow p-4"
        style={{ backgroundColor: "transparent" }} // semi-transparent
      >
        <h1 className="text-white mb-4 text-center">Terms and Conditions</h1>

        <div className="mb-3">
          <h5>1. Use of the Platform</h5>
          <p>
            You agree to use our website for lawful purposes only and in a
            manner that does not infringe the rights of, restrict, or inhibit
            anyone else’s use of the platform.
          </p>
        </div>

        <div className="mb-3">
          <h5>2. Intellectual Property</h5>
          <p>
            All content, including images, text, and logos, is the property of
            LOOTBOX or its content providers and is protected by intellectual
            property laws.
          </p>
        </div>

        <div className="mb-3">
          <h5>3. Limitation of Liability</h5>
          <p>
            LOOTBOX is not liable for any damages arising from the use of our
            platform or the inability to access it. Use the platform at your own
            risk.
          </p>
        </div>

        <p className="text-center mt-4">
          For full details, please <Link to="/contact">Contact Us</Link>.
        </p>
      </div>
    </div>
  );
}

export default Terms;
