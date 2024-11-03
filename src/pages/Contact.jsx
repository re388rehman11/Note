
// import React, { useState } from "react";
// import emailjs from "emailjs-com";
// import { message,Rate } from "antd"; 
// import "../App.scss";

// const Contact = () => {
//   const [form, setForm] = useState({
//     from_name: "",
//     from_email: "",
//     subject: "",
//     message: "",
//     rating: 0, 
//   });
//   const [loading, setLoading] = useState(false);
//  // const [modalVisible, setModalVisible] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleRatingChange = (value) => {
//     setForm({ ...form, rating: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validations
//     if (form.from_name.length < 3) {
//       message.error("Name must be at least 3 characters long!", 3);
//       return;
//     }
//     if (!/\S+@\S+\.\S+/.test(form.from_email)) {
//       message.error("Please enter a valid email address!", 3);
//       return;
//     }
//     if (form.message.length < 5) {
//       message.error("Message must be at least 5 characters long!", 3);
//       return;
//     }
//     if (form.rating < 1) {
//       message.error("Please rate this portfolio!", 3);
//       return;
//     }

//     setLoading(true);
//     emailjs
//       .send(
//         "service_1rlx9f9",
//         "template_sx2b3yw",
//         {
//           from_name: form.from_name,
//           from_email: form.from_email,
//           subject: form.subject,    // Send the subject
//           message: form.message,
//           rating: form.rating,      // Send the rating
//         },
//         "FpbtK9jgN-gptlepA"
//       )
//       .then((response) => {
//         message.success("Message sent successfully!", 3);
//         setForm({ from_name: "", from_email: "", subject: "", message: "", rating: 0 });
//         //setModalVisible(true);
//       })
//       .catch((error) => {
//         message.error("Error sending message. Please try again.", 3);
//       })
//       .finally(() => setLoading(false));
//   };

//   return (
//     <section className="contact">
//       <h2 className="section-title">Contact Me</h2>
//       <p className="contact-description">
//         I'm always excited to work on new projects and collaborate with talented individuals. If you have any questions, want to work together, or just want to say hi, feel free to reach out!
//       </p>
//       <form className="contact-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="from_name"
//           value={form.from_name}
//           onChange={handleChange}
//           placeholder="Your Name"
//           aria-label="Your Name"
//         />
//         <input
//           type="email"
//           name="from_email"
//           value={form.from_email}
//           onChange={handleChange}
//           placeholder="Your Email"
//           aria-label="Your Email"
//         />
//         <input
//           type="text"
//           name="subject"
//           value={form.subject}
//           onChange={handleChange}
//           placeholder="Subject"
//           aria-label="Subject"
//         />
//         <textarea
//           name="message"
//           value={form.message}
//           onChange={handleChange}
//           placeholder="Your Message"
//           rows="4"
//           aria-label="Your Message"
//         ></textarea>

//         {/* Add a Star Rating component */}
//         <div className="rating-container">
//           <p style={{marginBottom:5}}>Rate your experience</p>
//           <Rate value={form.rating} onChange={handleRatingChange}  style={{marginBottom:10}}/>
//         </div>

//         <button type="submit" className="btn btn-primary" disabled={loading}>
//           {loading ? "Sending..." : "Send Message"}
//         </button>
//       </form>

      
//     </section>
//   );
// };

// export default Contact;



import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Typography } from "antd";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

const { Title } = Typography;

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await emailjs.send(
        "service_1rlx9f9", // Replace with your EmailJS service ID
        "template_sx2b3yw", // Replace with your EmailJS template ID
        {
          name: values.name,
          email: values.email,
          message: values.message,
        },
        "your_public_key_here" // Replace with your EmailJS public key
      );

      toast.success("Your message has been sent successfully!");
      form.resetFields();
    } catch (error) {
      toast.error("An error occurred while sending your message.");
      console.error("EmailJS error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <Row justify="center">
        <Col span={12}>
          <Title level={2}>Contact Us</Title>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Input placeholder="Your Name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="Your Email" />
            </Form.Item>
            <Form.Item
              label="Message"
              name="message"
              rules={[{ required: true, message: "Please enter your message!" }]}
            >
              <Input.TextArea rows={4} placeholder="Your Message" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default ContactPage;
