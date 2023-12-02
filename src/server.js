const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "amberelmedina1@gmail.com",
    pass: "cnlr aouk xqbl wayb",
  },
});

app.post("/api/send-email", async (req, res) => {
  const { fullName, email, address, paymentMethod, cartItems } = req.body;

  try {
    // Create the HTML content of the email
    const emailContent = `
      <h2>Order Confirmation</h2>
      <p>Full Name: ${fullName}</p>
      <p>Email: ${email}</p>
      <p>Address: ${address}</p>
      <p>Payment Method: ${paymentMethod}</p>
      <h3>Cart Items:</h3>
      <ul>
        ${cartItems
          .map(
            (item) =>
              `<li>${item.articleDetails.name} - Quantity: ${item.quantity}</li>`
          )
          .join("")}
      </ul>
    `;

    // Send the email
    const info = await transporter.sendMail({
      from: "amberelmedina1@gmail.com", // Replace with your Gmail email
      to: email,
      subject: "Order Confirmation",
      html: emailContent,
    });

    console.log("Email sent:", info.response);
    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).json({ error: "Error sending email." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
