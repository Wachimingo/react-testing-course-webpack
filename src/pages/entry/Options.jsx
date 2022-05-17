import React, { useEffect, useState } from "react";
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import ScoopOption from './ScoopOptions';
export default function Options({ optionType }) {
    const [items, setItems] = useState([])
    useEffect(() => {
        axios
            .get(`http://localhost:3000/${optionType}`)
            .then((res) => setItems(res.data));
    }, [optionType]);

    const ItemComponent = optionType === 'scoops' ? ScoopOption : undefined;

    const optionItems = items.map((item) => <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />)

    return (
        <Row>{optionItems}</Row>
    )
}