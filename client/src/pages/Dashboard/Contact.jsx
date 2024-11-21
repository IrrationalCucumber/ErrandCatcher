import React from "react";
import "./css/style.css";
import { Mail, Map, Phone, Send } from "@mui/icons-material";

function Contact() {
  return (
    <>
      <div
        class="w3-container w3-light-grey"
        style={{ padding: "128px 16px" }}
        id="contact"
      >
        <h3 class="w3-center">CONTACT</h3>
        <p class="w3-center w3-large">Lets get in touch. Send us a message:</p>
        <div style={{ marginTop: "48px" }}>
          <p>
            <Map />
            Cebu, Philippines
          </p>
          <p>
            <Phone /> Phone: +00 151515
          </p>
          <p>
            <Mail /> Email: mail@mail.com
          </p>
          <br />
          <form action="/action_page.php" target="_blank">
            <p>
              <input
                class="w3-input w3-border"
                type="text"
                placeholder="Name"
                required
                name="Name"
              />
            </p>
            <p>
              <input
                class="w3-input w3-border"
                type="text"
                placeholder="Email"
                required
                name="Email"
              />
            </p>
            <p>
              <input
                class="w3-input w3-border"
                type="text"
                placeholder="Subject"
                required
                name="Subject"
              />
            </p>
            <p>
              <input
                class="w3-input w3-border"
                type="text"
                placeholder="Message"
                required
                name="Message"
              />
            </p>
            <p>
              <button class="w3-button w3-black" type="submit">
                <Send /> SEND MESSAGE
              </button>
            </p>
          </form>

          {/* <img
            src="/w3images/map.jpg"
            class="w3-image w3-greyscale"
            style="width:100%;margin-top:48px"
          /> */}
        </div>
      </div>
    </>
  );
}

export default Contact;
