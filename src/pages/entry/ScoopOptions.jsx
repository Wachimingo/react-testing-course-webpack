import React from 'react';
import Col from 'react-bootstrap/Col';

export default function ScoopOptions({ name, imagePath }) {
    return (
        <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "Center" }}>
            <img
                src={`http://localhost:3000${imagePath}`}
                alt={`${name} scoop`}
                style={{ width: "75%" }}
            ></img>
        </Col>
    )
}