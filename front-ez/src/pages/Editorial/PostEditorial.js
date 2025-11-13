import "./PostEditorial.css";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PostEditorial = () => {
    const [formData, setFormData] = useState({
        name: "",
        country: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);
        try{
            const response = await fetch("http://localhost:8080/api/editorials", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
                });
                const data = await response.json();
                console.log("Local posted successfully:", data);
                navigate("/");

        } catch (error) {
            console.error("Error posting local:", error);
        }

    };

    return (
        <div className="center-form">
            <h1>Post New Local</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter Local Name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formFloor">
                    <Form.Control
                        type="text"
                        name="floor"
                        placeholder="Enter Local Floor"
                        value={formData.floor}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formCode">
                    <Form.Control
                        type="text"
                        name="code"
                        placeholder="Enter Local Code"
                        value={formData.code}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Post Local
                </Button>
            </Form>
        </div>
    );
};

export default PostEditorial;