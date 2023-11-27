import axios from "axios";
import React, { useEffect, useState } from "react";
import { notify } from "../../common";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [landlord, setLoandLoard] = useState(null);
  const [message, setMessage] = useState("");
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  // get landload to cantact
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`/api/user/get-user/${listing.userRef}`);

        if (result.data) {
          setLoandLoard(result.data);
        }
      } catch (error) {
        notify("error", "User not found!");
      }
    };

    fetchUser();
  }, [listing.userRef]);

  return (
    <div className="mt-4">
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </div>
  );
};

export default Contact;
